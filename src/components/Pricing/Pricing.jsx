import React, { useState } from 'react';

function Pricing() {
  const [amount, setAmount] = useState(200);

  const Paynow = async () => {
    const body = {
      amount: amount, // in the smallest unit, e.g., 200 means ₹2.00
      email: "abhikriitd@gmail.com",
      currency: "INR",
      receipt: "receipt#1"
    };

    try {
      // Call your backend to create an order
      const response = await fetch(`http://localhost:8000/api/v1/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Sending input in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Open Razorpay Checkout
      const options = {
        key: 'rzp_test_Y2wy8t1wD1AFaA', // Replace with your Razorpay key_id
        amount: data.amount, // Amount in smallest unit (paise for INR)
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: data.id, // This is the order_id from Razorpay order API
        handler: async (response) => {
          // Verify payment on your server
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          const verificationResponse = await fetch(`http://localhost:8000/api/v1/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          const verificationData = await verificationResponse.json();
          if (verificationData.status === 'ok') {
            window.location.href = '/payment-success'; // Redirect on success
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'Abhishek',
          email: 'abhikriitd@gmail.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log('Error:', error);
      alert('Payment initiation failed');
    }
  };

  return (
    <div className='text-[#ffffff] m-8 md:m-16'>
      <div className='text-[#ffffff] mb-10'>
        Get your website today at: {amount}$
      </div>
      <button className='border-2 p-2' onClick={Paynow}>
        Pay Now
      </button>
    </div>
  );
}

export default Pricing;
