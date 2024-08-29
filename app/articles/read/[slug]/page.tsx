"use client";

import { useGetArticlePage } from "@/hooks/useArticles";

function Page({ params }: { params: any }) {
  const { data, isError, isLoading } = useGetArticlePage(params.slug);
  return (
    <div className=" flex flex-row-reverse w-screen h-screen">
      <div className=" flex flex-col w-2/3 h-screen  border-l-[2px]">
        <div className="w-full h-[150px]"></div>
      </div>
      <div></div>
    </div>
  );
}

export default Page;
