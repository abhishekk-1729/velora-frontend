import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";
import endpoints from "../../configs/apiConfigs";
import "./Status.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Status() {
  // this page will be accessible only when the user is logged in and the service id and user id user matches
  //   email

  const navigate = useNavigate();
  const { isLoggedIn, user, token, currency, email, currencyOriginal, name, service_id, phone } = useAuth();
  const location = useLocation();
  const { order_id, totalAmount } = location.state || {}; // Destructure with fallback

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
  const [remainingAmount, setRemainingAmount] = useState(800);

  const projectSteps = [
    "Advance Payment",
    "UI Discussion",
    "UI Started",
    "UI Completed",
    "UI Review",
    
    "Development Completed",
    "Development Started",
    "Initial Quality Check",
    "Precision Review",
    "Deployment Started",
    "Deployment Completed",
    "Final Review",
    "Launch Readiness",
    "Remaining Payment",
    "Website Delivery",
  ];
  const projectSteps1 = [
    "Advance Payment",
    "UI Discussion",
    "UI Started",
    "UI Completed",
    "UI Review",
    "Initial Quality Check",
    "Development Started",
    "Development Completed",
    "Precision Review",
    "Deployment Started",
    "Deployment Completed",
    "Final Review",
    "Launch Readiness",
    "Remaining Payment",
    "Website Delivery",
  ];

  const [projectDate, setProjectDate] = useState([
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
    "To be completed",
  ]);

  
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
          setlastCompleted(res_data.completed_steps);
          console.log(res_data.statuses);
          setProjectDate(res_data.statuses);
          setRemainingAmount(res_data.remainingAmount);
        } else {
          navigate("/login");
        }
      } catch (error) {}
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
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
    { text: projectSteps1[0], date: projectDate[0], state: 0 },
    { text: projectSteps1[1], date: projectDate[1], state: state1 },
    { text: projectSteps1[2], date: projectDate[2], state: state2 },
    { text: projectSteps1[3], date: projectDate[3], state: state3 },
    { text: projectSteps1[4], date: projectDate[4], state: state4 },
    { text: projectSteps1[5], date: projectDate[5], state: state5 },
    { text: projectSteps1[6], date: projectDate[6], state: state6 },
    { text: projectSteps1[7], date: projectDate[7], state: state7 },
    { text: projectSteps1[8], date: projectDate[8], state: state8 },
    { text: projectSteps1[9], date: projectDate[9], state: state9 },
    { text: projectSteps1[10], date: projectDate[10], state: state10 },
    { text: projectSteps1[11], date: projectDate[11], state: state11 },
    { text: projectSteps1[12], date: projectDate[12], state: state12 },
  ];

  const progressPercentage = ((lastCompleted + 1) / 15) * 100;

  const completeOrder = async (user, service_id, discount, totalAmountOrder) => {
    const url = endpoints.createOrder; // Assuming endpoints.createOrder contains your API URL
    console.log(couponCode)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user, // Assuming user is an object with an id property
                service_id,
                discount,
                totalAmountOrder,
                currencyChange,
                couponCode,
                email
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            console.log('Order created successfully:', data.order);
            // Handle successful order creation (e.g., update UI, notify user)
            return data.order; // Return the created order for further use
        } else {
            console.error('Failed to create order:', data.message);
            // Handle error response
        }
    } catch (error) {
        console.error('An error occurred while creating the order:', error);
        // Handle network or other errors
    }
};

  const Paynow = async () => {
    const body = {
      amount: remainingAmount, // in the smallest unit, e.g., 200 means ₹2.00
      email: email,
      currency: currencyOriginal,
      receipt: "receipt#1",
    };

    try {
      // Call your backend to create an order
      const response = await fetch(
        endpoints.create_Order,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body), // Sending input in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Open Razorpay Checkout
      const options = {
        key: "rzp_live_MlxWqnBX5fORCU", // Replace with your Razorpay key_id
        amount: remainingAmount, // Amount in smallest unit (paise for INR)
        currency: currencyOriginal,
        name: "The First Web",
        description: "Test Transaction",
        order_id: data.id, // This is the order_id from Razorpay order API
        handler: async (response) => {
          // Verify payment on your server
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          const verificationResponse = await fetch(
            endpoints.verifyPayment,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentData),
            }
          );

          const verificationData = await verificationResponse.json();
          console.log(verificationData);
          if (verificationData.status === "ok") {
            // completeOrder(user, service_id, 10, totalAmount);
            navigate("/dashboard");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#0d1116",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment initiation failed");
    }
  };


  return (
    <>
      <div className="status_main">
        <Navbar />
        <div className="mx-4 lg:mx-32 my-16 text-[#ffffff] pb-36">
          <div className="py-4 flex justify-center gap-2 items-center text-[28px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center">
            Status
          </div>{" "}
          <div className="flex justify-center">
            <div className="text-center">
              {/* Progress Indicator */}
              <div
                className="relative inline-block p-2"
                style={{
                  border: "dotted 2px #ccc", // Dotted border style
                  borderRadius: "4px", // Optional: rounded corners
                  overflow: "hidden", // Ensure progress fills the container
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#15B886]"
                  style={{
                    width: `${progressPercentage}%`, // Set width based on progress
                    height: "100%",
                  }}
                ></div>
                <div className="relative z-10 text-[18px]">
                  {completed}/15 Completed
                </div>
              </div>
            </div>{" "}
          </div>
          {isMdOrLg ? (
            <div>
              <div className="mt-8 py-8 relative flex items-center justify-between gap-2">
                <div
                  className={`flex flex-col items-center text-[${"#15B886"}]`}
                >
                  <img src={"/tick-green.svg"} alt="" height={50} width={50} />
                  <p className="mt-2">{projectSteps[0]}</p>
                  <p className="mt-2">{projectDate[0]}</p>
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
                  <p className="mt-2">{projectSteps[1]}</p>
                  <p className="mt-2">{projectDate[1]}</p>
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
                  <p className="mt-2">{projectSteps[2]}</p>
                  <p className="mt-2">{projectDate[2]}</p>
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
                  <p className="mt-2">{projectSteps[3]}</p>
                  <p className="mt-2">{projectDate[3]}</p>
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
                  <p className="mt-2">{projectSteps[4]}</p>
                  <p className="mt-2">{projectDate[4]}</p>
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
                  <p className="mt-2">{projectSteps[5]}</p>
                  <p className="mt-2">{projectDate[5]}</p>
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
                  <p className="mt-2">{projectSteps[6]}</p>
                  <p className="mt-2">{projectDate[6]}</p>
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
                  <p className="mt-2">{projectSteps[7]}</p>
                  <p className="mt-2">{projectDate[7]}</p>
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
                  <p className="mt-2">{projectSteps[8]}</p>
                  <p className="mt-2">{projectDate[8]}</p>
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
                  <p className="mt-2">{projectSteps[9]}</p>
                  <p className="mt-2">{projectDate[9]}</p>
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
                  <p className="mt-2">{projectSteps[10]}</p>
                  <p className="mt-2">{projectDate[10]}</p>
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
                  <p className="mt-2">{projectSteps[11]}</p>
                  <p className="mt-2">{projectDate[11]}</p>
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
                  <p className="mt-2">{projectSteps[12]}</p>
                  <p className="mt-2">{projectDate[12]}</p>
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
<div className="status flex flex-col gap-6 my-4 mx-2 text-[12px] ">
  {statusContent.map((item, index) => (
    <div
      key={index}
      className="relative flex items-center justify-between"
    >
      {/* Connecting Line */}
      {index < statusContent.length - 1 && (
        <div
          className={`absolute left-3 top-6 w-px h-full bg-[${item.state === 0 ? "#15B886" : "#ffffff"}]`}
        ></div>
      )}

      {/* First Div: Image */}
      <div className="flex items-center gap-4">
        <img
          src={
            item.state === 0
              ? "/tick-green.svg"
              : "/tick-white.svg"
          }
          alt="Tick"
          className="w-6 h-6"
        />
        {/* Second Div: Text */}
        <div
          className={`text-[${item.state === 0 ? "#15B886" : "#ffffff"}]`}
        >
          {item.text}
        </div>
      </div>

      {/* Third Div: Date and Time, positioned at the end */}
      <div
        className={`text-[${item.state === 0 ? "#15B886" : "#ffffff"}] ml-auto`}
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
              onClick={() => Paynow()}
              className="hero_cta_signup_content  w-full p-4 rounded-lg bg-[#783EC7] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
            >
              <div>
                <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                  Pay Remaining: {remainingAmount} {currency}
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
              Link: We are working on it...
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Status;
