import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import image from "/new.png";
import { useAuth } from "../../store/auth";
import { Navigate, useNavigate } from "react-router-dom";
import endpoints from "../../configs/apiConfigs";

const ReferAndEarn = () => {
//   const coupon_code = "NEWNET50"; // Replace with the content you want to copy
const [coupon_code,setCouponCode] = useState("");
  const [copyStatus, setCopyStatus] = useState("TAP TO COPY");
  const [copyStatusImage, setCopyStatusImage] = useState("/copy1.png");
  const { isLoggedIn, user, token } = useAuth();
  const navigate = useNavigate();

  const getCouponCode = async () => {
    try {
      const response = await fetch(endpoints.getCouponsByUserId+user, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data.coupons);
        setCouponCode(res_data.coupons[0].coupon_code);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCouponCode();
  });

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
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="my-16">
        <div className="card p-8 md:p-20 flex lg:flex-row gap-16 flex-col mx-4 lg:mx-16">
          {/* Card Image */}
          <div className="flex card_image lg:w-1/2 items-center justify-center">
            <img
              src={image}
              alt="Heading_About"
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* Card Content */}
          <div className="card_content flex flex-col gap-8 lg:w-1/2 lg:px-32">
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
                  up to $100. T&C Applied
                </p>

                <div className="flex flex-col gap-2 items-center my-4">
                  YOUR REFERRAL CODE
                  <button
                    onClick={() => {
                      isLoggedIn ? handleCopy : navigate("/login");
                    }}
                    className="py-2 px-8 border border-dotted text-center inline-bloc bg-[#151B23]"
                  >
                    {isLoggedIn ? <>{coupon_code}</> : <>{"LOGIN TO VIEW"}</>}
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
                <div>
                  1. The referral code is to be used at the time of advance
                  payment.
                </div>
                <div>
                  2. You can earn the rewards only in case of complete payment
                  with the referral code.
                </div>
                <div>3. You cannot use your own referral code.</div>
                <div>
                  4. This code can be used as many times and is valid till 30th
                  Nov 2024.
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
