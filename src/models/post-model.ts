import { AuthorModel } from "./author-model";
import { ImageModel } from "./image-model";

export type PostState = "Draft" | "Public";

export type PostModel = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  slug: string;
  createdAt: Date;
  state: PostState;
  author: AuthorModel;
  image?: ImageModel;
};
