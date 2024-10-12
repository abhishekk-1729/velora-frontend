// src/config/apiConfig.js

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Replace with your actual API base URL

// Define your endpoints
const endpoints = {
    // alerts
    alertEmail: `${API_BASE_URL}/alert/sendEmail`,
    alertMessage: `${API_BASE_URL}/alert/sendMessage`,

    // auth 
    loginEmail: `${API_BASE_URL}/auth/sendLoginOtp`,
    signupEmail: `${API_BASE_URL}/auth/sendSignupOtp`,
    verifyOtp:  `${API_BASE_URL}/auth/verifyOtp`,
    verifyToken: `${API_BASE_URL}/auth/verifyToken`,

    // contact
    addContact: `${API_BASE_URL}/contact/addContact`,
    
    // user
    addUser: `${API_BASE_URL}/user/addUser`,

    // coupon
    verifyCoupon: `${API_BASE_URL}/coupon/verifyCoupon`,
    getCouponsByUserId: (user_id) => `${API_BASE_URL}/coupon/getCouponsByUserId/${user_id}`,

    // order
    createOrder: `${API_BASE_URL}/order/createOrder`,
    getAllOrders: (user_id)=> `${API_BASE_URL}/order/getAllOrders/user/${user_id}`,

    // status
    getStatus: (order_id) => `${API_BASE_URL}/status/getStatus/order/${order_id}`,

    // dashbaord
    getUserById: (id) => `${API_BASE_URL}/user/getUserById/${id}`,
};

export default endpoints;
