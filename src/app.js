import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import authenticateToken from "./middlewares/authmiddleware.js";

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
import reviewRouter from "./routes/review.router.js";
import dailySalesRouter from "./routes/dailysales.router.js";
import loginRouter from "./routes/login.router.js";


//Routes Declaration

app.use("/api/v1/events", authenticateToken, eventRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/staff", authenticateToken, staffRouter);
app.use("/api/v1/attendance", authenticateToken, attendanceRouter);
app.use("/api/v1/reviews", authenticateToken, reviewRouter);
app.use("/api/v1/daily-sales", authenticateToken, dailySalesRouter);
app.use("/api/v1/login", loginRouter);



export { app };