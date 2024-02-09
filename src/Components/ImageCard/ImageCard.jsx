import css from "./ImageCard.module.css";
export const ImageCard = ({
  small,
  big,
  alt,
  toggleModal,
  getImageForModal,
}) => {
  return (
    <>
      <img
        className={css.imgGallery}
        onClick={() => {
          getImageForModal(big);
          toggleModal();
        }}
        src={small}
        alt={alt}
      />
    </>
  );
};
