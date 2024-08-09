import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("Public"));
app.use(cookieParser());


export { app };