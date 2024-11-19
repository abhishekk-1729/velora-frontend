import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Dropdown } from "primereact/dropdown";
import "./EnterDetails.css";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";
import EnterPhone from "../EnterPhone/EnterPhone";

const EnterDetails = () => {
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes

  const location = useLocation();
  const { email_pass, name_pass } = location.state || {}; // Destructure with fallback
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(name_pass?name_pass:"");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [textState, setTextState] = useState(0);
  const { storeTokenInLS, userLocation } = useAuth();
  const [countryData, setCountryData] = useState({phone_code:"+1"}); // State to store validation errors

  const handleSubmit = async (e) => {
    setTextState(1);
    e.preventDefault();

    try {
      const response = await fetch(endpoints.addUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email_pass,
          name: name,
          address: address,
          phone_code: countryData.phone_code,
          phone_number: phone,
          location: userLocation,
        }),
      });

      if (!response.ok) {
        setTextState(2);
        throw new Error("Invalid OTP. Please try again.");
      }

      const data = await response.json();
      //   localStorage.setItem("token", data.token); // Store token in local storage
      // if not present in the database then don't navigate to signup just navigate to dashbaord or if pricing s aaya h then go to pricing
      // PRICING S AAYA H TO PAY P JAEGA AGAR EXIST KRTA H AND AGAR NI KRTA H TO ENTER DETIALS P JAEGA WHICH AGAIN WILL GO TO PRICING IF ISPRCIING
      //   navigate("/signup/enterDetails", {
      // state: { email_pass: email_pass, isPricing: false },
      //   }); // Redirect to the next page
      //   navigate("/dashboard");
      if (data.token) {
        storeTokenInLS(data.token);
        navigate("/dashboard");
      }

      setTextState(0);
    } catch (err) {
      setTextState(2);
    //   console.error("OTP verification failed:", err);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center">
        <div className="login mx-4 lg:mx-16 flex flex-col gap-4 text-[#ffffff] mt-16 mb-24 md:p-8 ">
          <div className="login_image flex justify-center p-2">
            <img
              src="company.png"
              alt="Company Logo"
              height={200}
              width={200}
            ></img>
          </div>

          <div className="login_main px-8 flex flex-col items-center gap-8">
            <div className="login_main_heading text-center">
              <h1 className="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
                Enter Details
              </h1>
            </div>

            {/* <!-- Login Content --> */}
            <div className="login_main_content flex flex-col gap-6 ">
              {/* <!-- Login Content - Others --> */}

              <div className="login_main_content_phoneoremail flex flex-col gap-4">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div
                    onClick={() => setIsEmailMode(true)}
                    className={`text-[14px] font-semibold leading-[21px] ${
                      isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Name
                  </div>{" "}
                  <div className="hero_cta_email_signup flex flex-col gap-4">
                    <input
                      type={"text"} // Change input type based on mode
                      placeholder="John Doe" // Change placeholder
                      value={name} // Bind the input value to state
                      onChange={(e) => setName(e.target.value)} // Update state on input change
                      className="w-full p-3  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      required
                      maxLength={100}
                    />
                    <div
                      onClick={() => setIsEmailMode(true)}
                      className={`text-[14px] font-semibold leading-[21px] ${
                        isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                      }`}
                    >
                      Phone Number
                    </div>{" "}
                    <div className="flex border border-[#3D444D] rounded-md  ">
                      <div className="py-3 px-2  rounded-md rounded-l-md  rounded-r-none focus:outline-none   flex   bg-[#ffffff]  ">
                        <div className="card flex justify-content-center bg-[#ffffff]">
                        <EnterPhone setCountryData={setCountryData} />
                        </div>
                      </div>
                      <input
                        type={"tel"} // Change input type based on mode
                        placeholder={"123-456-7890"} // Change placeholder
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }} //
                        className="w-full p-3 pr-16 lg:pr-8  rounded-md  rounded-l-none   placeholder-black focus:outline-none text-black    "
                        required
                        pattern={"[0-9]{5,11}"}
                        title="Please enter a valid phone number with 5 to 11 digits."
                      />
                    </div>{" "}
                    <div
                      onClick={() => setIsEmailMode(true)}
                      className={`text-[14px] font-semibold leading-[21px] ${
                        isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                      }`}
                    >
                      Address
                    </div>{" "}
                    <textarea
                    required
                      placeholder="Address" // Change placeholder
                      value={address} // Bind the input value to state
                      onChange={(e) => setAddress(e.target.value)} // Update state on input change
                      className="w-full p-3  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                    <button
                      type="submit" // Call the function on button click
                      className="hero_cta_signup_content  w-full p-3 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                          Login
                        </h4>
                      </div>
                    </button>
                  </div>
                </form>
              </div>

              <div className="login_main_content_magic text-white ">
                You'll be redirected to the home page after successful login
              </div>

              {/* <!-- Login Content - OR --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterDetails;
