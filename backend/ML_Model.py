import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import pickle
import os

def load_and_prepare_data():
    """Load and prepare the cardiovascular disease dataset"""
    print("Loading data...")
    
    # Load cleaner data if available, otherwise fallback to original
    data_path = os.path.join('data', 'clean_cardio_data.csv')
    if not os.path.exists(data_path):
        data_path = os.path.join('data', 'cardio_train.csv')
        data = pd.read_csv(data_path, sep=';')
        
        # Basic preprocessing if using raw data
        data = data[
            (data["ap_hi"] > 50) & (data["ap_hi"] < 250) &
            (data["ap_lo"] > 30) & (data["ap_lo"] < 200) &
            (data["ap_hi"] >= data["ap_lo"])
        ]
        data['age'] = (data['age'] / 365).round().astype(int)
        data['bmi'] = data['weight'] / ((data['height'] / 100) ** 2)
    else:
        data = pd.read_csv(data_path, sep=',')
    
    print(f"Dataset shape: {data.shape}")
    return data

def prepare_features(data):
    """Prepare features and target variable in standardized order"""
    print("\nPreparing features...")
    
    # Standardized feature order from ML_Model.ipynb
    feature_cols = [
        'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 
        'gluc', 'smoke', 'alco', 'gender', 'active', 'age', 'bmi'
    ]
    
    X = data[feature_cols]
    y = data['cardio']
    
    print(f"Features: {X.columns.tolist()}")
    print(f"Number of features: {X.shape[1]}")
    
    return X, y

def train_model(X_train, y_train):
    """Train RandomForest model with optimized parameters"""
    print("\nTraining RandomForestClassifier model...")
    
    # Parameters from ML_Model.ipynb GridSearch results
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        min_samples_leaf=2,
        min_samples_split=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    
    print("Model training completed!")
    return model

def evaluate_model(model, X_test, y_test):
    """Evaluate model performance"""
    print("\nEvaluating model...")
    
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)
    
    print(f"\nAccuracy: {accuracy * 100:.2f}%")
    print(f"\nConfusion Matrix:\n{conf_matrix}")
    print(f"\nClassification Report:\n{classification_report(y_test, y_pred)}")
    
    return accuracy

def save_model_and_scaler(model, scaler):
    """Save trained model and scaler"""
    print("\nSaving model and scaler...")
    
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    with open('scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    
    print("Model and scaler saved successfully!")

def main():
    """Main training pipeline"""
    print("=" * 50)
    print("Cardiovascular Disease Prediction Model Training (Random Forest)")
    print("=" * 50)
    
    # Load and prepare data
    data = load_and_prepare_data()
    
    # Prepare features and target
    X, y = prepare_features(data)
    
    # Split data
    print("\nSplitting data (80% train, 20% test)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"Training set size: {X_train.shape[0]}")
    print(f"Test set size: {X_test.shape[0]}")
    
    # Scale features
    print("\nScaling features using StandardScaler...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = train_model(X_train_scaled, y_train)
    
    # Evaluate model
    accuracy = evaluate_model(model, X_test_scaled, y_test)
    
    # Save model and scaler
    save_model_and_scaler(model, scaler)
    
    print("\n" + "=" * 50)
    print("Training completed successfully!")
    print(f"Final Model Accuracy: {accuracy * 100:.2f}%")
    print("=" * 50)

if __name__ == '__main__':
    main()

