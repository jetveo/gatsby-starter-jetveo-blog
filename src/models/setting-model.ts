import { ImageModel } from "./image-model";

export type SettingModel = {
  id: string;
  createdAt: Date;
  defaultTitle?: string;
  defaultMetaDescription?: string;
  defaultMetaKeywords?: string;
  author: string;
  headerImage?: ImageModel;
};
