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
              className="w-full h-2rem rounded-md"
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
                At The First Web, we believe in nurturing digital seeds to cultivate powerful online experiences. Founded in 2024 in Bangalore, our journey began with a simple yet impactful mission: to create exceptional websites for businesses. We understand that in today's digital landscape, having a strong online presence is crucial for success. That's why we are committed to transforming ideas into reality, delivering tailored web solutions that not only meet our clients' needs but also exceed their expectations.
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
          The First Web is more than just a website creation company; we are a dedicated partner in your digital transformation journey. Founded in 2024 in Bangalore, our vision extends beyond building websites; we aspire to empower businesses in every possible way. We understand that in today's fast-paced digital world, a robust online presence is not just an option but a necessity for growth and sustainability.
<br /><br />
Our commitment to excellence drives us to deliver innovative solutions tailored to your unique needs. We take the time to understand your business goals, industry challenges, and target audience, allowing us to create customized strategies that yield results. Our team of skilled professionals combines creativity with technical expertise to produce websites that are not only visually appealing but also user-friendly and optimized for performance.
<br /><br />
At The First Web, we pride ourselves on being a hardworking and customer-centric organization. Our clients are at the heart of everything we do, and we strive to build lasting relationships based on trust and transparency. We believe in open communication and collaboration throughout the development process, ensuring that your vision is realized every step of the way. Our ultimate goal is to make your business digital and accessible, helping you unlock its full potential in the online world. Together, let's embark on a journey to elevate your business and drive success in the digital realm. 
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
     Founded in 2024, The First Web specializes in creating dynamic websites tailored to meet the unique needs of businesses. Our passionate team is dedicated to helping organizations establish a strong online presence through innovative and user-friendly solutions. With a focus on discipline, smart work, and hard work, we ensure that every project is executed with precision and integrity. At Velora, we value the importance of doing the right things to foster lasting relationships with our clients and contribute to their success.
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
At The First Web, our mission is to empower businesses by providing exceptional web solutions that drive growth and success. We are committed to changing the world by making it easier for organizations to connect with their audiences and achieve their goals. Through our unwavering dedication to discipline, smart work, and hard work, we aim to deliver high-quality services that exceed expectations. We believe in the power of technology to transform businesses and are here to support them in every possible way.
</div>
    </div>
    </div> */}
    </>
  );
};

export default About;
