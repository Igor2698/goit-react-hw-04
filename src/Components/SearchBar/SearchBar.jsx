import css from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const picture = evt.target.elements.image.value;
    evt.target.reset();
    onSearch(picture);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input className={css.input} type="text" name="image" placeholder="" />
      <label className={css.label} htmlFor="image">
        Enter name of image
      </label>
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};
