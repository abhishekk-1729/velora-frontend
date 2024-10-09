import React from "react";
import Navbar from "../Navbar/Navbar";
import image from "/new.png"


const ReferAndEarn = () => {
    
    const handleCopy = () => {
        const textToCopy = 'Your content to copy'; // Replace with the content you want to copy
    
        navigator.clipboard.writeText(textToCopy).then(
          () => {
            alert('Copied to clipboard!');
          },
          (err) => {
            console.error('Could not copy text: ', err);
          }
        );
      };
    
  return (
    <>
      {" "}
      <Navbar />
      <div className={`my-16 `}>
        <div
          className={`  card  p-8 md:p-20 flex 
          lg:flex-row
        gap-16 flex-col mx-8 sm:mx-16`}
        >
          {/* Card Image */}
          <div className="flex card_image lg:w-1/2 items-center justify-center">
            <img
              src={image}
              alt={"Heading_About"}
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* Card Content */}
          <div className="card_content flex flex-col gap-8 w-full max-w-lg">
            <div className="card_content_heading">
              <h2
                className={`text-[48px] font-[500] leading-[52px] font-mona-sans font-bold`}
                style={{ color: "#ffffff" }}
              >
                {"Refer a friend"}
              </h2>
            </div>
            <div className="card_content_text text-[#9198a1]">
              <div
                className="text-[16px] font-[500] leading-[32px] font-mona-sans text-justify"

              >
                <p> Share this referrel code to a friend and get a chance to earn upto 100$. T&C Applied</p>

                <div className="flex flex-col gap-2 items-center my-4">
                    YOUR REFERREL CODE
              
                <div className="py-2 px-8 border border-dotted text-center inline-bloc bg-[#151B23]">
                    ABCD50
                </div>
               <button onClick={handleCopy} className="text-[#15B886]">
                TAP TO COPY
               </button>
                </div>
              </div>
<div className="text-[14px]">
              <div>
            T&C:
          </div>
          <div>
            1. The referrel code is to be used at the time of advance payment.
          </div>
          <div>
            2. You can earn the rewards only in case of complete payment with referrel code.
          </div>
          <div>
            3. You can not use your own referrel code.
          </div>

          <div>
            4. This code can be used as many time and is valid till 30th Nov 2024.
          </div>

            </div>
            </div>
            
          </div>


        </div>
      </div>

      {/* <div className=" md:mx-16 p-16 text-[#ffffff] my-10">
<div className="flex flex-col  mb-8">
    <h2
            className={`text-[48px] font-[500] leading-[52px] font-mona-sans my-4`}
            style={{ color: "#02ada9" }}
          >
            About Us
            </h2>

            <div className="about  flex justify-center items-center text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
            style={{ color: "#9198a1" }}>
     Founded in 2024, Velora specializes in creating dynamic websites tailored to meet the unique needs of businesses. Our passionate team is dedicated to helping organizations establish a strong online presence through innovative and user-friendly solutions. With a focus on discipline, smart work, and hard work, we ensure that every project is executed with precision and integrity. At Velora, we value the importance of doing the right things to foster lasting relationships with our clients and contribute to their success.
    </div>
    </div>

    <div className="flex flex-col ">
    <h2
            className={`text-[48px] font-[500] leading-[52px] font-mona-sans my-4 text-right`}
            style={{ color: "#7D5F91" }}
          >
            Our Mission
            </h2>
            <div
  className="about flex justify-center items-center text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
  style={{ color: "#9198a1" }}
>
At Velora, our mission is to empower businesses by providing exceptional web solutions that drive growth and success. We are committed to changing the world by making it easier for organizations to connect with their audiences and achieve their goals. Through our unwavering dedication to discipline, smart work, and hard work, we aim to deliver high-quality services that exceed expectations. We believe in the power of technology to transform businesses and are here to support them in every possible way.
</div>
    </div>
    </div> */}
    </>
  );
};

export default ReferAndEarn;
