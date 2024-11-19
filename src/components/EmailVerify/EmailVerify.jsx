import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";


const EmailVerify = () => {
  const location = useLocation();
  const { email_pass } = location.state || {};
  const [otp, setOtp] = useState("");
  const [remainingTime, setRemainingTime] = useState(0); // Time in seconds
  const [timerExpired, setTimerExpired] = useState(false); // To show the "Request new code" button
  const [textState, setTextState] = useState(0);
  const navigate = useNavigate();
  const { storeTokenInLS, userLocation } = useAuth();

  // Fetch OTP validity and calculate the remaining time
  const fetchOtpValidity = async () => {
    try {
      const response = await fetch(endpoints.getOtpCreatedAt, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email_pass }), // Sending email in the request body
      });

      if (response.ok) {
        const data = await response.json();
        const currentTime = new Date().getTime();
        const otpCreatedAt = new Date(data.createdAt).getTime();
        const timeElapsed = Math.floor((currentTime - otpCreatedAt) / 1000); // Time in seconds

        const cooldownTime = 20; // Set cooldown time to 20 seconds
        const remainingCooldown = cooldownTime - timeElapsed; // Remaining time before new request can be made

        if (remainingCooldown > 0) {
          setRemainingTime(remainingCooldown); // Set the remaining time
          setTimerExpired(false); // Timer hasn't expired yet
        } else {
          setRemainingTime(0); // No cooldown left
          setTimerExpired(true); // Allow resending OTP
        }
      }
    } catch (error) {
      // console.error("Error fetching OTP validity:", error);
    }
  };

  // Run fetchOtpValidity on component mount
  useEffect(() => {
    if (email_pass) {
      fetchOtpValidity(); // Fetch OTP validity from the backend
    }
  }, [email_pass]);

  // Countdown timer logic
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on unmount
    } else {
      setTimerExpired(true); // If remaining time is 0, show "Request new code" button
    }
  }, [remainingTime]);

  // Function to handle OTP submission
  const handleOtpSubmit = async (e) => {
    setTextState(1);
    e.preventDefault();

    try {
      const response = await fetch(endpoints.verifyOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email_pass, otp: otp }),
      });

      if (!response.ok) {
        setTextState(2);
        throw new Error("Invalid OTP. Please try again.");
      }

      const data = await response.json();
      if (data.token) {
        storeTokenInLS(data.token);
        navigate("/dashboard");
      }
      else{
        // navigate to the addDetails page
        navigate("/signup/enterDetails",{state:{email_pass:email_pass}})
      }
    } catch (err) {
      setTextState(2);
      // console.error("OTP verification failed:", err);
    }
  };

  // Function to request a new OTP
  const requestNewOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.loginEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email_pass, location: userLocation}),
      });

      if (!response.ok) {
        throw new Error("Failed to request a new OTP.");
      }

      setRemainingTime(20); // Reset the cooldown period to 20 seconds
      setTimerExpired(false); // Reset the timer expired flag
    } catch (err) {
      // console.error("Failed to request new OTP:", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="login mx-4 lg:mx-16 flex flex-col gap-4 text-[#ffffff] mt-16 mb-24 md:p-8">
          <div className="login_image flex justify-center p-2">
            <img
              src="company.png"
              alt="Company Logo"
              height={200}
              width={200}
            />
          </div>

          <div className="login_main px-8 flex flex-col items-center gap-8">
            <div className="login_main_heading text-center flex flex-col gap-4">
              <h1 className="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
                Check your email for a code
              </h1>
              <div className="">
                <div className="login_main_content_magic text-white">
                  We've sent a 6-character code to {email_pass}. The code
                  expires shortly, so please enter it soon.
                </div>
              </div>
            </div>

            <div className="login_main_content flex flex-col gap-6 w-full md:px-32">
              <div className="login_main_content_phoneoremail flex flex-col gap-4">
                <div className="hero_cta_content flex flex-col">
                  <form onSubmit={handleOtpSubmit}>
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
                          required
                          maxLength={6}
                        />
                      </div>

                      <button
                        type="submit"
                        className="hero_cta_signup_content flex justify-center w-full p-4 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                      >
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                          {textState === 0 ? (
                            "Continue"
                          ) : textState === 1 ? (
                            <ThreeDots
                              visible={true}
                              height="24"
                              width="24"
                              color="#ffffff"
                              radius="4"
                              ariaLabel="three-dots-loading"
                            />
                          ) : (
                            "Enter the code again"
                          )}
                        </h4>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="login_main_content_magic">
                {timerExpired  ? (
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
