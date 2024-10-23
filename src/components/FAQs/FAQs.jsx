import React from "react";
import TextComponent from "../TextComponent/TextComponent";

function FAQs() {
  const content = [
    "<div><h>Frequently Asked Questions (FAQ)</h></div>",
  
    "<div><h>1. What services does The First Web offer?</h><p>We specialize in creating custom websites for businesses of all sizes. Our services include website design, development, and deployment. You can view the details and pricing of our services on our pricing page.</p></div>",
  
    "<div><h>2. How does the website design process work?</h><p>Once you place an order and make the advance payment, we start the design process. You can track the progress through the dashboard on our website. After the final payment, we provide your website link.</p></div>",
  
    "<div><h>3. How long does it take to build a website?</h><p>We strive to complete the website within 30 days, though this may vary depending on the complexity of the project and client involvement. Regular communication helps ensure faster delivery.</p></div>",
  
    "<div><h>4. Do you help update or redesign an existing website?</h><p>No, we currently do not offer services to update or redesign existing websites. Our focus is on building new websites from the ground up.</p></div>",
  
    "<div><h>5. How do you ensure my website is optimized for search engines (SEO)?</h><p>We follow SEO best practices, including optimizing website structure, loading speed, and implementing SEO-friendly coding techniques. For advanced SEO, a dedicated SEO service may be needed.</p></div>",
  
    "<div><h>6. How do I get started with The First Web?</h><p>Getting started is easy! Visit our website, select the service, and make the advance payment. We will contact you to discuss your project and begin the development process.</p></div>"
  ];
  
      
  return (
    <div>
      <div className=" mx-4 lg:mx-16 p-4 md:p-16 text-[#8a919a] mb-16 ">
        <h1 className="text-[40px] md:text-[60px] font-semibold md:leading-[80px] text-[#F0F6FC] text-center ">
          FAQs
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

export default FAQs;
