import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.closeEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeEscape);
  }

  closeEscape = (e) => {
    if (e.code === "Escape") {
      this.props.onClose(e);
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.props.onClose}>
        <div className={css.Modal}>
          <img src={this.props.largeSrc} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
