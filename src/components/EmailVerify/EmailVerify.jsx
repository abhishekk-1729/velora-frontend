import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";

const EmailVerify = () => {
  const location = useLocation();
  const { email_pass } = location.state || {}; // Destructure with fallback
  const [otp, setOtp] = useState("");
  const [remainingTime, setRemainingTime] = useState(3); // Initial remaining time (5 minutes in seconds)
  const [timerExpired, setTimerExpired] = useState(false); // To manage state when timer expires
  const [textState, setTextState] = useState(0); // Text state for OTP submission button
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Function to handle OTP verification
  useEffect(() => {
    // Fetch OTP validity time from backend
    const fetchOtpValidity = async () => {
      try {
        const response = await fetch(
          `https://your-backend-api.com/api/v1/auth/getOtpValidity?email=${email_pass}`
        );
        const data = await response.json();
        const currentTime = new Date().getTime();
        const otpExpirationTime = new Date(data.otp_validity_date).getTime();
        const timeDifference = Math.floor((otpExpirationTime - currentTime) / 1000); // Difference in seconds
        setRemainingTime(timeDifference > 0 ? timeDifference : 0);
      } catch (error) {
        console.error("Error fetching OTP validity:", error);
      }
    };

    // Trigger fetch only if email_pass is provided
    if (email_pass) {
      fetchOtpValidity();
    }

    // Redirect based on the current URL if email_pass is not present
    if (!email_pass) {
      const currentPath = location.pathname;

      // Step 2: Remove the last segment of the URL path
      const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

      // Step 3: Navigate to the new path (one step back)
      navigate(newPath);    }
  }, [location, navigate, email_pass]);

  // Countdown timer logic
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on unmount
    } else {
      setTimerExpired(true); // Set when countdown is complete
    }
  }, [remainingTime]);

  // Function to handle OTP submission
  const handleOtpSubmit = async (e) => {
    setTextState(1);
    e.preventDefault();

    try {
      const response = await fetch(
        "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/auth/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email_pass, otp: otp }),
        }
      );

      if (!response.ok) {
        setTextState(2);
        throw new Error("Invalid OTP. Please try again.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in local storage
      alert("Login successful!"); // Handle successful login
// if not present in the database then don't navigate to signup just navigate to dashbaord or if pricing s aaya h then go to pricing
      // PRICING S AAYA H TO PAY P JAEGA AGAR EXIST KRTA H AND AGAR NI KRTA H TO ENTER DETIALS P JAEGA WHICH AGAIN WILL GO TO PRICING IF ISPRCIING
      navigate("/signup/enterDetails", { state: { email_pass: email_pass, isPricing:false} }); // Redirect to the next page
      setTextState(0);
    } catch (err) {
      setTextState(2);
      console.error("OTP verification failed:", err);
    }
  };

  // Function to request a new OTP
  const requestNewOtp = async () => {
    try {
      const response = await fetch(
        "https://your-backend-api.com/api/v1/auth/requestOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email_pass }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to request a new OTP.");
      }

      // toast.success("A new OTP has been sent to your email.");
      setRemainingTime(300); // Reset timer to 5 minutes
      setTimerExpired(false); // Reset the timer expired flag
    } catch (err) {
      console.error("Failed to request new OTP:", err);
      // toast.error("Failed to request a new OTP. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="login mx-8 sm:mx-16 flex flex-col gap-4 text-[#ffffff] mt-16 mb-24 md:p-8">
          <div className="login_image flex justify-center p-2">
            <img
              src="/company.png"
              alt="Company Logo"
              height={200}
              width={200}
            />
          </div>

          <div className="login_main px-8 flex flex-col items-center gap-8">

            <div className="login_main_heading text-center flex flex-col gap-4">
              <div className="">
              </div>
              <h1 className="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
                Check your email for a code
              </h1>
              <div className="">
              <div className="login_main_content_magic text-white">
                We've sent a 6-character code to {email_pass}. The code expires
                shortly, so please enter it soon.
              </div>
              </div>
            </div>

            <div className="login_main_content flex flex-col gap-6 w-full md:px-32">
              <div className="login_main_content_phoneoremail flex flex-col gap-4">
                <div className="hero_cta_content flex flex-col">
                  <div className="hero_cta_email_signup flex flex-col gap-4">
                    <div className="hero_cta_email_input">
                      <input
                        type="text"
                        placeholder="Enter Code"
                        value={otp}
                        onChange={(e) => {
                          setTextState(0);
                          setOtp(e.target.value);
                        }}
                        className="w-full p-4 border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <button
                      onClick={handleOtpSubmit}
                      className="hero_cta_signup_content flex justify-center w-full p-4 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                        {textState === 0
                          ? "Continue"
                          : textState === 1
                          ? (
                            <ThreeDots
                              visible={true}
                              height="24"
                              width="24"
                              color="#ffffff"
                              radius="4"
                              ariaLabel="three-dots-loading"
                            />
                          ) : "Enter the code again"}
                      </h4>
                    </button>
                  </div>
                </div>
              </div>

              <div className="login_main_content_magic">
                {timerExpired ? (
                  <button
                    onClick={requestNewOtp}
                    className="underline text-blue-500"
                  >
                    Request a new code
                  </button>
                ) : (
                  <span>
                    Request new code in {Math.floor(remainingTime / 60)}:
                    {String(remainingTime % 60).padStart(2, "0")} seconds
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
