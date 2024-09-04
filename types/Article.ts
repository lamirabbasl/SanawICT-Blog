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

export interface ArticlesResponse {
  data: {
    temp: Article[];
  };
}

export interface Category {
  id: number;
  name: string;
  articles: Article[];
}
