import React from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar";
import image from "/new.png"

const About = () => {
  return (
    <>
      {" "}
      {/* <Navbar /> */}
      <div className={` `}>
        <div
          className={`  card p-2 md:p-20 flex 
          lg:flex-row-reverse
        gap-16 flex-col mx-4 lg:mx-16 justify-center items-center`}
        >
          {/* Card Image */}
          <div className="flex card_image w-full lg:w-1/2 items-center justify-center">
            <img
              src={"about-img.png"}
              alt={"Heading_About"}
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* Card Content */}
          <div className="card_content flex flex-col gap-8 lg:w-1/2 ">
            <div className="card_content_heading">
              <h2
                className={`text-[48px] font-[500] leading-[52px] font-mona-sans font-bold`}
                style={{ color: "#ffffff" }}
              >
                {"Where Digital Seeds Become Powerful Experiences"}
              </h2>
            </div>
            <div className="card_content_text">
              <p
                className="text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
                style={{ color: "#9198a1" }}
              >
                Founded in 2024, Velora specializes in creating dynamic websites
                tailored to meet the unique needs of businesses. Our passionate
                team is dedicated to helping organizations establish a strong
                online presence through innovative and user-friendly solutions.
                With a focus on discipline,
              </p>
            </div>
          </div>
        </div>
      </div>

<div className="pt-28 pb-44">
      <div className={`p-2 md:p-20 mx-4 lg:mx-16`}>
        <div className="flex justify-center mb-16">
          <h2
            className={`text-[48px] font-[500] leading-[52px] font-mona-sans font-bold`}
            style={{ color: "#ffffff" }}
          >
            {"About us"}
          </h2>
        </div>
        
          <div className="p-2 border-4 border-dotted border-gray-500 text-[#9198a1] text-[20px] font-[500] leading-[32px] font-mona-sans text-justify">
          Founded in 2024, Velora specializes in creating dynamic websites tailored to meet the unique needs of businesses. Our passionate team is dedicated to helping organizations establish a strong online presence through innovative and user-friendly solutions. With a focus on discipline, smart work, and hard work, we ensure that every project is executed with precision and integrity. At Velora, we value the importance of doing the right things to foster lasting relationships with our clients and contribute to their success.
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

export default About;
