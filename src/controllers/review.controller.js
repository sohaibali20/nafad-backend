import Review  from "../models/reviews.model.js";

//Create a new review
const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).send({message:"Review Added", review});
    } catch (error) {
        res.status(400).send(error);
    }
};

//Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Get a single review
const getReviewByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const review = await Review.findOne({email});
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }
        res.send(review);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

//Delete a review
const deleteReview = async (req, res) => {
    try {
        const email = req.params.email;
        const review = await Review.findOneAndDelete({email});
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }
        res.send(review);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export { createReview, getReviews, getReviewByEmail, deleteReview };
