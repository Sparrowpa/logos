import React, { Component } from "react";
import { Fade } from "react-reveal";

class Gallery extends Component {
  state = {
    currentImageIndex: 0,
    touchStartX: null,
    touchEndX: null,
  };

  // Изменение изображения через заданные интервалы
  componentDidMount() {
    this.interval = setInterval(this.nextImage, 180000); // Измените это значение для настройки времени
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Переход к следующему изображению
  nextImage = () => {
    const { images } = this.props.data;
    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % images.length,
    }));
  };

  // Переход к предыдущему изображению
  prevImage = () => {
    const { images } = this.props.data;
    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex - 1 + images.length) % images.length,
    }));
  };

  // Обработка начала касания
  handleTouchStart = (e) => {
    this.setState({ touchStartX: e.touches[0].clientX });
  };

  // Обработка конца касания
  handleTouchEnd = (e) => {
    this.setState({ touchEndX: e.changedTouches[0].clientX }, this.handleSwipe);
  };

  // Обработка свайпа
  handleSwipe = () => {
    const { touchStartX, touchEndX } = this.state;
    if (touchStartX && touchEndX) {
      const swipeThreshold = 100; // Минимальная дистанция свайпа
      if (touchStartX - touchEndX > swipeThreshold) {
        this.nextImage(); // Свайп влево
      } else if (touchEndX - touchStartX > swipeThreshold) {
        this.prevImage(); // Свайп вправо
      }
    }
  };

  // Установка текущего изображения в зависимости от клика на индикатор
  setCurrentImage = (index) => {
    this.setState({ currentImageIndex: index });
  };

  render() {
    if (!this.props.data) return null;

    const { images } = this.props.data;
    const { currentImageIndex } = this.state;

    return (
      <section id="gallery" className="gallery-section">
        <Fade duration={800}>
          {/* Заголовок раздела */}
          <h2 className="gallery-title">Наш центр</h2>

          <div
            className="main-image-container"
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          >
            {/* Previous Button */}
            <button className="nav-button left" onClick={this.prevImage}>
              &#10094;
            </button>

            <img
              src={`images/${images[currentImageIndex]}`}
              alt="Gallery"
              className="main-image"
            />

            {/* Next Button */}
            <button className="nav-button right" onClick={this.nextImage}>
              &#10095;
            </button>
          </div>
        </Fade>

        <div className="indicator-container">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => this.setCurrentImage(index)}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default Gallery;
