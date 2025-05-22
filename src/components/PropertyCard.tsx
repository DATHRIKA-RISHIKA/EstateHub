
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Maximize, Bed, Bath, ArrowUpRight } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  premium?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  premium = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/property/${id}`}
      className={cn(
        "block bg-white rounded-xl overflow-hidden shadow-sm border border-border card-hover transition-all duration-300",
        premium && "ring-2 ring-primary/20",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 scale-100",
            isHovered && "scale-110",
            "image-fade-in",
            imageLoaded && "loaded"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {premium && (
          <div className="absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
            Premium
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <FavoriteButton propertyId={id} size="sm" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            ₹{price.toLocaleString()}/mo
          </span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="truncate">{address}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
          <div className="flex items-center border border-border rounded-md px-2 py-1.5">
            <Bed className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{bedrooms} Bed</span>
          </div>
          <div className="flex items-center border border-border rounded-md px-2 py-1.5">
            <Bath className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="flex items-center border border-border rounded-md px-2 py-1.5">
            <Maximize className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{area} sq.ft</span>
          </div>
        </div>
        
        <div className={cn(
          "mt-4 overflow-hidden transition-all duration-300 flex items-center text-primary text-sm font-medium",
          isHovered ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
        )}>
          View Property <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
