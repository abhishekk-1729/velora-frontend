import React from "react";

function Header({setShowHeader}) {
  return (
    <>
      <div className="bg-[#30363D] p-3 text-[#9198A1] flex justify-between items-center">
        <div className="flex-grow text-center">
          Get your website with just $899{" "}
          <span className="line-through">$999</span>
        </div>
        <button className="ml-auto" onClick={()=>setShowHeader(false)}>
          <img src="/cross-white.png" alt="Close" height={20} width={20} />
        </button>
      </div>
    </>
  );
}

export default Header;
