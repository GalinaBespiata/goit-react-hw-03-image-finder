import { Component } from 'react';

import { SearchBar } from './SearchBar/SearchBar.jsx';
import { Loader } from './Loader/Loader.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { ButtonLoadMore } from './Button/ButtonLoadMore.jsx';
import { Modal } from './Modal/Modal.jsx';
import axios from 'axios';

export class App extends Component {
  state = {
    images: [],
    //  JSON.parse(localStorage.getItem('images')) ?? [],
    loading: false,
    error: null,
    modalIsOpen: false,
    selectedImage: null,
    query: '',
    page: 1,
  };

  fetchImages = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(
        ` https://pixabay.com/api/?q=${this.state.query}&page=${Number(
          this.state.page
        )}&key=32908918-e7cc5cba0888a51be5caa34d0&image_type=photo&orientation=horizontal&per_page=12`
      );

      console.log(data);
      this.setState({ images: data.hits });
      console.log(this.state.images);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
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
    this.setState({ query: query, page: 1, images: [] });
  };
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <SearchBar onSubmit={this.getQuery} />
        {this.state.loading && <Loader />}

        {this.state.error !== null && (
          <p>Ooops, we have mistake!!! {this.state.error}</p>
        )}
        <ImageGallery
          images={this.state.images}
          handleOpenModal={this.handleOpenModal}
        />
        <ButtonLoadMore onClick={this.loadMore} />
        {this.state.modalIsOpen && (
          <Modal
            largeUrl={this.state.selectedImage}
            closeModal={this.closeModal}
          />
        )}
        <ImageGalleryItem />
      </div>
    );
  }
}
