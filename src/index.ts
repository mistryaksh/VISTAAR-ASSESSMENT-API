import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils";
import { errorRequestHandler, notFoundMiddleware } from "./middleware";
import cors from "cors";
import morgan from "morgan";
import { authRouter, customerRoute } from "./routes";
import { transactionRoute } from "./routes/transactions.routes";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string) || 8080;
const DATABASE: string =
  process.env.DATABASE_URL || "mongodb://localhost:27017/testdb";
const BASE_ROUTE: string = process.env.BASE_ROUTE || "/api/1.0";

connectDb(DATABASE);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));

app.use(`${BASE_ROUTE}`, authRouter);
app.use(`${BASE_ROUTE}`, customerRoute);
app.use(`${BASE_ROUTE}`, transactionRoute);

app.use(errorRequestHandler);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
