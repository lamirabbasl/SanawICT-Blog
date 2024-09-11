"use client";

import { useGetPopular, useGetUserProfile } from "@/hooks/useReactQuery";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Article } from "@/types/Article";

function UserArticle({ id }: { id: any }) {
  const { data, isLoading, isError, refetch } = useGetUserProfile(id);

  if (isLoading) {
    return (
      <div className=" flex flex-col items-center ">
        <h1 className="mx-auto mt-6 font-bold">محبوب ترین ها</h1>
        <div className="flex flex-col pt-3 w-[400px] text-right overflow-auto h-[200px] custom-scrollbar">
          {Array(7)
            .fill("")
            .map((_, index: number) => (
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
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col pt-3 w-[500px] text-right overflow-auto">
        {data?.data.user.articles.map((article: any, index: number) => (
          <Link href={`/articles/read/${article.slug}`} key={index}>
            <div
              className="flex flex-row-reverse w-full border-b-[1px] pb-2 justify-between items-center mt-3 pr-4 cursor-pointer hover:text-[#3f9686]"
              key={index}
            >
              <h1 className="font-bold text-[12px] cursor-pointer">
                {article?.title}
              </h1>
              <div className="flex justify-center items-center">
                {0 && !isError ? (
                  <Image
                    width={70}
                    height={50}
                    src={""}
                    alt="author's avatar"
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

export default UserArticle;
