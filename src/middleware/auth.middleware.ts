import { configDotenv } from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnAuthorized } from "../utils";

configDotenv();
const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    UnAuthorized(res, "Unauthorized");
  } else {
    const purifyedToken = token.replace("Bearer ", "");
    const user = jwt.verify(purifyedToken, JWT_SECRET);
    if (!user) {
      UnAuthorized(res, "Unauthorized");
    } else return next();
  }
};
