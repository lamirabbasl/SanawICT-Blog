import React from "react";
import dynamic from "next/dynamic";
const Ckeditor = dynamic(() => import("@/components/Ckeditor"), { ssr: false });

function Page() {
  return (
    <div>
      <Ckeditor />
    </div>
  );
}

export default Page;
