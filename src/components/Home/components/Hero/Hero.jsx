import React, { useState } from "react";
import "./Hero.css";
import greater_than from "./greater_than.png";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import endpoints from "../../../../configs/apiConfigs"; // Adjust path as necessary
import EnterPhone from "../../../EnterPhone/EnterPhone";

const Hero = () => {
  const [textState, setTextState] = useState(0);
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes
  const [email, setEmail] = useState(""); // State for Email input
  const [phone, setPhone] = useState(""); // State for Phone input
  const [countryData, setCountryData] = useState({phone_code:"+1"}); // State to store validation errors

  // List of international dialing codes

  const handleConnectRequest = async () => {
    // If validation passes, reset error and proceed with request
    setTextState(1);

    const apiEndpoint = isEmailMode
      ? endpoints.alertEmail
      : endpoints.alertMessage;

    const body = isEmailMode
      ? { email }
      : { phone: countryData.phone_code + phone };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTextState(2);
    } catch (error) {
      setTextState(2);
    }
  };

  return (
    <div className="hero_section">
      {/* Hero Content */}
      <div className="lg:mx-16 pt-44 lg:pt-32 mb-16 px-4 lg:pb-4 flex flex-col gap-4 lg:gap-20">
        {/* Hero Heading */}
        <div className="hero_heading flex flex-col gap-2 lg:gap-6">
          <div className="hero_main_heading">
            <h1 className="text-[57.6px] lg:text-[96px] font-bold leading-[80px] text-[#F0F6FC]">
              Let's Innovate Together
            </h1>
          </div>
          <div className="hero_sub_heading">
            <h2 className="text-[24px] font-normal leading-[32px] text-[#9198A1]">
              Empowering New Ventures with Exceptional Website Solutions
            </h2>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="hero_cta flex flex-col gap-2">
          <div className="hero_cta_email_text flex gap-4">
            <button
              onClick={() => setIsEmailMode(true)}
              className={`text-[14px] font-semibold leading-[21px] ${
                isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
              }`}
            >
              Email Address
            </button>
            /
            <button
              onClick={() => setIsEmailMode(false)}
              className={`text-[14px] font-semibold leading-[21px] ${
                !isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
              }`}
            >
              Phone Number
            </button>
          </div>
          <div className="hero_cta_content flex flex-col lg:flex-row gap-2 ">
            {/* Email/Phone Signup */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConnectRequest();
              }}
            >
              <div className="hero_cta_email_signup flex flex-col lg:flex-row gap-2 lg:gap-0">
                <div className="hero_cta_email_input flex items-center">
                  {isEmailMode ? (
                    <input
                      type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                      placeholder={
                        isEmailMode ? "you@company.com" : "123-456-7890"
                      } // Change placeholder
                      value={isEmailMode ? email : phone}
                      onChange={(e) => {
                        setTextState(0);
                        isEmailMode
                          ? setEmail(e.target.value)
                          : setPhone(e.target.value);
                      }} //
                      className="w-full p-3 pr-16 border border-gray-400 rounded-md lg:rounded-l-md lg:rounded-r-none focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      required
                      pattern={
                        isEmailMode
                          ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                          : "[0-9]{5,11}"
                      }
                    />
                  ) : (
                    <>
                      <div className="flex">
                        <div className="py-3 px-2 border border-gray-400 rounded-md rounded-l-md border-r-none rounded-r-none focus:outline-none focus:border-blue-500 text-gray-900 flex bg-[#ffffff] border-r-0 text-gray">
                          <div className="card flex justify-content-center"></div>
                          <EnterPhone setCountryData={setCountryData} />
                        </div>
                        <input
                          type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                          placeholder={
                            isEmailMode ? "you@company.com" : "123-456-7890"
                          } // Change placeholder
                          value={isEmailMode ? email : phone}
                          onChange={(e) => {
                            setTextState(0);
                            isEmailMode
                              ? setEmail(e.target.value)
                              : setPhone(e.target.value);
                          }} //
                          className="w-full p-3 pr-16 lg:pr-8 border border-gray-400 border-r-2 lg:border-r-0 border-l-0 rounded-md  rounded-l-none lg:rounded-r-none text-gray-900 placeholder-gray-500 focus:outline-none"
                          required
                          pattern="[0-9]{5,11}"
                        />
                      </div>
                    </>
                  )}
                </div>
                {/*  focus:border-blue-500  */}
                <button
                  type="submit"
                  className="hero_cta_signup_content py-3 rounded-lg bg-[#783ec7] flex justify-center  items-center lg:rounded-r-md lg:rounded-l-none hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                >
                  <div className="flex justify-center px-8">
                    <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                      {textState == 0 ? (
                        "Get you website"
                      ) : textState == 1 ? (
                        <ThreeDots
                          visible={true}
                          height="24"
                          width="24"
                          color="#ffffff"
                          radius="4"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass="lg:px-12"
                        />
                      ) : (
                        "We'll reach out to you!"
                      )}
                    </h4>
                  </div>
                </button>
              </div>
            </form>
            {/* Contact Sales Button */}
            <div className="hero_cta_contact_sales px-6 py-3 border rounded-lg border-[#bc8cff] bg-[#0d1116] hover:border-white flex justify-center">
              <Link
                to="/contact"
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

        {/* Hero Quality */}
        <div className="hero_quality flex flex-col gap-8 mt-8 lg:mt-0">
          <div className="hero_quality_heading">
            <h3 className="text-[20px] font-normal leading-[28px] text-[#9198A1]">
              Trusted by Businesses for Unmatched Delivery, Design and
              Performance ↘︎
            </h3>
          </div>
          <div className="text-[#] text-[22px] font-normal leading-[32px] text-[#9198A1] hero_quality_examples grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <h2 className="">Fast Delivery</h2>

            <h2 className=" ">Precise Design</h2>
            <h2 className=" ">Great Performance</h2>
            <h2 className=" ">Custom Code</h2>
            <h2 className="">Top-Notch Service</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
