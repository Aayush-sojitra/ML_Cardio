import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    getDatasetSummary: async () => {
        try {
            const response = await apiClient.get('/dataset-summary');
            return response.data;
        } catch (error) {
            console.error('Error fetching dataset summary:', error);
            // Fallback to minimal structure if backend fails
            return { rows: 0, columns: 0, features: [], missingValues: { total: 0, byColumn: {} } };
        }
    },

    getModelMetrics: async () => {
        try {
            const response = await apiClient.get('/model-metrics');
            return response.data;
        } catch (error) {
            console.error('Error fetching model metrics:', error);
            return { accuracy: 0, trainAccuracy: 0, precision: 0, recall: 0, f1: 0, confusionMatrix: [[0, 0], [0, 0]] };
        }
    },

    getEdaStats: async () => {
        try {
            const response = await apiClient.get('/eda-stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching EDA stats:', error);
            return { targetDistribution: [], ageGroups: [] };
        }
    },

    predict: async (data) => {
        try {
            const response = await apiClient.post('/predict', data);
            return response.data;
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    },

    checkHealth: async () => {
        try {
            const response = await apiClient.get('/health');
            return response.data;
        } catch (error) {
            return { status: 'offline' };
        }
    }
};
