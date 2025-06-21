import mongoose from "mongoose";
import { exec } from "child_process";

const DUMP_PATH = "./test-db";
const DB_NAME = "testdb";

export const connectDb = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");

    // SAFETY: Now check for .db existence
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not initialized after connection");

    const collections = await db.listCollections().toArray();
    const hasCustomers = collections.some((col) => col.name === "customers");
    let shouldRestore = false;

    if (!hasCustomers) {
      shouldRestore = true;
    } else {
      const count = await db.collection("customers").countDocuments();
      if (count === 0) shouldRestore = true;
    }

    if (shouldRestore) {
      console.log("Restoring MongoDB dump...");
      await new Promise<void>((resolve, reject) => {
        exec(
          `mongorestore --db ${DB_NAME} --drop ${DUMP_PATH}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`mongorestore error: ${error}`);
              reject(error);
            } else {
              console.log("MongoDB restored successfully.");
              console.log(stdout);
              resolve();
            }
          }
        );
      });
    } else {
      console.log("MongoDB already contains data.");
    }
  } catch (err) {
    console.error("DB connection or restore failed:", err);
    process.exit(1);
  }
};
