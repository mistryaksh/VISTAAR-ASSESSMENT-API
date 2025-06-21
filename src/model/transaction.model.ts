import mongoose from "mongoose";
import { IAccountBucketProps } from "../interface";

const TransactionSchema = new mongoose.Schema<IAccountBucketProps>(
  {
    account_id: {
      type: Number,
      required: true,
    },
    transaction_count: {
      type: Number,
      required: true,
    },
    bucket_start_date: {
      type: Date,
      required: true,
    },
    bucket_end_date: {
      type: Date,
      required: true,
    },
    transactions: [
      {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        transaction_code: { type: String, required: true },
        symbol: { type: String, required: true },
        price: { type: String, required: true },
        total: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<IAccountBucketProps>(
  "transactions",
  TransactionSchema
);
