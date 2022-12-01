import { useState, useEffect } from "react";

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
    window && "location" in window && setLocation(window.location);
  }, []);

  if (location) {
    return location;
  }
}
