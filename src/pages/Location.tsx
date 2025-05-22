
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ChevronDown } from "lucide-react";

const cities = [
  { 
    name: "Bangalore", 
    description: "The Silicon Valley of India with vibrant tech ecosystem",
    neighborhoods: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "JP Nagar"]
  },
  { 
    name: "Chennai", 
    description: "Cultural capital with beautiful beaches and rich history",
    neighborhoods: ["T. Nagar", "Adyar", "Anna Nagar", "Velachery", "Porur", "Mylapore"]
  },
  { 
    name: "Hyderabad", 
    description: "The City of Pearls with growing tech infrastructure",
    neighborhoods: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City", "Madhapur", "Secunderabad"]
  },
];

const Location = () => {
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [expandedNeighborhoods, setExpandedNeighborhoods] = useState<string[]>([]);

  const toggleNeighborhood = (city: string) => {
    if (expandedNeighborhoods.includes(city)) {
      setExpandedNeighborhoods(expandedNeighborhoods.filter(c => c !== city));
    } else {
      setExpandedNeighborhoods([...expandedNeighborhoods, city]);
    }
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Find Properties by Location</h1>
            <p className="text-lg text-muted-foreground">
              Discover your perfect rental property in premier locations across India
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search for a city or neighborhood..."
              className="pl-10 py-6 text-lg"
            />
          </div>

          <div className="space-y-6">
            {cities.map((city) => (
              <div key={city.name} className="border rounded-lg overflow-hidden shadow-sm">
                <div 
                  className={`p-6 cursor-pointer flex justify-between items-center ${selectedCity === city.name ? 'bg-primary/5' : 'bg-card'}`}
                  onClick={() => setSelectedCity(city.name)}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-xl">{city.name}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNeighborhood(city.name);
                    }}
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform ${expandedNeighborhoods.includes(city.name) ? 'rotate-180' : ''}`} />
                  </Button>
                </div>

                {selectedCity === city.name && (
                  <div className="p-6 border-t">
                    <p className="mb-4">{city.description}</p>
                    <Button variant="outline" className="w-full">
                      Explore Properties in {city.name}
                    </Button>
                  </div>
                )}

                {expandedNeighborhoods.includes(city.name) && (
                  <div className="p-6 bg-muted/50 border-t">
                    <h4 className="font-medium mb-3">Popular Neighborhoods</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {city.neighborhoods.map((neighborhood) => (
                        <Button 
                          key={neighborhood} 
                          variant="ghost" 
                          className="justify-start h-auto py-2"
                        >
                          {neighborhood}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
