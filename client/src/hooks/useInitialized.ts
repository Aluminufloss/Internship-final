import { useState, useEffect } from "react";

import { Auth } from "@/Contexts/UserContext";

export function useInitialized() {
  const [isInitialized, setInitialized] = useState(false);
  const { getMe } = Auth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (getMe === undefined) {
      console.log("Undefined");
      setInitialized(false);
      return;
    }

    if (!token) {
      setInitialized(true);
      return;
    }

    (async () => {
      try {
        getMe();
        setInitialized(true); 
      } catch (err) {
        console.log("Yep error ------------------------------------")
        setInitialized(false); 
      }
    })();
  }, []);

  return isInitialized;
}
