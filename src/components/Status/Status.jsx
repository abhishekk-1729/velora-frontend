import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";
import endpoints from "../../configs/apiConfigs";
import "./Status.css"
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


function Status() {
  // this page will be accessible only when the user is logged in and the service id and user id user matches
  //   email

  const navigate = useNavigate();
  const { isLoggedIn, user, token } = useAuth();
  const location = useLocation();
  const { order_id } = location.state || {}; // Destructure with fallback

  const [state1, setState1] = useState(1);
  const [state2, setState2] = useState(1);
  const [state3, setState3] = useState(1);
  const [state4, setState4] = useState(1);
  const [state5, setState5] = useState(1);
  const [state6, setState6] = useState(1);
  const [state7, setState7] = useState(1);
  const [state8, setState8] = useState(1);
  const [state9, setState9] = useState(1);
  const [state10, setState10] = useState(1);
  const [state11, setState11] = useState(1);
  const [state12, setState12] = useState(1);
  const [lastCompleted, setlastCompleted] = useState(0);
  const [completed, setCompleted] = useState(1);

  const fetchStatus = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch(endpoints.getStatus + order_id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const res_data = await response.json();
          console.log(res_data.statuses[0].completed_steps);
          setlastCompleted(res_data.statuses[0].completed_steps);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("Component mounted");

    fetchStatus(); // Fetch status on component mount
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (lastCompleted > 0) {
      const stateSetters = [
        setState1,
        setState2,
        setState3,
        setState4,
        setState5,
        setState6,
        setState7,
        setState8,
        setState9,
        setState10,
        setState11,
        setState12,
      ];

      const updateStates = async () => {
        for (let i = 0; i < lastCompleted; i++) {
          stateSetters[i](0);
          setCompleted(i + 2); // Update completed count
          await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
        }
      };

      updateStates();
    }
  }, [lastCompleted]); // Add lastCompleted as a dependency

  const [isMdOrLg, setIsMdOrLg] = useState(window.innerWidth >= 768);

  // Function to check the screen size and set the state accordingly
  const checkScreenSize = () => {
    setIsMdOrLg(window.innerWidth >= 768);
  };

  // useEffect to set up the event listener for window resizing
  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const statusContent = [
    { text: "Web Development", date: "2024-10-16 10:00 AM", state: 0 },
    { text: "Web Development", date: "2024-10-16 10:00 AM", state: state1 },
    { text: "Web Development", date: "2024-10-16 11:00 AM", state: state2 },
    { text: "Web Development", date: "2024-10-16 12:00 PM", state: state3 },
    { text: "Web Development", date: "2024-10-16 01:00 PM", state: state4 },
    { text: "Web Development", date: "2024-10-16 02:00 PM", state: state5 },
    { text: "Web Development", date: "2024-10-16 03:00 PM", state: state6 },
    { text: "Web Development", date: "2024-10-16 04:00 PM", state: state7 },
    { text: "Web Development", date: "2024-10-16 05:00 PM", state: state8 },
    { text: "Web Development", date: "2024-10-16 06:00 PM", state: state9 },
    { text: "Web Development", date: "2024-10-16 07:00 PM", state: state10 },
    { text: "Web Development", date: "2024-10-16 08:00 PM", state: state11 },
    { text: "Web Development", date: "2024-10-16 09:00 PM", state: state12 },
  ];

  return (
    <>
    <div class="status_main">
      <Navbar />
      <div className="mx-4 lg:mx-32 my-16 text-[#ffffff] pb-36">
        <div className="text-center text-[60px]">Status</div>
        <div className="flex justify-center">
          <div className="text-center text-[20px] border border-dotted inline-block p-4">
            {completed}/15 Completed
          </div>
        </div>
        {isMdOrLg ? (
          <div>
            <div className="mt-8 py-8 relative flex items-center justify-between gap-2">
              <div className={`flex flex-col items-center text-[${"#15B886"}]`}>
                <img src={"/tick-green.svg"} alt="" height={50} width={50} />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div className={`flex-1 h-[2px] bg-[${"#15B886"}]`}></div>

              <div
                className={`flex flex-col items-center text-[${
                  state1 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state1 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state1 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className={`flex flex-col items-center text-[${
                  state2 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state2 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state2 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className={`flex flex-col items-center text-[${
                  state3 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state3 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state3 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className={`flex flex-col items-center text-[${
                  state4 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state4 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">To be completed</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state4 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className="absolute bottom-0 right-0 h-1/2 w-[2px]"
                style={{
                  backgroundColor: state4 === 0 ? "#15B886" : "#ffffff",
                }}
              ></div>
            </div>

            <div
              className={`py-20 border-r-2 border-[${
                state4 == 0 ? "#15B886" : "#ffffff"
              }]`}
            >
              {/* Content */}
            </div>

            <div className="py-8 relative flex items-center justify-between gap-2 ">
              <div
                className={`flex-1 h-[2px] bg-[${
                  state7 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className={`flex flex-col items-center text-[${
                  state7 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state7 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>

              <div
                className={`flex-1 h-[2px] bg-[${
                  state6 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className={`flex flex-col items-center text-[${
                  state6 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state6 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>

              <div
                className={`flex-1 h-[2px] bg-[${
                  state5 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className={`flex flex-col items-center text-[${
                  state5 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state5 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>

              <div
                className={`flex-1 h-[2px] bg-[${
                  state4 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>

              <div
                className="absolute top-0 right-0 h-1/2 w-[2px]"
                style={{
                  backgroundColor: state4 === 0 ? "#15B886" : "#ffffff",
                }}
              ></div>

              <div
                className="absolute bottom-0 left-0 h-1/2 w-[2px]"
                style={{
                  backgroundColor: state7 === 0 ? "#15B886" : "#ffffff",
                }}
              ></div>
            </div>

            <div
              className={`py-20 border-l-2 border-[${
                state7 == 0 ? "#15B886" : "#ffffff"
              }]`}
            >
              {/* Content */}
            </div>

            <div className="py-8 relative flex items-center justify-between gap-2">
              <div
                className={`flex-1 h-[2px] bg-[${
                  state7 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>
              <div
                className={`flex flex-col items-center text-[${
                  state8 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state8 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state8 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>
              <div
                className={`flex flex-col items-center text-[${
                  state9 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state9 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state9 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>
              <div
                className={`flex flex-col items-center text-[${
                  state10 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state10 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state10 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>
              <div
                className={`flex flex-col items-center text-[${
                  state11 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state11 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className={`flex-1 h-[2px] bg-[${
                  state11 === 0 ? "#15B886" : "#ffffff"
                }]`}
              ></div>
              <div
                className={`flex flex-col items-center text-[${
                  state12 === 0 ? "#15B886" : "#ffffff"
                }]`}
              >
                <img
                  src={state12 === 0 ? "/tick-green.svg" : "/tick-white.svg"}
                  alt=""
                  height={50}
                  width={50}
                />
                <p className="mt-2">Web Development</p>
                <p className="mt-2">24th July 2025 11:59PM</p>
              </div>
              <div
                className="absolute top-0 left-0 h-1/2 w-[2px]"
                style={{
                  backgroundColor: state5 === 0 ? "#15B886" : "#ffffff",
                }}
              ></div>{" "}
            </div>
          </div>
        ) : (
          <>
            <div className="status flex flex-col gap-6 my-4 mx-2 ">
              {statusContent.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-between"
                >
                  {/* Connecting Line */}
                  {index < statusContent.length - 1 && (
                    <div
                      className={`absolute left-3 top-6 w-px h-full bg-[${
                        item.state === 0 ? "#15B886" : "#ffffff"
                      }]`}
                    ></div>
                  )}

                  {/* First Div: Image */}
                  <div>
                    <img
                      src={
                        item.state === 0 ? "/tick-green.svg" : "/tick-white.svg"
                      }
                      alt="Tick"
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Second Div: Text */}
                  <div
                    className={`text-[${
                      item.state === 0 ? "#15B886" : "#ffffff"
                    }]`}
                  >
                    {item.text}
                  </div>

                  {/* Third Div: Date and Time */}
                  <div
                    className={`text-[${
                      item.state === 0 ? "#15B886" : "#ffffff"
                    }]`}
                  >
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="lg:px-64 m-8 ">
          <button
            onClick={() => {}} // Call the function on button click
            className="hero_cta_signup_content  w-full p-4 rounded-lg bg-[#783EC7] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
          >
            <div>
              <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                Pay Remaining: 800$
              </h4>
            </div>
          </button>
        </div>

        <div className="lg:px-64 m-8 ">
          <button
            onClick={() => {}} // Call the function on button click
            className="hero_cta_signup_content border border-[#783EC7] w-full p-4 rounded-lg bg-[#0D1116] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
          >
            <div>
              <h4 className="text-[16px] font-semibold leading-[16px] text-[#ffffff]">
                Get Website Link
              </h4>
            </div>
          </button>
        </div>
        {
          <div className="flex justify-center">
            Link is: https://ramukiwebsite.com
          </div>
        }
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Status;
