import express from 'express';
import Review from '../models/Review.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create review
router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, rating, comment } = req.body;

    const review = new Review({
      property: propertyId,
      tenant: req.user._id,
      rating,
      comment
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get property reviews
router.get('/property/:propertyId', async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.propertyId })
      .populate('tenant', 'fullName')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update review
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.tenant.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.tenant.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;