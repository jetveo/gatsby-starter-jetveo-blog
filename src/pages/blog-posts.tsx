import { graphql, Link, useStaticQuery } from "gatsby";
import React, { FC } from "react";
import { Image } from "../components/image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { PostModel } from "../models/post-model";
import { ImagePlaceholder } from "../components/image-placeholder/image-placeholder";
import { UrlService as Url } from "../services/url-service";
import { AuthorPlaceholder } from "../components/author-placeholder";

const BlogPosts: FC = () => {
  const posts = useStaticQuery<BlogPostQuery>(query).allJetveoPosts.edges.map(
    (p) => p.node
  );

  return (
    <Layout>
      <SEO title="Blog posts" />
      <div className="container blog-page">
        <ul className="blog-list">
          {posts.map((p) => (
            <li key={p.id}>
              <div className="post-item template-square columned">
                <div className="post-thumbnail">
                  <Image
                    image={p.image}
                    alt={p.title}
                    placeholder={<ImagePlaceholder />}
                  />
                  <div className="post-date">
                    <i className="fas fa-calendar-alt"></i>
                    {p.createdAt}
                  </div>
                </div>
                <div className="post-details">
                  <h2 className="post-title">
                    <Link
                      to={Url.blog(p.slug)}
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    ></Link>
                  </h2>
                  <div className="author">
                    <Image
                      image={p.author.image}
                      alt="avatar"
                      placeholder={<AuthorPlaceholder />}
                    />
                    <strong className="name">
                      {p.author.name} {p.author.surname}
                    </strong>
                  </div>
                  {p.perex ? (
                    <div dangerouslySetInnerHTML={{ __html: p.perex }}></div>
                  ) : (
                    <div>No perex</div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default BlogPosts;

type BlogPostQuery = {
  allJetveoPosts: {
    edges: [
      {
        node: PostModel;
      }
    ];
  };
};

export const query = graphql`
  query BlogPostsQuery {
    allJetveoPosts(sort: {fields: createdAt, order: DESC}) {
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
          perex
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
