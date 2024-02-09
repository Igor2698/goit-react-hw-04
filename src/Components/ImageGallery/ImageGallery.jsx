import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ dates, toggleModal, getImageForModal }) => {
  return (
    <ul className={css.listGallery}>
      {dates.map(({ id, alt_description, urls: { small, regular } }) => (
        <li key={id}>
          <ImageCard
            toggleModal={toggleModal}
            small={small}
            big={regular}
            alt={alt_description}
            getImageForModal={getImageForModal}
          />
        </li>
      ))}
    </ul>
  );
};
