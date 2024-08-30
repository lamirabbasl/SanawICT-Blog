"use client";

import { useState } from "react";
import { useGetCategories } from "@/hooks/useReactQuery";

function Categories() {
  const [selected, setSelected] = useState();
  const { data, isLoading, isError, refetch } = useGetCategories();

  return (
    <div className=" sticky top-[90px] flex  items-center flex-row-reverse gap-2 w-screen h-[45px] bg-primary shadow-md pr-6 z-40">
      {data?.data?.categories.map((category: any, index: any) => (
        <div
          className={
            selected == index
              ? " flex rounded-full bg-gray-600 text-white px-3 pt-2 pb-1 cursor-pointer"
              : " flex rounded-full bg-secondery px-3 pt-2 pb-1 cursor-pointer"
          }
          key={index}
          onClick={() => setSelected(index)}
        >
          <p className=" text-center text-[12px]">{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;
