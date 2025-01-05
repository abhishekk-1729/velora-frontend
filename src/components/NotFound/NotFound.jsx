import React from "react";
import image from "/new.png";

const NotFound = () => {
  return (
    <>
      {" "}
      {/* <Navbar /> */}
      <div className={`my-16 `}>
        <div className="login_image flex justify-center p-2 mb-2">
          <a href="/">
            <img
              src="/company.png"
              alt="Company Logo"
              height={200}
              width={200}
            ></img>
          </a>
        </div>

        <div
          className={`  card  p-2 md:p-20 flex 
          lg:flex-row-reverse
        gap-16 flex-col mx-4 lg:mx-16 items-center`}
        >
          {/* Card Image */}
          <div className="flex card_image lg:w-1/2 items-center justify-center">
            <img
              src={"/4047.png"}
              alt={"Heading_About"}
              className="rounded-md"
              height={600}
              width={600}
            />
          </div>

          {/* Card Content */}
          <div className=" card_content flex flex-col gap-8 lg:w-1/2">
            <div className="card_content_heading">
              <h2
                className={`text-[48px] font-[500] leading-[52px] font-mona-sans font-bold`}
                style={{ color: "#ffffff" }}
              >
                WRONG TURN?
              </h2>
            </div>
            <div className="card_content_text">
              <p
                className="text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
                style={{ color: "#9198a1" }}
              >
                This page has vanished, like a website dream,{" "}
              </p>
              <p
                className="text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
                style={{ color: "#9198a1" }}
              >
                Lost in the code, or so it would seem.{" "}
              </p>
              <p
                className="text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
                style={{ color: "#9198a1" }}
              >
                But fear not, dear builder, don't feel like a fool,{" "}
              </p>
              <p
                className="text-[20px] font-[500] leading-[32px] font-mona-sans text-justify"
                style={{ color: "#9198a1" }}
              >
                Hit that big green button and return to our tool!{" "}
              </p>
            </div>
            <a href="/">
              <div className="flex  ">
                <button
                  // Call the function on button click
                  className="hero_cta_signup_content p-4 w-1/2 rounded-lg bg-[#238636] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                >
                  <div>
                    <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                      Go to Home
                    </h4>
                  </div>
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
