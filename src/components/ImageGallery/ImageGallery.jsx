import css from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.jsx';

export function ImageGallery({ images, handleOpenModal }) {
  return (
    <ul className={css.imageGallery}>
      {images?.length > 0 &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              picture={image.webformatURL}
              handleOpenModal={handleOpenModal}
              largeImageURL={
                image.largeImageURL ?? alert('картини не знайдено')
              }
            />
          );
        })}
    </ul>
  );
}
