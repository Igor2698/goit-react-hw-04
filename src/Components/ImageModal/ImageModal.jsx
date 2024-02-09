import css from "../ImageModal/ImageModal.module.css";

export const ImageModal = ({ toggleModal, imageForModal }) => {
  return (
    <img className={css.imageModal} onClick={toggleModal} src={imageForModal} />
  );
};
