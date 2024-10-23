import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";
import Footer from "../Footer/Footer";
import "./Pay.css"

function Pay() {
  const location = useLocation();
  const { user, isAdvance } = location.state || {}; // Destructure with fallback

  const [couponCode, setCouponCode] = useState("");
  const [email] = useState(user || "support@thefirstweb.com");
  const [amount, setAmount] = useState(900); // Base amount
  const [discount, setDiscount] = useState(0); // Discount percentage
  const [couponStatus, setCouponStatus] = useState("Apply"); // 'Apply', 'Applied', or 'Invalid'
  const [isCouponVerified, setIsCouponVerified] = useState(false);
  const [currency, setCurrency] = useState("$")
  const platformFees = (amount - (amount * discount) / 100) * 0.02;
  const totalAmount = amount - (amount * discount) / 100 + platformFees;

  const navigate = useNavigate();

  const {token, country} = useAuth();
  console.log(country);

  useEffect(()=>{
    console.log(country);
    if(country=="IN"){
      setCurrency("₹");
      setAmount(amount*80);
    }
  },[country])


  // Mock function to simulate coupon API call
  const verifyCoupon = async () => {
    // This function will hit your backend API to verify the coupon code
    try {
      const response = await fetch(
        endpoints.verifyCoupon,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({coupon_code:couponCode }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setDiscount(data.discount_percent);
        setCouponStatus("Applied");
        setIsCouponVerified(true);
      } else {
        setDiscount(0);
        setCouponStatus("Invalid");
        setIsCouponVerified(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setCouponStatus("Invalid");
    }
  };

  // Reset button text when coupon input is changed
  const handleCouponInputChange = (e) => {
    setCouponCode(e.target.value);
    setCouponStatus("Apply");
    setIsCouponVerified(false);
  };

  const Paynow = async () => {
    const body = {
      amount: totalAmount, // in the smallest unit, e.g., 200 means ₹2.00
      email: email_pass,
      currency: "INR",
      receipt: "receipt#1",
    };

    try {
      // Call your backend to create an order
      const response = await fetch(
        `http://localhost:8000/api/v1/payment/create-order`,
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
        key: "rzp_test_Y2wy8t1wD1AFaA", // Replace with your Razorpay key_id
        amount: data.amount, // Amount in smallest unit (paise for INR)
        currency: "INR",
        name: "The First Web",
        description: "Test Transaction",
        order_id: data.id, // This is the order_id from Razorpay order API
        handler: async (response) => {
          // Verify payment on your server
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verificationResponse = await fetch(
            `http://localhost:8000/api/v1/payment/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentData),
            }
          );

          const verificationData = await verificationResponse.json();
          if (verificationData.status === "ok") {
            window.location.href = "/payment-success"; // Redirect on success
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Abhishek",
          email: "support@thefirstweb.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Error:", error);
      alert("Payment initiation failed");
    }
  };

  return (
    <>
    <div className="pay_main">
      <Navbar />

      <div className="flex flex-col items-center mx-4 lg:mx-16 px-4 pt-16 pb-32 text-[#8a919a] gap-8 ">
        <h1 className="text-[40px] md:text-[60px] font-semibold md:leading-[80px] text-[#ffffff] text-center">
          {`Pay ${isAdvance ? "Advance" : "Remaining"}`}
        </h1>

        <div className="p-1 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-[#F0F6FC]">
          <div className="flex flex-col p-8 md:p-12 bg-[#151B23] rounded-lg">
            <div className="flex justify-center font-bold text-[25px] md:text-[30px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              The First Web Web Services
            </div>

            <label htmlFor="form_coupon" className="text-white my-4">
              Coupon Code (if any)
            </label>
            <div className="flex items-center justify-center border-2 border-dotted border-[#3D444D]">
              <input
                id="form_coupon"
                type="text"
                placeholder="XXXXXX"
                value={couponCode}
                onChange={handleCouponInputChange}
                className="bg-[#0D1116] border-[#3D444D] w-full p-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              />
              <button
                onClick={verifyCoupon}
                className={`py-3 bg-[#0D1116]  flex justify-end p-4 ${
                  isCouponVerified
                    ? "text-green-600"
                    : couponStatus === "Invalid"
                    ? "text-red-600"
                    : "text-[#ffffff]"
                }`}
              >
                {couponStatus}
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-4 justify-between">
                <div>Amount</div>
                <div>{`${currency}${amount}`}</div>
              </div>
              <div className="flex items-center gap-4 justify-between">
                <div>Coupon Discount</div>
                <div>{`${discount}%`}</div>
              </div>
              <div className="flex items-center gap-4 justify-between">
                <div>Platform Fees (2%)</div>
                <div>{`${currency}${platformFees.toFixed(2)}`}</div>
              </div>
              <div className="flex items-center gap-4 justify-between">
                <div>Total</div>
                <div>{`${currency}${totalAmount.toFixed(2)}`}</div>
              </div>
            </div>

            <button
              onClick={() => Paynow()}
              className="hero_cta_signup_content px-6 py-3 rounded-lg bg-[#783ec7] flex justify-center items-center hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out my-4"
            >
              <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                Pay {`${currency}${totalAmount.toFixed(2)}`}
              </h4>
            </button>

            <div>Note: Pay the remaining after completion of the work.</div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Pay;
