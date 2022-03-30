import { graphql, useStaticQuery } from "gatsby";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { SettingModel } from "../models/setting-model";

type SeoProps = {
  description?: string;
  lang?: string;
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  keywords?: string;
  title?: string;
};

const SEO: FC<SeoProps> = ({ description, lang, meta, keywords, title }) => {
  const defaultSettings =
    useStaticQuery<SeoQuery>(query).allJetveoSettings.edges[0].node;
  const metaDescription = description || defaultSettings.defaultMetaDescription;
  const metaKeywords = keywords || defaultSettings.defaultMetaKeywords;

  const defaultMeta: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: defaultSettings.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  if (metaKeywords) {
    defaultMeta.push({
      name: "keywords",
      content: metaKeywords,
    });
  }

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      meta={defaultMeta.concat(meta || [])}
    />
  );
};

export default SEO;

type SeoQuery = {
  allJetveoSettings: {
    edges: [
      {
        node: SettingModel;
      }
    ];
  };
};

export const query = graphql`
  query SeoQuery {
    allJetveoSettings {
      edges {
        node {
          defaultAuthor
          defaultMetaDescription
          defaultMetaKeywords
          id
          defaultTitle
        }
      }
    }
  }
`;
