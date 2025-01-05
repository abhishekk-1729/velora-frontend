import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CouponPopup = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 0, 31, 23, 59, 59); // January 31st
    return Math.floor((target - now) / 1000);
  });
  const [copyStatus, setCopyStatus] = useState("TAP TO COPY");
  const [copyStatusImage, setCopyStatusImage] = useState("copy1.png");
  const [a, setA] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setA(0);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timer if the component unmounts
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("FIRSTWEB25").then(
      () => {
        setCopyStatus("COPIED!");
        setCopyStatusImage("/tick3.png");
        setTimeout(() => {
          setCopyStatusImage("/copy1.png");
          setCopyStatus("TAP TO COPY");
        }, 5000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[200]">
        <div className="bg-[#0d1116] rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row mx-4">
          {/* Left Part - Image */}
          <div className={`${a==0?"hidden":""}  md:block md:w-1/2`}>
            <img
              src="popupbg4.png"
              alt="Coupon"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          {/* Right Part - Content */}
          <div className={`${a==1?"hidden":""} md:block w-full md:w-1/2 md:p-4 relative`}>
            {/* Close Button */}
            <button
              className="absolute top-1 right-4 text-[#9198A1] text-2xl hover:text-gray-400"
              onClick={handleClose}
            >
              ✖
            </button>

            <div className="bg-[#0d1116] text-white flex flex-col items-center justify-center p-4 md:p-8 rounded-lg shadow-lg max-w-md mx-auto gap-2">
              {/* First Div */}
              <div className="text-xl font-semibold my-4">
                NEW YEAR, NEW WEBSITE
              </div>

              {/* Second Div */}
              <div className="text-6xl font-bold mb-6">20% OFF</div>

              {/* Third Div */}
              <div className="flex flex-col items-center mb-6">
                <div className="text-lg mb-2">Use Coupon Code</div>
                <div className="border-2 border-dashed border-white px-8 py-2 rounded cursor-pointer">
                  FIRSTWEB25
                </div>
              </div>

              {/* Fourth Div */}
              <div className="flex flex-col items-center mb-6 gap-2">
                <button
                  onClick={handleCopy}
                  className="text-[#EA405F] flex items-center justify-center gap-1"
                >
                  <img src={copyStatusImage} alt="" height={20} width={20} />
                  {copyStatus}
                </button>
              </div>

              {/* Fifth Div */}
              <div>
                <button
                  className="bg-[#EA405F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d1116] hover:border hover:border-red-500 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/pricing");
                  }}
                >
                  Go to Checkout
                </button>
              </div>

              <div
                className="text-sm text-gray-400 cursor-pointer"
                onClick={handleClose}
              >
                No thanks! I'll rather pay full price!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CouponPopup;
