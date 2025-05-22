
import React, { useState } from "react";
import { Sliders, X, Check } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

const propertyTypes: FilterOption[] = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "House", value: "house" },
  { label: "PG", value: "pg" },
  { label: "Studio", value: "studio" },
];

const bhkOptions: FilterOption[] = [
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4+ BHK", value: "4+" },
];

const SearchFilters: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([5000, 50000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const togglePropertyType = (value: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleBHK = (value: string) => {
    setSelectedBHK((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setPriceRange([5000, 50000]);
    setSelectedPropertyTypes([]);
    setSelectedBHK([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
      <div className="p-4 flex justify-between items-center border-b border-border">
        <h3 className="text-lg font-medium">Filter Properties</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="text-xs h-8"
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden"
          >
            {isFilterOpen ? <X className="h-4 w-4" /> : <Sliders className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className={cn(
        "md:flex transition-all duration-300 overflow-hidden",
        isFilterOpen ? "max-h-[500px]" : "max-h-0 md:max-h-none"
      )}>
        <div className="p-4 border-b md:border-b-0 md:border-r border-border md:w-1/3">
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={handlePriceMinChange}
                className="w-full pl-7 pr-3 py-2 border border-input rounded-md text-sm"
                placeholder="Min"
              />
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={handlePriceMaxChange}
                className="w-full pl-7 pr-3 py-2 border border-input rounded-md text-sm"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="mt-3">
            <input 
              type="range" 
              min="5000" 
              max="100000" 
              step="1000"
              value={priceRange[0]}
              onChange={handlePriceMinChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="p-4 border-b md:border-b-0 md:border-r border-border md:w-1/3">
          <h4 className="font-medium mb-3">Property Type</h4>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => togglePropertyType(type.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-all",
                  selectedPropertyTypes.includes(type.value)
                    ? "bg-primary text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:w-1/3">
          <h4 className="font-medium mb-3">BHK</h4>
          <div className="flex flex-wrap gap-2">
            {bhkOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleBHK(option.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-all",
                  selectedBHK.includes(option.value)
                    ? "bg-primary text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-secondary/50 flex justify-end">
        <Button variant="primary" size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
