import React, { useState } from "react";
import { Navigate, useNavigate ,useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const EnterDetails = () => {
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes

  const location = useLocation();
  const {email_pass} = location.state || {}; // Destructure with fallback

  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Function to handle the email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/auth/loginOrSignup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }

      setIsOtpSent(true); // Show OTP input field after successful request
    } catch (err) {
    }
    // navigate("/emailverify",{state:{email_pass:email}});

  };


  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center">
        <div class="login mx-8 sm:mx-16 flex flex-col gap-4 text-[#ffffff] mt-16 mb-24 md:p-8 ">
          <div class="login_image flex justify-center p-2">
            <img
              src="company.png"
              alt="Company Logo"
              height={200}
              width={200}
            ></img>
          </div>

          <div class="login_main px-8 flex flex-col items-center gap-8">
            <div class="login_main_heading text-center">
              <h1 class="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
                Enter Details
              </h1>
            </div>

            {/* <!-- Login Content --> */}
            <div class="login_main_content flex flex-col gap-6 ">
              {/* <!-- Login Content - Others --> */}


              <div class="login_main_content_phoneoremail flex flex-col gap-4">
                  <div
                    onClick={() => setIsEmailMode(true)}
                    className={`text-[14px] font-semibold leading-[21px] ${
                      isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Name
                  </div>{" "}

                <div className="hero_cta_content flex flex-col">
                 
                  <div className="hero_cta_email_signup flex flex-col gap-4">
                      <input
                        type={"text"} // Change input type based on mode
                        placeholder="John Doe" // Change placeholder
                        value={email} // Bind the input value to state
                        onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        className="w-full p-4  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />

                    <div
                    onClick={() => setIsEmailMode(true)}
                    className={`text-[14px] font-semibold leading-[21px] ${
                      isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Phone Number
                  </div>{" "}

                  <input
                        type={"text"} // Change input type based on mode
                        placeholder="John Doe" // Change placeholder
                        value={email} // Bind the input value to state
                        onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        className="w-full p-4  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    <div
                    onClick={() => setIsEmailMode(true)}
                    className={`text-[14px] font-semibold leading-[21px] ${
                      isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Address
                  </div>{" "}

                  <input
                        type={"text"} // Change input type based on mode
                        placeholder="John Doe" // Change placeholder
                        value={email} // Bind the input value to state
                        onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        className="w-full p-4  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />


                

                    <button
                      onClick={handleEmailSubmit} // Call the function on button click
                      className="hero_cta_signup_content  w-full p-4 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                          Login
                        </h4>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div class="login_main_content_magic text-white ">
                We'll send you a magic code over email for a password-free sigup
                in.
              </div>

              {/* <!-- Login Content - OR --> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center p-16 md:mx-16 text-[#ffffff] my-10">
      <div className="bg-[#151b23] shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit}>
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-md p-2 w-full mb-4 text-black"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <label htmlFor="otp" className="block text-white mb-2">
              Enter OTP:
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="border rounded-md p-2 w-full mb-4 text-black"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div> */}
    </>
  );
};

export default EnterDetails;
