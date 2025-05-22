
import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, MapPin, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SmartFilterProps {
  onSmartSearch: (query: string) => void;
}

type Suggestion = {
  id: string;
  text: string;
  type: "location" | "feature" | "query";
  icon: React.ReactNode;
};

// Mock suggestions for smart search
const mockSuggestions: Suggestion[] = [
  {
    id: "s1",
    text: "Large apartments near tech parks",
    type: "query",
    icon: <Zap className="h-4 w-4 text-primary" />
  },
  {
    id: "s2",
    text: "Pet-friendly homes with balcony",
    type: "feature",
    icon: <Sparkles className="h-4 w-4 text-amber-500" />
  },
  {
    id: "s3",
    text: "Indiranagar, Bangalore",
    type: "location",
    icon: <MapPin className="h-4 w-4 text-rose-500" />
  },
  {
    id: "s4",
    text: "Modern apartments with gym under 30k",
    type: "query",
    icon: <Zap className="h-4 w-4 text-primary" />
  },
  {
    id: "s5",
    text: "HSR Layout, Bangalore",
    type: "location",
    icon: <MapPin className="h-4 w-4 text-rose-500" />
  },
  {
    id: "s6",
    text: "Fully furnished with high-speed internet",
    type: "feature",
    icon: <Sparkles className="h-4 w-4 text-amber-500" />
  },
  {
    id: "s7",
    text: "Family-friendly 3BHK with school nearby",
    type: "query",
    icon: <Zap className="h-4 w-4 text-primary" />
  },
  {
    id: "s8",
    text: "Koramangala, Bangalore",
    type: "location",
    icon: <MapPin className="h-4 w-4 text-rose-500" />
  }
];

// Example NLP processing function (simplified mockup)
const processNaturalLanguageQuery = (query: string): string => {
  // In a real application, this would use NLP to extract parameters
  // Here we're just returning a static response for demonstration
  
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("bedroom") || lowercaseQuery.includes("bhk")) {
    return "Filtering for specific bedroom count...";
  }
  
  if (lowercaseQuery.includes("budget") || lowercaseQuery.includes("under") || 
      lowercaseQuery.includes("less than")) {
    return "Applying budget filter...";
  }
  
  if (lowercaseQuery.includes("near") || lowercaseQuery.includes("close to")) {
    return "Finding properties near specified location...";
  }
  
  if (lowercaseQuery.includes("pet") || lowercaseQuery.includes("dog") || 
      lowercaseQuery.includes("cat")) {
    return "Showing pet-friendly properties...";
  }
  
  if (lowercaseQuery.includes("furnished")) {
    return "Filtering for furnished properties...";
  }
  
  return "Processing your search...";
};

const SmartFilters: React.FC<SmartFilterProps> = ({ onSmartSearch }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [processingStatus, setProcessingStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Filter suggestions based on input
    if (query.trim()) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(mockSuggestions);
    }
  }, [query]);
  
  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setIsProcessing(true);
    setProcessingStatus(processNaturalLanguageQuery(searchQuery));
    
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 3);
      return updated;
    });
    
    // Simulate AI processing
    setTimeout(() => {
      onSmartSearch(searchQuery);
      setIsProcessing(false);
      setShowSuggestions(false);
    }, 1500);
  };
  
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };
  
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      setShowSuggestions(true);
    }
  };
  
  const handleClearInput = () => {
    setQuery("");
    inputRef.current?.focus();
  };
  
  return (
    <div className="relative mb-6">
      <div className="border border-primary/30 bg-primary/5 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-primary">AI-Powered Smart Search</h3>
        </div>
        
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="pl-10 pr-10 py-6 text-base rounded-lg border-border focus:border-primary"
              placeholder="Describe what you're looking for (e.g., 'modern 2bhk near metro under 25k')"
            />
            {query && (
              <button
                onClick={handleClearInput}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={`recent-${index}`}
                onClick={() => handleSearch(search)}
                className="text-xs bg-secondary px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
          
          <Button
            onClick={() => handleSearch()}
            disabled={isProcessing || !query.trim()}
            className="mt-3 w-full flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {processingStatus}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Search with AI
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && !isProcessing && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.length > 0 ? (
            <div className="p-2">
              <div className="mb-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                Smart Suggestions
              </div>
              {filteredSuggestions.map(suggestion => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-secondary rounded-md flex items-center space-x-2 transition-colors"
                >
                  {suggestion.icon}
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No suggestions found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartFilters;
