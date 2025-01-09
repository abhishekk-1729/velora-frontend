import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Dropdown } from "primereact/dropdown";
import endpoints from "../../configs/apiConfigs";
import { useAuth } from "../../store/auth";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./GetAllRecommendations.css";
import SocialMedia from "../SocialMedia/SocialMedia";
import EnterPhone from "../EnterPhone/EnterPhone";
function GetAllRecommendations() {

  const [message, setMessage] = useState("");
  const [textState, setTextState] = useState(0);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const {name, email, phone, address } = useAuth();
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);
  const [userAddress, setUserAddress] = useState(address);
  const [countryData, setCountryData] = useState({phone_code:"+1"}); // State to store validation errors
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name: userName, // e.g., "Abhishek Kumar"
      email: userEmail, // e.g., "abhikriitd"
      message: message, // e.g., "Testing message"
      phone_code: countryData.phone_code, // Assuming the phone code is fixed, or you can also add a phone_code state if needed
      phone_number: userPhone, // e.g., "8868073773"
      address: userAddress, // e.g., "Test Address"
    };

    // Hit the API
    try {
      setTextState(1);
      const response = await fetch(endpoints.addContact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        // alert("Form submitted successfully");
      } else {
        // alert("Error submitting form");
      }
      setTextState(2);
    } catch (error) {
      // alert("Error submitting form");
    }
  };

  return (
    <>
      <div className="contact_main">
        <Navbar />
        <div className="flex flex-col   mx-4 lg:mx-16 p-2 md:p-20 text-[#8a919a] gap-16 mb-16 ">
         
         <h1 className="text-[36px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
         Complete Your Details to Get Expert Suggestions
          </h1>

          <div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:gap-20 md:w-full">
            <div className="flex flex-col  md:w-3/4 gap-9   p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d]">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form_name" className="text-white">
                    Name <span className="text-[#D82E5A]">*</span>
                  </label>
                  <input
                    id="form_name"
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => {
                      setTextState(0);
                      setUserName(e.target.value);
                    }}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500  placeholder-gray-500 mb-4"
                    required
                    maxLength={100}
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form_email" className="text-white">
                    Email <span className="text-[#D82E5A]">*</span>
                  </label>
                  <input
                    id="form_email"
                    type="email"
                    placeholder="you@company.com"
                    value={userEmail}
                    onChange={(e) => {
                      setTextState(0);
                      setUserEmail(e.target.value);
                    }}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border  rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500 mb-4"
                    required
                    maxLength={100}
                  />
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-2  ">
                  <label htmlFor="form_phone" className="text-white">
                    Phone <span className="text-[#D82E5A]">*</span>
                  </label>
                  <div className="flex border border-[#3D444D] rounded-md focus-within:border-blue-500 ">
                    <div className="py-3 px-2  rounded-md rounded-l-md  rounded-r-none focus:outline-none   flex bg-[#0d1116]     ">
                      <div className="card flex justify-content-center">
                      </div>
                      <EnterPhone setCountryData={setCountryData} className = {"bg-[#0d1116] text-[#6b7280]"} />

                    </div>
                    <input
                      type={isEmailMode ? "email" : "tel"} // Change input type based on mode
                      placeholder={
                        isEmailMode ? "you@company.com" : "123-456-7890"
                      } // Change placeholder
                      value={isEmailMode ? userEmail : userPhone}
                      onChange={(e) => {
                        setUserPhone(e.target.value);
                      }} //
                      className="w-full p-3 pr-16 lg:pr-8  rounded-md  rounded-l-none   placeholder-gray-500 focus:outline-none bg-[#0d1116]     "
                      required
                      pattern={"[0-9]{5,11}"}
                      title="Please enter a valid phone number with 5 to 11 digits."
                    />
                  </div>
                </div>

                {/* Address TextArea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form_address" className="text-white">
                    Address
                  </label>
                  <textarea
                    id="form_address"
                    placeholder="Your Address"
                    value={userAddress}
                    onChange={(e) => {
                      setTextState(0);
                      setUserAddress(e.target.value);
                    }}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500 mb-4"
                    rows="3"
                  />
                </div>

                {/* Message TextArea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form_message" className="text-white">
                    Message
                  </label>
                  <textarea
                    id="form_message"
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => {
                      setTextState(0);
                      setMessage(e.target.value);
                    }}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500"
                    rows="5"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                  <button className="hero_cta_signup_content px-6 py-3 rounded-lg bg-[#783ec7] flex justify-center items-center hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out w-full">
                    <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                      {textState == 0 ? (
                        "Reach out to me!"
                      ) : textState == 1 ? (
                        <ThreeDots
                          visible={true}
                          height="24"
                          width="24"
                          color="#ffffff"
                          radius="4"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass="lg:px-12"
                        />
                      ) : (
                        "We'll reach out to you!"
                      )}
                    </h4>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-col md:w-1/4  ">
              <div className="flex flex-col gap-2 p-4 border-2 border-dotted border-gray-500">
                {/* <img src={nss} alt="" className="h-[60px]" /> */}
                <div>
                  <div className=" ">Address:</div>
                  <div className="hover:underline">
                    HSR Layout, Bangalore, India - 560103
                  </div>
                </div>
                <div>
                  <div>Phone:</div>
                  <div className="hover:underline">
                    <a href="tel:+19254718097">+19254718097</a>
                  </div>
                </div>
                <div>
                  <div>Email:</div>
                  <div className="hover:underline">
                    <a href="mailto:support@thefirstweb.com">
                      support@thefirstweb.com
                    </a>
                  </div>
                </div>
                <div>
                  <div className="mb-2">Follow us on :</div>
                  <SocialMedia />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GetAllRecommendations;
