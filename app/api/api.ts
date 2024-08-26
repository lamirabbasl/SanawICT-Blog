const api = {
  popular: `${process.env.NEXT_PUBLIC_API}/articles/popularArticles`,
  categories: `${process.env.NEXT_PUBLIC_API}/categories`,
  articles: `${process.env.NEXT_PUBLIC_API}/articles`,
  like: `${process.env.NEXT_PUBLIC_API}/articles/like/`,
  lunike: `${process.env.NEXT_PUBLIC_API}/articles/unlike/`,
  save: `${process.env.NEXT_PUBLIC_API}/articles/save/`,
  unsave: `${process.env.NEXT_PUBLIC_API}/articles/unsave/`,
  profile: `${process.env.NEXT_PUBLIC_API}/user/profile`,
  mostviewed: `${process.env.NEXT_PUBLIC_API}/user/mostViewedArticles`,
};
export default api;
