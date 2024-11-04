import React, { useEffect, useState, createContext, useContext } from "react";
import endpoints from "../configs/apiConfigs";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [country, setCountry] = useState();
  const [service_id, setService_id] = useState("67103d0f6cbff897b5ce332e");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currencyChange, setCurrencyChange] = useState(1);
  const [currencyOriginal, setCurrencyOriginal] = useState("INR");
  const [navItems, setNavItems] = useState([
    "About",
    "Pricing",
    "Contact",
    "Refer And Earn",
    "Login",
  ]);
  const [currency, setCurrency] = useState("₹");
  const [coupon_code, setCouponCode] = useState("");
  const [exchange, setExchange] = useState(1);

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

    const convertUSDtoINR = async () => {
      const apiKey = '3942bd72b59141498e021df2a01a20b7'; // Replace with your actual API key
      const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
  
      try {
          const response = await fetch(url);
          const data = await response.json();
          const exchangeRate = data.rates.INR; // Get the exchange rate for INR
          setExchange(exchangeRate);
      } catch (error) {
      }
  };

  convertUSDtoINR();

  }, []);

  useEffect(() => {
    if(country === "IN"){
      setCurrency("₹");
      setCurrencyChange(exchange);
      setCurrencyOriginal("INR");
    }
    else{
      setCurrency("$");
      setCurrencyChange(1);
      setCurrencyOriginal("USD");
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    name: "India",
    image: "/svg/countries/in.svg",
    code: "IN",
    phone_code: "+91",
  });
  const getUserData = async () => {
    try {
      const response = await fetch(endpoints.getUserById, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        setName(res_data.user.name);
        setAddress(res_data.user.address);
        setEmail(res_data.user.email);
        setPhone(res_data.user.phone_number);
        setSelectedItem({
          name: "India",
          image: "/svg/countries/in.svg",
          code: "IN",
          phone_code: res_data.user.phone_code,
        });
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

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
        currencyOriginal,
        name, 
        email, 
        phone, 
        address, 
        selectedItem,
        service_id
        
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
