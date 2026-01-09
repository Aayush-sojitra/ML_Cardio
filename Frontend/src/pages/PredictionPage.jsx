import React, { useState } from 'react';
import { api } from '../services/api';
import { BrainCircuit, Sparkles, AlertCircle } from 'lucide-react';
import { classNames } from '../utils/helpers';

export default function PredictionPage() {
    const [inputs, setInputs] = useState({
        age: '30',
        income: '55000',
        score: '75',
        category: 'A'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        const data = await api.predict(inputs);
        // Simulate slight extra delay for effect
        setTimeout(() => {
            setResult(data);
            setLoading(false);
        }, 600);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Make Predictions</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Enter feature values to generate a model prediction.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Input Form */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handlePredict} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={inputs.age}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annual Income</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="number"
                                    name="income"
                                    value={inputs.income}
                                    onChange={handleChange}
                                    className="block w-full pl-7 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Credit Score</label>
                            <input
                                type="number"
                                name="score"
                                value={inputs.score}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                name="category"
                                value={inputs.category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="A">Category A</option>
                                <option value="B">Category B</option>
                                <option value="C">Category C</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Processing...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <BrainCircuit className="w-5 h-5 mr-2" />
                                    Predict Result
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Result Card */}
                <div className="flex flex-col">
                    <div className={classNames(
                        "flex-1 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center transition-all duration-500",
                        result ? "opacity-100 translate-y-0" : "opacity-90 translate-y-0"
                    )}>
                        {!result && !loading && (
                            <div className="text-gray-400 dark:text-gray-500">
                                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">Enter details and click Predict to see results.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        )}

                        {result && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <h3 className="text-lg text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-2">Predicted Outcome</h3>
                                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-4">
                                    {result.prediction}
                                </div>
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    <span className="font-semibold">{(result.confidence * 100).toFixed(1)}% Confidence</span>
                                </div>
                                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-left text-sm text-gray-600 dark:text-gray-300">
                                    <p>Model analysis indicates high probability of {result.prediction} due to elevated credit score and income levels.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
