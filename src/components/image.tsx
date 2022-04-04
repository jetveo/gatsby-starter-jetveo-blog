import React, { CSSProperties, FC, ReactNode } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ImageModel } from "../models/image-model";

type Props = {
  image: ImageModel | undefined;
  alt: string;
  placeholder?: ReactNode;
  imageStyle?: CSSProperties;
};

export const Image: FC<Props> = ({ image, placeholder, alt, imageStyle }) => {
  if (image) {
    const gatsbyImageSource = getImage(image.localFile);
    if (gatsbyImageSource) {
      return <GatsbyImage image={gatsbyImageSource} alt={alt} imgStyle={imageStyle} />;
    }
  }

  return <>{placeholder}</>;
};
