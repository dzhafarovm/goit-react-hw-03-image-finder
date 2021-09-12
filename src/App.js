import { Component } from "react";
import { getImages } from "./Components/PixabayApi/PixabayApi.jsx";
import { Searchbar } from "./Components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery.jsx";
import { Button } from "./Components/Button/Button.jsx";
import { Modal } from "./Components/Modal/Modal.jsx";
import { LoaderSpinner } from "./Components/LoaderSpinner/LoaderSpinner.jsx";
import css from "./App.module.css";

export class App extends Component {
  state = {
    searchQuery: "",
    largeSrc: "",
    page: 1,
    arrImages: [],
    loading: false,
    showModal: false,
    error: false,
  };

  // --> Запрос при обновлении компонента
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
      this.scrollTo();
    }
  }

  // --> Запрос и рендер изобрважений
  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const q = searchQuery;
    const optionsApi = { q, page };

    this.setState((prevState) => ({
      page: prevState.page + 1,
      loading: true,
    }));

    getImages(optionsApi)
      .then((arrImages) => {
        if (arrImages.length > 0) {
          this.setState((prevState) => ({
            arrImages: [...prevState.arrImages, ...arrImages],
            error: false,
          }));
        } else {
          this.setState({ error: true });
        }
      })
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  // --> Открытие модалки
  showModal = (e) => {
    const { largeimage } = e.target.attributes;

    this.setState({
      showModal: true,
      largeSrc: largeimage.value,
    });
  };

  // --> Закрытие модалки
  closeModal = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape") {
      this.setState({
        showModal: false,
        largeSrc: "",
      });
    }
  };

  // --> Скролл (GoIT)
  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // --> Сброс параметров для нового запроса
  updateQuery = (query) => {
    // console.log("query", query);
    this.setState({
      searchQuery: query,
      page: 1,
      arrImages: [],
    });
  };

  render() {
    const { searchQuery, arrImages, loading, showModal, largeSrc, error } =
      this.state;

    const showLoadMoreButton = arrImages.length > 0 && !loading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.updateQuery} />

        {error && (
          <h2 className={css.ErrorTitle}>
            Search result '{searchQuery}' not found!
          </h2>
        )}

        {loading && <LoaderSpinner />}

        <ImageGallery
          images={this.state.arrImages}
          query={this.state.searchQuery}
          onClick={this.showModal}
        />

        {showLoadMoreButton && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal
            largeSrc={largeSrc}
            alt={searchQuery}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
