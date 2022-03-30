import { MenuModel } from "../models/menu-model";

class UrlServiceClass {
  public blog(slug: string) {
    return `/blog/${slug}`;
  }

  public getUrlByMenu(menu: MenuModel) {
    if (menu) {
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
