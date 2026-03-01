# Cardiovascular Disease Prediction Backend

Flask-based REST API for cardiovascular disease prediction using machine learning.

## Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
  ```bash
  venv\Scripts\activate
  ```
- Linux/Mac:
  ```bash
  source venv/bin/activate
  ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

### Training the Model

Before running the API, you need to train the model:

```bash
python ML_Model.py
```

This will:
- Load the cardiovascular disease dataset from `../cardio_train.csv`
- Preprocess the data (calculate BMI, convert age to years)
- Train a Logistic Regression model
- Save the trained model and scaler to `model.pkl` and `scaler.pkl`
- Display training metrics and accuracy

Expected output: ~73% accuracy

## Running the API

Start the Flask server:

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### Prediction
```
POST /predict
Content-Type: application/json
```

Request body:
```json
{
  "age": 50,
  "gender": 2,
  "height": 168,
  "weight": 62,
  "ap_hi": 110,
  "ap_lo": 80,
  "cholesterol": 1,
  "gluc": 1,
  "smoke": 0,
  "alco": 0,
  "active": 1
}
```

Field descriptions:
- `age`: Age in years
- `gender`: Gender (1 = Female, 2 = Male)
- `height`: Height in cm
- `weight`: Weight in kg
- `ap_hi`: Systolic blood pressure
- `ap_lo`: Diastolic blood pressure
- `cholesterol`: Cholesterol level (1 = Normal, 2 = Above normal, 3 = Well above normal)
- `gluc`: Glucose level (1 = Normal, 2 = Above normal, 3 = Well above normal)
- `smoke`: Smoking (0 = No, 1 = Yes)
- `alco`: Alcohol intake (0 = No, 1 = Yes)
- `active`: Physical activity (0 = No, 1 = Yes)

Response:
```json
{
  "prediction": 0,
  "probability": {
    "no_disease": 0.73,
    "disease": 0.27
  },
  "message": "Low risk of cardiovascular disease"
}
```

## Model Details

- **Algorithm**: Logistic Regression
- **Features**: 12 (age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, BMI)
- **Preprocessing**: StandardScaler
- **Accuracy**: ~73.32%
- **Training Data**: 70,000 patient records

## CORS Configuration

CORS is enabled for all origins to allow frontend integration. In production, configure CORS to allow only specific origins.

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Successful prediction
- `400`: Invalid input data
- `500`: Server error or model not loaded

## Development

To modify the model or add features:
1. Update `ML_Model.py` with your changes
2. Retrain the model: `python ML_Model.py`
3. Restart the Flask server

## Troubleshooting

**Model not loaded error**:
- Ensure you've run `ML_Model.py` first
- Check that `model.pkl` and `scaler.pkl` exist in the backend directory

**Import errors**:
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check Python version compatibility

**CORS errors**:
- Ensure Flask-CORS is installed
- Check browser console for specific CORS issues
