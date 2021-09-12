import React from "react";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images, query, onClick }) => {
  return (
    <ul className={css.ImageGallery} onClick={onClick}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image.webformatURL}
          alt={query}
          largeImage={image.largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
};
