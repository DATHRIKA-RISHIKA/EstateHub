
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  initialState?: boolean;
  withLabel?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  propertyId,
  size = "md",
  className,
  initialState = false,
  withLabel = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialState);
  const { toast } = useToast();

  // Check if property is saved in local storage
  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
    setIsFavorite(savedProperties.includes(propertyId));
  }, [propertyId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Get current favorites from localStorage
    const savedProperties = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
    
    // Toggle favorite status
    let updatedProperties;
    if (isFavorite) {
      updatedProperties = savedProperties.filter((id: string) => id !== propertyId);
      toast({
        title: "Property removed",
        description: "Property removed from your favorites",
      });
    } else {
      updatedProperties = [...savedProperties, propertyId];
      toast({
        title: "Property saved",
        description: "Property added to your favorites",
      });
    }
    
    // Save updated list back to localStorage
    localStorage.setItem("favoriteProperties", JSON.stringify(updatedProperties));
    setIsFavorite(!isFavorite);
  };

  const sizeClasses = {
    sm: "p-1 rounded-full",
    md: "p-1.5 rounded-full",
    lg: "p-2 rounded-full"
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <button
      onClick={toggleFavorite}
      className={cn(
        "bg-white/90 backdrop-blur-sm hover:bg-white transition-all flex items-center",
        sizeClasses[size],
        withLabel && "px-3",
        className
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          "transition-colors",
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
        )} 
      />
      {withLabel && (
        <span className="ml-1.5 text-sm font-medium">
          {isFavorite ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
