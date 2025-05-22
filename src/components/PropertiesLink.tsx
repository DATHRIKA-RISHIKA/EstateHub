
import React from "react";
import { Link } from "react-router-dom";
import { Building } from "lucide-react";

const PropertiesLink: React.FC = () => {
  return (
    <Link 
      to="/properties" 
      className="flex items-center text-foreground hover:text-primary transition-colors px-3 py-2"
    >
      <Building className="h-4 w-4 mr-1.5" />
      <span>Properties</span>
    </Link>
  );
};

export default PropertiesLink;
