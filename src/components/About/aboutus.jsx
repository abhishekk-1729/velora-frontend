import React from "react";
import "./about.css"

function About() {
  return (
<div className=" md:mx-16 p-16 text-[#ffffff] my-10">
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
    </div>
  );
}

// export default About;
// import React from 'react'

// function About() {
//   return (
//     <div>
      
//     </div>
//   )
// }

export default About
