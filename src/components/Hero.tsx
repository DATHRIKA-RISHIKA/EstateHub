
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Button from "./Button";

const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800"
          alt="Luxury home with pool"
          className="object-cover w-full h-full scale-105 animate-pulse-slow"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl">
            Find Your Perfect Rental Home
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Discover premium rental properties tailored to your lifestyle in top cities across India
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl w-full mx-auto mt-8 bg-white/10 backdrop-blur-lg p-1 rounded-full border border-white/20 shadow-lg">
            <div className="flex items-center">
              <div className="flex-1 flex items-center">
                <Search className="h-5 w-5 ml-4 text-white" />
                <input
                  type="text"
                  placeholder="Search by city, locality or landmark..."
                  className="w-full px-4 py-4 text-white bg-transparent focus:outline-none placeholder-white/70"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Location Links */}
        <div className={`flex items-center justify-center gap-3 mt-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-white/80">Popular:</span>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="ghost"
              className="bg-white/20 text-white hover:bg-white/30 rounded-full text-sm py-1"
            >
              Bangalore
            </Button>
            <Button
              variant="ghost"
              className="bg-white/20 text-white hover:bg-white/30 rounded-full text-sm py-1"
            >
              Chennai
            </Button>
            <Button
              variant="ghost"
              className="bg-white/20 text-white hover:bg-white/30 rounded-full text-sm py-1"
            >
              Hyderabad
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-1">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-[bounce_1.5s_infinite]" />
        </div>
        <span className="text-white/70 text-xs mt-2">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
