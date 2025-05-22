
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search, User, MapPin, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);
    };

    window.addEventListener("scroll", handleScroll);
    checkLoginStatus();

    // Check for login status changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight transition-colors"
        >
          <span className="text-primary">Estate</span>Hub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-4 py-2 text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/properties" className="px-4 py-2 text-sm hover:text-primary transition-colors">
            Rentals
          </Link>
          <Link to="/location" className="px-4 py-2 text-sm hover:text-primary transition-colors">
            Location
          </Link>
          <Link to="/about" className="px-4 py-2 text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="px-4 py-2 text-sm hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full aspect-square p-0 w-10 h-10"
            onClick={() => navigate("/properties")}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full aspect-square p-0 w-10 h-10"
            onClick={() => navigate("/location")}
          >
            <MapPin className="h-4 w-4" />
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/signin")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate("/signup")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-12">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/properties" className="text-lg font-medium hover:text-primary transition-colors">
                Rentals
              </Link>
              <Link to="/location" className="text-lg font-medium hover:text-primary transition-colors">
                Location
              </Link>
              <Link to="/about" className="text-lg font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                Contact
              </Link>
              
              <div className="pt-4 flex flex-col space-y-3">
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/signin")}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => navigate("/signup")}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
