import { graphql } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { PageModel } from "../models/page-model";

type Props = {
  data: PageTemplateQuery;
};

const PageTemplate: FC<Props> = ({ data }) => {
  const page = data.jetveoPages;

  return (
    <Layout>
      <SEO
        title={page.metaTitle}
        keywords={page.metaKeywords}
        description={page.metaDescription}
      />
      <div className="site-About">
        <div className="container">
          <h2>{page.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: page.content }}></p>
        </div>
      </div>
    </Layout>
  );
};

export default PageTemplate;

type PageTemplateQuery = {
  jetveoPages: PageModel;
};

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    jetveoPages(slug: { eq: $slug }) {
      content
      createdAt
      id
      image {
        ...AssetFragment
      }
      metaDescription
      metaKeywords
      metaTitle
      slug
      title
    }
  }
`;
