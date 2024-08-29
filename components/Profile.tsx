"use client";

import { useGetProfile } from "@/hooks/useArticles";
import Image from "next/image";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import Articles from "./Articles";
import Notifications from "./Notifications";

function Profile() {
  const { data, isLoading, isError } = useGetProfile();
  const [tab, setTab] = useState("articles");

  if (isLoading) {
    return <p>Loading...</p>; // or a spinner
  }

  if (isError) {
    return <p>Error loading profile. Please try again later.</p>;
  }

  const profile = data?.data?.user;

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-screen h-1/2 shadow-sm bg-gray-100 gap-7">
        <div className="flex flex-col items-center justify-center gap-1 ">
          {profile?.avatar ? (
            <Image
              width={50}
              height={50}
              src={profile.avatar}
              alt=""
              className=""
            />
          ) : (
            <div className="border-2 rounded-full p-3 border-gray-400 cursor-pointer">
              <IoPersonAddSharp className="text-[40px] pr-1 text-gray-400" />
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
            <p>تغییر پروفایل</p>
            <IoMdSettings className="" />
          </div>
        </button>
        <div className="flex flex-row-reverse absolute justify-center mt-[350px] items-center gap-7 text-[15px]">
          <div
            className={
              tab == "articles"
                ? "border-b-2 border-black pb-[12px] font-bold  cursor-pointer"
                : "pb-[12px] cursor-pointer"
            }
            key={"articles"}
            onClick={() => setTab("articles")}
          >
            <p>مقاله ها</p>
          </div>
          <div
            className={
              tab == "saved"
                ? "border-b-2 border-black pb-[12px] font-bold  cursor-pointer"
                : "pb-[12px] cursor-pointer"
            }
            key={"saved"}
            onClick={() => setTab("saved")}
          >
            <p>ذخیره شده ها</p>
          </div>
          <div
            className={
              tab == "notif"
                ? "border-b-2 border-black pb-[12px] font-bold cursor-pointer"
                : "pb-[12px] cursor-pointer"
            }
            key={"notif"}
            onClick={() => setTab("notif")}
          >
            <p>اطلاعیه ها</p>
          </div>
        </div>
      </div>
      <div className=" flex justify-center pl-[100px] items-centerw-screen h-full ">
        {tab == "articles" ? (
          <Articles />
        ) : tab == "saved" ? (
          <Articles />
        ) : (
          <Notifications />
        )}
      </div>
    </div>
  );
}

export default Profile;
