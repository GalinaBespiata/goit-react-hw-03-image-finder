import { Component } from 'react';
import css from '../Modal/Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = evt => {
    console.log(evt.keyCode);
  };
  handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img src={this.props.largeUrl} alt="" />
        </div>
      </div>
    );
  }
}
