import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// using cors to allow cross origin resource sharing
app.use(cors());

// using express.json() to parse json data from the request body
app.use(express.json());

// using express.urlencoded() to parse urlencoded data from the request body
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1", (req, res) => {
  res.send("Hello World");
});

export default app;
