"use client";

import {
  useGetArticlePage,
  useLikeArticle,
  useSaveArticle,
  useUnlikeArticle,
  useUnsaveArticle,
} from "@/hooks/useReactQuery";
import { useEffect, useState } from "react";
import { MdPerson, MdMoreVert } from "react-icons/md";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import Report from "@/components/Report";
import Image from "next/image";
import ArticleProfile from "@/components/ArticleProfile";
import Comments from "@/components/Comments";

function Page({ params }: { params: any }) {
  const { data: articles, isError, isLoading } = useGetArticlePage(params.slug);

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

  const handleToggleLike = (article: any) => {
    if (!article) return;

    const likedByUser = !article.likedByUser;
    const likeCount = likedByUser
      ? article.likeCount + 1
      : article.likeCount - 1;

    // Perform optimistic update
    queryClient.setQueryData(["articlePage", article.slug], (oldData: any) => {
      return oldData
        ? {
            ...oldData,
            data: {
              ...oldData.data,
              article: {
                ...oldData.data.article,
                likedByUser,
                likeCount,
              },
            },
          }
        : oldData;
    });

    // Perform the mutation
    if (likedByUser) {
      likeArticleMutation.mutate(article.id, {
        onError: () => {
          // Revert on error
          queryClient.setQueryData(
            ["articlePage", article.slug],
            (oldData: any) => {
              return oldData
                ? {
                    ...oldData,
                    data: {
                      ...oldData.data,
                      article: {
                        ...oldData.data.article,
                        likedByUser: !likedByUser,
                        likeCount: article.likeCount,
                      },
                    },
                  }
                : oldData;
            }
          );
        },
      });
    } else {
      unlikeArticleMutation.mutate(article.id, {
        onError: () => {
          // Revert on error
          queryClient.setQueryData(
            ["articlePage", article.slug],
            (oldData: any) => {
              return oldData
                ? {
                    ...oldData,
                    data: {
                      ...oldData.data,
                      article: {
                        ...oldData.data.article,
                        likedByUser: !likedByUser,
                        likeCount: article.likeCount,
                      },
                    },
                  }
                : oldData;
            }
          );
        },
      });
    }
  };

  const handleToggleSave = (article: any) => {
    if (!article) return;

    const savedByUser = !article.savedByUser;

    // Perform optimistic update
    queryClient.setQueryData(["articlePage", article.slug], (oldData: any) => {
      return oldData
        ? {
            ...oldData,
            data: {
              ...oldData.data,
              article: {
                ...oldData.data.article,
                savedByUser,
              },
            },
          }
        : oldData;
    });

    // Perform the mutation
    if (savedByUser) {
      saveArticleMutation.mutate(article.id, {
        onError: () => {
          // Revert on error
          queryClient.setQueryData(
            ["articlePage", article.slug],
            (oldData: any) => {
              return oldData
                ? {
                    ...oldData,
                    data: {
                      ...oldData.data,
                      article: {
                        ...oldData.data.article,
                        savedByUser: !savedByUser,
                      },
                    },
                  }
                : oldData;
            }
          );
        },
      });
    } else {
      unsaveArticleMutation.mutate(article.id, {
        onError: () => {
          // Revert on error
          queryClient.setQueryData(
            ["articlePage", article.slug],
            (oldData: any) => {
              return oldData
                ? {
                    ...oldData,
                    data: {
                      ...oldData.data,
                      article: {
                        ...oldData.data.article,
                        savedByUser: !savedByUser,
                      },
                    },
                  }
                : oldData;
            }
          );
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-row-reverse w-screen h-screen">
      <div className=" flex flex-col w-[66%] pl-28 h-screen items-end mr-28 gap-16 justify-start pt-[120px]  border-l-[2px]">
        <div>
          <div className="flex flex-row-reverse text-right items-center justify-center gap-3 cursor-pointer">
            {articles.data.article.userAvatar ? (
              <Image
                src={articles.data.article.userAvatar}
                alt=""
                width={36}
                height={36}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <MdPerson className="m-auto text-[39px] " />
            )}
            <div className="text-[20px]">
              <h2>{articles.data.article.author.username}</h2>
              <p className="text-[14px] text-secondery2">
                {articles.data.article.readTimeAsMin} دقیقه
              </p>
            </div>
          </div>
        </div>
        <h1 className=" font-vazir text-3xl">{articles.data.article.title}</h1>
        <div
          className="text-lg p-10 w-full"
          dangerouslySetInnerHTML={{ __html: articles.data.article.content }}
        />
        {/* <div className=" flex w-full z-50 bg-black">
          {data.data.article.tags.map((tag: string, index: number) => (
            <div>tag</div>
          ))}
        </div> */}
        <div className="flex flex-row-reverse items-center justify-between text-[25px] text-gray-400 w-full pl-6  pb-3 border-b-[1px] border-gray-200 ">
          <div className="flex  flex-row-reverse justify-center  items-center gap-5">
            {articles.data.article.likedByUser ? (
              <FaHeart
                className="ml-[6px] cursor-pointer text-red-500"
                onClick={() => handleToggleLike(articles.data.article)}
              />
            ) : (
              <FaRegHeart
                className="ml-[6px] cursor-pointer"
                onClick={() => handleToggleLike(articles.data.article)}
              />
            )}
            <GoComment />
          </div>
          <div className="flex flex-row-reverse text-[22px] gap-5 ">
            <MdContentCopy />
            {articles.data.article.savedByUser ? (
              <FaBookmark
                className="cursor-pointer text-black"
                onClick={() => handleToggleSave(articles.data.article)}
              />
            ) : (
              <FaRegBookmark
                className="cursor-pointer text-white"
                onClick={() => handleToggleSave(articles.data.article)}
              />
            )}
            <MdMoreVert
              className="text-[26px]  cursor-pointer"
              onClick={() => toggleDropdown(articles.data.article.id)}
            />
            {openDropdownId === articles.data.article.id && (
              <div className="absolute top-[100px] left-[205px]  w-[150px] bg-white border border-gray-300 shadow-md rounded-md z-50">
                <ul className="text-[12px]">
                  <li
                    className="p-2 cursor-pointer hover:bg-gray-100 border-b-[1px] border-gray-100"
                    onClick={() => {
                      toggleDropdown(articles.data.article.id);
                      openModal(articles.data.article.id);
                    }}
                  >
                    گزارش تخلف
                  </li>
                </ul>
              </div>
            )}
            {reportArticleId === articles.data.article.id && (
              <Report
                articleId={articles.data.article.id}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center w-full">
          <Comments id={articles.data.article.id} />
        </div>
      </div>
      <div className=" w-1/4 h-screen fixed left-[1%] mt-[75px]">
        <ArticleProfile />
      </div>
    </div>
  );
}

export default Page;
