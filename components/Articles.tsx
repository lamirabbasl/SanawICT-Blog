"use client";

import {
  useArticles,
  useLikeArticle,
  useUnlikeArticle,
  useSaveArticle,
  useUnsaveArticle,
} from "@/hooks/useArticles";
import { MdPerson } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { Article } from "@/utility/apiService";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Articles() {
  const { data, isLoading, isError } = useArticles();
  const likeArticleMutation = useLikeArticle();
  const unlikeArticleMutation = useUnlikeArticle();
  const saveArticleMutation = useSaveArticle();
  const unsaveArticleMutation = useUnsaveArticle();
  const queryClient = useQueryClient();

  const handleToggleLike = (article: Article) => {
    if (!data) return;

    const likedByUser = !article.likedByUser;
    const likeCount = likedByUser
      ? article.likeCount + 1
      : article.likeCount - 1;

    queryClient.setQueryData(["articles"], (oldData: any) => {
      return oldData
        ? {
            ...oldData,
            data: {
              ...oldData.data,
              articles: oldData.data.articles.map((a: any) =>
                a.id === article.id ? { ...a, likedByUser, likeCount } : a
              ),
            },
          }
        : oldData;
    });

    if (likedByUser) {
      likeArticleMutation.mutate(article.id, {
        onError: () => {
          // Revert on error
          queryClient.setQueryData(["articles"], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    articles: oldData.data.articles.map((a: any) =>
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
          // Revert on error
          queryClient.setQueryData(["articles"], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    articles: oldData.data.articles.map((a: any) =>
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

    // Optimistically update the UI
    queryClient.setQueryData(["articles"], (oldData: any) => {
      return oldData
        ? {
            ...oldData,
            data: {
              ...oldData.data,
              articles: oldData.data.articles.map((a: any) =>
                a.id === article.id ? { ...a, savedByUser } : a
              ),
            },
          }
        : oldData;
    });

    if (savedByUser) {
      saveArticleMutation.mutate(article.id, {
        onError: () => {
          // Revert on error
          queryClient.setQueryData(["articles"], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    articles: oldData.data.articles.map((a: any) =>
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
          // Revert on error
          queryClient.setQueryData(["articles"], (oldData: any) => {
            return oldData
              ? {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    articles: oldData.data.articles.map((a: any) =>
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

  if (isLoading) {
    return (
      <div className="flex flex-col mr-[200px] pt-10 w-[600px] text-right gap-6">
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

  return (
    <div className="flex flex-col mr-[200px] pt-10 w-[600px] text-right gap-6">
      {data?.data.articles.map(
        (article: Article, index: number) =>
          article.isVisible && (
            <div
              className="flex flex-row-reverse w-full border-b-[1px] pb-6 gap-6 mt-5"
              key={index}
            >
              <div className="flex flex-col w-full items-end gap-3">
                <div className="flex items-end w-full justify-center flex-col gap-2">
                  <h1 className="font-bold font-sahel text-[15px] cursor-pointer">
                    {article.title}
                  </h1>
                  <p className="text-[10px] text-secondery2 cursor-pointer">
                    {article.metaTitle}
                  </p>
                </div>
                <div className="flex flex-row-reverse mt-5 justify-between w-full items-center">
                  <div className="flex flex-row-reverse text-right items-center justify-center gap-3 cursor-pointer">
                    {article.userAvatar ? (
                      <img
                        src={article.userAvatar}
                        alt=""
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
                  <div className="flex gap-2 justify-center items-center">
                    {article.savedByUser ? (
                      <FaBookmark
                        className="cursor-pointer text-yellow-500"
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
                    <MdMoreVert className="text-[21px] cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {article.author.avatar && !isError ? (
                  <img
                    src={article.author.avatar}
                    alt=""
                    className="h-[150px] w-[150px] cursor-pointer"
                  />
                ) : (
                  <div className="bg-secondery h-[100px] w-[120px] cursor-pointer"></div>
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default Articles;
