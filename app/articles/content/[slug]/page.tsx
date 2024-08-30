"use client";

import { useEffect, useState } from "react";
import Token from "@/utility/token";

interface Article {
  id: number;
  title: string;
  slug: string;
  metaTitle: string;
  content: string;
  readTimeAsMin: number;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  tags: string;
  isVisible: boolean;
  isDraft: boolean;
  savedByUser: boolean;
  likedByUser: boolean;
}

interface ApiResponse {
  message: string | null;
  data: {
    article: Article;
  };
}

export default function ReadArticle({ params }: { params: any }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`/api/articles/read/${params.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setArticle(data.data.article);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, []);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div className=" w-screen h-screen mt-28">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}
