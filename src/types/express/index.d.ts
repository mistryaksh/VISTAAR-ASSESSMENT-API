import { PassportUser } from "../PassportUser";

declare global {
  namespace Express {
    interface User extends PassportUser {}
  }
}
