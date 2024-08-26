"use client";

import { useGetPopular } from "@/hooks/useArticles";

function Popular() {
  const { data, isLoading, isError, refetch } = useGetPopular();

  return (
    <div className="fixed flex flex-col  items-center top-[150px] left-0 w-[40%] ">
      <h1 className="mx-auto mt-6 font-bold">محبوب ترین ها</h1>
      <div className="flex flex-col pt-3 w-[400px] text-right  overflow-auto h-[200px] custom-scrollbar">
        {data?.data?.temp?.map((article: any, index: any) => (
          <div
            className="flex flex-row-reverse w-full border-b-[1px] pb-2 justify-between items-center mt-3 pr-4 cursor-pointer"
            key={index}
          >
            <h1 className="font-bold text-[12px] cursor-pointer">
              {article?.title}
            </h1>
            <div className="flex justify-center items-center">
              {article.avatar && !isError ? (
                <img
                  src={article?.author?.avatar}
                  alt=""
                  className="h-[50px] w-[70px] cursor-pointer"
                />
              ) : (
                <div className="bg-secondery h-[40px] w-[60px] cursor-pointer"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
