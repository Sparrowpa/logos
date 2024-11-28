import telebot

# Токен бота
TELEGRAM_BOT_TOKEN = '7953300568:AAFMifqlWkVg3LtbniM1zWpyxIBCTPvEj6w'
bot = telebot.TeleBot(TELEGRAM_BOT_TOKEN)

# Обработчик нажатий на кнопки
@bot.callback_query_handler(func=lambda call: call.data.startswith(("approve_", "reject_")))
def callback_inline(call):
    print(f"Обработан вызов callback для {call.data}")  # Выводим данные callback в консоль

    review_id = int(call.data.split('_')[1])

    # Переносим импорт внутрь функции
    from app import app, Review, db

    with app.app_context():  # Устанавливаем контекст приложения
        review = db.session.get(Review, review_id)  # Используем db.session.get вместо query.get
        if review is None:
            bot.send_message(call.message.chat.id, "Отзыв не найден.")
            return

        if 'approve' in call.data:
            review.approved = True
            db.session.commit()
            bot.send_message(call.message.chat.id, f"Отзыв с ID {review_id} одобрен.")
        elif 'reject' in call.data:
            db.session.delete(review)
            db.session.commit()
            bot.send_message(call.message.chat.id, f"Отзыв с ID {review_id} отклонен.")

    # После обработки оставляем кнопки видимыми
    bot.answer_callback_query(call.id, "Ваш выбор сохранён.")
    print(f"Обработан callback для {call.data}")  # Выводим результат обработки

if __name__ == '__main__':
    print("Бот запускается...")
    bot.polling(non_stop=True)
