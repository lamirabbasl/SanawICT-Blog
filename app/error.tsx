"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
import { TbError404 } from "react-icons/tb";

function error() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-[50px]  max-lg:w-screen max-lg:text-[40px]">
      <TbError404 className="text-[200px] text-green-500" />
      <div className="relative flex flex-col items-center justify-center gap-5">
        <p className="text-black">مشکلی رخداده است</p>
        <Link href={"/"} className=" text-[20px] hover:font-bold">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

export default error;
