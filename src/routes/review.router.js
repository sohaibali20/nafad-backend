import { Router } from "express";

import { createReview, getReviewByEmail, getReviews, deleteReview } from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.post("/create", createReview);

reviewRouter.get("/", getReviews);

reviewRouter.get("/:email", getReviewByEmail);

reviewRouter.delete("/:email", deleteReview);

export default reviewRouter;