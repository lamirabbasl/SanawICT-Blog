"use client";

import { useGetProfile } from "@/hooks/useReactQuery";
import Image from "next/image";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import ProfileArticle from "./ProfileArticles";

function ArticleProfile() {
  const { data, isLoading, isError } = useGetProfile();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading profile. Please try again later.</p>;
  }

  const profile = data?.data?.user;
  return (
    <div className=" flex flex-col w-full justify-center items-center">
      <div className=" flex  flex-col  justify-center items-center  border-b-[2px]  gap-12 w-5/6 m-auto mt-12">
        <div className="flex flex-col items-center justify-center gap-2 ">
          {profile?.avatar ? (
            <Image
              width={50}
              height={50}
              src={profile.avatar}
              alt=""
              className=""
            />
          ) : (
            <div className="border-2 rounded-full p-3 border-green-500 cursor-pointer">
              <IoPersonAddSharp className="text-[40px] pr-1 text-green-500" />
            </div>
          )}
          <h1 className="text-[15px] font-extrabold">{profile?.username}</h1>
          <p className="text-[10px] text-gray-600">{profile?.bio}</p>
        </div>
        <div className="text-[14px] flex justify-between items-center gap-10">
          <div className="flex flex-col items-center justify-center">
            <p>دنبال کنندگان</p>
            <span>{profile?.numberOfFollowers}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>دنبال شوندگان</p>
            <span>{profile?.numberOfFollowings}</span>
          </div>
        </div>
        <button className="bg-green-500 font-extrabold text-white hover:bg-green-600  w-[150px] h-[29px] rounded-full">
          <div className="flex justify-center items-center gap-2">
            <p>دنبال کردن</p>
            <IoMdSettings className="" />
          </div>
        </button>
        <div
          className="border-b-2 border-black pb-[12px] font-bold  cursor-pointer"
          key={"articles"}
        >
          <p>بیشتر بخوانید</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <ProfileArticle />
      </div>
    </div>
  );
}

export default ArticleProfile;
