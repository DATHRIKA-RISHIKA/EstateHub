
import React, { useState, useEffect } from "react";
import { Brain, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { cn } from "@/lib/utils";

// Mock properties for recommendations
const recommendedProperties = [
  {
    id: "rec1",
    title: "Modern Apartment with AI-Selected Features",
    address: "Koramangala, Bangalore",
    price: 36000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1550,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
    matchScore: 98,
    matchReason: "Matches your preferences for a spacious apartment with modern amenities in Koramangala"
  },
  {
    id: "rec2",
    title: "Quiet Neighborhood Apartment",
    address: "HSR Layout, Bangalore",
    price: 28000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
    matchScore: 92,
    matchReason: "Perfect for your preference of a quiet neighborhood with good connectivity"
  },
  {
    id: "rec3",
    title: "Premium Sea-View Apartment",
    address: "Marine Drive, Chennai",
    price: 45000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
    matchScore: 89,
    matchReason: "Matches your interest in premium sea-view properties with spacious interiors"
  },
  {
    id: "rec4",
    title: "Budget-Friendly Studio Apartment",
    address: "Electronic City, Bangalore",
    price: 16000,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
    matchScore: 86,
    matchReason: "Aligns with your budget preferences while offering proximity to tech parks"
  },
  {
    id: "rec5",
    title: "Family Villa with Garden",
    address: "Banjara Hills, Hyderabad",
    price: 75000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3100,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
    matchScore: 83,
    matchReason: "Matches your long-term interest in premium family homes with outdoor space"
  }
];

const SmartRecommendations: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Number of cards to show at a time
  const cardsToShow = 3;
  
  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Set all items to be animated on initial load
      const initialAnimated = Array.from(
        { length: Math.min(cardsToShow, recommendedProperties.length) },
        (_, i) => i
      );
      setAnimatedItems(initialAnimated);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleNext = () => {
    if (currentIndex + cardsToShow < recommendedProperties.length) {
      setAnimatedItems([]); // Reset animations
      
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        
        // Set animations for the new visible cards
        const newAnimated = Array.from(
          { length: Math.min(cardsToShow, recommendedProperties.length - (currentIndex + 1)) },
          (_, i) => i
        );
        setAnimatedItems(newAnimated);
      }, 50);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimatedItems([]); // Reset animations
      
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        
        // Set animations for the new visible cards
        const newAnimated = Array.from(
          { length: Math.min(cardsToShow, recommendedProperties.length - (currentIndex - 1)) },
          (_, i) => i
        );
        setAnimatedItems(newAnimated);
      }, 50);
    }
  };
  
  const visibleProperties = recommendedProperties.slice(
    currentIndex,
    currentIndex + cardsToShow
  );

  return (
    <div className="bg-secondary/30 rounded-xl p-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">AI-Powered Recommendations</h2>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex + cardsToShow >= recommendedProperties.length}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Based on your browsing history and preferences, our AI has selected these properties just for you.
      </p>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-secondary animate-pulse rounded-xl h-80"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProperties.map((property, index) => (
            <div
              key={property.id}
              className={cn(
                "transition-all duration-500",
                animatedItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <PropertyCard {...property} />
                <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                  {property.matchScore}% Match
                </div>
                <div className="mt-2 text-sm text-muted-foreground bg-white p-3 rounded-lg border border-border">
                  <strong className="text-primary">AI Insight:</strong> {property.matchReason}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
