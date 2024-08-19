import Review  from "../models/reviews.model.js";

//Create a new review
// Add a new review
 const addReview = async (req, res) => {
    try {
      const { firstName, lastName, email, stars, comment } = req.body;
  
      // Check if a review with the same email already exists
    //   const existingReview = await Review.findOne({ email });
    //   if (existingReview) {
    //     return res.status(400).json({ message: "Review with this email already exists." });
    //   }
  
      const newReview = new Review({
        firstName,
        lastName,
        email,
        stars,
        comment,
      });
  
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json({ message: "Server error, could not add review." });
    }
  };
  
  // Get all reviews
 const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Server error, could not fetch reviews." });
    }
  };

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

export { addReview, getReviews, getReviewByEmail, deleteReview };
