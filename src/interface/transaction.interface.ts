export interface ITransactionProps {
  date: Date;
  amount: number;
  transaction_code: "buy" | "sell" | string;
  symbol: string;
  price: string;
  total: string;
}

export interface IAccountBucketProps {
  account_id: number;
  transaction_count: number;
  bucket_start_date: Date;
  bucket_end_date: Date;
  transactions: ITransactionProps[];
}
