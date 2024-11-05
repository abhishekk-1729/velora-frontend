import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import { callMsGraph } from "../../graph";
import "./Login.css";
import { ThreeDots } from "react-loader-spinner";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";


const Login = () => {
  const location = useLocation();
  const { isPricing } = location.state || {}; // Destructure with fallback
  const [emailOrPhone, setEmailOrPhone] = useState(""); // State to store email or phone input
  const [responseMessage, setResponseMessage] = useState(""); // State to store the response message
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [graphData, setGraphData] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const { storeTokenInLS, userLocation } = useAuth();

  const checkDatabase = async (email, name, location) => {
    try {
      const response = await fetch(endpoints.authLogin, {
        // Adjust the endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, location }),
      });

      const data = await response.json();

      if (data.success) {
        // If a token is returned, store it in local storage
        if (data.token) {
          storeTokenInLS(data.token); // Your function to store token
          if(isPricing){
            navigate("/pricing");
          }
          else{
          navigate("/dashboard"); // Navigate to home page}
        }
        }
      } else {
        // Handle any errors from the server response
        navigate("/signup/enterDetails", {
          state: { name_pass: name, email_pass: email },
        });
      }
    } catch (error) {
      // console.error('Error checking database:', error);
    }
  };
  const login = useGoogleLogin({
    onSuccess: (response) => {
      if (response && response.access_token) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            checkDatabase(res.data.email, res.data.name, userLocation);
          })
          .catch((err) => {});
      }
    },
  });

  const { instance, accounts } = useMsal();
  const microsoftlogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {});
  };

  const RequestProfileData = () => {
    if (sessionStorage && accounts && accounts.length > 0) {
      // Acquiring token silently
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          // Fetching data from MS Graph
          callMsGraph(response.accessToken).then((response) => {
            setGraphData(response); // Set the graph data
          });
        })
        .catch((error) => {});
    } else {
    }
  };

  // First useEffect to request data when accounts are available
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      // Call the request function when accounts are populated
      RequestProfileData();
    }
  }, [accounts]); // Trigger only when accounts are ready

  // Second useEffect to log graphData when it is set
  useEffect(() => {
    if (graphData) {
    }
  }, [graphData]); // Depend on graphData

  useEffect(() => {
    if (sessionStorage.getItem("msal.account.keys") && graphData) {
      const name1 = graphData.displayName;
      const email1 = graphData.mail;
      sessionStorage.clear();
      setGraphData(null);
      checkDatabase(email1, name1, "hi");
    }
  });

  const handleConnectRequest = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    const apiEndpoint = isEmailMode
      ? endpoints.loginEmail
      : "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/alert/sendMessage"; // Replace with your phone API endpoint

    const body = isEmailMode
      ? { email: emailOrPhone, location: userLocation }
      : { phone: emailOrPhone, message: "Hi bro" };
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Sending input in the request body
      });
      if (response.ok) {
        // navigate("/");
        navigate("/login/emailverify", { state: { email_pass: emailOrPhone } });
      }
      if (!response.ok) {
        setIsLoader(false);
        throw new Error("Network response was not ok");
      }
      // navigate("/login/emailverify", { state: { email_pass: email } });
      const data = await response.json();
      setResponseMessage(data.message || "Request sent successfully!"); // Update response message
    } catch (error) {
      setResponseMessage("Failed to send request. Please try again."); // Handle error
    }
  };

  // const toggleMode = () => {
  //   setIsEmailMode(!isEmailMode); // Toggle between Email and Phone mode
  // };

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  // const [isOtpSent, setIsOtpSent] = useState(false);
  // const [error, setError] = useState("");

  // Function to handle the email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      setError(err.message);
    }
  };

  // Function to handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/auth/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in local storage
      alert("Login successful!"); // Handle successful login
      //   if isPricing == True then just navigate to Pay
      navigate("/login/emailverify", { state: { isPricing: isPricing } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center items-center h-screen">
        <div className="login mx-4 lg:mx-16 flex flex-col gap-4 text-[#ffffff]  ">
          <div className="login_image flex justify-center p-2">
            <img
              src="company.png"
              alt="Company Logo"
              height={200}
              width={200}
            ></img>
          </div>

          <div className="login_main px-8 flex flex-col items-center gap-6">
            <div className="login_main_heading text-center">
              <h1 className="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
                Sign in to The First Web
              </h1>
            </div>

            {/* <!-- Login Content --> */}
            <div className="login_main_content flex flex-col gap-4 ">
              {/* <!-- Login Content - Others --> */}
              <div className="login_main_content_others flex flex-col gap-4 w-full">
                {/* <!-- Button 1 --> */}
                <button
                  onClick={login}
                  className="flex  gap-4 justify-center items-center py-2 border border-[#3d444d] rounded-2xl font-semibold leading-[16px] "
                >
                  <div>
                    <img src="/svg/google.svg" alt="" height={30} width={30} />
                  </div>
                  <div className="text-[#ffffff]">Sign in with Google</div>
                </button>
                <button
                  onClick={microsoftlogin}
                  className="flex  gap-4 justify-center items-center py-2 border border-[#3d444d] rounded-2xl font-semibold leading-[16px] "
                >
                  <div>
                    <img
                      src="/svg/microsoft.svg"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="text-[#ffffff]">Sign in with Microsoft</div>
                </button>
              </div>

              {/* <!-- Login Content - OR --> */}
              <div className="login_main_content_or flex items-center gap-4">
                <div className="border border-gray-300 w-full h-[1px]"></div>
                <div className="text-white">OR</div>
                <div className="border border-gray-300 w-full h-[1px]"></div>
              </div>

              <div className="login_main_content_phoneoremail flex flex-col gap-4">
                <div className="hero_cta_email_text flex gap-4">
                  <button
                    onClick={() => setIsEmailMode(true)}
                    className={`text-[14px] font-semibold leading-[21px] ${
                      isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Email Address
                  </button>{" "}
                  {/* / */}
                  {/* <button
                    onClick={() => setIsEmailMode(false)}
                    className={`text-[14px] font-semibold leading-[21px] ${
                      !isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Phone Number
                  </button> */}
                </div>

                <div className="hero_cta_content flex flex-col">
                  {/* Email/Phone Signup */}
                  <form onSubmit={(e) => handleConnectRequest(e)}>
                    <div className="hero_cta_email_signup flex flex-col gap-4">
                      <div className="hero_cta_email_input ">
                        <input
                          type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                          placeholder={
                            isEmailMode ? "you@company.com" : "123-456-7890"
                          } // Change placeholder
                          value={emailOrPhone} // Bind the input value to state
                          onChange={(e) => {
                            setIsLoader(false);
                            setEmailOrPhone(e.target.value);
                          }} // Update state on input change
                          className="bg-[#0D1116] w-full p-4  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-[#ffffff] placeholder-gray-500"
                          required
                          // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
                        />
                      </div>

                      <button
                        type="submit"
                        // Call the function on button click
                        className="hero_cta_signup_content  w-full p-4 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                      >
                        <div>
                          <h4 className="flex text-[16px] font-semibold leading-[16px] text-[#FFFFFF] justify-center">
                            {isLoader ? (
                              <ThreeDots
                                visible={true}
                                height="24"
                                width="24"
                                color="#ffffff"
                                radius="4"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              "Sign in with Email"
                            )}
                          </h4>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="login_main_content_magic text-white ">
                We'll send you a magic code over email for a password-free sign
                in.
              </div>

              <div className="login_main_content_signup text-white">
                New to The First Web? Click here to{" "}
                <button
                  className="text-blue-500"
                  onClick={() => {
                    navigate("/signup"), { state: { isPricing: isPricing } };
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
