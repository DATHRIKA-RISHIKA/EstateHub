import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  price: {
    type: Number,
    required: true
  },
  securityDeposit: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  amenities: [String],
  images: [String],
  availableFrom: Date,
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'studio']
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;