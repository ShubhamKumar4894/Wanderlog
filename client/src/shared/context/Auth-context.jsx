import { load } from "ol/Image";
import { set } from "ol/transform";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  loadingState: false,
  login: () => {},
  logout: () => {},
  switchModeHandler: () => {},
});
let timer;
export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loadingState,setLoadingState] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const login = useCallback((uid, token,expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expiration||new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      timer=setTimeout(logout, remainingTime);
    }else{
      clearTimeout(timer);
    }
  },[token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    } else {
      setLoadingState(true); // No user data = no need to wait
    }
  }, [login]);
  
  // Separate effect to mark as loaded when token & userId are both ready
  useEffect(() => {
    if (token && userId) {
      setLoadingState(true);
    }
  }, [token, userId]);
  
  const contextValue = {
    isLoggedIn: !!token,
    token: token,
    login: login,
    logout: logout,
    userId: userId,
    loadingState
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
