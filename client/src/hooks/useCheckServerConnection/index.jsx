import { useState, useEffect } from "react";

import axios from "axios";

function useCheckServerConnection() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const checkNetwork = setInterval(() => {
      axios
        .get("http://localhost:3001/api/echo")
        .then(() => !isOnline && setIsOnline(true))
        .catch(() => isOnline && setIsOnline(false));

      return () => clearInterval(checkNetwork);
    }, 5000);
  }, [isOnline]);

  return isOnline;
}

export default useCheckServerConnection;
