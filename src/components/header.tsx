import React, { FC } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { SettingModel } from "../models/setting-model";
import { Image } from "../components/image";
import { ImagePlaceholder } from "./image-placeholder/image-placeholder";
import { MenuModel } from "../models/menu-model";
import { UrlService as Url } from "../services/url-service";
import "bootstrap/dist/css/bootstrap.css";
import "../css/font-awesome.css";
import "../css/style.css";

const Header: FC = () => {
  const data = useStaticQuery<HeaderQuery>(query);
  const defaultSettings = data.allJetveoSettings.edges[0].node;
  const menus = data.allJetveoMenu.edges.map((n) => n.node);

  return (
    <header className="site-header">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 align-self-center">
            <Link className="header-logo" to="/">
              <Image
                image={defaultSettings.headerImage}
                alt="logo"
                placeholder={<ImagePlaceholder />}
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-8 align-self-center">
            <nav>
              <ul className="navbar-nav mr-auto">
                {menus.map((m) => (
                  <li key={m.id} className="nav-item active">
                    <Link className="nav-link" to={Url.getUrlByMenu(m)}>
                      {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

type HeaderQuery = {
  allJetveoSettings: {
    edges: [
      {
        node: SettingModel;
      }
    ];
  };
  allJetveoMenu: {
    edges: [
      {
        node: MenuModel;
      }
    ];
  };
};

export const query = graphql`
  query HeaderQuery {
    allJetveoSettings {
      edges {
        node {
          headerImage {
            ...AssetFragment
          }
        }
      }
    }
    allJetveoMenu {
      edges {
        node {
          id
          order
          title
          url
          page {
            id
            content
            createdAt
            metaDescription
            metaKeywords
            metaTitle
            slug
            title
          }
        }
      }
    }
  }
`;
