
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="terminal-card p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-terminal-text-secondary mb-6">Oops! Page not found</p>
        <p className="mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          Return to Terminal
        </a>
      </div>
    </div>
  );
};

export default NotFound;
