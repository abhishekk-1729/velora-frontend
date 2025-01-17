import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ThreeDots } from "react-loader-spinner";
import { Outlet } from "react-router-dom";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import { callMsGraph } from "../../graph";
import { useEffect } from "react";

const SignUp = () => {
  const [isEmailMode, setIsEmailMode] = useState(true); // State to toggle between Email and Phone modes
  const [isLoader, setIsLoader] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Use useNavigate for redirection
  const {storeTokenInLS, userLocation} = useAuth();
  const [graphData, setGraphData] = useState(null);

  const checkDatabase = async (email1, name1, location1) => {
    try {
        const response = await fetch(endpoints.authLogin, { // Adjust the endpoint as needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:email1, name:name1, location:location1 }),
        });


        const data = await response.json();

        if (data.success) {
            // If a token is returned, store it in local storage
            if (data.token) {
                storeTokenInLS(data.token); // Your function to store token
                navigate('/'); // Navigate to home page
            } 
        } else {
            // Handle any errors from the server response
            navigate('/signup/enterDetails', {
              state: { name_pass: name1, email_pass: email1 },
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
            checkDatabase(res.data.email, res.data.name, "h");
          })
          .catch((err) => {});
      }
    },
  });

  const handleEmailSubmit = async (e) => {
    setIsLoader(true);
    e.preventDefault();

    try {
      const response = await fetch(
        endpoints.signupEmail,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:email,location:userLocation }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }

      setIsOtpSent(true); // Show OTP input field after successful request
    } catch (err) {}
    navigate("/signup/emailverify", { state: { email_pass: email } });
    setIsLoader(false);
  };

  const { instance, accounts } = useMsal();
  const microsoftlogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
    });
  }; 

  const RequestProfileData = () => {
    if (accounts && accounts.length > 0) {
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
        .catch((error) => {
        });
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

  useEffect(()=>{
    if (sessionStorage.getItem("msal.account.keys") && graphData) {
      const name1 = graphData.displayName;
      const email1 = graphData.mail;
      sessionStorage.clear();
      setGraphData(null);
      checkDatabase(email1,name1,"hi");
    }
  })
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center items-center h-screen">
        <div className="login mx-4 lg:mx-16 flex flex-col gap-4 text-[#ffffff] mt-16 mb-24 md:p-8 ">
          <div className="login_image flex justify-center p-2">
            <img
              src="/company.png"
              alt="Company Logo"
              height={200}
              width={200}
            ></img>
          </div>

          <div className="login_main px-8 flex flex-col items-center gap-8">
            <div className="login_main_heading text-center">
              <h1 className="text-[35px] md:text-[48px] lg:text-[48px] font-[500] leading-[52px] font-mona-sans">
                First, enter your email
              </h1>
            </div>

            {/* <!-- Login Content --> */}
            <div className="login_main_content flex flex-col gap-6 ">
              {/* <!-- Login Content - Others --> */}

              <div className="login_main_content_phoneoremail flex flex-col gap-4">
                <div className="hero_cta_email_text flex gap-4">
                  <div
                   
                    className={`text-[14px] font-semibold leading-[21px] ${
                      isEmailMode ? "text-[#bc8cff]" : "text-[#F0F6FC]"
                    }`}
                  >
                    Email Address
                  </div>{" "}
                </div>

                <div className="hero_cta_content flex flex-col">
                  {/* Email/Phone Signup */}
                  <form onSubmit={handleEmailSubmit}>
                  <div className="hero_cta_email_signup flex flex-col gap-4">
                  
                    <div className="hero_cta_email_input ">
                     
                      <input
                        type="email" // Change input type based on mode
                        placeholder={
                          isEmailMode ? "you@company.com" : "123-456-7890"
                        } // Change placeholder
                        value={email} // Bind the input value to state
                        onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        className="w-full p-4  border border-gray-400 rounded-md lg:rounded-md focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        required
                        maxLength={100}
                      />
                    </div>

                    <button
                     type="submit"
                      className="flex justify-center hero_cta_signup_content  w-full p-4 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                          {isLoader
                            ? 
                                <ThreeDots
                                  visible={true}
                                  height="24"
                                  width="24"
                                  color="#ffffff"
                                  radius="4"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  wrapperclassName=""
                                />
                              
                            : "Continue"}
                        </h4>
                      </div>
                    </button>
            
                  </div>
                  </form>
                </div>
              </div>

              <div className="login_main_content_magic text-white ">
                We'll send you a magic code over email for a password-free sigup
                in.
              </div>

              {/* <!-- Login Content - OR --> */}
              <div className="login_main_content_or flex items-center gap-4">
                <div className="border border-gray-300 w-full h-[1px]"></div>
                <div className="text-white">OR</div>
                <div className="border border-gray-300 w-full h-[1px]"></div>
              </div>

              <div className="login_main_content_others flex flex-col gap-4 w-full">
                {/* <!-- Button 1 --> */}
                <button onClick={login}
                className="flex  gap-4 justify-center items-center py-2 border border-[#3d444d] rounded-2xl font-semibold leading-[16px] ">
                  <div>
                    <img src="/svg/google.svg" alt="" height={30} width={30} />
                  </div>
                  <div className="text-[#ffffff]">Continue with Google</div>
                </button>
                {/* <!-- Button 2 --> */}
                {/* <button className="flex  gap-4 justify-center items-center py-2 border border-[#3d444d] rounded-2xl font-semibold leading-[16px]">
                  <div>
                    <img
                      src="/svg/apple-white.svg"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="text-[#ffffff]">Continue with Apple</div>
                </button> */}
                {/* <button 
                onClick={microsoftlogin}
                className="flex  gap-4 justify-center items-center py-2 border border-[#3d444d] rounded-2xl font-semibold leading-[16px] ">
                  <div>
                    <img
                      src="/svg/microsoft.svg"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="text-[#ffffff]">Continue with Microsoft</div>
                </button> */}
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
       {/* <Outlet /> */}
    </>
  );
};

export default SignUp;
