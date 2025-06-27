import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoadingState(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();
        activeHttpRequests.current=activeHttpRequests.current.filter(
          reqCtrl=>reqCtrl!==httpAbortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoadingState(false);
        return responseData;
      } catch (error) {
        if (error.name === "AbortError") {
          // don’t call setError or open the modal
          return;
        }
        setError(error.message);
        setIsLoadingState(false);
        throw error;
      }
    },[]);
  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoadingState, error, sendRequest, clearError };
};
