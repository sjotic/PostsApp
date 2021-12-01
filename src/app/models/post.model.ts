import { Comment } from "./comment.model";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
  username?: string;
  userFullname?: string;
};