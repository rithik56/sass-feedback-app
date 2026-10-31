export type Category = "feature" | "ui" | "ux" | "enhancement" | "bug";

export type RoadmapStatus = "planned" | "in-progress" | "live";

export type Status = "suggestion" | RoadmapStatus;

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

export interface ProductRequest {
  id: number;
  title: string;
  category: Category;
  upvotes: number;
  status: Status;
  description: string;
  comments?: Comment[];
}

export interface FeedbackData {
  currentUser: User;
  productRequests: ProductRequest[];
}
