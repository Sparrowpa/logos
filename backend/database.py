from flask_sqlalchemy import SQLAlchemy

# Инициализация базы данных
db = SQLAlchemy()

# Функция для инициализации базы данных
def init_db(app):
    db.init_app(app)
