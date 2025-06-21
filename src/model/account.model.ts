import mongoose from "mongoose";
import { IAccountsProps } from "../interface";

const AccountSchema = new mongoose.Schema<IAccountsProps>(
  {
    account_id: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Accounts = mongoose.model<IAccountsProps>(
  "accounts",
  AccountSchema
);
