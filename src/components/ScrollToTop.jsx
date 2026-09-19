import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scrolls the entire window to the top instantly on route change
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" for animated scrolling
    });
  }, [pathname]); // Reruns the effect whenever the pathname changes

  return null; // This component doesn't render anything
}