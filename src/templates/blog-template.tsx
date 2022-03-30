import { graphql } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Image } from "../components/image";
import { PostModel } from "../models/post-model";
import { AuthorPlaceholder } from "../components/author-placeholder";

type Props = {
  data: BlogTemplateQuery;
};

const BlogTemplate: FC<Props> = ({ data }) => {
  const post = data.jetveoPosts;
  const authorName = `${post.author.name} ${post.author.surname}`;

  return (
    <Layout>
      <SEO
        title={post.metaTitle}
        keywords={post.metaKeywords}
        description={post.metaDescription}
      />
      <div className="blogs-page">
        <div className="post-thumbnail">
          <Image image={post.image} alt={post.title} />
        </div>
        <div className="container">
          <div className="post-details">
            <h2
              className="title"
              dangerouslySetInnerHTML={{ __html: post.title }}
            ></h2>
            <div className="post-date">
              <i className="fas fa-calendar-alt"></i>
              {post.createdAt}
            </div>
            <div className="author">
              <Image
                image={post.author.image}
                alt={authorName}
                placeholder={<AuthorPlaceholder />}
              />
              <strong className="name">{authorName}</strong>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogTemplate;

type BlogTemplateQuery = {
  jetveoPosts: PostModel;
};

export const query = graphql`
  query BlogTemplateQuery($slug: String!) {
    jetveoPosts(slug: { eq: $slug }) {
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
          ...AssetFragment
        }
        name
        surname
      }
    }
  }
`;
