import { graphql } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import { LocalFileModel } from "./local-file-model";

export type AssetModel = {
  id: string;
  localFile: ImageDataLike & LocalFileModel;
  type: string;
};

export const query = graphql`
  fragment AssetFragment on jetveoAssets {
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
`;
