import { ImageModel } from "./image-model";

export type AuthorModel = {
  name: string;
  surname: string;
  image?: ImageModel;
};
