import React from "react";
import TextComponent from "../TextComponent/TextComponent";

function PrivacyPolicy() {
    const content = [
        "<div><h>Privacy Policy for The First Web</h></div>",
      
        "<div><h>Introduction</h><p>At The First Web, we are dedicated to protecting the privacy and security of our customers and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.</p></div>",
      
        "<div><h>Information Collection</h><ul><li>Personal Identification Information: We may collect personal information such as your name, email address, business address, phone number, and other details necessary to provide our website development services.</li><li>Usage and Log Data: We collect information about how you interact with our website, such as IP address, browser type, access times, and pages viewed.</li></ul></div>",
      
        "<div><h>Use of Information</h><ul><li>Service Provision: To design, develop, and deliver websites and related services.</li><li>Customer Support: To provide customer service, respond to inquiries, and troubleshoot.</li><li>Improvement of Services: To enhance our offerings and provide a personalized experience.</li><li>Legal Compliance and Security: To comply with laws and protect the rights and safety of The First Web and its customers.</li></ul></div>",
      
        "<div><h>Sharing of Information</h><p>We do not sell, rent, or trade personal information to third parties. We may share aggregated, non-personally identifiable data with business partners or affiliates. In certain legal situations, we may disclose personal information as required by law.</p></div>",
      
        "<div><h>Data Security</h><p>We implement security measures to protect your personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p></div>",
      
        "<div><h>Your Rights</h><p>You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us.</p></div>",
      
        "<div><h>Changes to This Privacy Policy</h><p>The First Web reserves the right to update this privacy policy at any time. Changes will be posted on this page, and we encourage periodic review.</p></div>",
      
        "<div><h>Acceptance of These Terms</h><p>By using The First Web’s services or website, you signify your acceptance of this privacy policy. If you do not agree, please do not use our services.</p></div>",
      
        "<div><h>Contacting Us</h><p>If you have any questions about this Privacy Policy, please contact us at: support@thefirstweb.com.</p></div>",
      
        "<div><h>Last Updated: 22/10/2024</h></div>"
      ];
    return (
    <div>
      <div className=" mx-4 lg:mx-16 p-4 md:p-16 text-[#8a919a] mb-16 ">
        <h1 className="text-[40px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          Privacy Policy
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

export default PrivacyPolicy;
