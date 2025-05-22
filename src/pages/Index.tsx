
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import SearchFilters from "@/components/SearchFilters";
import Footer from "@/components/Footer";
import { Building, Users, Search, Award } from "lucide-react";
import Button from "@/components/Button";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Search Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Find Your Dream Rental</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use our advanced search filters to find properties that perfectly match your requirements
              </p>
            </div>
            <SearchFilters />
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 max-w-2xl mx-auto">
              India's Premium Rental Platform
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">15,000+</h3>
                <p className="text-muted-foreground">Properties Listed</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">12,500+</h3>
                <p className="text-muted-foreground">Happy Tenants</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">10</h3>
                <p className="text-muted-foreground">Major Cities</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">99%</h3>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Properties Section */}
        <FeaturedProperties />
        
        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 z-0"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Own a Property?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                List your property on EstateHub and connect with thousands of potential tenants looking for their next home.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary" size="lg">
                  List Your Property
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
