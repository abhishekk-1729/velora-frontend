import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import Footer from "../Footer/Footer";
import "./Pricing.css";
import { useEffect } from "react";

function Pricing() {
  const { currency, currencyChange } = useAuth();
  const [personal, setPersonal] = useState(true);
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const deliverables = [
    "Get your website in 1 month",
    "High quality UI/UX",
    "Deployment Included",
    "No No-Code software used",
    "High Performance",
    "1 year customer support",
    "upto 50 screens & 30 APIs",
  ];

  const baseAmount = 999;
  const baseDiscountedAmount = 899;
  const [amount, setAmount] = useState(0); // Start with 0 to avoid flicker
  const [discounted_amount, setDiscounted_amount] = useState(0); // Start with 0 to avoid flicker

  useEffect(() => {
    setAmount(Math.floor(baseAmount * currencyChange));
    setDiscounted_amount(Math.floor(baseDiscountedAmount * currencyChange));
  }, [currencyChange]);

  return (
    <>
      <div className="pricing_main">
        <Navbar />
        <div className="flex flex-col items-center  mx-4 lg:mx-16 p-4 md:p-16 text-[#8a919a] gap-4 pb-32 ">
          <h1 className="text-[40px] md:text-[60px] font-semibold md:leading-[80px] text-[#ffffff] text-center ">
            Discover our flat pricing
          </h1>
          <h2 className="text-[16px]">Get your website today</h2>
          <div className="gap-4 flex-row ">
            {/* <div className="flex flex-col  gap-4  p-2 md:p-12 bg-[#151B23] rounded-lg border border-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-[#ffffff] "> */}

            <div className="p-1 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-[#F0F6FC]">
              <div className="flex flex-col  p-8 md:p-12 bg-[#151B23] rounded-lg ">
                {/* Your content goes here */}
                <div className="flex flex-col gap-2">
                  <div className=" flex gap-4">
                    <button
                      className={`py-2 px-4 rounded-2xl ${
                        personal ? "" : ""
                      } bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white`}
                      onClick={() => setPersonal(true)}
                    >
                      Limited Launch Special
                    </button>
                  </div>
                  <div className="mb-8 flex gap-2 items-center">
                    <div className="text-[40px] line-through font-bold text-[#cfd0d2]">
                      {currency}
                      {amount}
                    </div>
                    <div className="font-bold">
                      {currency}
                      {discounted_amount}
                    </div>
                    <div>Per Website</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {deliverables.map((value, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img src="/plus.png" alt="" height={20} width={20} />
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
                <button
                  // if you not logged in you'll go to login
                  onClick={() => {
                    isLoggedIn
                      ? navigate("/pay", {
                          state: { user: user , isAdvance: true},
                          
                        })
                      : navigate("/login", { state: { isPricing: true } });
                  }}
                  // onClick={()=>{navigate("/pay")}}
                  className="hero_cta_signup_content px-6 py-3 rounded-lg bg-[#783ec7] flex justify-center items-center hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out my-4"
                >
                  <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                    {isLoggedIn ? "Join The First Web Family" : "Sign In"}
                  </h4>
                </button>
                <div>Note: You will have to pay 20% advance.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
