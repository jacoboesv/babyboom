from flask import render_template, request, jsonify
from flask import redirect, url_for
from app import app
from app.models import db, Prediction
from datetime import datetime

@app.route('/')
def home():
    reveal_date = datetime(2025, 2, 3, 0, 0)
    return render_template('index.html', reveal_date=reveal_date)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    name = data.get('name')
    option = data.get('option')
    
    if name and option:
        prediction = Prediction(name=name, option=option)
        db.session.add(prediction)
        db.session.commit()
        return jsonify({'message': 'Tu predicción ha sido guardada!'}), 200
    return jsonify({'message': 'Datos invalidos!'}), 400


@app.route('/result')
def result():
    actual_result = "niño"  # Cambia esto según el resultado real

    correct_predictions = Prediction.query.filter_by(option=actual_result).order_by(Prediction.timestamp).all()

    return render_template('result.html', actual_result=actual_result, correct_predictions=correct_predictions)