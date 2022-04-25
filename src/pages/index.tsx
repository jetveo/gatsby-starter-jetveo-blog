import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import LatestBlogs from "../components/latestBlog";
import { graphql } from "gatsby";
import { PageModel } from "../models/page-model";
import { Image } from "../components/image";
import { ImagePlaceholder } from "../components/image-placeholder/image-placeholder";
import { ImageModel } from "../models/image-model";

type Props = {
  data: IndexQuery;
};

const IndexPage: FC<Props> = ({ data }) => {
  const homePage = data.allJetveoMenu.edges[0].node.page;
  const homePageImage = data.allJetveoSettings.edges[0].node.homePageImage;

  return (
    <Layout>
      <SEO
        title={homePage.metaTitle}
        keywords={homePage.metaKeywords}
        description={homePage.metaDescription}
      />
      <div className="slider-section">
        <div className="item">
          <div className="site-Banner">
            <Image
              image={homePageImage}
              placeholder={<ImagePlaceholder />}
              alt="home page"
            />
            <div className="Banner-details">
              <div className="Banner-title">
                <h1 dangerouslySetInnerHTML={{ __html: homePage.title }}></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-center">
          <div dangerouslySetInnerHTML={{ __html: homePage.content }}></div>
        </div>
      </div>
      <LatestBlogs />
    </Layout>
  );
};

export default IndexPage;

type IndexQuery = {
  allJetveoMenu: {
    edges: [
      {
        node: {
          page: PageModel;
        }
      }
    ];
  };
  allJetveoSettings: {
    edges: [
      {
        node: {
          homePageImage: ImageModel;
        }
      }
    ]
  }
};

export const query = graphql`
  query IndexQuery {
    allJetveoMenu(limit: 1, sort: { order: ASC, fields: order }) {
      edges {
        node {
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
    allJetveoSettings {
      edges {
        node {
          homePageImage {
            id
            type
            localFile {
              id
              name
              publicURL
              childImageSharp {
                gatsbyImageData(height: 330)
              }
            }
          }
        }
      }
    }
  }
`;
