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
    temp: Article[];
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

export const fetchViolationReportCases = async () => {
  const response = await fetch(`${api.violationReportCases}`, {
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

export const reportArticle = async ({
  articleId,
  description,
  violationReportCaseId,
}: {
  articleId: number;
  description: string;
  violationReportCaseId: number;
}): Promise<void> => {
  const body = {
    description,
    violationReportCaseId,
    articleId,
  };

  const response = await fetch(`${api.articleReport}${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to report article");
  }
};

export const fetchArticlePage = async (articleSlug: any) => {
  const response = await fetch(`${api.articlePage}${articleSlug}`, {
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

export const fetchSearchArticle = async (searchQuery: any) => {
  const response = await fetch(`${api.articlePage}${searchQuery}`, {
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

export const createArticle = async ({
  title,
  metaTitle,
  content,
  tags,
  readTimeAsMin,
  categoryId,
}: {
  title: string;
  metaTitle: string;
  content: string;
  tags: string;
  readTimeAsMin: number;
  categoryId: number;
}): Promise<void> => {
  const response = await fetch(`${api.createArticle}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      title,
      metaTitle,
      content: content,
      tags,
      readTimeAsMin,
      categoryId,
    }),
  });

  if (response.ok) {
    console.log("Content saved successfully!");
  } else {
    throw new Error("Failed to save content.");
  }
};
