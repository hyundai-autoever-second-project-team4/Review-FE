import { useState, useEffect } from "react";

function useDetectMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  return isMobile;
}

export default useDetectMobile;
