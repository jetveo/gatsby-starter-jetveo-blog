import { MenuModel } from "../models/menu-model";

class UrlServiceClass {
  public blog(slug: string) {
    return `/blog/${slug}`;
  }

  public getUrlByMenu(menu: MenuModel, minOrder: number) {
    if (menu) {
      if (menu.order === minOrder) {
        return "/"; // home page
      }

      if (menu.url) {
        return menu.url;
      }

      if (menu.page) {
        return `/${menu.page.slug}`;
      }
    }

    return "/";
  }
}

export const UrlService = new UrlServiceClass();
