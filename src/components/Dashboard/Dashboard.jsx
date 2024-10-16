import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import endpoints from "../../configs/apiConfigs";

function Dashboard() {
  //   to access this page you should be logged in
  const navigate = useNavigate();

  const { isLoggedIn, user, token } = useAuth();
  console.log(token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [service_id, setServiceId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [service_data, set_service_data] = useState([]);

  const [personal, setPersonal] = useState(true);

  const createServiceData = (orders) => {
    return orders.map((order) => {
      const totalAmount = order.total_amount; // Calculate total amount after discount

      return {
        order_id: order.order_id, // Order ID
        total_amount: totalAmount, // Total amount after discount
        advance_status: "Paid", // Set advance status
        total_amount_status: "Due", // Set total amount status
      };
    });
  };

  const getAllOrders = async () => {
    console.log(endpoints.getAllOrders);
    // e.preventDefault();
    try {
      const response = await fetch(endpoints.getAllOrders, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("res_data");
        console.log(res_data.orders);
        setOrders(res_data.orders);
      } else {
        console.log("Not able to find the user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(endpoints.getUserById + user);
  const getUserData = async () => {
    console.log("hi");
    try {
      console.log("new");
      const response = await fetch(endpoints.getUserById, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.ok) {
        const res_data = await response.json();
        console.log("res_data");
        console.log(res_data);
        setName(res_data.user.name);
        setAddress(res_data.user.address);
        setEmail(res_data.user.email);
        setPhone(res_data.user.phone_code + res_data.user.phone_number);
      } else {
        console.log("Not able to find the user");
      }
    } catch (error) {
      console.log(error);
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

  // Hit the API
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center  mx-4 lg:mx-16 p-4 lg:p-16 text-[#8a919a] gap-16 mb-16 ">
        <h1 className="text-[28px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          Dashboard
        </h1>

        <div className="gap-4 flex-row  w-full">
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
              onClick={(e) => {
                setPersonal(false);
              }}
            >
              My Orders
            </button>
          </div>

          {personal ? (
            <>
              <div className="flex flex-col  gap-6   p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d] text-[#ffffff]">
                <div className="flex flex-col gap-2 text-[#ffffff]">
                  <label htmlFor="form_name" className="text-white">
                    Name
                  </label>
                  <input
                    disabled="true"
                    id="form_name"
                    type="text"
                    placeholder={name}
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
                    placeholder={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border  rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form_phone" className="text-white">
                    Phone
                  </label>
                  <input
                    disabled="true"
                    id="form_phone"
                    type="tel"
                    placeholder={phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form_address" className="text-white">
                    Address
                  </label>
                  <textarea
                    disabled="true"
                    id="form_address"
                    placeholder={address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-[#0D1116]  border-[#3D444D] w-full p-3 border rounded-md focus:outline-none focus:border-blue-500  placeholder-gray-500"
                    rows="3"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              {orders.length ? (
                <div className="flex flex-col  gap-6   p-2 md:p-8 bg-[#151B23] rounded-lg border border-[#3d444d] text-[#ffffff]">
                  <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-s text-gray-700 uppercase bg-[#151B23] dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Order Id
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Total Amount($)
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Advance Status(20%)
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Remaining Amount Status(80%)
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
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {value.order_id}
                              </th>
                              <td class="px-6 py-4">{value.total_amount}</td>
                              <td class="px-6 py-4">{value.advance_status}</td>
                              <td class="px-6 py-4">
                                {value.total_amount_status}
                              </td>
                              <td class="px-6 py-4">
                                <div>
                                  <button
                                    onClick={() => {
                                      navigate(`/status/${value.order_id}`, {
                                        state: { order_id: value.order_id },
                                      });
                                    }}
                                    className={`text-[14px] font-semibold leading-[21px] bg-[#15B886] p-2 rounded-lg text-[#ffffff] '}`}
                                  >
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
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center text-[24px] lg:p-16 mb-64 lg:mb-32">
                    <div>No orders yet...</div>
                    <a className="text-[#6EB0BE] underline" href="/pricing">Order Now</a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
