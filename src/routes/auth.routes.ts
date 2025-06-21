import { Router } from "express";
import {
  authGoogle,
  authGoogleCallback,
  authGoogleProfile,
} from "../controller";
import { authMiddleware } from "../middleware";

export const authRouter: Router = Router();

authRouter.get(`/auth/google`, authGoogle);
authRouter.get(`/auth/google/callback`, authGoogleCallback);
authRouter.get(`/auth/profile`, authMiddleware, authGoogleProfile);
