
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Building, Home, Users, Shield, Award, Map, Brain, Bot, ChartBar, Zap } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Matching",
    description: "Smart algorithms that understand your preferences and match you with ideal properties"
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Virtual Assistant",
    description: "24/7 AI assistant to answer queries and guide you through the rental process"
  },
  {
    icon: <ChartBar className="h-6 w-6" />,
    title: "Predictive Analytics",
    description: "Future-proof your decisions with AI-driven price and trend predictions"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Smart Search",
    description: "Natural language search that understands exactly what you're looking for"
  }
];

const team = [
  { 
    name: "Alex Rodriguez", 
    role: "Founder & CEO", 
    avatar: "https://i.pravatar.cc/150?img=60",
    initials: "AR" 
  },
  { 
    name: "Sophia Chen", 
    role: "COO", 
    avatar: "https://i.pravatar.cc/150?img=29",
    initials: "SC" 
  },
  { 
    name: "Marcus Johnson", 
    role: "CTO", 
    avatar: "https://i.pravatar.cc/150?img=65",
    initials: "MJ" 
  },
  { 
    name: "Priya Patel", 
    role: "Head of Marketing", 
    avatar: "https://i.pravatar.cc/150?img=33",
    initials: "PP" 
  }
];

const About = () => {
  return (
    <div className="pt-28 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">About SmartRent-AI</h1>
          <p className="text-xl text-muted-foreground">
            SmartRent-AI Driven Online House Rental Platform
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Our AI-Powered Mission</h2>
            <p className="text-lg">
              At SmartRent-AI, we've built the first truly intelligent rental platform that 
              revolutionizes how people find homes. Our AI-Driven Online House Rental Platform 
              leverages cutting-edge artificial intelligence to understand preferences, predict 
              market trends, and create personalized rental experiences that traditional 
              platforms simply cannot match.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link to="/properties">
                  <Home className="mr-2 h-5 w-5" />
                  Experience AI-Powered Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How Our AI Works For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI Technology</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">Natural Language Processing</h3>
                <p className="text-muted-foreground">
                  Our advanced NLP models understand your search queries just like a human would,
                  capturing nuance and context to deliver more relevant results than traditional 
                  keyword-based searches.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">Computer Vision</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes property photos to detect features, assess quality, and verify 
                  listings, ensuring you only see accurate and high-quality rental options.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">Recommendation Engine</h3>
                <p className="text-muted-foreground">
                  The more you use SmartRent-AI, the smarter it gets. Our recommendation engine 
                  learns your preferences to show properties that perfectly match your lifestyle.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">Predictive Analytics</h3>
                <p className="text-muted-foreground">
                  Make informed decisions with our AI-powered price predictions, trend analysis,
                  and neighborhood insights based on vast amounts of historical data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI & Data Science Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-6 shadow-sm border text-center"
              >
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Experience AI-Powered Rental Search</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied users who have found their ideal homes through our AI-powered platform
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/properties">
                <Building className="mr-2 h-5 w-5" />
                Try AI Search
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                <Award className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
