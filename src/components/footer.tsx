import React, { FC } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { MenuModel } from "../models/menu-model";
import { UrlService as Url } from "../services/url-service";

const Footer: FC = () => {
  const queryResult = useStaticQuery<FooterQuery>(query);
  const menus = queryResult.allJetveoMenu.edges.map((e) => e.node);
  const author = queryResult.allJetveoSettings.edges[0].node.defaultAuthor;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer_inner">
        <div className="container">
          <div className="footer-widget footer-content">
            <section id="nav_menu-8" className="widget widget_nav_menu">
              <div className="menu-main-container">
                <ul id="menu-main" className="menu">
                  {menus.map((m) => (
                    <li key={m.id}>
                      <Link to={Url.getUrlByMenu(m)}>{m.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
          <div className="footer-bottom social-right-menu ">
            <div className="site-info">
              ©{year} {author}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

type FooterQuery = {
  allJetveoSettings: {
    edges: [
      {
        node: {
          defaultAuthor: string;
        };
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
  query FooterQuery {
    allJetveoSettings {
      edges {
        node {
          defaultAuthor
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
