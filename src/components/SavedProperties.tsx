import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, AlertTriangle } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Button from "./Button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SavedPropertiesProps {
  className?: string;
}

// This would typically come from an API
const allProperties = [
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
  {
    id: "7",
    title: "Garden View Apartment",
    address: "Koramangala, Bangalore",
    price: 32000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1350,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
  {
    id: "8",
    title: "Minimalist Studio with Balcony",
    address: "HSR Layout, Bangalore",
    price: 20000,
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
  {
    id: "9",
    title: "Modern 3BHK with City View",
    address: "Gachibowli, Hyderabad",
    price: 45000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1700,
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
  },
  {
    id: "10",
    title: "Elegant Duplex Apartment",
    address: "Anna Nagar, Chennai",
    price: 50000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: true,
  },
  {
    id: "11",
    title: "Seaside Apartment",
    address: "ECR, Chennai",
    price: 38000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
  {
    id: "12",
    title: "Budget Friendly 1BHK",
    address: "Electronic City, Bangalore",
    price: 15000,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    premium: false,
  },
];

const SavedProperties: React.FC<SavedPropertiesProps> = ({ className }) => {
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load saved properties from localStorage
  useEffect(() => {
    const getSavedProperties = () => {
      setIsLoading(true);
      // Get saved property IDs from localStorage
      const savedIds = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
      setSavedPropertyIds(savedIds);
      setIsLoading(false);
    };

    getSavedProperties();
  }, []);

  // Filter all properties to only include saved ones
  const savedProperties = allProperties.filter(property => 
    savedPropertyIds.includes(property.id)
  );

  const removeProperty = (propertyId: string) => {
    // Update localStorage
    const updatedIds = savedPropertyIds.filter(id => id !== propertyId);
    localStorage.setItem("favoriteProperties", JSON.stringify(updatedIds));
    setSavedPropertyIds(updatedIds);

    toast({
      title: "Property removed",
      description: "The property has been removed from your favorites",
    });
  };

  const clearAllProperties = () => {
    localStorage.setItem("favoriteProperties", "[]");
    setSavedPropertyIds([]);

    toast({
      title: "All properties removed",
      description: "All properties have been removed from your favorites",
    });
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[300px] bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Saved Properties</h2>
        {savedProperties.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllProperties}
            className="text-sm"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map(property => (
            <div key={property.id} className="relative group">
              <PropertyCard {...property} />
              <button
                onClick={() => removeProperty(property.id)}
                className="absolute top-4 right-4 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No saved properties</h3>
          <p className="text-muted-foreground mb-6">
            You haven't saved any properties yet. Browse properties and click the heart icon to save them.
          </p>
          <Button variant="primary">
            <Link to="/properties">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedProperties;
