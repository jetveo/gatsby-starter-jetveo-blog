import { ImageModel } from "./image-model";

export type SettingModel = {
  id: string;
  createdAt: Date;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultMetaKeywords?: string;
  author: string;
  logo?: ImageModel;
  homePageImage: ImageModel;
};
