import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center ">
      <Image
        className=""
        src={"/404.png"}
        width={200}
        height={200}
        alt="not found"
        priority={true}
      />
      <p className="text-[#96fda9] text-[50px] mt-4">صفحه یافت نشد</p>
      <Link href={"/"} className=" text-[20px] hover:font-bold">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFound;
