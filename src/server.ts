import { connect } from "mongoose";
import { config } from "./config";
import app from "./app";

async function run_server() {
  try {
    // step 1: connect to mongodb database
    await connect(config.db_uri as string);
    console.log("Connected to MongoDB");

    // step 2: start the server on port 5000
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

run_server();
