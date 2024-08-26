import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchArticles,
  fetchCategories,
  fetchPopular,
  fetchProfile,
  likeArticle,
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
    queryKey: ["cprofile"],
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
