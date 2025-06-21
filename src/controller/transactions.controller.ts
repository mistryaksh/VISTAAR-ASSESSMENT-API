import { Request, Response } from "express";
import { InternalServerError, Ok } from "../utils";
import { Accounts, Transaction } from "../model";

export const getTransactionByAccountId = async (
  req: Request,
  res: Response
) => {
  try {
    const account_id = req.params.account_id;
    const transactions = await Transaction.findOne({ account_id: account_id });
    Ok(res, transactions);
  } catch (err) {
    console.log(err);
    InternalServerError(res, "Internal server error");
  }
};

export const transactionBelowAmount = async (req: Request, res: Response) => {
  try {
    const amount = Number(req.params.amount) || 5000; // fallback default 5000
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 1. Get all matching account ids (as per your aggregation)
    const idsAgg = await Transaction.aggregate([
      { $match: { "transactions.amount": { $lt: amount } } },
      { $group: { _id: "$account_id" } },
      { $project: { account_id: "$_id", _id: 0 } },
    ]);

    const total = idsAgg.length;
    const paginatedIds = idsAgg.slice(skip, skip + limit);

    Ok(res, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      account_ids: paginatedIds.map((r) => r.account_id),
    });
  } catch (err) {
    console.log(err);
    InternalServerError(res, "Internal server error");
  }
};

export const distinctProducts = async (req: Request, res: Response) => {
  try {
    const distinctProducts = await Accounts.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products" } },
      { $project: { _id: 0, product: "$_id" } },
    ]);
    Ok(res, distinctProducts);
  } catch (err) {
    console.log(err);
    InternalServerError(res, "Internal server error");
  }
};
