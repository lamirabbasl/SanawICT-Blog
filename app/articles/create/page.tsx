import React from "react";
import dynamic from "next/dynamic";
const Ckeditor = dynamic(() => import("@/components/Ckeditor"), { ssr: false });

function Page() {
  return (
    <div className=" w-screen h-screen mt-28">
      <Ckeditor />
    </div>
  );
}

export default Page;
