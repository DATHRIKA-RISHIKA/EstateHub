
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-semibold mb-6 inline-block">
              <span className="text-primary">Smart</span>Rent-AI
            </Link>
            <p className="text-muted-foreground mb-6 text-sm">
              Discover your perfect rental home with SmartRent-AI - India's premium AI-driven real estate 
              rental platform connecting property owners and tenants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-medium text-lg mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?city=bangalore" className="text-muted-foreground hover:text-primary transition-colors">
                  Bangalore
                </Link>
              </li>
              <li>
                <Link to="/properties?city=chennai" className="text-muted-foreground hover:text-primary transition-colors">
                  Chennai
                </Link>
              </li>
              <li>
                <Link to="/properties?city=hyderabad" className="text-muted-foreground hover:text-primary transition-colors">
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link to="/properties?city=mumbai" className="text-muted-foreground hover:text-primary transition-colors">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link to="/properties?city=delhi" className="text-muted-foreground hover:text-primary transition-colors">
                  Delhi NCR
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Saveetha University<br />Chennai, Tamil Nadu
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="tel:+918639754549" className="text-muted-foreground hover:text-primary transition-colors">
                  863 975 4549
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="mailto:sngarre@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  sngarre@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} SmartRent-AI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
