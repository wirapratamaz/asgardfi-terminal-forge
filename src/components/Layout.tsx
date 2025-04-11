
import React, { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-terminal-background">
      <header className="border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">AsgardFi</span>
            <span className="text-sm px-2 py-0.5 rounded bg-primary text-white">Terminal</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-terminal-text-secondary hover:text-white">Dashboard</Link>
            <Link to="/" className="text-terminal-text-secondary hover:text-white">Protocols</Link>
            <Link to="/" className="text-terminal-text-secondary hover:text-white">Markets</Link>
            <Link to="/" className="text-terminal-text-secondary hover:text-white">Analytics</Link>
          </nav>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-terminal-text-secondary"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 z-50 bg-terminal-background border-b border-gray-800 animate-fade-in">
            <div className="p-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-terminal-text-secondary hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/" 
                className="text-terminal-text-secondary hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Protocols
              </Link>
              <Link 
                to="/" 
                className="text-terminal-text-secondary hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Markets
              </Link>
              <Link 
                to="/" 
                className="text-terminal-text-secondary hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </Link>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-terminal-text-secondary">© 2025 AsgardFi. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/" className="text-terminal-text-secondary hover:text-white">Terms</Link>
              <Link to="/" className="text-terminal-text-secondary hover:text-white">Privacy</Link>
              <Link to="/" className="text-terminal-text-secondary hover:text-white">Documentation</Link>
              <Link to="/" className="text-terminal-text-secondary hover:text-white">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
