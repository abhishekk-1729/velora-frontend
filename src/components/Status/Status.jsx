import React from "react";
import Navbar from "../Navbar/Navbar";

function Status() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="mx-8 lg:mx-32 my-16 text-[#ffffff]">
        <div className="text-center text-[60px]">Status</div>
        <div className="flex justify-center">
          <div className="text-center text-[20px] border border-dotted inline-block p-4">
            5/15 Completed
          </div>
        </div>
        <div className="mt-8 py-8 relative flex items-center justify-between gap-2">
          <div className="flex flex-col items-center text-[#15B886]">
            <img src="/tick-green.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>

          <div className="flex-1 h-[2px] bg-[#15B886]"></div>

          <div className="flex flex-col items-center text-[#15B886]">
            <img src="/tick-green.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>

          <div className="flex-1 h-[2px] bg-[#15B886]"></div>

          <div className="flex flex-col items-center text-[#15B886]">
            <img src="/tick-green.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>

          <div className="flex-1 h-[2px] bg-[#15B886]"></div>

          <div className="flex flex-col items-center text-[#15B886] ">
            <img src="/tick-green.svg" alt="" height={50} width={50} />
            <p className="text mt-2">Web Development</p>
            <p className="text mt-2">To be completed</p>
          </div>

          <div className="flex-1 h-[2px] bg-[#15B886]"></div>
          <div className="absolute bottom-0 right-0 h-1/2 w-[2px] bg-[#15B886]"></div>
        </div>

        <div className="py-20 border-r-2 border-[#15B886]">{/* Content */}</div>

        <div className="py-8 relative flex items-center justify-between gap-2 ">
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#15B886]">
            <img src="/tick-green.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#15B886]"></div>


          <div className="absolute top-0 right-0 h-1/2 w-[2px] bg-[#15B886]"></div>
          <div className="absolute bottom-0 left-0 h-1/2 w-[2px] bg-[#ffffff]"></div>
        </div>

        <div className="py-20 border-l-2">{/* Content */}</div>

        <div className="py-8 relative flex items-center justify-between gap-2">
          {/* First Border */}
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="flex-1 h-[2px] bg-[#ffffff]"></div>
          <div className="flex flex-col items-center text-[#ffffff]">
            <img src="/tick-white.svg" alt="" height={50} width={50} />
            <p className=" mt-2">Web Development</p>
            <p className=" mt-2">24th July 2025 11:59PM</p>
          </div>
          <div className="absolute top-0 left-0 h-1/2 w-[2px] bg-[#ffffff]"></div>
        </div>


        <div className="lg:px-64 m-8 ">
          <button
                      onClick={()=>{}} // Call the function on button click
                      className="hero_cta_signup_content  w-full p-4 rounded-lg bg-[#783EC7] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#FFFFFF]">
                          Pay Remaining: 800$
                        </h4>
                      </div>
            </button>
          </div>
        <div className="lg:px-64 m-8 ">
          <button
                      onClick={()=>{}} // Call the function on button click
                      className="hero_cta_signup_content border border-[#783EC7] w-full p-4 rounded-lg bg-[#0D1116] items-center lg:rounded-md hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 ease-in-out"
                    >
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[16px] text-[#ffffff]">
                          Get Website Link
                        </h4>
                      </div>
            </button>
          </div>
          {
            <div className="flex justify-center">
                Link is: https://ramukiwebsite.com
            </div>
          }
          

     

      </div>
    </>
  );
}

export default Status;
