
import React from 'react';
import { cn } from '@/lib/utils';
import { Server, Box, Home, Settings, GitHub, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={cn("bg-jenkins-dark text-white shadow-md", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Server className="h-8 w-8 text-docker-light" />
            <span className="font-bold text-xl">CI/CD Visualizer</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-white hover:bg-jenkins-light px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-5 w-5 mr-1" />
              Dashboard
            </Button>
            <Button variant="ghost" className="text-white hover:bg-jenkins-light px-3 py-2 rounded-md text-sm font-medium">
              <Box className="h-5 w-5 mr-1" />
              Containers
            </Button>
            <Button variant="ghost" className="text-white hover:bg-jenkins-light px-3 py-2 rounded-md text-sm font-medium">
              <GitHub className="h-5 w-5 mr-1" />
              Source
            </Button>
            <Button variant="ghost" className="text-white hover:bg-jenkins-light px-3 py-2 rounded-md text-sm font-medium">
              <Settings className="h-5 w-5 mr-1" />
              Configuration
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-jenkins-light p-2" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-jenkins-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="flex items-center text-white hover:bg-jenkins-dark px-3 py-2 rounded-md text-base font-medium">
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </a>
            <a href="#" className="flex items-center text-white hover:bg-jenkins-dark px-3 py-2 rounded-md text-base font-medium">
              <Box className="h-5 w-5 mr-2" />
              Containers
            </a>
            <a href="#" className="flex items-center text-white hover:bg-jenkins-dark px-3 py-2 rounded-md text-base font-medium">
              <GitHub className="h-5 w-5 mr-2" />
              Source
            </a>
            <a href="#" className="flex items-center text-white hover:bg-jenkins-dark px-3 py-2 rounded-md text-base font-medium">
              <Settings className="h-5 w-5 mr-2" />
              Configuration
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
