import { Request, Response } from "express";
import { InternalServerError, Ok } from "../utils";
import { Customer } from "../model";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Customer.countDocuments();

    const customers = await Customer.find({}).skip(skip).limit(limit).exec();

    Ok(res, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      length: customers.length,
      data: customers,
    });
  } catch (err) {
    console.error(err);
    InternalServerError(res, "Internal server error");
  }
};
