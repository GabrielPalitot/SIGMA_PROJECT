import { useEffect, useState } from "react";

export default function useLeaflet() {
  const [L, setL] = useState<unknown>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
      });
    }
  }, []);

  return L;
}
