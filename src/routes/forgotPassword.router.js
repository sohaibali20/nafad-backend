import { forgotPassword, verifyOTP, resetPassword } from "../controllers/forgotPassword.controller.js";
import { Router } from "express";

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/", forgotPassword);
forgotPasswordRouter.post("/verify-otp", verifyOTP);
forgotPasswordRouter.post("/reset-password", resetPassword);

export default forgotPasswordRouter;