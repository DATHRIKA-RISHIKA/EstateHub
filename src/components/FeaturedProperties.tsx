
import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import Button from './Button';
import { cn } from '@/lib/utils';

// Mock data for featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Modern Apartment with Sea View",
    address: "Indiranagar, Bangalore",
    price: 35000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
  },
  {
    id: "2",
    title: "Cozy Studio in Tech Park",
    address: "Whitefield, Bangalore",
    price: 18000,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
  {
    id: "3",
    title: "Luxury Villa with Private Pool",
    address: "Jubilee Hills, Hyderabad",
    price: 85000,
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
  },
  {
    id: "4",
    title: "Spacious Family Home",
    address: "OMR, Chennai",
    price: 42000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
  {
    id: "5",
    title: "Modern Penthouse with Terrace",
    address: "Adyar, Chennai",
    price: 65000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    imageUrl: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
  },
  {
    id: "6",
    title: "Stylish Loft Apartment",
    address: "Banjara Hills, Hyderabad",
    price: 28000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
];

const FeaturedProperties: React.FC = () => {
  const [visibleProperties, setVisibleProperties] = useState(3);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the index from the data attribute
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setAnimatedItems((prev) => [...prev, index]);
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all property cards
    document.querySelectorAll('.property-card').forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [visibleProperties]);

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked premium rental properties in prime locations across India's top cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProperties.slice(0, visibleProperties).map((property, index) => (
            <div 
              key={property.id} 
              className={cn(
                "property-card transition-all duration-500",
                animatedItems.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-16"
              )}
              data-index={index}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {visibleProperties < featuredProperties.length && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setVisibleProperties(featuredProperties.length)}
            >
              View All Properties
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
