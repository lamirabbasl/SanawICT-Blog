"use client";

import { IoIosSearch } from "react-icons/io";
import { api } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";

function Navbar() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await fetch(api.profile).then((res) => res.json()),
  });
  return (
    <div className=" flex flex-row-reverse items-center justify-between h-[100px] w-screen sticky top-0 bg-primary  shadow-md">
      <div className=" text-[23px] mr-12 font-bold">
        <p>
          Sanaw <span className="text-green-500">ICT</span>
        </p>
      </div>
      <div className="flex  justify-center items-center w-[700px] h-full max-lg:w-[300px]   ">
        <form className="w-5/6 h-[39px]  flex justify-center items-center mr-[30px] bg-secondery rounded-[45px] max-lg:h-[30px] max-lg:mr-0 max-lg:ml-6">
          <input
            type="text"
            placeholder="جستجو"
            className="text-right w-full bg-secondery m-auto rounded-[45px] mr-2  placeholder-[#303030] outline-none text-[14px] focus:placeholder-opacity-0  max-lg:h-[30px] max-lg:text-[11px]"
          />
          <IoIosSearch className="text-[20px] mr-4 cursor-pointer max-lg:text-[15px]" />
        </form>
      </div>
      <div className=" flex items-center justify-center ml-10 gap-6">
        {data?.avatar ? (
          <Image
            src={""}
            width={40}
            height={40}
            alt="profile"
            className="bg-black rounded-full"
          />
        ) : (
          <MdPerson className="text-[29px] text-gray-500 " />
        )}
        <MdNotificationsNone className="text-[26px] text-gray-500" />
        <FaRegBookmark className="text-[20px] text-gray-500 " />
      </div>
    </div>
  );
}

export default Navbar;
