import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(uri, setContext = () => {}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(uri, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        setContext(response?.data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [uri, setContext]);

  return {
    loading,
    error,
  };
}

export default useFetch;
