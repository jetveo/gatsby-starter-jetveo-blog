import React, { FC } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { PostModel } from "../models/post-model";
import { Image } from "./image";
import { ImagePlaceholder } from "./image-placeholder/image-placeholder";
import { UrlService as Url } from "../services/url-service";

const LatestBlogs: FC = () => {
  const data: LatestBlogQuery = useStaticQuery(query);
  const posts = data.allJetveoPosts.edges.map((e) => e.node);

  return (
    <div className="container">
      <div className="text-center latest-blog-container">
        <h2 className="with-underline">Latest Blogs</h2>
      </div>
      <ul className="latest-blog">
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={Url.blog(p.slug)}>
              <div className="inner">
                <Image
                  image={p.image}
                  placeholder={<ImagePlaceholder />}
                  alt={p.metaTitle}
                />
              </div>
              <h2 dangerouslySetInnerHTML={{ __html: p.title }}></h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestBlogs;

type LatestBlogQuery = {
  allJetveoPosts: {
    edges: [
      {
        node: PostModel;
      }
    ];
  };
};

const query = graphql`
  query LatestBlogQuery {
    allJetveoPosts(limit: 3, sort: { order: DESC, fields: createdAt }) {
      edges {
        node {
          id
          content
          createdAt(formatString: "MMMM DD, YYYY")
          metaDescription
          metaKeywords
          metaTitle
          slug
          title
          subtitle
          image {
            ...AssetFragment
          }
          author {
            image {
              ...AssetFragment
            }
            name
            surname
          }
        }
      }
    }
  }
`;
