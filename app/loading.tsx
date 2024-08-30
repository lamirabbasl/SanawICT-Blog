import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center w-screen h-screen max-lg:w-screen">
      <div className="relative inline-flex">
        <div className="w-12 h-12 bg-[#3CE1C4] rounded-full"></div>
        <div className="w-12 h-12 bg-[#3CE1C4] rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-12 h-12 bg-[#3CE1C4] rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
}

export default loading;
