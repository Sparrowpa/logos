import React, { useState } from "react";
import { Fade, Slide } from "react-reveal";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!data) return <p>Загрузка...</p>;

  const { name, address, phone, contactmessage } = data;
  const { street, city } = address;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus(null);

    // Валидация email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus("Пожалуйста, введите корректный email.");
      setLoading(false);
      return;
    }

    // Валидация номера телефона (только 11 цифр)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormStatus("Пожалуйста, введите корректный номер телефона (11 цифр).");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Сообщение отправлено! Спасибо!");
      } else {
        const errorData = await response.json();
        setFormStatus(`Ошибка при отправке: ${errorData.message || "Попробуйте еще раз."}`);
      }
    } catch (error) {
      setFormStatus("Ошибка при отправке сообщения.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <Fade bottom duration={1000}>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Cвяжитесь с нами</span>
            </h1>
          </div>
          <div className="ten columns">
            <p className="lead">{contactmessage}</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide left duration={1000}>
          <div className="eight columns">
            <form onSubmit={handleSubmit} id="contactForm">
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Ваше имя <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Почта <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone">
                    Ваш номер телефона <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Сообщение <span className="required">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <button type="submit" className="submit" disabled={loading}>
                    {loading ? "Отправка..." : "Отправить"}
                  </button>
                </div>
              </fieldset>
            </form>

            {formStatus && <p>{formStatus}</p>}
          </div>
        </Slide>

        <Slide right duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Адрес и Телефон</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}
                <br />
                <span>{phone}</span>
              </p>
            </div>

            <div className="widget widget_tweets">
              <h4 className="widget-title">Найдите нас на карте</h4>
              <ul id="gis">
                <li>
                  <span>
                    Мы всегда рады видеть вас! Найдите нас на карте{" "}
                    <a
                      href="https://2gis.ru/irkutsk/firm/70000001081910241?m=104.311656%2C52.26318%2F16"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      2Гис
                    </a>{" "}
                    чтобы получить направление к нашему центру.
                  </span>
                </li>
                <li>
                  <span>
                    Сделайте первый шаг к уверенной речи с нами! Мы ждем вас в
                    нашем центре, чтобы помочь раскрыть ваш потенциал и
                    преодолеть любые трудности.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
