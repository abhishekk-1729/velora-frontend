import React, { useEffect, useState, createContext, useContext } from "react";
import endpoints from "../configs/apiConfigs";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [country, setCountry] = useState();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currencyChange, setCurrencyChange] = useState(1);
  const [navItems, setNavItems] = useState([
    "About",
    "Pricing",
    "Contact",
    "Refer And Earn",
    "Login",
  ]);
  const [currency, setCurrency] = useState("₹");
  const [coupon_code, setCouponCode] = useState("");

  // Update currency based on country

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Step 1: Get the user's location based on IP
        const ipResponse = await axios.get(
          "https://ipinfo.io?token=3cf3dd2719879c"
        ); // Replace with your tokenabhikriitd@
        const country = ipResponse.data.country;
        setCountry(country);
      } catch (err) {
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if(country === "IN"){
      setCurrency("₹");
      setCurrencyChange(80);
    }
    else{
      setCurrency("$");
      setCurrencyChange(1);

    }
  },[country]);

  const isLoggedIn = !!token;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    setCouponCode("");
    setNavItems(["About", "Pricing", "Contact", "Refer And Earn", "Login"]);
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(endpoints.verifyToken, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        setUser(res_data.userId);
        setNavItems([
          "About",
          "Pricing",
          "Contact",
          "Refer And Earn",
          "Dashboard",
          "Logout",
        ]);
      } else {
        LogoutUser();
      }
    } catch (error) {
      LogoutUser();
    } finally {
      setIsLoading(false);
    }
  };

  const getCouponCode = async () => {
    if (!isLoggedIn || !user) return;

    try {
      const response = await fetch(`${endpoints.getCouponsByUserId}${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        setCouponCode(res_data.coupons[0].coupon_code);
      }
    } catch (error) {
      console.error("Failed to fetch coupon code:", error);
    }
  };

  // Authentication on initial render
  useEffect(() => {
    userAuthentication();
  }, [token]); // Runs whenever token changes

  // Fetch coupon code when user state updates
  useEffect(() => {
    if (user) {
      getCouponCode();
    }
  }, [user]); // Runs whenever user changes
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        LogoutUser,
        storeTokenInLS,
        user,
        isLoading,
        token,
        country,
        setCountry,
        coupon_code,
        navItems,
        currency,
        currencyChange,
        
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
