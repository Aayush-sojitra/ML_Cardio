import { delay } from '../utils/helpers';

// Mock Data
const DATASET_SUMMARY = {
    rows: 15420,
    columns: 14,
    features: [
        { name: 'id', type: 'numerical', missing: 0 },
        { name: 'age', type: 'numerical', missing: 12 },
        { name: 'gender', type: 'categorical', missing: 0 },
        { name: 'income', type: 'numerical', missing: 5 },
        { name: 'score', type: 'numerical', missing: 0 },
        { name: 'category', type: 'categorical', missing: 2 },
        // ... more features
    ],
    missingValues: {
        total: 19,
        byColumn: { age: 12, income: 5, category: 2 }
    }
};

const EDA_DATA = {
    histograms: [
        { name: '0-10', value: 400 },
        { name: '10-20', value: 300 },
        { name: '20-30', value: 300 },
        { name: '30-40', value: 200 },
        { name: '40+', value: 100 },
    ],
    correlation: [
        { x: 'age', y: 'income', value: 0.8 },
        { x: 'age', y: 'score', value: -0.2 },
        { x: 'income', y: 'score', value: 0.5 },
    ]
};

const MODEL_METRICS = {
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.91,
    f1: 0.89,
    confusionMatrix: [
        [120, 15],
        [10, 140]
    ] // TP, FP, FN, TN
};

export const api = {
    getDatasetSummary: async () => {
        // await delay(500);
        return DATASET_SUMMARY;
    },
    getEDAData: async () => {
        // await delay(500);
        return EDA_DATA;
    },
    getModelMetrics: async () => {
        // await delay(800);
        return MODEL_METRICS;
    },
    trainModel: async (params) => {
        // Simulate training
        // await delay(2000);
        return { status: 'success', ...MODEL_METRICS };
    },
    predict: async (inputs) => {
        // await delay(300);
        // Dummy logic
        const score = Math.random() * 100;
        return { prediction: score > 50 ? 'Class A' : 'Class B', confidence: 0.85 };
    }
};
