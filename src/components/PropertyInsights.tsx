
import React from "react";
import { TrendingUp, UserCheck, Shield, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyInsightsProps {
  propertyId: string;
  className?: string;
}

// Mock data for property insights
const mockInsights = {
  priceTrend: {
    status: "rising", // rising, stable, falling
    percentage: 4.2,
    description: "Property prices in this area have increased by 4.2% in the last 3 months"
  },
  neighborhood: {
    safety: 8.5,
    amenities: 9.2,
    transport: 7.8,
    description: "Highly rated for safety and amenities, with good transport connectivity"
  },
  demand: {
    level: "high", // high, medium, low
    viewsLastWeek: 72,
    similarProperties: 5,
    description: "High demand area with limited available properties"
  },
  prediction: {
    valueChange: 6.5,
    timeFrame: "12 months",
    confidence: "medium", // high, medium, low
    description: "Our AI predicts a 6.5% increase in value over the next year"
  }
};

const PropertyInsights: React.FC<PropertyInsightsProps> = ({
  propertyId,
  className
}) => {
  // In a real app, you would fetch insights based on propertyId
  // Here we're just using mock data
  const insights = mockInsights;
  
  return (
    <div className={cn("bg-white rounded-lg border border-border p-5", className)}>
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Property Insights</h3>
      </div>
      
      <div className="space-y-6">
        {/* Price Trend Insight */}
        <div className="flex items-start space-x-3">
          <div className={cn(
            "p-2 rounded-full",
            insights.priceTrend.status === "rising" ? "bg-green-100" :
            insights.priceTrend.status === "stable" ? "bg-amber-100" : "bg-red-100"
          )}>
            <TrendingUp className={cn(
              "h-5 w-5",
              insights.priceTrend.status === "rising" ? "text-green-600" :
              insights.priceTrend.status === "stable" ? "text-amber-600" : "text-red-600"
            )} />
          </div>
          <div>
            <h4 className="font-medium">Price Trend</h4>
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-sm font-medium",
                insights.priceTrend.status === "rising" ? "text-green-600" :
                insights.priceTrend.status === "stable" ? "text-amber-600" : "text-red-600"
              )}>
                {insights.priceTrend.status === "rising" ? "↑" : 
                 insights.priceTrend.status === "stable" ? "→" : "↓"}
                {" "}
                {insights.priceTrend.percentage}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {insights.priceTrend.description}
            </p>
          </div>
        </div>
        
        {/* Neighborhood Insight */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium">Neighborhood Rating</h4>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center">
                <span className="text-sm font-medium">Safety:</span>
                <span className="ml-1 text-sm">{insights.neighborhood.safety}/10</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">Amenities:</span>
                <span className="ml-1 text-sm">{insights.neighborhood.amenities}/10</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">Transport:</span>
                <span className="ml-1 text-sm">{insights.neighborhood.transport}/10</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {insights.neighborhood.description}
            </p>
          </div>
        </div>
        
        {/* Market Demand Insight */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-100 rounded-full">
            <UserCheck className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium">Market Demand</h4>
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-sm font-medium px-2 py-0.5 rounded-full",
                insights.demand.level === "high" ? "bg-green-100 text-green-700" :
                insights.demand.level === "medium" ? "bg-amber-100 text-amber-700" : 
                "bg-red-100 text-red-700"
              )}>
                {insights.demand.level.charAt(0).toUpperCase() + insights.demand.level.slice(1)}
              </span>
              <span className="text-sm ml-2">
                {insights.demand.viewsLastWeek} views last week
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {insights.demand.description}
            </p>
          </div>
        </div>
        
        {/* Value Prediction Insight */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-100 rounded-full">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium">Value Prediction</h4>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium text-green-600">↑ {insights.prediction.valueChange}%</span>
              <span className="text-sm ml-1">in {insights.prediction.timeFrame}</span>
              <span className={cn(
                "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                insights.prediction.confidence === "high" ? "bg-green-100 text-green-700" :
                insights.prediction.confidence === "medium" ? "bg-amber-100 text-amber-700" : 
                "bg-red-100 text-red-700"
              )}>
                {insights.prediction.confidence} confidence
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {insights.prediction.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground text-center">
        Insights powered by SmartRent AI analysis of market data and property characteristics
      </div>
    </div>
  );
};

export default PropertyInsights;
