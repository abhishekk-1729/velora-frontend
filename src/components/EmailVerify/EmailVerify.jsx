import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useLocation } from 'react-router-dom';

const EmailVerify = () => {
  const location = useLocation();
  const {email_pass} = location.state || {}; // Destructure with fallback
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Function to handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/auth/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "email":email_pass, "otp":otp }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in local storage
      alert("Login successful!"); // Handle successful login
      navigate("/enterDetails", {state:{email_pass:email_pass}}); // Redirect to the main page
    } catch (err) {
    }
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
            <div class="login_main_heading text-center flex flex-col gap-4 ">
              <h1 class="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
              Check your email for a code
              </h1>
              <div class="login_main_content_magic text-white ">
              We've sent a 6-character code to {email_pass}. The code expires shortly, so please enter it soon.
              </div>


            </div>
            

            {/* <!-- Login Content --> */}
            <div class="login_main_content flex flex-col gap-6 w-full md:px-32">
              {/* <!-- Login Content - Others --> */}


              <div class="login_main_content_phoneoremail flex flex-col gap-4">
       
                <div className="hero_cta_content flex flex-col">
                  {/* Email/Phone Signup */}
                  <div className="hero_cta_email_signup flex flex-col gap-4 ">
                    <div className="hero_cta_email_input ">
                      <input
                        type={"email"} // Change input type based on mode
                        placeholder={
                          "Enter Code"
                        } // Change placeholder
                        value={otp} // Bind the input value to state
                        onChange={(e) => setOtp(e.target.value)} // Update state on input change
                        className="w-full p-4 border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <button
                      onClick={handleOtpSubmit} // Call the function on button click
                      className="hero_cta_signup_content  w-full p-4 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                          Continue
                        </h4>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div class="login_main_content_magic ">
                <button className="underline text-blue-500">
              Request New Code </button> <span> in 5:00 </span> s
              </div>

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

export default EmailVerify;
