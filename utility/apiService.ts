import api from "@/app/api/api";
import Token from "@/utility/token";
import { ArticlesResponse } from "@/types/Article";

export const fetchArticles = async () => {
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

export const fetchNotifications = async () => {
  const response = await fetch(`${api.notifications}`, {
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

export const deleteCategory = async (categoryId: number): Promise<void> => {
  const response = await fetch(`${api.deleteCategory}${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const createCategory = async (name: string): Promise<void> => {
  const response = await fetch(`${api.createCategory}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const editCategory = async ({
  name,
  id,
}: {
  name: string;
  id: number;
}): Promise<void> => {
  const response = await fetch(`${api.editCategory}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const fetchViolationReports = async () => {
  const response = await fetch(`${api.violationReports}`, {
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

export const createViolationReportCase = async (
  name: string
): Promise<void> => {
  const response = await fetch(`${api.createViolationReportsCase}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const deleteViolationReportCase = async (id: number): Promise<void> => {
  const response = await fetch(`${api.createViolationReportsCase}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const editViolationReportCase = async ({
  name,
  id,
}: {
  name: string;
  id: number;
}): Promise<void> => {
  const response = await fetch(`${api.editViolationReportsCase}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const fetchSearchArticleQuery = async (searchQuery: string | null) => {
  if (!searchQuery) {
    return {
      data: {
        articles: [], // Return an empty articles array if query is invalid or empty
      },
    };
  }

  const response = await fetch(
    `${api.articleSearch}${encodeURIComponent(searchQuery)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  // Ensure data has a consistent structure
  return (
    data || {
      data: {
        articles: [], // Fallback to an empty array if no articles are found
      },
    }
  );
};

export const fetchArticleComments = async (articleId: any) => {
  const response = await fetch(`${api.articleComments}${articleId}`, {
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

export const fetchUserProfile = async (userId: any) => {
  const response = await fetch(`${api.usersProfile}${userId}`, {
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

export const followUser = async (userId: any): Promise<void> => {
  const response = await fetch(`${api.followUser}${userId}`, {
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
