import React, { FC, ReactNode } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ImageModel } from "../models/image-model";

type Props = {
  image: ImageModel | undefined;
  alt: string;
  placeholder?: ReactNode;
};

export const Image: FC<Props> = ({ image, placeholder, alt }) => {
  if (image) {
    const gatsbyImageSource = getImage(image.localFile);
    if (gatsbyImageSource) {
      return <GatsbyImage image={gatsbyImageSource} alt={alt} />;
    }
  }

  return <>{placeholder}</>;
};
