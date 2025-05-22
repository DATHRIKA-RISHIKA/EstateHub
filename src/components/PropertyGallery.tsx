
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrevious();
    }
    setTouchStart(null);
  };

  const toggleFullscreen = () => {
    setFullscreenMode(!fullscreenMode);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative rounded-xl overflow-hidden">
        <div 
          className="aspect-[16/9] bg-secondary"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={images[currentImageIndex]} 
            alt={`Property view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: `translateX(0%)` }}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          aria-label="View fullscreen"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 snap-x">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden snap-start transition-all",
              currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
            )}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenMode && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <span className="text-white">
              {currentImageIndex + 1} / {images.length}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleFullscreen}
              className="text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img 
                src={images[currentImageIndex]} 
                alt={`Property view ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
