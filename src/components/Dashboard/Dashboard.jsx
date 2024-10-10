import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import nss from "/company.png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [personal, setPersonal] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const navigate = useNavigate();
  const service_data = [
    {
      service_id: "1",
      total_amount: "1000",
      advance_status: "Paid",
      total_amount_status: "Due",
    },
  ];

  // Hit the API
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center  mx-8 sm:mx-16 p-4 md:p-16 text-[#8a919a] gap-16 mb-16 ">
        <h1 className="text-[28px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          Dashboard
        </h1>

        <div className="gap-4 flex-row  md:w-full p-8">
          <div className="mb-8 flex gap-4">
          <button
              className={`py-2 ${
                personal ? "border-b-2 border-[#15B886]" : ""
              }`}
              onClick={() => setPersonal(true)}
            >
              Personal Details
            </button>

            <button
              className={`py-2 ${
                !personal ? "border-b-2 border-[#15B886]" : ""
              }`}
              onClick={() => setPersonal(false)}
            >
              My Services
            </button>
          </div>

          <div className="flex flex-col  gap-6   p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d] text-[#ffffff]">
            {personal ? (
              <>
                <div className="flex flex-col gap-2 text-[#ffffff]">
                  <label htmlFor="form_name" className="text-white">
                    Name
                  </label>
                  <input
                    disabled="true"
                    id="form_name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500  placeholder-gray-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form_email" className="text-white">
                    Email
                  </label>
                  <input
                    disabled="true"
                    id="form_email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border  rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                    required
                  />
                  {emailError && (
                    <span className="text-red-500">{emailError}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form_phone" className="text-white">
                    Phone
                  </label>
                  <input
                    disabled="true"
                    id="form_phone"
                    type="tel"
                    placeholder="123-456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                  />
                  {phoneError && (
                    <span className="text-red-500">{phoneError}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form_address" className="text-white">
                    Address
                  </label>
                  <textarea
                    disabled="true"
                    id="form_address"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500"
                    rows="3"
                  />
                </div>
              </>
            ) : (
              <div>



<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-s text-gray-700 uppercasebg-[#151B23] dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Service Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Advance Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Amount Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
    
        <tbody>
        {service_data.map((value) => {
                  return (
                    <tr class=" bg-[#0151B23]">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value.service_id}
                    </th>
                    <td class="px-6 py-4">
                    {value.total_amount}
                    </td>
                    <td class="px-6 py-4">
                    {value.advance_status}
                    </td>
                    <td class="px-6 py-4">
                    {value.total_amount_status}
                    </td>
                    <td class="px-6 py-4">
                    <div>
                   <button onClick={()=>{navigate("/status", {state:{service_id:value.service_id}})}}
            
              className={`text-[14px] font-semibold leading-[21px] bg-[#15B886] p-2 rounded-lg text-[#ffffff] '}`}>
              Check Status
            </button>
                      </div>
                    </td>
                </tr>
    
                  );
                })}

        </tbody>
    </table>
</div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
