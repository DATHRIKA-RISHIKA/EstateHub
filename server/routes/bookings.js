import express from 'express';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { protect } from '../middleware/auth.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create booking
router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, startDate, endDate } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.status !== 'available') {
      return res.status(400).json({ message: 'Property is not available' });
    }

    const booking = new Booking({
      property: propertyId,
      tenant: req.user._id,
      startDate,
      endDate,
      totalAmount: property.price
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: property.title,
            },
            unit_amount: property.price * 100, // Convert to paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/booking/success`,
      cancel_url: `${process.env.CLIENT_URL}/booking/cancel`,
    });

    booking.stripeSessionId = session.id;
    const createdBooking = await booking.save();

    res.status(201).json({
      booking: createdBooking,
      sessionId: session.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ tenant: req.user._id })
      .populate('property')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.tenant.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;