import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "./Modal"; // Импортируем модальное окно

class About extends Component {
  state = {
    isModalOpen: false,
    modalImageSrc: ""
  };

  openModal = (imgSrc) => {
    this.setState({ isModalOpen: true, modalImageSrc: imgSrc });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalImageSrc: "" });
  };

  render() {
    if (!this.props.data) return null;

    const { name, images, address, phone, email, presentation, we1, we2, we3, we4 } = this.props.data;
    const street = address.street;
    const city = address.city;

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <div className="photo-gallery">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`images/${img}`} // Путь к изображению
                    alt="Gallery"
                    className="gallery-image"
                    onClick={() => this.openModal(`images/${img}`)} // Открытие модального окна
                  />
                ))}
              </div>
            </div>
            <div className="nine columns main-col">
              <h2>О нас</h2>
              <p>{we1}</p>
              <p>{we2}</p>
              <p>{we3}</p>
              <p>{we4}</p>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Адрес</h2>
                  <p className="address">
                    <span>{name}</span>
                    <br />
                    <span>
                      {street}
                      <br />
                      {city}
                    </span>
                    <br />
                    <span>{phone}</span>
                    <br />
                    <span>{email}</span>
                  </p>
                </div>
                <div className="columns download">
                  <p>
                    <a href={presentation} className="button">
                      <i className="fa fa-download"></i> Презентация
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Модальное окно */}
        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          imageSrc={this.state.modalImageSrc}
        />
      </section>
    );
  }
}

export default About;
