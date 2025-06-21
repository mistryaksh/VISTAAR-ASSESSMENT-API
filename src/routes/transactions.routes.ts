import { Router } from "express";
import {
  distinctProducts,
  getTransactionByAccountId,
  transactionBelowAmount,
} from "../controller";
import { authMiddleware } from "../middleware";

export const transactionRoute: Router = Router();

transactionRoute.get(
  `/transactions/distinct-products`,
  authMiddleware,
  distinctProducts
);
transactionRoute.get(
  `/transactions/amount/:amount`,
  authMiddleware,
  transactionBelowAmount
);
transactionRoute.get(
  `/transactions/:account_id`,
  authMiddleware,
  getTransactionByAccountId
);
