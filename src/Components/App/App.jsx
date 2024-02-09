import css from "./App.module.css";
import customStyles from "../../custom-styles";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { ImageModal } from "../ImageModal/ImageModal";
import { SearchBar } from "../SearchBar/SearchBar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Loader } from "../Loader/Loader";
import { fetchImages } from "../../images-api";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [imageForModal, setImageForModal] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!valueToSearch) return;

    async function handleSearch(value) {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(value, page);

        if (page === 1 && data.results.length > 0) {
          toast(`Congratulations! We found ${data.total} pictures`);
        }
        if (data.results.length === 0) {
          toast(`No pictures found`);
        }
        if (page === data.total_pages) {
          toast(`You have reached the end of the collection`);
        }

        setTotalPages(data.total_pages);
        setImages([...images, ...data.results]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    handleSearch(valueToSearch);
  }, [page, valueToSearch]);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
    document.body.style.overflow = modalIsOpen ? "auto" : "hidden";
  }

  function getImageForModal(img) {
    setImageForModal(img);
    toggleModal();
  }

  function onSearchButton(value) {
    if (value.trim() === "") {
      return toast("Value cannot be empty");
    }
    setPage(1);
    setValueToSearch(value);
    setImages([]);
  }

  return (
    <>
      <ToastContainer />
      <SearchBar onSearch={onSearchButton} />

      {error && <ErrorMessage />}
      {images.length > 0 && !error && (
        <section className={css.section}>
          <ImageGallery dates={images} getImageForModal={getImageForModal} />
        </section>
      )}
      {loading && <Loader />}
      {images.length > 0 && page !== totalPages && (
        <LoadMoreButton onLoadMoreClick={() => setPage(page + 1)} />
      )}
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
      >
        <ImageModal toggleModal={toggleModal} imageForModal={imageForModal} />
      </Modal>
    </>
  );
}

export default App;
