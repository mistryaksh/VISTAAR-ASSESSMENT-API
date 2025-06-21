import { Response } from "express";
import { RESPONSE_MESSAGE, STATUS_CODES } from "../interface";

export const normalizePort = (
  val: number | string
): number | string | boolean => {
  const normolizedPort = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(normolizedPort)) {
    return val;
  }

  if (normolizedPort >= 0) {
    return normolizedPort;
  }

  return false;
};

export class AuthError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class ApiError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export enum ERROR_MESSAGE {
  INVALID_JWT_TOKEN = "Invalid jwt token",
}

export const Ok = <T>(res: Response, data: T | T[]) => {
  res.status(STATUS_CODES.OK).json({
    success: true,
    data,
    status_code: RESPONSE_MESSAGE.OK,
  });
};

export const Created = <T>(res: Response, data: T) => {
  res.status(STATUS_CODES.CREATED).json({
    success: true,
    data,
    status_code: RESPONSE_MESSAGE.CREATED,
  });
};

export const NoContent = (res: Response) => {
  res.status(STATUS_CODES.NO_CONTENT).json({
    success: true,
    status_code: STATUS_CODES.NO_CONTENT,
  });
};

export const BadRequest = (res: Response, message: string | string[]) => {
  res.status(STATUS_CODES.BAD_REQUEST).json({
    success: false,
    status_code: STATUS_CODES.BAD_REQUEST,
    message,
  });
};

export const NotFound = (res: Response, message: string) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    success: false,
    status_code: STATUS_CODES.NOT_FOUND,
    message,
  });
};

export const UnAuthorized = (res: Response, message: any) => {
  res.status(STATUS_CODES.UNAUTHORIZED).json({
    success: false,
    status_code: STATUS_CODES.UNAUTHORIZED,
    message,
  });
};

export const Forbidden = (res: Response, message: string) => {
  res.status(STATUS_CODES.FORBIDDEN).json({
    success: false,
    status_code: STATUS_CODES.FORBIDDEN,
    message,
  });
};

export const InternalServerError = (res: Response, message: string) => {
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    status_code: STATUS_CODES.INTERNAL_SERVER_ERROR,
    message,
  });
};

export const handleError = (res: Response, err: unknown) => {
  const message =
    (err as unknown as Error).message || (err as unknown as string);
  return UnAuthorized(res, message);
};
