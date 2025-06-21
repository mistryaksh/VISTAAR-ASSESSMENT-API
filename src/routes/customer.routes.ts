import { Router } from "express";
import { getAllCustomers } from "../controller";
import { authMiddleware } from "../middleware";

export const customerRoute: Router = Router();

customerRoute.get(`/customers`, authMiddleware, getAllCustomers);
