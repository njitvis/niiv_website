import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-11 sm:h-11 bg-[#CC0000] text-white rounded-full shadow-md hover:shadow-xl hover:scale-110 active:scale-95 
        transition-all duration-300 flex items-center justify-center z-50 group
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`}
      aria-label="Back to top"
    >
      <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
     <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
    Back to top
  </span>
  </div>
  );
};

export default BackToTop;
