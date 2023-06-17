import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(uri, setContext = () => {}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;

    const fetchData = async () => {
      try {
        let dataLoaded;

        const response = await axios.get(uri, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response?.data.taskList) {
          dataLoaded = response?.data;
          dataLoaded.taskList.sort(
            (a, b) => new Date(a.update_at) - new Date(b.update_at)
          );
        }

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
