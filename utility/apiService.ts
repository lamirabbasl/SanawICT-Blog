import api from "@/app/api/api";
import Token from "@/utility/token";

export interface Article {
  id: number;
  title: string;
  metaTitle: string;
  isVisible: boolean;
  isLiked: boolean;
  likeCount: number;
  userAvatar?: string;
  tags?: [string];
  isDraft: boolean;
  savedByUser: boolean;
  likedByUser: boolean;
  author: {
    username: string;
    avatar?: string;
  };
  readTimeAsMin: number;
}

interface ArticlesResponse {
  data: {
    articles: Article[];
  };
}

export const fetchArticles = async (): Promise<ArticlesResponse> => {
  const response = await fetch(api.articles, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const likeArticle = async (articleId: number): Promise<void> => {
  const response = await fetch(`${api.like}${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const unlikeArticle = async (articleId: number): Promise<void> => {
  const response = await fetch(`${api.lunike}${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const fetchCategories = async () => {
  const response = await fetch(`${api.categories}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchProfile = async () => {
  const response = await fetch(`${api.profile}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const saveArticle = async (articleId: number): Promise<void> => {
  const response = await fetch(`${api.save}${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const unsaveArticle = async (articleId: number): Promise<void> => {
  const response = await fetch(`${api.unsave}${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const fetchPopular = async () => {
  const response = await fetch(`${api.popular}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchMostViewd = async () => {
  const response = await fetch(`${api.mostviewed}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
