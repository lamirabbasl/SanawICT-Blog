import Articles from "@/components/Articles";
import React from "react";

function page() {
  return (
    <div className="flex flex-row-reverse justify-between w-full h-full ">
      <Articles />
      <div></div>
    </div>
  );
}

export default page;
