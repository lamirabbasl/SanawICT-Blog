"use client";

import Image from "next/image";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { useGetProfile } from "@/hooks/useReactQuery";
import Searchbar from "./Searchbar";
import Link from "next/link";

function Navbar({ simple }: { simple?: boolean }) {
  const { data, isLoading, isError, refetch } = useGetProfile();
  return (
    <div
      className={
        simple
          ? " flex flex-row-reverse items-center justify-between h-[50px] w-screen fixed top-0 bg-primary shadow-md z-50"
          : " flex flex-row-reverse items-center justify-between h-[90px] w-screen fixed top-0 bg-primary shadow-sm z-50"
      }
    >
      <div className=" text-[23px] mr-12 font-bold cursor-pointer">
        <Link href={"/"}>
          <p>
            Sanaw <span className="text-[#3CE1C4]">ICT</span>
          </p>
        </Link>
      </div>
      {simple ? <></> : <Searchbar />}

      <div className=" flex items-center justify-center ml-10 gap-6">
        <Link href={"/profile/me"}>
          {data?.data.user.avatar ? (
            <Image
              src={""}
              width={40}
              height={40}
              alt="profile"
              className="bg-black rounded-full"
            />
          ) : (
            <MdPerson className="text-[29px] text-gray-500 cursor-pointer " />
          )}
        </Link>
        <MdNotificationsNone className="text-[26px] text-gray-500 cursor-pointer " />
        <FaRegBookmark className="text-[20px] text-gray-500 cursor-pointer " />
      </div>
    </div>
  );
}

export default Navbar;
