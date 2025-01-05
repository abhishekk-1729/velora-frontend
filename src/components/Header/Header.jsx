import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import Countdown from "./Countdown";
import FlipText from "./FlipText";

function Header({ setShowHeader }) {
  const { currency, currencyChange } = useAuth();
  const baseAmount = 999;
  const baseDiscountedAmount = 899;

  const [amount, setAmount] = useState(0); // Start with 0 to avoid flicker
  const [discounted_amount, setDiscounted_amount] = useState(0); // Start with 0 to avoid flicker

  useEffect(() => {
    // Calculate amounts based on currencyChange
    setAmount(baseAmount * currencyChange);
    setDiscounted_amount(baseDiscountedAmount * currencyChange);
  }, [currencyChange]);

  return (
    <div className="bg-[#30363D] p-3 text-[#9198A1] flex justify-between items-center">
      <div className="flex-grow text-center">
        Enjoy 20% off with coupon code {" "}
        <strong className="bg-[#bc8cff] px-2 py-1 rounded-md text-black font-mono">
          <FlipText/>
          </strong>
          {" "}
        <span>
          Offer ends in{" "}
          <strong>
            <Countdown />
          </strong>
          .
        </span>{" "}
        Go to{" "}
        <a href="/pricing" className="underline">
          Pricing
        </a>
      </div>

      <button className="ml-auto" onClick={() => setShowHeader(false)}>
        <img src="cross-white.png" alt="Close" height={20} width={20} />
      </button>
    </div>
  );
}

export default Header;
