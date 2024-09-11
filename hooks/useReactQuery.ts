import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  createCategory,
  createViolationReportCase,
  deleteCategory,
  deleteViolationReportCase,
  editCategory,
  editViolationReportCase,
  fetchArticleComments,
  fetchArticlePage,
  fetchArticles,
  fetchCategories,
  fetchNotifications,
  fetchPopular,
  fetchProfile,
  fetchSearchArticle,
  fetchSearchArticleQuery,
  fetchUserProfile,
  fetchViolationReportCases,
  fetchViolationReports,
  followUser,
  likeArticle,
  reportArticle,
  saveArticle,
  unlikeArticle,
  unsaveArticle,
} from "@/utility/apiService";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });
};

export const useLikeArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUnlikeArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};

export const useSaveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUnsaveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsaveArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useGetPopular = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: fetchPopular,
  });
};

export const useGetMostViewed = () => {
  return useQuery({
    queryKey: ["mostViewed"],
    queryFn: fetchPopular,
  });
};

export const useReportArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      articleId: number;
      description: string;
      violationReportCaseId: number;
    }) => reportArticle(variables),
    onSuccess: () => {},
  });
};

export const useGetArticlePage = (articleSlug: any) => {
  return useQuery({
    queryKey: ["articlePage", articleSlug],
    queryFn: () => fetchArticlePage(articleSlug),
  });
};

export const useGetSearchArticle = (searchQuery: any) => {
  return useQuery({
    queryKey: ["searchArticle"],
    queryFn: () => fetchSearchArticleQuery(searchQuery),
  });
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: (variables: {
      title: string;
      metaTitle: string;
      content: string;
      tags: string;
      readTimeAsMin: number;
      categoryId: number;
    }) => createArticle(variables),
  });
};

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { name: string; id: number }) =>
      editCategory(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useGetViolationReports = () => {
  return useQuery({
    queryKey: ["violationReportsCases"],
    queryFn: fetchViolationReports,
  });
};

export const useCreateViolationReportCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createViolationReportCase(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violationReportCases"] });
    },
  });
};

export const useDelteViolationReportCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteViolationReportCase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violationReportCases"] });
    },
  });
};

export const useEditeViolationReportCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { name: string; id: number }) =>
      editViolationReportCase(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violationReportCases"] });
    },
  });
};

export const useGetViolationReportCases = () => {
  return useQuery({
    queryKey: ["violationReportCases"],
    queryFn: fetchViolationReportCases,
  });
};

export const useGetArticleComment = (articleId: number) => {
  return useQuery({
    queryKey: ["articlePage", articleId],
    queryFn: () => fetchArticleComments(articleId),
  });
};

export const useGetUserProfile = (userId: any) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: any) => followUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follows"] });
    },
  });
};
