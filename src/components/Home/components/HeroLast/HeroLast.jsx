import React, { useState } from "react";
import "./HeroLast.css";
import greater_than from "./greater_than.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const [emailOrPhone, setEmailOrPhone] = useState(""); // State to store email or phone input
  const [responseMessage, setResponseMessage] = useState(""); // State to store the response message
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes

  const handleConnectRequest = async () => {
    if (!emailOrPhone) {
      alert("Please enter a valid Email or Phone Number."); // Alert for empty input
      return;
    }

    const apiEndpoint = isEmailMode 
      ? "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/alert/sendEmail" 
      : "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/alert/sendMessage"; // Replace with your phone API endpoint

    const body = isEmailMode 
      ? {"email" : emailOrPhone}
      : {"phone" : emailOrPhone, "message": "Hi bro"}
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Sending input in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Request sent successfully!"); // Update response message
      alert("Request sent successfully!"); // Alert on success
    } catch (error) {
      setResponseMessage("Failed to send request. Please try again."); // Handle error
      alert("Failed to send request. Please try again."); // Alert on failure
    }
  };

  const toggleMode = () => {
    setIsEmailMode(!isEmailMode); // Toggle between Email and Phone mode
  };

  return (
    <div className="hero ">
      {/* Hero Content */}
      <div className="mx-8 sm:mx-16 mt-16 mb-16 p-4 flex flex-col gap-16">
        {/* Hero Heading */}
        <div className="hero_heading flex flex-col gap-4">
          <div className="hero_main_heading">
            <h1 className="sm:text-[85px] text-[57.6px]  font-semibold leading-[80px] text-[#F0F6FC]">
            Join the growing Velora community
            </h1>
          </div>
          <div className="hero_sub_heading lg:pr-64">
            <h2 className="text-[24px] font-normal leading-[32px] text-[#9198A1]">
            Whether launching a startup or enhancing your online presence, Velora empowers businesses to thrive. Join us to create innovative websites that drive success.            </h2>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="hero_cta flex flex-col gap-2">
          <div className="hero_cta_email_text flex gap-4">
            <button 
              onClick={() => setIsEmailMode(true)} 
              className={`text-[14px] font-semibold leading-[21px] ${isEmailMode ? 'text-[#bc8cff]' : 'text-[#F0F6FC]'}`}>
              Email Address
            </button>/
            <button 
              onClick={() => setIsEmailMode(false)} 
              className={`text-[14px] font-semibold leading-[21px] ${!isEmailMode ? 'text-[#bc8cff]' : 'text-[#F0F6FC]'}`}>
              Phone Number
            </button>
          </div>
          
          <div className="hero_cta_content flex flex-col lg:flex-row gap-2 pr-8">
            {/* Email/Phone Signup */}
            <div className="hero_cta_email_signup flex flex-col lg:flex-row gap-2 lg:gap-0">
              <div className="hero_cta_email_input flex items-center">
                <input
                  type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                  placeholder={isEmailMode ? "you@company.com" : "123-456-7890"} // Change placeholder
                  value={emailOrPhone} // Bind the input value to state
                  onChange={(e) => setEmailOrPhone(e.target.value)} // Update state on input change
                  className="w-full p-3 pr-16 border border-gray-400 rounded-md lg:rounded-l-md lg:rounded-r-none focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              <button
                onClick={handleConnectRequest} // Call the function on button click
                className="hero_cta_signup_content px-6 py-3 rounded-lg bg-[#783ec7] flex items-center lg:rounded-r-md lg:rounded-l-none hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
              >
                <div>
                  <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                  Request to Connect
                  </h4>
                </div>
              </button>
            </div>

            {/* Contact Sales Button */}
            <div className="hero_cta_contact_sales px-6 py-3 border rounded-lg border-[#bc8cff] bg-[#0d1116] hover:border-white">
              <Link
                to="/contact_us"
                className="hero_cta_contact_sales_content flex gap-2 items-center"
              >
                <div>
                  <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                    Reach Out to Us
                  </h4>
                </div>
                <div>
                  <img
                    src={greater_than}
                    alt="Greater than"
                    className="transition-all hero_cta_img"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
