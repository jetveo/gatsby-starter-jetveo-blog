import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

export const ImagePlaceholder: FC = () => {
  return <StaticImage src="./image_placeholder.jpg" alt="image placeholder" />;
};
