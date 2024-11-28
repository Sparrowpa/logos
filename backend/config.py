import os

# Путь к базе данных
DB_PATH = os.path.join("C:\\Users\\user\\PycharmProjects\\Logos\\backend", "reviews.db")
SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
