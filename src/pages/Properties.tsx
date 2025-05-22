import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import SmartFilters from "@/components/SmartFilters";
import SmartRecommendations from "@/components/SmartRecommendations";
import AIChatbot from "@/components/AIChatbot";
import VoiceSearch from "@/components/VoiceSearch";
import SavedProperties from "@/components/SavedProperties"; 
import { 
  MapPin, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutList,
  BookmarkPlus,
  BookmarkMinus
} from "lucide-react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for properties
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

// Cities for filter
const cities = ["Bangalore", "Chennai", "Hyderabad", "All Cities"];

// Property types for filter
const propertyTypes = ["Apartment", "Villa", "House", "Studio", "Penthouse", "All Types"];

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    city: "All Cities",
    propertyType: "All Types",
    minPrice: 0,
    maxPrice: 100000,
    bedrooms: 0,
  });
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSavedProperties, setShowSavedProperties] = useState(false);
  
  const { toast } = useToast();

  // Pagination settings
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  
  // Get current properties based on pagination
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Initial animation logic
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialAnimated = Array.from(
        { length: currentProperties.length },
        (_, i) => i
      );
      setAnimatedItems(initialAnimated);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentProperties.length]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProperties]);

  const applyFilters = () => {
    let filtered = [...allProperties];

    // Apply city filter
    if (filters.city !== "All Cities") {
      filtered = filtered.filter((property) =>
        property.address.includes(filters.city)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (property) =>
        property.price >= filters.minPrice && property.price <= filters.maxPrice
    );

    // Apply bedrooms filter
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= filters.bedrooms
      );
    }

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query)
      );
    }

    setFilteredProperties(filtered);
  };

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery]);

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const resetFilters = () => {
    setFilters({
      city: "All Cities",
      propertyType: "All Types",
      minPrice: 0,
      maxPrice: 100000,
      bedrooms: 0,
    });
    setSearchQuery("");
  };

  const handleSmartSearch = (query: string) => {
    setSearchQuery(query);
    
    // Here we would normally parse the natural language query using AI
    // For demo purposes, we'll just do some simple keyword matching
    
    // Reset other filters first
    setFilters({
      city: "All Cities",
      propertyType: "All Types",
      minPrice: 0,
      maxPrice: 100000,
      bedrooms: 0,
    });
    
    const lowercaseQuery = query.toLowerCase();
    
    // Apply city filter if query mentions a city
    if (lowercaseQuery.includes("bangalore")) {
      setFilters(prev => ({ ...prev, city: "Bangalore" }));
    } else if (lowercaseQuery.includes("chennai")) {
      setFilters(prev => ({ ...prev, city: "Chennai" }));
    } else if (lowercaseQuery.includes("hyderabad")) {
      setFilters(prev => ({ ...prev, city: "Hyderabad" }));
    }
    
    // Apply bedroom filter if query mentions bedrooms
    if (lowercaseQuery.includes("1bhk") || lowercaseQuery.includes("1 bhk") || 
        lowercaseQuery.includes("1 bedroom")) {
      setFilters(prev => ({ ...prev, bedrooms: 1 }));
    } else if (lowercaseQuery.includes("2bhk") || lowercaseQuery.includes("2 bhk") || 
               lowercaseQuery.includes("2 bedroom")) {
      setFilters(prev => ({ ...prev, bedrooms: 2 }));
    } else if (lowercaseQuery.includes("3bhk") || lowercaseQuery.includes("3 bhk") || 
               lowercaseQuery.includes("3 bedroom")) {
      setFilters(prev => ({ ...prev, bedrooms: 3 }));
    }
    
    // Apply budget filter if query mentions budget
    if (lowercaseQuery.includes("under 20k") || lowercaseQuery.includes("less than 20000")) {
      setFilters(prev => ({ ...prev, maxPrice: 20000 }));
    } else if (lowercaseQuery.includes("under 30k") || lowercaseQuery.includes("less than 30000")) {
      setFilters(prev => ({ ...prev, maxPrice: 30000 }));
    } else if (lowercaseQuery.includes("under 40k") || lowercaseQuery.includes("less than 40000")) {
      setFilters(prev => ({ ...prev, maxPrice: 40000 }));
    }
    
    // If query mentions "luxury", filter properties with higher prices
    if (lowercaseQuery.includes("luxury") || lowercaseQuery.includes("premium")) {
      setFilters(prev => ({ ...prev, minPrice: 40000 }));
    }
    
    toast({
      title: "AI Search Processing",
      description: "Our AI has analyzed your search and applied smart filters",
      duration: 3000,
    });
  };

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
    handleSmartSearch(text);
    
    toast({
      title: "Voice search processed",
      description: `Searching for: "${text}"`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Reset animation when changing pages
    setAnimatedItems([]);
    setTimeout(() => {
      const initialAnimated = Array.from(
        { length: itemsPerPage },
        (_, i) => i
      );
      setAnimatedItems(initialAnimated);
    }, 100);
    
    // Scroll to top of results
    window.scrollTo({
      top: document.getElementById('property-results')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  const toggleSavedProperties = () => {
    setShowSavedProperties(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Find Your Dream Rental</h1>
            <p className="text-muted-foreground">
              Browse through our extensive collection of premium rental properties
            </p>
          </div>
          
          {/* Smart AI Search */}
          <SmartFilters onSmartSearch={handleSmartSearch} />

          {/* Saved Properties Toggle */}
          <div className="mb-6">
            <Button
              variant={showSavedProperties ? "primary" : "outline"}
              onClick={toggleSavedProperties}
              className="flex items-center"
            >
              {showSavedProperties ? (
                <>
                  <BookmarkMinus className="h-4 w-4 mr-2" />
                  Hide Saved Properties
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Show Saved Properties
                </>
              )}
            </Button>
          </div>

          {/* Saved Properties (conditional) */}
          {showSavedProperties && (
            <div className="mb-8">
              <SavedProperties />
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-border p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="w-full md:w-1/2 relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by location, property name..."
                    className="w-full py-2 pl-10 pr-4 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="absolute right-2 top-1.5">
                  <VoiceSearch onSearchResult={handleVoiceSearchResult} />
                </div>
              </form>

              {/* Filter Toggle and View Mode */}
              <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="border rounded-lg flex overflow-hidden">
                  <button
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/80"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/80"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {isFilterVisible && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">
                      City
                    </label>
                    <select
                      className="w-full p-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      value={filters.city}
                      onChange={(e) => handleFilterChange("city", e.target.value)}
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">
                      Property Type
                    </label>
                    <select
                      className="w-full p-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      value={filters.propertyType}
                      onChange={(e) =>
                        handleFilterChange("propertyType", e.target.value)
                      }
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">
                      Price Range (₹)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full p-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        value={filters.minPrice}
                        onChange={(e) =>
                          handleFilterChange(
                            "minPrice",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full p-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          handleFilterChange(
                            "maxPrice",
                            parseInt(e.target.value) || 100000
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Bedrooms Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">
                      Bedrooms
                    </label>
                    <select
                      className="w-full p-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      value={filters.bedrooms}
                      onChange={(e) =>
                        handleFilterChange("bedrooms", parseInt(e.target.value))
                      }
                    >
                      <option value={0}>Any</option>
                      <option value={1}>1+</option>
                      <option value={2}>2+</option>
                      <option value={3}>3+</option>
                      <option value={4}>4+</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* AI Recommendations */}
          {showRecommendations && !showSavedProperties && (
            <SmartRecommendations />
          )}

          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center" id="property-results">
            <p className="text-muted-foreground">
              {filteredProperties.length} properties found
              {filteredProperties.length > 0 && (
                <span className="ml-1">
                  (showing {indexOfFirstProperty + 1}-
                  {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length})
                </span>
              )}
            </p>
            <div>
              <select
                className="p-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                onChange={(e) => {
                  // Sorting logic would go here
                  // For now, just a placeholder
                }}
                defaultValue="recent"
              >
                <option value="recent">Recently Added</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Properties Grid/List */}
          {filteredProperties.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={cn(
                    "transition-all duration-500",
                    animatedItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={cn(
                    "transition-all duration-500 bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md",
                    animatedItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      {property.premium && (
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-lg mb-2">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-4">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{property.address}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{property.bedrooms}</span>
                            <span className="ml-1">Bed</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{property.bathrooms}</span>
                            <span className="ml-1">Bath</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{property.area}</span>
                            <span className="ml-1">sq.ft</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-semibold text-primary">
                          ₹{property.price.toLocaleString()}/mo
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            window.location.href = `/property/${property.id}`;
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProperties.length > 0 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    
                    // Show limited page numbers for better UX
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    
                    // Add ellipsis for skipped pages
                    if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={`ellipsis-${pageNumber}`}>
                          <span className="flex h-9 w-9 items-center justify-center">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }
                    
                    return null;
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>

      {/* AI Chatbot */}
      <AIChatbot />

      <Footer />
    </div>
  );
};

export default Properties;
