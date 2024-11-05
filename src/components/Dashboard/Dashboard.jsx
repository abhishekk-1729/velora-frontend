import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import endpoints from "../../configs/apiConfigs";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ThreeDots } from "react-loader-spinner"; // Import the loader
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user, token, currency, currencyChange } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [service_data, set_service_data] = useState([]);
  const [personal, setPersonal] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false); // Add loading state

  const createServiceData = (orders) => {
    return orders.map((order) => {
      const totalAmount = Math.floor(order.total_amount*currencyChange); // Calculate total amount after discount
      return {
        order_id: order.order_id, // Order ID,
        date: order.date, 
        total_amount: order.total_amount, // Total amount after discount
        advance_status: "Paid", // Set advance status
        total_amount_status: "Due", // Set total amount status
      };
    });
  };

  const getAllOrders = async () => {
    setLoadingOrders(true); // Set loading state to true
    try {
      const response = await fetch(endpoints.getAllOrders, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        setOrders(res_data.orders);
        console.log(res_data)
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoadingOrders(false); // Set loading state to false after fetching
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch(endpoints.getUserById, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        setName(res_data.user.name);
        setAddress(res_data.user.address);
        setEmail(res_data.user.email);
        setPhone(res_data.user.phone_code + res_data.user.phone_number);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    getUserData();
    getAllOrders();
    set_service_data(createServiceData(orders));
  }, [personal]);

  return (
    <>
      <div className="dashboard_main">
        <Navbar />

        <div className="flex flex-col items-center mx-4 lg:mx-16 p-4 lg:p-16 text-[#8a919a] gap-16 mb-16">
          <div className="flex justify-center gap-2 items-center text-[28px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center">
            Dashboard
          </div>

          <div className="gap-4 flex-row w-full">
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
                onClick={() => {
                  setPersonal(false);
                  getAllOrders(); // Fetch orders when clicking My Orders
                }}
              >
                My Orders
              </button>
            </div>

            {personal ? (
              <>
                <div className="min-h-[500px] flex flex-col gap-6 p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d] text-[#ffffff]">
                  <div className="flex flex-col gap-2 text-[#ffffff]">
                    <label htmlFor="form_name" className="text-white">
                      Name
                    </label>
                    <input
                      disabled
                      id="form_name"
                      type="text"
                      placeholder={name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#0D1116] border-[#3D444D] w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="form_email" className="text-white">
                      Email
                    </label>
                    <input
                      disabled
                      id="form_email"
                      type="email"
                      placeholder={email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0D1116] border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="form_phone" className="text-white">
                      Phone
                    </label>
                    <input
                      disabled
                      id="form_phone"
                      type="tel"
                      placeholder={phone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#0D1116] border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="form_address" className="text-white">
                      Address
                    </label>
                    <textarea
                      disabled
                      id="form_address"
                      placeholder={address}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-[#0D1116] border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                      rows="3"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                {loadingOrders ? ( // Show loader while fetching orders
                  <div className="flex justify-center items-center min-h-[500px]">
                    <ThreeDots color="#15B886" height={80} width={80} />
                  </div>
                ) : orders.length ? (
                  <div className="min-h-[500px] flex flex-col gap-6 p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d] text-[#ffffff]">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-s text-gray-700 uppercase bg-[#151B23] dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Date Created
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Order Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Total Amount({currency})
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Advance Status(20%)
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Remaining Amount Status(80%)
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {service_data.map((value) => (
                            <tr className="bg-[#0151B23]" key={value.order_id}>
                              <td className="px-6 py-4">{value.date}</td>
                              <td className="px-6 py-4">{value.order_id}</td>
                              <td className="px-6 py-4">
                                {value.total_amount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4">
                                {value.advance_status}
                              </td>
                              <td className="px-6 py-4">
                                {value.total_amount_status}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => {
                                    navigate(`/status/${value.order_id}`, {
                                      state: { order_id: value.order_id, totalAmount: value.total_amount },
                                    });
                                  }}
                                  className="text-[14px] font-semibold leading-[21px] bg-[#15B886] p-2 rounded-lg text-[#ffffff]"
                                >
                                  Check Status
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[500px] flex flex-col pt-24 items-center text-[24px]">
                    <div>No orders yet...</div>
                    <a className="text-[#6EB0BE] underline" href="/pricing">
                      Order Now
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
