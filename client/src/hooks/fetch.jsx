import { useState, useEffect } from "react";
import axios from "axios";

function useAxiosGet(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        setData(response?.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    data,
  };
}

export default useAxiosGet;
