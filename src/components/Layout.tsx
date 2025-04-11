
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-terminal-background">
      <header className="border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">AsgardFi</span>
            <span className="text-sm px-2 py-0.5 rounded bg-primary text-white">Terminal</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-terminal-text-secondary hover:text-white">Dashboard</a>
            <a href="#" className="text-terminal-text-secondary hover:text-white">Protocols</a>
            <a href="#" className="text-terminal-text-secondary hover:text-white">Markets</a>
            <a href="#" className="text-terminal-text-secondary hover:text-white">Analytics</a>
          </nav>
          
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-terminal-text-secondary">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
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
            
            <div className="flex space-x-6">
              <a href="#" className="text-terminal-text-secondary hover:text-white">Terms</a>
              <a href="#" className="text-terminal-text-secondary hover:text-white">Privacy</a>
              <a href="#" className="text-terminal-text-secondary hover:text-white">Documentation</a>
              <a href="#" className="text-terminal-text-secondary hover:text-white">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
