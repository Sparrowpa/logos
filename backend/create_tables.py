from app import app
from database import db

# Создаем все таблицы, если их еще нет
with app.app_context():
    db.create_all()
    print("Таблицы успешно созданы!")
