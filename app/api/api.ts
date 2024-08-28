const api = {
  popular: `${process.env.NEXT_PUBLIC_API}/articles/popularArticles`,
  categories: `${process.env.NEXT_PUBLIC_API}/categories`,
  articles: `${process.env.NEXT_PUBLIC_API}/articles`,
  like: `${process.env.NEXT_PUBLIC_API}/articles/like/`,
  lunike: `${process.env.NEXT_PUBLIC_API}/articles/unlike/`,
  save: `${process.env.NEXT_PUBLIC_API}/articles/save/`,
  unsave: `${process.env.NEXT_PUBLIC_API}/articles/unsave/`,
  profile: `${process.env.NEXT_PUBLIC_API}/users/profile`,
  mostviewed: `${process.env.NEXT_PUBLIC_API}/user/mostViewedArticles`,
  violationReportCases: `${process.env.NEXT_PUBLIC_API}/violationReportCases/cases`,
  articleReport: `${process.env.NEXT_PUBLIC_API}/articles/report/`,
  articlePage: `${process.env.NEXT_PUBLIC_API}/articles/read/`,
  articleSearch: `${process.env.NEXT_PUBLIC_API}/articles/search?query=`,
};
export default api;
