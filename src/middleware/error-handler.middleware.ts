import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../interface";

export const errorRequestHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) next();

  const errorMap: Record<string, number> = {
    ApiError: STATUS_CODES.BAD_REQUEST,
    AuthError: STATUS_CODES.UNAUTHORIZED,
  };

  const statusCode = errorMap[err.name] || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    status_code: statusCode,
    message,
  });
};
