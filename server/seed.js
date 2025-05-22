import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Property from './models/Property.js';
import connectDB from './config/db.js';

dotenv.config();

// Sample data
const users = [
  {
    fullName: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    fullName: 'John Landlord',
    email: 'landlord@example.com',
    password: 'landlord123',
    role: 'landlord'
  },
  {
    fullName: 'Jane Tenant',
    email: 'tenant@example.com',
    password: 'tenant123',
    role: 'tenant'
  }
];

const properties = [
  {
    title: 'Modern Apartment with Sea View',
    description: 'Beautiful apartment with stunning sea views',
    address: {
      street: '123 Beach Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    },
    price: 35000,
    securityDeposit: 70000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    amenities: ['Air Conditioning', 'Parking', 'Swimming Pool'],
    propertyType: 'apartment',
    status: 'available'
  },
  // Add more properties as needed
];

// Seed data
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const landlord = createdUsers.find(user => user.role === 'landlord');

    // Insert properties with landlord reference
    const propertyData = properties.map(property => ({
      ...property,
      landlord: landlord._id
    }));
    await Property.insertMany(propertyData);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();