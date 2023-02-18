import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
export function ImageGalleryItem({
  name,
  picture,
  largeImageURL,
  handleOpenModal,
}) {
  return (
    <li className="{css.imageGalleryItem}">
      <img
        className={css.imageGalleryItemImage}
        src={picture}
        alt={name}
        onClick={() => {
          handleOpenModal(largeImageURL);
        }}
      />
    </li>
  );
}
