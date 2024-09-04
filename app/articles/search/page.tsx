"use client";

import { useState } from "react";
import {
  useGetSearchArticle,
  useLikeArticle,
  useUnlikeArticle,
  useSaveArticle,
  useUnsaveArticle,
} from "@/hooks/useReactQuery";
import { MdPerson, MdMoreVert } from "react-icons/md";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Article } from "@/types/Article";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Report from "@/components/Report";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { data, isLoading, isError } = useGetSearchArticle(query);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [reportArticleId, setReportArticleId] = useState<number | null>(null);

  const likeArticleMutation = useLikeArticle();
  const unlikeArticleMutation = useUnlikeArticle();
  const saveArticleMutation = useSaveArticle();
  const unsaveArticleMutation = useUnsaveArticle();
  const queryClient = useQueryClient();

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const openModal = (articleId: number) => {
    setReportArticleId(articleId);
  };

  const closeModal = () => {
    setReportArticleId(null);
  };

  const handleToggleLike = (article: Article) => {
    if (!data) return;

    const likedByUser = !article.likedByUser;
    const likeCount = likedByUser
      ? article.likeCount + 1
      : article.likeCount - 1;

    queryClient.setQueryData(["searchArticle", query], (oldData: any) => {
      return oldData
        ? {
            ...oldData,
            data: {
              ...oldData.data,
              temp: oldData.data.temp.map((a: any) =>
                a.id === article.id ? { ...a, likedByUser, likeCount } : a
              ),
            },
          }
        : oldData;
    });

    if (likedByUser) {
      likeArticleMutation.mutate(article.id, {
        onError: () => {
          queryClient.setQueryData(["searchArticle", query], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    temp: oldData.data.temp.map((a: any) =>
                      a.id === article.id
                        ? {
                            ...a,
                            likedByUser: !likedByUser,
                            likeCount: article.likeCount,
                          }
                        : a
                    ),
                  },
                }
              : oldData;
          });
        },
      });
    } else {
      unlikeArticleMutation.mutate(article.id, {
        onError: () => {
          queryClient.setQueryData(["searchArticle", query], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    temp: oldData.data.temp.map((a: any) =>
                      a.id === article.id
                        ? {
                            ...a,
                            likedByUser: !likedByUser,
                            likeCount: article.likeCount,
                          }
                        : a
                    ),
                  },
                }
              : oldData;
          });
        },
      });
    }
  };

  const handleToggleSave = (article: Article) => {
    if (!data) return;

    const savedByUser = !article.savedByUser;

    queryClient.setQueryData(["searchArticle", query], (oldData: any) => {
      return oldData
        ? {
            ...oldData,
            data: {
              ...oldData.data,
              temp: oldData.data.temp.map((a: any) =>
                a.id === article.id ? { ...a, savedByUser } : a
              ),
            },
          }
        : oldData;
    });

    if (savedByUser) {
      saveArticleMutation.mutate(article.id, {
        onError: () => {
          queryClient.setQueryData(["searchArticle", query], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    temp: oldData.data.temp.map((a: any) =>
                      a.id === article.id
                        ? { ...a, savedByUser: !savedByUser }
                        : a
                    ),
                  },
                }
              : oldData;
          });
        },
      });
    } else {
      unsaveArticleMutation.mutate(article.id, {
        onError: () => {
          queryClient.setQueryData(["searchArticle", query], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    temp: oldData.data.temp.map((a: any) =>
                      a.id === article.id
                        ? { ...a, savedByUser: !savedByUser }
                        : a
                    ),
                  },
                }
              : oldData;
          });
        },
      });
    }
  };

  if (!query) {
    return <div>Please enter a search query.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex m-auto flex-col w-[600px] max-lg:w-5/6 mt-28 text-right gap-6">
        {Array(3)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="flex w-full border-b-[1px] pb-6 gap-6 mt-0"
            >
              <div className="flex justify-center items-center">
                <Skeleton height={100} width={120} />
              </div>
              <div className="flex flex-col w-full items-end gap-3">
                <div className="flex items-end w-full justify-center flex-col gap-2">
                  <Skeleton width={`80%`} height={20} />
                  <Skeleton width={`60%`} height={15} />
                </div>
                <div className="flex flex-row-reverse mt-5 justify-between w-full items-center">
                  <div className=" absolute mb-[145px]">
                    <Skeleton height={30} width={170} />
                  </div>
                  <div className="flex flex-row-reverse text-right items-center justify-center gap-3">
                    <Skeleton circle height={36} width={36} />
                    <div className="text-[10px]">
                      <Skeleton width={70} height={10} />
                      <Skeleton width={50} height={8} />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <Skeleton circle height={20} width={20} />
                    <Skeleton circle height={20} width={20} />
                    <Skeleton circle height={20} width={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" absolute right-[300px] top-[270px] flex flex-col items-center justify-center h-[300px] w-[300px]">
        <p className="text-red-500 text-lg">Something Went Wrong</p>
      </div>
    );
  }

  const reversedArticles = [...(data?.data.articles || [])].reverse();

  return (
    <div className="relative flex flex-col m-auto mt-32 w-[600px] max-lg:w-5/6 text-right gap-10">
      {reversedArticles.map(
        (article: Article, index: number) =>
          article.isVisible && (
            <div
              className="relative flex flex-row-reverse w-full pb-6 gap-6 mt-3 hover:border-white border-b-[1px] border-gray-300 group"
              key={index}
            >
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-[#3CE1C4] group-hover:w-full group-hover:left-0 transition-all duration-1000 ease-in-out group-hover:animate-border-expand"></span>
              <div className="flex flex-col w-full items-end gap-3">
                <div className="flex items-end w-full justify-center flex-col gap-2">
                  <Link
                    href={`/articles/read/${article.title.replace(
                      /\s+/g,
                      "_"
                    )}`}
                  >
                    <h1 className="font-bold font-sahel text-[15px] cursor-pointer">
                      {article.title}
                    </h1>
                  </Link>
                  <Link
                    href={`/articles/read/${article.title.replace(
                      /\s+/g,
                      "_"
                    )}`}
                  >
                    <p className="text-[10px] text-secondery2 cursor-pointer">
                      {article.metaTitle}
                    </p>
                  </Link>
                </div>
                <div className="flex flex-row-reverse mt-5 justify-between w-full items-center">
                  {/* <Link href={`/profile/${article.author.username}`}>
                    <div className="flex flex-row-reverse text-right items-center justify-center gap-3 cursor-pointer">
                      {article.userAvatar ? (
                        <Image
                          src={article.userAvatar}
                          alt=""
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full"
                        />
                      ) : (
                        <MdPerson className="m-auto" />
                      )}
                      <div className="text-[10px]">
                        <h2>{article.author.username}</h2>
                        <p className="text-[8px] text-secondery2">
                          {article.readTimeAsMin} دقیقه
                        </p>
                      </div>
                    </div>
                  </Link> */}

                  <div className="flex gap-2 justify-center items-center">
                    {article.savedByUser ? (
                      <FaBookmark
                        className="cursor-pointer text-black"
                        onClick={() => handleToggleSave(article)}
                      />
                    ) : (
                      <FaRegBookmark
                        className="cursor-pointer"
                        onClick={() => handleToggleSave(article)}
                      />
                    )}
                    {article.likedByUser ? (
                      <FaHeart
                        className="ml-[6px] cursor-pointer text-red-500"
                        onClick={() => handleToggleLike(article)}
                      />
                    ) : (
                      <FaRegHeart
                        className="ml-[6px] cursor-pointer"
                        onClick={() => handleToggleLike(article)}
                      />
                    )}
                    <p className="absolute text-[9px] ml-5 mt-5">
                      {article.likeCount}
                    </p>
                    <MdMoreVert
                      className="text-[21px] cursor-pointer"
                      onClick={() => toggleDropdown(article.id)}
                    />
                    {openDropdownId === article.id && (
                      <div className="absolute top-[100px] left-[205px]  w-[150px] bg-white border border-gray-300 shadow-md rounded-md z-50">
                        <ul className="text-[12px]">
                          <li
                            className="p-2 cursor-pointer hover:bg-gray-100 border-b-[1px] border-gray-100"
                            onClick={() => {
                              toggleDropdown(article.id);
                              openModal(article.id);
                            }}
                          >
                            گزارش تخلف
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {0 && !isError ? (
                  <Link
                    href={`/articles/read/${article.title.replace(
                      /\s+/g,
                      "_"
                    )}`}
                  >
                    <Image
                      width={159}
                      height={150}
                      src={""}
                      alt=""
                      className="h-[150px] w-[150px] cursor-pointer"
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/articles/read/${article.title.replace(
                      /\s+/g,
                      "_"
                    )}`}
                  >
                    <div className="bg-secondery h-[100px] w-[120px] cursor-pointer"></div>
                  </Link>
                )}
              </div>
              {reportArticleId === article.id && (
                <Report articleId={article.id} onClose={closeModal} />
              )}
            </div>
          )
      )}
    </div>
  );
};

export default SearchPage;
