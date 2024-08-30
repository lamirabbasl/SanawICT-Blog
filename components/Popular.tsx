"use client";

import { useGetPopular } from "@/hooks/useReactQuery";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function Popular() {
  const { data, isLoading, isError, refetch } = useGetPopular();

  if (isLoading)
    return (
      <div className="fixed flex flex-col  items-center top-[150px] left-0 w-[40%] ">
        <h1 className="mx-auto mt-6 font-bold">محبوب ترین ها</h1>
        <div className="flex flex-col pt-3 w-[400px] text-right  overflow-auto h-[200px] custom-scrollbar">
          {Array(3)
            .fill("")
            .map((_, index: any) => (
              <div
                className="flex flex-row-reverse w-full border-b-[1px] pb-2 justify-between items-center mt-3 pr-4 cursor-pointer"
                key={index}
              >
                <Skeleton height={15} width={100} />
                <Skeleton height={40} width={60} />
              </div>
            ))}
        </div>
      </div>
    );

  return (
    <div className="fixed flex flex-col  items-center top-[150px] left-0 w-[40%] ">
      <h1 className="mx-auto mt-6 font-bold">محبوب ترین ها</h1>
      <div className="flex flex-col pt-3 w-[400px] text-right  overflow-auto h-[200px] custom-scrollbar">
        {data?.data?.temp?.map((article: any, index: any) => (
          <Link href={`/articles/read/${article.id}`} key={index}>
            <div
              className="flex flex-row-reverse w-full border-b-[1px] pb-2 justify-between items-center mt-3 pr-4 cursor-pointer  hover:text-green-700"
              key={index}
            >
              <h1 className="font-bold text-[12px] cursor-pointer">
                {article?.title}
              </h1>
              <div className="flex justify-center items-center">
                {article.avatar && !isError ? (
                  <Image
                    width={70}
                    height={50}
                    src={article?.author?.avatar}
                    alt=""
                    className="h-[50px] w-[70px] cursor-pointer"
                  />
                ) : (
                  <div className="bg-secondery h-[40px] w-[60px] cursor-pointer"></div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Popular;
