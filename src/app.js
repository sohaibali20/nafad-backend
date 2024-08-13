import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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



//Routes Import

import eventRouter from "./routes/event.router.js";
import userRouter from "./routes/user.router.js";
import staffRouter from "./routes/staff.router.js";
import attendanceRouter from "./routes/attendance.router.js";


//Routes Declaration

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/attendance", attendanceRouter);



export { app };