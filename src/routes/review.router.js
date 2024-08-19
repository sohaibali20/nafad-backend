import { Router } from "express";

import { addReview, getReviewByEmail, getReviews, deleteReview } from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.post("/add", addReview);

reviewRouter.get("/get", getReviews);

reviewRouter.get("/:email", getReviewByEmail);

reviewRouter.delete("/:email", deleteReview);

export default reviewRouter;