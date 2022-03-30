import { PageModel } from "./page-model";

export type MenuModel = {
  id: string;
  title: string;
  createdAt: Date;
  order?: number;
  page?: PageModel;
  url?: string;
};
