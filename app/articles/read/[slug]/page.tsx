"use client";

import { useGetArticlePage } from "@/hooks/useReactQuery";
import { useEffect, useState } from "react";
import Token from "@/utility/token";

function Page({ params }: { params: any }) {
  const { data, isError, isLoading } = useGetArticlePage(params.slug);

  if (isLoading) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-row-reverse w-screen h-screen">
      <div className=" flex flex-col w-2/3 h-screen items-end mr-28 gap-16 justify-start pt-[120px]  border-l-[2px]">
        <h1 className=" font-vazir text-5xl">{data.data.article.title}</h1>
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: data.data.article.content }}
        />
      </div>
      <div>
        <div className=" w-1/3 h-screen mt-28"></div>
      </div>
    </div>
  );
}

export default Page;
