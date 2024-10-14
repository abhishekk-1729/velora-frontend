import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import endpoints from "../configs/apiConfigs";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;


  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (token) {
      try {
        const response = await fetch(endpoints.verifyToken, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const res_data = await response.json();
          console.log(res_data.userId);
          setUser(res_data.userId);
         
        } else {
          LogoutUser();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        LogoutUser,
        storeTokenInLS,
        user,
        authorizationToken,
        isLoading,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of provider");
  }
  return authContextValue;
};
