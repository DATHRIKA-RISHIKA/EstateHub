
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyInsights from "@/components/PropertyInsights";
import VirtualTour from "@/components/VirtualTour";
import UserReviews from "@/components/UserReviews";
import FavoriteButton from "@/components/FavoriteButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import AIChatbot from "@/components/AIChatbot";
import { 
  MapPin, 
  Calendar, 
  Bed, 
  Bath, 
  Maximize, 
  Share2, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Brain,
  Video
} from "lucide-react";

const propertyData = {
  id: "1",
  title: "Modern Apartment with Sea View",
  description: "This stunning modern apartment offers breathtaking sea views from its spacious balcony. Located in the heart of Indiranagar, one of Bangalore's most vibrant neighborhoods, this property combines luxury living with convenience. The apartment features high-end finishes throughout, including hardwood floors, granite countertops, and stainless steel appliances. Enjoy the open floor plan with large windows that fill the space with natural light. The property includes access to premium amenities such as a fitness center, swimming pool, and 24/7 security.",
  address: "Sea View Apartments, 12th Main Road, Indiranagar, Bangalore, Karnataka 560038",
  price: 35000,
  securityDeposit: 70000,
  bedrooms: 3,
  bathrooms: 2,
  area: 1450,
  availableFrom: "2023-09-15",
  preferredTenant: "Family or Working Professionals",
  amenities: [
    "Air Conditioning",
    "Balcony",
    "Gym",
    "Swimming Pool",
    "24/7 Security",
    "Power Backup",
    "Parking",
    "Elevator",
    "WiFi",
    "Furnished"
  ],
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1617104678098-de229db51175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  ],
  ownerName: "Priya Sharma",
  ownerImage: "https://randomuser.me/api/portraits/women/65.jpg",
  ownerContact: "+91 98765 43210",
  ownerEmail: "priya.sharma@example.com",
  postedDate: "2023-08-01"
};

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState<any>(null);
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setProperty(propertyData);
        setIsLoading(false);
      }, 800);
    };

    fetchData();

    // Check if property is in favorites
    const savedProperties = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
    setIsFavorite(savedProperties.includes(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setAnimatedSections((prev) => [...prev, sectionId]);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [id]);

  const toggleFavorite = () => {
    const savedProperties = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
    
    let updatedProperties;
    if (isFavorite) {
      updatedProperties = savedProperties.filter((propId: string) => propId !== id);
    } else {
      updatedProperties = [...savedProperties, id];
    }
    
    localStorage.setItem("favoriteProperties", JSON.stringify(updatedProperties));
    setIsFavorite(!isFavorite);
  };

  const handleContactOwner = () => {
    console.log("Contact owner clicked");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const differenceInTime = today.getTime() - postedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return 'Yesterday';
    return `${differenceInDays} days ago`;
  };

  const toggleAIInsights = () => {
    setShowAIInsights(prev => !prev);
  };
  
  const toggleVirtualTour = () => {
    setShowVirtualTour(prev => !prev);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property?.title || "Check out this property",
          text: `Check out this property: ${property?.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
            <div className="rounded-lg bg-muted h-[400px] w-full"></div>
            <div className="h-10 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Property Not Found</h2>
            <p className="text-muted-foreground mt-2">The property you're looking for doesn't exist or has been removed.</p>
            <Button variant="primary" size="md" className="mt-6">
              <a href="/properties">Browse Properties</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section 
            id="gallery" 
            className={`transition-all duration-700 ${
              animatedSections.includes('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <PropertyGallery images={property.images} />
          </section>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section 
                id="header" 
                className={`transition-all duration-700 delay-100 ${
                  animatedSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-semibold">{property.title}</h1>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <FavoriteButton 
                      propertyId={property.id} 
                      initialState={isFavorite}
                      withLabel
                    />
                  </div>
                </div>
              </section>

              <section 
                id="details" 
                className={`transition-all duration-700 delay-200 ${
                  animatedSections.includes('details') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Bed className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-medium">{property.bedrooms}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Bath className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-medium">{property.bathrooms}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Maximize className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="text-lg font-medium">{property.area} sq.ft</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Available From</p>
                    <p className="text-lg font-medium">{formatDate(property.availableFrom).split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  className={`transition-all duration-700 delay-250 ${
                    animatedSections.includes('details') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <Button
                    variant={showAIInsights ? "primary" : "outline"}
                    className="w-full flex items-center justify-center"
                    onClick={toggleAIInsights}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    {showAIInsights ? "Hide AI Insights" : "Show AI Insights"}
                  </Button>
                </div>
                
                <div 
                  className={`transition-all duration-700 delay-250 ${
                    animatedSections.includes('details') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <Button
                    variant={showVirtualTour ? "primary" : "outline"}
                    className="w-full flex items-center justify-center"
                    onClick={toggleVirtualTour}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    {showVirtualTour ? "Hide Virtual Tour" : "View Virtual Tour"}
                  </Button>
                </div>
              </div>

              {showAIInsights && (
                <section
                  id="ai-insights"
                  className={`transition-all duration-700 delay-300 ${
                    animatedSections.includes('details') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <PropertyInsights propertyId={property.id} />
                </section>
              )}
              
              {showVirtualTour && (
                <section
                  id="virtual-tour"
                  className={`transition-all duration-700 delay-300 ${
                    animatedSections.includes('details') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <VirtualTour propertyId={property.id} />
                </section>
              )}

              <section 
                id="description"
                className={`transition-all duration-700 delay-300 ${
                  animatedSections.includes('description') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">About this property</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{property.description}</p>
                </div>
              </section>

              <section 
                id="amenities"
                className={`transition-all duration-700 delay-400 ${
                  animatedSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {property.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              <section 
                id="reviews"
                className={`transition-all duration-700 delay-500 ${
                  animatedSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <UserReviews propertyId={property.id} showAddReview={true} />
              </section>
            </div>

            <div className="space-y-4">
              <div 
                className={`bg-white border border-border rounded-lg shadow-sm p-6 transition-all duration-700 delay-200 ${
                  animatedSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-primary">₹{property.price.toLocaleString()}</h3>
                  <p className="text-muted-foreground text-sm">per month</p>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Security Deposit</span>
                    <span className="font-medium">₹{property.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Preferred Tenant</span>
                    <span className="font-medium">{property.preferredTenant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Available From</span>
                    <span className="font-medium">{formatDate(property.availableFrom)}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button variant="primary" className="w-full">
                    Schedule a Visit
                  </Button>
                  <Button variant="outline" className="w-full mt-3">
                    Apply for Rent
                  </Button>
                </div>
                <div className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Posted {calculateDaysAgo(property.postedDate)}</span>
                </div>
              </div>

              <div 
                className={`bg-white border border-border rounded-lg shadow-sm p-6 transition-all duration-700 delay-300 ${
                  animatedSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                    <img src={property.ownerImage} alt={property.ownerName} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{property.ownerName}</p>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {property.ownerContact}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {property.ownerEmail}
                  </Button>
                </div>
                <Button variant="primary" className="w-full" onClick={handleContactOwner}>
                  Contact Now
                </Button>
              </div>

              <div 
                className={`bg-white border border-border rounded-lg shadow-sm p-6 transition-all duration-700 delay-400 ${
                  animatedSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Have Questions?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Our AI assistant can answer questions about this property, neighborhood, and rental process.
                </p>
                <Button variant="primary" className="w-full flex items-center justify-center" onClick={() => {
                  document.querySelector('button[aria-label="Open AI assistant"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AIChatbot />
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
