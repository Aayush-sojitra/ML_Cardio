from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
load_model_and_scaler()

# Load model and scaler
MODEL_PATH = 'model.pkl'
SCALER_PATH = 'scaler.pkl'
DATA_PATH = os.path.join('data', 'cardio_train.csv')

model = None
scaler = None

def load_model_and_scaler():
    """Load the trained model and scaler"""
    global model, scaler
    try:
        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            with open(SCALER_PATH, 'rb') as f:
                scaler = pickle.load(f)
            print("Model and scaler loaded successfully")
        else:
            print("Warning: Model files not found. Please run ML_Model.py first.")
    except Exception as e:
        print(f"Error loading model: {e}")

MODEL_FEATURES = ['height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'gender', 'active', 'age', 'bmi']

def get_processed_data():
    """Load and preprocess data similar to ML_Model.py"""
    clean_path = os.path.join('data', 'clean_cardio_data.csv')
    raw_path = os.path.join('data', 'cardio_train.csv')
    
    if os.path.exists(clean_path):
        # Load pre-cleaned data (comma separated)
        data = pd.read_csv(clean_path, sep=',')
    elif os.path.exists(raw_path):
        # Fallback to original data (semicolon separated) and clean manually
        data = pd.read_csv(raw_path, sep=';')
        data = data[
            (data["ap_hi"] > 50) & (data["ap_hi"] < 250) &
            (data["ap_lo"] > 30) & (data["ap_lo"] < 200) &
            (data["ap_hi"] >= data["ap_lo"])
        ]
        data['age'] = (data['age'] / 365).round().astype(int)
        data['bmi'] = data['weight'] / ((data['height'] / 100) ** 2)
    else:
        return None
        
    data['cardio'] = data['cardio'].astype(int)
    return data

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

@app.route('/dataset-summary', methods=['GET'])
def dataset_summary():
    """Get dynamic dataset summary"""
    try:
        data = get_processed_data()
        if data is None:
            return jsonify({'error': 'Dataset not found'}), 404
            
        features = []
        for col in MODEL_FEATURES:
            features.append({
                'name': col,
                'type': 'numerical' if data[col].dtype in [np.float64, np.int64] else 'categorical',
                'description': f'Patient {col}',
                'missing': 0
            })
            
        # Add target
        features.append({
            'name': 'cardio',
            'type': 'target',
            'description': 'Presence or absence of cardiovascular disease',
            'missing': 0
        })

        return jsonify({
            'rows': len(data),
            'columns': len(MODEL_FEATURES) + 1,
            'features': features,
            'missingValues': {'total': 0, 'byColumn': {}}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model-metrics', methods=['GET'])
def model_metrics():
    """Get dynamic model metrics including training accuracy"""
    try:
        if model is None or scaler is None:
            return jsonify({'error': 'Model not loaded'}), 500
            
        data = get_processed_data()
        if data is None:
            return jsonify({'error': 'Dataset not found'}), 404
            
        X = data[MODEL_FEATURES]
        y = data['cardio']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Test Metrics
        X_test_scaled = scaler.transform(X_test)
        y_pred = model.predict(X_test_scaled)
        test_accuracy = accuracy_score(y_test, y_pred)
        
        # Train Metrics (for Stable Performance chart)
        X_train_scaled = scaler.transform(X_train)
        y_train_pred = model.predict(X_train_scaled)
        train_accuracy = accuracy_score(y_train, y_train_pred)
        
        cm = confusion_matrix(y_test, y_pred)
        
        return jsonify({
            'accuracy': float(test_accuracy),
            'trainAccuracy': float(train_accuracy),
            'precision': float(precision_score(y_test, y_pred)),
            'recall': float(recall_score(y_test, y_pred)),
            'f1': float(f1_score(y_test, y_pred)),
            'confusionMatrix': cm.tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/eda-stats', methods=['GET'])
def eda_stats():
    """Get dynamic EDA statistics for charts"""
    try:
        data = get_processed_data()
        if data is None:
            return jsonify({'error': 'Dataset not found'}), 404
            
        # 1. Disease Prevalence
        prevalence = data['cardio'].value_counts().to_dict()
        targetDistribution = [
            {'name': 'No Disease', 'value': int(prevalence.get(0, 0)), 'color': '#10B981'},
            {'name': 'Disease', 'value': int(prevalence.get(1, 0)), 'color': '#EF4444'}
        ]
        
        # 2. Age Demographics
        # Bins: 30-40, 40-50, 50-60, 60+
        bins = [29, 39, 49, 59, 120]
        labels = ['30-40', '40-50', '50-60', '60+']
        data['age_group'] = pd.cut(data['age'], bins=bins, labels=labels)
        age_counts = data['age_group'].value_counts().sort_index().to_dict()
        
        ageGroups = [
            {'name': label, 'value': int(age_counts.get(label, 0))}
            for label in labels
        ]
        
        return jsonify({
            'targetDistribution': targetDistribution,
            'ageGroups': ageGroups
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None or scaler is None:
            return jsonify({'error': 'Model not loaded'}), 500

        data = request.get_json()
        required_fields = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 
                          'cholesterol', 'gluc', 'smoke', 'alco', 'active']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Calculate BMI
        bmi = float(data['weight']) / ((float(data['height']) / 100) ** 2)
        
        # Standardized feature order from ML_Model.py/ipynb:
        # height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, gender, active, age, bmi
        features = np.array([[
            float(data['height']), 
            float(data['weight']), 
            float(data['ap_hi']), 
            float(data['ap_lo']), 
            int(data['cholesterol']), 
            int(data['gluc']), 
            int(data['smoke']), 
            int(data['alco']), 
            int(data['gender']), 
            int(data['active']), 
            float(data['age']), 
            bmi
        ]])
        
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': {
                'no_disease': float(probability[0]),
                'disease': float(probability[1])
            },
            'message': 'High risk of cardiovascular disease' if prediction == 1 else 'Low risk of cardiovascular disease'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Returns information about the current model"""
    return jsonify({
        'algorithm': 'Random Forest Classifier',
        'parameters': {
            'n_estimators': 200,
            'max_depth': 20,
            'min_samples_leaf': 2,
            'min_samples_split': 2,
            'max_features': 'sqrt'
        },
        'accuracy_baseline': 0.731
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)