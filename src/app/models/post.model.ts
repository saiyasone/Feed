import { IntrefaceProfile } from "./profile.model";

export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  creator: IntrefaceProfile;
  date: string;
  createdAt: string;
  updatedAt: string;
}
