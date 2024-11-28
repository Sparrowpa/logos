from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db  # Импортируем db
from models import Review  # Импортируем модель отзыва
from utils import send_review_for_moderation, send_contact_to_telegram  # Импортируем обе функции

app = Flask(__name__)

# Загружаем конфигурацию из файла
app.config.from_object('config')

# Инициализируем базу данных с использованием объекта db
db.init_app(app)

CORS(app)

# Получение всех отзывов
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.filter_by(approved=True).all()
    return jsonify([{
        'name': review.name,
        'text': review.text,
        'date': review.date.strftime('%d-%m-%Y')
    } for review in reviews])

# Добавление нового отзыва
@app.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    name = data.get('name')
    text = data.get('text')

    if not name or not text:
        return jsonify({'message': 'Не все поля заполнены'}), 400

    new_review = Review(name=name, text=text)
    db.session.add(new_review)
    db.session.commit()

    send_review_for_moderation(new_review)  # Отправляем отзыв на модерацию в Telegram
    return jsonify({'message': 'Отзыв отправлен на модерацию'}), 201

# Обработка контактных данных
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()  # Получаем JSON-данные
        print("Received data:", data)  # Логируем данные для отладки

        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')  # Получаем номер телефона из поля subject
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({"message": "Все обязательные поля должны быть заполнены."}), 400

        # Логика для обработки данных (например, отправка в Telegram или в базу данных)
        print(f"Sending contact data: {name}, {email}, {phone}, {message}")  # Логирование отправки данных

        send_contact_to_telegram(name, email, phone, message)  # Функция отправки в Telegram

        return jsonify({"message": "Сообщение отправлено!"}), 200

    except Exception as e:
        print("Error:", e)  # Логируем ошибку
        return jsonify({"message": "Ошибка при обработке данных. Попробуйте еще раз."}), 400



if __name__ == '__main__':
    app.run(debug=True)
