import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 bg-[#CC0000] text-white hover:bg-[#CC0000]/90 h-10 px-4 py-2 text-sm"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
