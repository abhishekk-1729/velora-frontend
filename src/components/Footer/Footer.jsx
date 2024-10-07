import React, { useEffect, useState } from "react";
import cloud from "../../assets/images/logo/cloud.png";
import moon from "../../assets/images/logo/nightmode.png";
import nss from "/company.png";
import axios from 'axios';
import { format, formatDistanceToNow, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Function to format date in the required format
const formatDateTime = (date) => {
  const day = format(date, 'd');
  const month = format(date, 'MMMM');
  const year = format(date, 'yyyy');
  const hour = format(date, 'h:mm aa');
  const weekday = format(date, 'EEEE');

  // Get the appropriate suffix for the day
  const suffix = day === '1' || day === '21' || day === '31' ? 'st' :
                 day === '2' || day === '22' ? 'nd' :
                 day === '3' || day === '23' ? 'rd' : 'th';

  return `${weekday} ${hour}, ${day}${suffix} ${month}, ${year}`;
};

const capitalizeWords = (str) => {
  return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
};

const Footer = () => {
  const quickLinks1 = [
    { name: "About", id: "about" },
    { name: "Pricing", id: "pricing" },
    { name: "Log in/Sign up", id: "login" },
    // { name: "Dashboard", id: "dashboard" },
    // { name: "Contact us", id: "contact" },
  ];

  const quickLinks2 = ["Privacy Policy", "Terms and Conditions", "FAQs"];

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Step 1: Get the user's location based on IP
        const ipResponse = await axios.get('https://ipinfo.io?token=3cf3dd2719879c'); // Replace with your token
        const city = ipResponse.data.city;
        console.log(city)
// e add
        // Step 2: Get weather data using the OpenWeatherMap API
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a1964ed700a53a98ef27460766bb040e`); // Replace with your API key
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
        setError('Error fetching weather data');
        console.error(err);
      }
    };

    fetchWeatherData();
  }, []);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      <div className="bg-[#0d1116] text-[#8a919a] flex flex-col md:flex-row md:gap-16 mx-8 sm:mx-16 ">
        <div className="flex-col py-4 md:w-1/4">
          <div className="flex flex-col gap-2">
            <img src={nss} alt="" className="h-[60px] pr-8" />
            <div className=" ">HSR Layout, Bangalore, India - 560103</div>
            <div className=" ">Contact: +91 8755273773</div>
            <div className="">
              Email:{" "}
              <a href="mailto:abhikriitd@gmail.com">abhikriitd@gmail.com</a>
            </div>
          </div>
        </div>

        <div class="my-6 bg-[#8a919a] border-0 w-full h-[1px] lg:w-[1px] lg:h-auto"></div>

        <div className="flex md:w-2/4 ">
          <div className="flex flex-col items-start  py-4 w-1/2 md:px-8">
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

          <div className="flex flex-col items-start  py-4 w-1/2 md:px-8">
            <div className="mb-6 flex">
              <div className="border-b-2 pb-1 border-[#783ec7]">Docs</div>
            </div>
            {quickLinks2.map((link, index) => (
              <div key={index}>
                <a href="" target="_blank">
                  {link}
                </a>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700 w-full bg-white" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col py-4  md:w-1/4">
          <div className=" mb-6  flex">
            <div className="flex border-b-2 border-[#783ec7] pb-1">
            <img src={cloud} alt="Weather" className="pr-2" />
              <div>{weatherData?weatherData.city:"Delhi"}</div>
            </div>
          </div>
          <div className="mb-2">{formatDateTime(new Date())}</div>
          <div className="mb-2 flex gap-2">
            
            <img src={weatherData?weatherData.icon:cloud} height={60} width={60} alt="" className="" />
   
            <div className="flex flex-col">
              <div className=" font-bold">{weatherData?weatherData.weather:"Clear Sky"}</div>
              <div className=" font-bold">Temp: {weatherData?weatherData.temp:"temp"}°C</div>
            </div>
          </div>
          <div className="mb-2">Humidity: {weatherData?weatherData.humidity:"hum"}% Wind: {weatherData?weatherData.wind:"wind"} km/h</div>
        </div>
      </div>
      <div className="bg-[#151b23] text-[#8a919a] py-6 px-8 sm:px-16 flex flex-col md:flex-row justify-between gap-2">
        <div>&copy; 2024 Velora.com. All rights reserved.</div>
        <div className="flex gap-4 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#118C7E]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* <!-- Facebook --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#1A77F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>

          {/* <!-- LinkedIn --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#0277b5]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>

          {/* <!-- YouTube --> */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#FF0000]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          {/* <!-- Twitter --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#1EA1F1]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
          {/* <!-- Instagram --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#C13684]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Footer;
