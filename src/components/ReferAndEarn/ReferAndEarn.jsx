import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import image from "/new.png";
import { useAuth } from "../../store/auth";
import { Navigate, useNavigate } from "react-router-dom";
import endpoints from "../../configs/apiConfigs";

const ReferAndEarn = () => {
//   const coupon_code = "NEWNET50"; // Replace with the content you want to copy
const { isLoggedIn, user, token, country, coupon_code, currency, currencyChange } = useAuth();

  const [amount, setAmount] = useState(50*currencyChange);
 
  const [copyStatus, setCopyStatus] = useState("TAP TO COPY");
  const [copyStatusImage, setCopyStatusImage] = useState("copy1.png");
  const navigate = useNavigate();

//   useEffect(() => {
//     getCouponCode();
//   },[isLoggedIn, user, token]);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon_code).then(
      () => {
        setCopyStatus("COPIED!"); // Change button text to "COPIED"
        setCopyStatusImage("/tick3.png"); // Change button text to "COPIED"
        setTimeout(() => {
          setCopyStatusImage("/copy1.png");
          setCopyStatus("TAP TO COPY");
        }, 5000); // Reset to "TAP TO COPY" after 5 seconds
      },
      (err) => {
        // console.error("Could not copy text: ", err);
      }
    );
  };

  // useEffect(()=>{
  //   if(country=="IN"){
  //     setAmount(amount*80);
  //   }
  // },[country])


  return (
    <>
      {/* <Navbar /> */}
      <div className="my-16">
        <div className="card p-2 md:p-20 flex lg:flex-row gap-16 flex-col mx-4 lg:mx-16 items-center">
          {/* Card Image */}
          <div className="flex card_image lg:w-1/2 items-center justify-center">
            <img
              src={"refer.png"}
              alt="Heading_About"
              className="rounded-md"
              height={600}
              width={600}
            />
          </div>

          {/* Card Content */}
          <div className="card_content flex flex-col gap-8 lg:w-1/2">
            <div className="card_content_heading">
              <h2
                className="text-[48px] font-[500] leading-[52px] font-mona-sans font-bold"
                style={{ color: "#ffffff" }}
              >
                Refer a friend
              </h2>
            </div>
            <div className="card_content_text text-[#9198a1]">
              <div className="text-[16px] font-[500] leading-[32px] font-mona-sans text-justify">
                <p>
                  Share this referral code to a friend and get a chance to earn
                  up to {currency}{amount}. T&C Applied
                </p>

                <div className="flex flex-col gap-2 items-center my-4">
                  YOUR REFERRAL CODE
                  <button
                    onClick={() => {
                      isLoggedIn ? handleCopy : navigate("/login");
                    }}
                    className="py-2 px-8 border border-dotted text-center inline-bloc bg-[#151B23]"
                  >
                    {isLoggedIn ? <>{coupon_code?coupon_code:"Loading..."}{}</> : <>{"LOGIN TO VIEW"}</>}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="text-[#15B886] flex items-center justify-center gap-1"
                  >
                    <img src={copyStatusImage} alt="" height={20} width={20} />
                    {copyStatus} {/* This changes dynamically */}
                  </button>
                </div>
              </div>
              <div className="text-[14px]">
                <div>T&C:</div>
                <br />
                <div>
                1. If a customer uses a referral code, they will receive a 5% discount on the total order amount, and you will also earn cashback equal to that same amount.                </div>
                <br />
                <div>
                  2. The referral code must be applied during the advance payment process.
                </div>
                <br />
                <div>
                  3. Rewards are only eligible for complete payments made using the referral code.
                </div>
                <br />
                <div>4. You are not permitted to use your own referral code for any transactions.</div>
                <br />
                <div>
                  5. This referral code can be used multiple times and is valid until November 30, 2024.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferAndEarn;
