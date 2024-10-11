import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import nss from "/company.png";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [textState,setTextState] = useState(0);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (phone && !phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number (10 digits)");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (valid) {
      // Prepare the data to send
      const contactData = {
        name,
        email,
        phone,
        address,
        message,
      };

      // Hit the API
      try {
        setTextState(1);

        const response = await fetch("/contactUs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });

        if (response.ok) {
          // alert("Form submitted successfully");
          

        } else {
          alert("Error submitting form");
        }
        setTextState(2);
      } catch (error) {
        alert("Error submitting form");
      }
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center  mx-8 sm:mx-16 p-4 md:p-16 text-[#8a919a] gap-16 mb-16 ">
        
        <h1 className="text-[28px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          We would love to hear from you!
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:gap-20 md:w-full">


            <div className="flex flex-col  md:w-3/4 gap-6   p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d]">
              {/* Name Input */}
              <div className="flex flex-col gap-2 text-[#ffffff]">
                <label htmlFor="form_name" className="text-white">
                  Name (Required)
                </label>
                <input
                  id="form_name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {        setTextState(0);
;                    setName(e.target.value)}}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500  placeholder-gray-500"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_email" className="text-white">
                  Email (Required)
                </label>
                <input
                  id="form_email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {        setTextState(0);setEmail(e.target.value)}}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border  rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                  required
                />
                {emailError && (
                  <span className="text-red-500">{emailError}</span>
                )}
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_phone" className="text-white">
                  Phone (Optional)
                </label>
                <input
                  id="form_phone"
                  type="tel"
                  placeholder="123-456-7890"
                  value={phone}
                  onChange={(e) => {        setTextState(0);setPhone(e.target.value)}}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                />
                {phoneError && (
                  <span className="text-red-500">{phoneError}</span>
                )}
              </div>

              {/* Address TextArea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_address" className="text-white">
                  Address (Optional)
                </label>
                <textarea
                  id="form_address"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => {        setTextState(0);setAddress(e.target.value)}}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500"
                  rows="3"
                />
              </div>

              {/* Message TextArea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form_message" className="text-white">
                  Message (Optional)
                </label>
                <textarea
                  id="form_message"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => {        setTextState(0);setMessage(e.target.value)}}
                  className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500"
                  rows="5"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="hero_cta_signup_content px-6 py-3 rounded-lg bg-[#783ec7] flex justify-center items-center hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
              >
                <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                {textState==0?"Submit":textState==1?<ThreeDots
                
                visible={true}
                height="24"
                width="24"
                color="#ffffff"
                radius="4"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="lg:px-12"
              />:"We'll reach out to you!"}
</h4>
              </button>
            </div>


          <div className="flex-col md:w-1/4  ">

            <div className="flex flex-col gap-2 p-4 border-2 border-dotted border-gray-500">
              {/* <img src={nss} alt="" className="h-[60px]" /> */}
              <div>
              <div className=" ">
                Address: 
              </div>
              <div className="hover:underline">
              HSR Layout, Bangalore, India - 560103
              </div>
              </div><div>
              <div>
              Phone: 
              </div>
              <div className="hover:underline">
              <a href="tel:+918755273773">+91 8755273773</a></div></div><div>
              <div>
              Email:
              </div>
              <div className="hover:underline">
                
                <a href="mailto:support@velora.com">support@velora.com</a>
              </div>
              </div>
              <div>
              <div>
                Follow us on :
              </div>
              <div className="flex gap-4 py-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#118C7E]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* <!-- Facebook --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#1A77F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>

          {/* <!-- LinkedIn --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#0277b5]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>

          {/* <!-- YouTube --> */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#FF0000]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          {/* <!-- Twitter --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#1EA1F1]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
          {/* <!-- Instagram --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:fill-[#C13684]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
