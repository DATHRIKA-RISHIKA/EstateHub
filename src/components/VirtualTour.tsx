
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VirtualTourProps {
  propertyId: string;
  className?: string;
}

// Mock data for a virtual tour
const mockTourImages = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    roomName: "Living Room",
    description: "Spacious living area with natural light",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    roomName: "Kitchen",
    description: "Modern kitchen with premium appliances",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    roomName: "Master Bedroom",
    description: "Comfortable bedroom with attached bathroom",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    roomName: "Bathroom",
    description: "Modern bathroom with shower and bathtub",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    roomName: "Balcony",
    description: "Stunning view from the private balcony",
  },
];

const VirtualTour: React.FC<VirtualTourProps> = ({ propertyId, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tourData, setTourData] = useState<typeof mockTourImages>([]);
  
  // In a real app, fetch tour data based on propertyId
  useEffect(() => {
    const loadTourData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTourData(mockTourImages);
        setIsLoading(false);
      }, 1000);
    };
    
    loadTourData();
  }, [propertyId]);
  
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tourData.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === tourData.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const currentImage = tourData[currentImageIndex];
  
  if (isLoading) {
    return (
      <div className={cn("rounded-lg overflow-hidden bg-secondary animate-pulse", className)}>
        <div className="h-[400px]"></div>
      </div>
    );
  }
  
  if (tourData.length === 0) {
    return (
      <div className={cn("rounded-lg overflow-hidden border border-border bg-background flex items-center justify-center h-[400px]", className)}>
        <div className="text-center p-4">
          <h3 className="text-lg font-medium mb-2">Virtual Tour Not Available</h3>
          <p className="text-muted-foreground">This property doesn't have a virtual tour yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "rounded-lg overflow-hidden border border-border bg-background",
      isFullscreen ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "",
      className
    )}>
      <div className={cn(
        "relative w-full", 
        isFullscreen ? "h-screen" : "h-[400px]"
      )}>
        <img 
          src={currentImage.imageUrl}
          alt={currentImage.roomName}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-medium">{currentImage.roomName}</h3>
          <p className="text-sm opacity-90">{currentImage.description}</p>
        </div>
        
        <button
          className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
          onClick={toggleFullscreen}
        >
          <Maximize2 className="h-5 w-5" />
        </button>
        
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
          onClick={goToPrevious}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
          onClick={goToNext}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {tourData.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full",
                index === currentImageIndex ? "bg-white" : "bg-white/40"
              )}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
