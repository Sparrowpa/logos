import telebot
from telegram_bot import bot  # Импортируем бота

# Функция отправки отзыва на модерацию
def send_review_for_moderation(review):
    chat_id = '814053932'  # Ваш Telegram ID
    message = (
        f'Новый отзыв на модерацию:\n'
        f'Имя: {review.name}\n'
        f'Отзыв: {review.text}\n'
        f'Дата: {review.date.strftime("%d-%m-%Y")}\n'
        f'ID: {review.id}'
    )

    try:
        markup = approve_reject_buttons(review.id)  # Генерация кнопок
        print("Маркап кнопок:", markup)  # Проверка маркапа в консоли
        bot.send_message(chat_id, message, reply_markup=markup)
        print("Отзыв отправлен с кнопками!")
    except Exception as e:
        print(f"Ошибка при отправке сообщения с кнопками: {e}")

# Кнопки для одобрения или отклонения отзыва
def approve_reject_buttons(review_id):
    markup = telebot.types.InlineKeyboardMarkup(row_width=2)
    markup.add(
        telebot.types.InlineKeyboardButton("Одобрить", callback_data=f"approve_{review_id}"),
        telebot.types.InlineKeyboardButton("Отклонить", callback_data=f"reject_{review_id}")
    )
    return markup

# Функция для отправки контактов в Telegram
def send_contact_to_telegram(name, email, phone, message):
    chat_id = '814053932'  # Ваш Telegram ID
    text = f"Новое сообщение с сайта:\n\n" \
           f"Имя: {name}\n" \
           f"Email: {email}\n" \
           f"Номер: {phone}\n" \
           f"Сообщение: {message}"

    try:
        bot.send_message(chat_id, text)
        print("Сообщение отправлено в Telegram!")
    except Exception as e:
        print(f"Ошибка при отправке сообщения в Telegram: {e}")
