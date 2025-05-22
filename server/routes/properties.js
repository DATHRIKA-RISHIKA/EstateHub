import express from 'express';
import Property from '../models/Property.js';
import { protect, landlord } from '../middleware/auth.js';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('landlord', 'fullName email')
      .sort('-createdAt');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('landlord', 'fullName email phone');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create property (landlord only)
router.post('/', protect, landlord, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      landlord: req.user._id
    });
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update property (landlord only)
router.put('/:id', protect, landlord, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.landlord.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete property (landlord only)
router.delete('/:id', protect, landlord, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.landlord.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await property.remove();
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;