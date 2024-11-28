import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

const ReviewItem = ({ review }) => (
  <div className="review-item">
    <h3>{review.name}</h3>
    <p>{review.date}</p>
    <p>{review.text}</p>
  </div>
);

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Загружаем отзывы при монтировании компонента
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => {
        setModalMessage("Ошибка при загрузке отзывов");
        setModalOpen(true);
        console.error("Ошибка загрузки отзывов:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { name, text: review };

    try {
      setLoading(true); // Начинаем загрузку
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      setLoading(false); // Завершаем загрузку

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Результат от сервера
        setModalMessage("Спасибо за ваш отзыв! Он отправлен на модерацию.");
        setModalOpen(true);
        setTimeout(() => setModalOpen(false), 3000); // Закрытие модала через 3 секунды
        setName("");
        setReview("");
      } else {
        setModalMessage("Ошибка при отправке отзыва");
        setModalOpen(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при отправке запроса:", error);
      setModalMessage("Ошибка при отправке отзыва");
      setModalOpen(true);
    }
  };

  return (
    <section id="reviews">
      <h2>Отзывы</h2>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review, idx) => <ReviewItem key={idx} review={review} />)
        ) : (
          <p>Отзывов пока нет.</p>
        )}
      </div>

      <h2>Оставьте свой отзыв</h2>
      <form onSubmit={handleSubmit}>
        <label>Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Отзыв:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {/* Модальное окно с сообщением */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
    </section>
  );
};

export default ReviewForm;
