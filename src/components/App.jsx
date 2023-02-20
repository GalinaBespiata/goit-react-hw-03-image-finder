import { Component } from 'react';

import { SearchBar } from './SearchBar/SearchBar.jsx';
import { Loader } from './Loader/Loader.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { getFetch } from 'services/api.js';
import { ButtonLoadMore } from './Button/ButtonLoadMore.jsx';
import { Modal } from './Modal/Modal.jsx';

export class App extends Component {
  state = {
    images: [],
    totalImages: 0,
    // isHidden: false,
    loading: false,
    error: null,
    modalIsOpen: false,
    selectedImage: null,
    query: '',
    page: 1,
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ loading: true });
      const data = await getFetch(query, page);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          error: null,
          totalImages: data.totalHits,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleOpenModal = largeImgUrl => {
    this.setState({ modalIsOpen: true, selectedImage: largeImgUrl });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false, selectedImage: null });
  };
  getQuery = query => {
    this.setState({ query, page: 1, images: [], totalImages: 0 });
  };
  render() {
    const {
      images,
      totalImages,

      loading,
      error,
      modalIsOpen,
      selectedImage,
    } = this.state;
    return (
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <SearchBar onSubmit={this.getQuery} />

        {error !== null && <p>Ooops, we have mistake!!! {error}</p>}
        <ImageGallery images={images} handleOpenModal={this.handleOpenModal} />
        {loading && <Loader />}
        {!loading && totalImages !== images.length && (
          <ButtonLoadMore onClick={this.loadMore} />
        )}
        {modalIsOpen && (
          <Modal largeUrl={selectedImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
