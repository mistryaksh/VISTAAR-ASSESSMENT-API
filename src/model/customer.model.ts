import mongoose from "mongoose";
import { ICustomerProps } from "../interface";

const CustomerSchema = new mongoose.Schema<ICustomerProps>(
  {
    accounts: [
      {
        type: mongoose.Schema.Types.Number,
      },
    ],
    active: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    birthdate: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    tier_and_details: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("customers", CustomerSchema);
