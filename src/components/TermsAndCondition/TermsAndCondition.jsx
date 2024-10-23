import React from "react";
import TextComponent from "../TextComponent/TextComponent";

function TermsAndCondition() {
  const content = [
    "<div><h>Terms and Conditions for The First Web</h><p>Welcome to The First Web! By purchasing our services, you agree to comply with the following terms and conditions. Please read them carefully.</p></div>",
      
    "<div><h>1. Acceptance of Terms</h><p>By using The First Web services, you confirm your acceptance of these terms and conditions. If you do not agree, please refrain from using our services.</p></div>",
  
    "<div><h>2. Services Offered</h><p>The First Web provides website development services for everyone, including individuals and businesses. Our pricing and services are outlined on our website's pricing page. The services delivered will match the details mentioned at the time of purchase.</p></div>",
  
    "<div><h>3. Order Process</h><ul><li>Contact & Payment: Clients can reach us through any platform, including our website. Once an order is placed, an advance payment as specified on our website is required to initiate the project.</li><li>Project Status Tracking: Clients can monitor the status of their project via the dashboard on our website.</li><li>Final Payment & Delivery: The website link will be provided only after the final payment is received.</li></ul></div>",
  
    "<div><h>4. Project Duration</h><p>The First Web will make every effort to complete the project within 30 days. However, actual delivery time may vary depending on the complexity of the project and the responsiveness of the client.</p></div>",
  
    "<div><h>5. Payment Terms</h><ul><li>Advance Payment: Paid at the time of purchase to start the project.</li><li>Final Payment: Paid upon completion of the project, prior to the delivery of the final website.</li></ul></div>",
  
    "<div><h>6. Client Involvement</h><p>To ensure a smooth and rapid delivery, it is essential that the client remains in communication throughout the website development process. Delays in response may extend the project timeline.</p></div>",
  
    "<div><h>7. Pricing & Discounts</h><ul><li>Pricing: The price displayed on the pricing page is the final amount for the service.</li><li>Discounts: If the client has a valid coupon code, a discount will be applied as per the terms mentioned at the time of issuing the coupon.</li><li>Referral Program: Details are provided on the referral and earn page.</li></ul></div>",
  
    "<div><h>8. Completion of Service</h><p>The project will be considered complete upon receiving the final payment, and the website link will be shared with the client. Until the final payment is made, the website remains under the ownership of The First Web.</p></div>",
  
    "<div><h>9. Refund and Cancellation Policy</h><p>All payments made, including both the advance and final payments, are non-refundable. Cancellations are not allowed once the development process has begun.</p></div>",
  
    "<div><h>10. Changes to Terms</h><p>The First Web reserves the right to update these terms and conditions at any time. Clients will be notified of significant changes.</p></div>"
];
  
      
  return (
    <div>
      <div className=" mx-4 lg:mx-16 p-4 md:p-16 text-[#8a919a] mb-16 ">
        <h1 className="text-[40px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          Terms and Conditions
        </h1>
        <div className="">
          {content.map((item, index) => (
            <TextComponent htmlString={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsAndCondition;
