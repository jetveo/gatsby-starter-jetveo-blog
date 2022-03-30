import { GatsbyConfig } from 'gatsby'
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Personal blog`,
    description: `This is my personal blog.`,
    author: `@jetveo`,
    siteUrl: `https://jetveo.io`
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
    },
    {
      resolve: 'gatsby-source-jetveo',
      options: {
        apiBaseUrl: `${process.env.JETVEO_API_BASE_URL}`,
        apiKey: `${process.env.JETVEO_API_KEY}`,
        apiEndpoints: [
          'settings',
          'menu',
          'pages',
          'posts',
          'authors',
        ],
      }
    },
  ]
}

export default config;