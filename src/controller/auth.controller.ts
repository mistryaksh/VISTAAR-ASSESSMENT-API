import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequest, Ok, UnAuthorized } from "../utils";
import { configDotenv } from "dotenv";

configDotenv();

const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_AUTH_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_AUTH_REDIRECT_URI!;
const JWT_SECRET = process.env.JWT_SECRET!;

export const authGoogle = (req: Request, res: Response) => {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("access_type", "offline");
  res.redirect(url.toString());
};

export const authGoogleCallback = async (req: Request, res: Response) => {
  const code = req.query.code;
  if (!code) {
    BadRequest(res, "No code from Google");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    } as Record<string, string>),
  });
  const tokens: any = await tokenRes.json();

  const idToken = tokens.id_token;
  if (!idToken) {
    BadRequest(res, "No ID token returned from Google");
  }
  const user = JSON.parse(
    Buffer.from(idToken.split(".")[1], "base64").toString()
  );

  const myToken = jwt.sign(
    { id: user.sub, email: user.email, name: user.name, picture: user.picture },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.redirect(`http://localhost:5173?token=${myToken}`);
};

export const authGoogleProfile = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization as string;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return UnAuthorized(res, "No token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);
    Ok(res, user);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
