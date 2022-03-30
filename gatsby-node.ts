import type { GatsbyNode } from "gatsby";
import path from "path";
import { PostModel } from "./src/models/postModel";
import { PageModel } from "./src/models/pageModel";
import { UrlService as Url } from "./src/services/url-service";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  // can't use AssetFragment here :-(
  const queryResult = await graphql<GatsbyNodeQuery>(`
    query GatsbyNodeQuery {
      allJetveoPosts {
        edges {
          node {
            id
            content
            createdAt(formatString: "MMMM DD, YYYY")
            metaDescription
            metaKeywords
            slug
            title
            perex
            author {
              image {
                id
                type
                localFile {
                  id
                  name
                  publicURL
                  childImageSharp {
                    id
                    gatsbyImageData
                  }
                }
              }
              name
              surname
            }
          }
        }
      }
      allJetveoPages {
        edges {
          node {
            content
            createdAt
            id
            image {
              id
              type
              localFile {
                id
                name
                publicURL
                childImageSharp {
                  id
                  gatsbyImageData
                }
              }
            }
            metaDescription
            metaKeywords
            metaTitle
            slug
            title
          }
        }
      }
    }
  `);

  if (queryResult.errors) {
    reporter.panic(`[gatsby-node] query problem ${queryResult.errors}`);
    return;
  }

  const posts = queryResult.data.allJetveoPosts.edges.map((e) => e.node);
  const blogTemplate = path.resolve("./src/templates/blog-template.tsx");

  posts.forEach((post) => {
    createPage({
      path: Url.blog(post.slug),
      component: blogTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        slug: post.slug,
      },
    });
  });

  const pages = queryResult.data.allJetveoPages.edges.map((e) => e.node);
  const pageTemplate = path.resolve("./src/templates/page-template.tsx");

  pages.forEach((page) => {
    if (!page.slug) {
      return;
    }

    createPage({
      path: page.slug,
      component: pageTemplate,
      context: {
        slug: page.slug,
      },
    });
  });
};

type GatsbyNodeQuery = {
  allJetveoPosts: {
    edges: [
      {
        node: PostModel;
      }
    ];
  };
  allJetveoPages: {
    edges: [
      {
        node: PageModel;
      }
    ];
  };
};
