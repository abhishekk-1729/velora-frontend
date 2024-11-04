import React, { useEffect, useState } from "react";
import cloud from "../../assets/images/logo/cloud.png";
import moon from "../../assets/images/logo/nightmode.png";
import company from "../../assets/Footer/company.png";
import axios from "axios";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";
import { useAuth } from "../../store/auth";
import SocialMedia from "../SocialMedia/SocialMedia";
// Function to format date in the required format
const formatDateTime = (date) => {
  const day = format(date, "d");
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");
  const hour = format(date, "h:mm aa");
  const weekday = format(date, "EEEE");

  // Get the appropriate suffix for the day
  const suffix =
    day === "1" || day === "21" || day === "31"
      ? "st"
      : day === "2" || day === "22"
      ? "nd"
      : day === "" || day === "23"
      ? "rd"
      : "th";

  return `${weekday} ${hour}, ${day}${suffix} ${month}, ${year}`;
};

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Footer = () => {
  const { setCountry, navItems } = useAuth();
  const quickLinks = {
    "About": "about",
    "Dashboard": "dashboard",
    "Contact us": "contact",
    "Pricing": "pricing",
    "Log In": "login",
    "Log out": "logout",
  };
  
  
  const quickLinks1 = navItems.map((item) => {
    return { name: item, id: quickLinks[item] };
  });
  
  
  const quickLinks2 = [
    {
      name: "Privacy Policy",
      id: "privacypolicy",
    },
    {
      name: "Terms and Conditions",
      id: "termsandconditions",
    },
    {
      name: "FAQs",
      id: "faqs",
    },
  ];

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Step 1: Get the user's location based on IP
        const ipResponse = await axios.get(
          "https://ipinfo.io?token=3cf3dd2719879c"
        ); // Replace with your tokenabhikriitd@
        const city = ipResponse.data.city;
        const country = ipResponse.data.country;
        setCountry(country);
        // e add
        // Step 2: Get weather data using the OpenWeatherMap API
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a1964ed700a53a98ef27460766bb040`
        ); // Replace with your API key
        const weather = weatherResponse.data;

        // Update state with weather data
        setWeatherData({
          city: ipResponse.data.city,
          weather: capitalizeWords(weather.weather[0].description),
          temp: weather.main.temp,
          humidity: weather.main.humidity,
          wind: weather.wind.speed,
          icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`, // Weather icon
        });
      } catch (err) {
        setError("Error fetching weather data");
        // console.error(err);
      }
    };

    fetchWeatherData();
  }, []);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      <div className="bg-[#0d1116] text-[#8a919a] flex flex-col lg:flex-row lg:gap-8 mx-4 lg:mx-16  ">
        <div className="flex-col py-4 lg:w-1/4">
          <div className="flex flex-col gap-2">
            <img
              src={company}
              alt=""
              className="h-3rem md:h-[120px] lg:h-4rem"
            />
            <div className=" ">HSR Layout, Bangalore, India - 560103</div>
            <div className=" ">Contact: +91 8868073773</div>
            <div className="">
              Email:{" "}
              <a href="mailto:support@thefirstweb.com">
                support@thefirstweb.com
              </a>
            </div>
          </div>
        </div>

        <div className="my-6 bg-[#8a919a] border-0 w-full h-[1px] lg:w-[1px] lg:h-auto"></div>

        <div className="flex lg:w-2/4 gap-2 ">
          <div className="flex flex-col   py-4 w-1/2 lg:px-8">
            <div className="mb-6 flex">
              <div className="border-b-2 pb-1 border-[#783ec7]">
                Quick links
              </div>
            </div>
            {quickLinks1.map((link, index) => (
              <div key={index}>
                <a href={link.id}>{link.name}</a>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700 w-full bg-white" />
              </div>
            ))}
          </div>

          <div className="flex flex-col  py-4 w-1/2 lg:px-8">
            <div className="mb-6 flex">
              <div className="border-b-2 pb-1 border-[#783ec7]">Docs</div>
            </div>
            {quickLinks2.map((link, index) => (
              <div key={index}>
                <a href={link.id}>{link.name}</a>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700 w-full bg-white" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col py-4  lg:w-1/4">
          <div className=" mb-6  flex">
            <div className="flex border-b-2 border-[#783ec7] pb-1">
              {/* <img src={cloud} alt="Weather" className="pr-2" /> */}
              <div>{weatherData ? weatherData.city : "Delhi"}</div>
            </div>
          </div>
          <div className="mb-2">{formatDateTime(new Date())}</div>
          <div className="mb-2 flex gap-2">
            <img
              src={weatherData ? weatherData.icon : cloud}
              height={60}
              width={60}
              alt=""
              className=""
            />

            <div className="flex flex-col">
              <div className=" font-bold">
                {weatherData ? weatherData.weather : "Clear Sky"}
              </div>
              <div className=" font-bold">
                Temp: {weatherData ? weatherData.temp : "temp"}°C
              </div>
            </div>
          </div>
          <div className="mb-2">
            Humidity: {weatherData ? weatherData.humidity : "hum"}% Wind:{" "}
            {weatherData ? weatherData.wind : "wind"} km/h
          </div>
        </div>
      </div>

      <div className="bg-[#151b23] text-[#8a919a] py-6 px-8 sm:px-16 flex flex-col md:flex-row justify-between gap-2">
        <div>&copy; 2024 The First Web.com. All rights reserved.</div>
        <SocialMedia/>
      </div>
    </>
  );
};

export default Footer;
