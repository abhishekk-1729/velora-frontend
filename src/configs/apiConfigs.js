// src/config/apiConfig.js

const API_BASE_URL = 'https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1'; // Replace with your actual API base URL

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
    authLogin: `${API_BASE_URL}/auth/authLogin`,

    //otp
    getOtpCreatedAt: `${API_BASE_URL}/user/getOtpCreatedAt`,

    // contact
    addContact: `${API_BASE_URL}/contact/addContact`,

    // user
    addUser: `${API_BASE_URL}/user/addUser`,

    // coupon
    verifyCoupon: `${API_BASE_URL}/coupon/verifyCoupon`,
    getCouponsByUserId:  `${API_BASE_URL}/coupon/getCouponsByUserId/`,

    // order
    createOrder: `${API_BASE_URL}/order/createOrder`,
    getAllOrders:  `${API_BASE_URL}/order/getAllOrders/user`,

    // status
    getStatus: `${API_BASE_URL}/status/getStatus/order/`,

    // dashbaord
    getUserById: `${API_BASE_URL}/user/getUserById`,
};

export default endpoints;
