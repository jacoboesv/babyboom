from flask import render_template
from app import app
from datetime import datetime

@app.route('/')
def home():
    # Aquí puedes configurar la fecha de la revelación
    reveal_date = datetime(2025, 2, 3, 0, 0)  # Ejemplo: 3 de febrero 2025, 12AM
    return render_template('index.html', reveal_date=reveal_date)