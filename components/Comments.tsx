"use client";

import { MdPerson, MdMoreVert } from "react-icons/md";
import { useGetArticleComment } from "@/hooks/useReactQuery";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

function Comments({ id }: { id: number }) {
  const { data, isError, isLoading } = useGetArticleComment(id);

  if (isLoading) return <div>loading</div>;
  return (
    <div className="flex w-full flex-col  gap-3 justify-center mt-6 items-center">
      <p className="font-vazir text-xl">نظرات</p>

      {data.data.comments.map(
        (comment: any, index: number) =>
          comment.isVisible && (
            <div
              className=" flex p-3 flex-col items-end border-2 gap-3 w-full"
              key={index}
            >
              <div className=" flex  mr-3 justify-between w-full items-center">
                <div className="flex  relative justify-center items-center gap-3 ml-3">
                  <MdMoreVert className="text-[26px]" />
                  <p className=" absolute -right-2 -bottom-1 text-xs">
                    {comment.likeCount}
                  </p>
                  <FaHeart />
                </div>
                <Link href={`/users/profile/${comment.user.id}`}>
                  <div className=" flex justify-center items-center gap-2">
                    <p className="text-blue-500">{comment.user.username}</p>
                    {comment.user.avatar ? (
                      <Image
                        src={comment.user.avatar}
                        width={200}
                        height={200}
                        alt=""
                      />
                    ) : (
                      <MdPerson className="text-[33px]" />
                    )}
                  </div>
                </Link>
              </div>
              <div>
                <p className=" mr-10">{comment.content}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default Comments;
