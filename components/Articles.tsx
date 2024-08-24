"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/api";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

function Articles() {
  const {
    data = {
      title: "سرویس ها کلود در توسعه برنامه های تحت وب",
      metaTitle:
        "امروزه در دنیای کلود سرویس ها متفاوتی درحال توسعه هستند که بسیاری ار آن ها مربوط به برنامه های تحت وب و ...",
    },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["aticles"],
    queryFn: async () => await fetch(api.profile).then((res) => res.json()),
  });

  return (
    <div className=" mr-[333px] pt-10 w-[500px]  max-h-[150px] text-right">
      <div className=" flex flex-row-reverse w-full border-b-[1px] pb-3">
        <div className="flex flex-col w-full items-end gap-3">
          <div className=" flex items-end w-full justify-center flex-col gap-2">
            <h1 className=" font-bold font-sahel text-[15px] ">
              {data?.title}
            </h1>
            <p className="text-[10px] text-secondery2">{data.metaTitle}</p>
          </div>
          <div className="flex flex-row-reverse mt-5 justify-between w-full  items-center ">
            <div className=" flex flex-row-reverse text-right justify-center gap-3 ">
              <MdPerson className=" m-auto" />
              <div className="text-[10px]">
                <h2> رضا وحیدی</h2>
                <p className="text-[8px] text-secondery2">۱دقیقه</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <FaRegBookmark className="cursor-pointer" />
              <FaRegHeart className=" ml-[6px] cursor-pointer" />
              <MdMoreVert className="text-[21px] cursor-pointer " />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-secondery  h-[100px] mr-4 w-[120px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
