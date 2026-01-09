import React, { useState } from 'react';
import { api } from '../services/api';
import { PlayCircle, Settings, CheckCircle, Loader2 } from 'lucide-react';

export default function ModelTrainingPage() {
    const [training, setTraining] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [logs, setLogs] = useState([]);

    const startTraining = async () => {
        setTraining(true);
        setCompleted(false);
        setProgress(0);
        setLogs([]);

        // Simulate Logs and Progress
        const logSteps = [
            "Initializing model parameters...",
            "Loading preprocessed data...",
            "Starting Epoch 1/10 - Loss: 0.45",
            "Starting Epoch 5/10 - Loss: 0.21",
            "Starting Epoch 10/10 - Loss: 0.08",
            "Model converged successfully."
        ];

        for (let i = 0; i <= 100; i += 10) {
            await new Promise(r => setTimeout(r, 300));
            setProgress(i);
            if (i % 20 === 0 && logSteps.length > 0) {
                setLogs(prev => [...prev, logSteps.shift()]);
            }
        }

        await api.trainModel(); // Call mock API
        setTraining(false);
        setCompleted(true);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Model Training</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Configure hyperparameters and train the predictive model.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Configuration Panel */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <Settings className="w-5 h-5 text-gray-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Hyperparameters</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Algorithm</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm">
                                <option>Random Forest Classifier</option>
                                <option>Logistic Regression</option>
                                <option>Support Vector Machine</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">n_estimators</label>
                                <input type="number" defaultValue={100} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">max_depth</label>
                                <input type="number" defaultValue={10} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Test Split Ratio</label>
                            <input type="range" min="0.1" max="0.5" step="0.1" defaultValue="0.2" className="mt-2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>10%</span>
                                <span>50%</span>
                            </div>
                        </div>

                        <button
                            onClick={startTraining}
                            disabled={training}
                            className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all ${training ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {training ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    Training Model...
                                </>
                            ) : (
                                <>
                                    <PlayCircle className="-ml-1 mr-2 h-5 w-5" />
                                    Start Training
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Progress & Logs Panel */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Training Status</h3>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white mb-2">
                            <span>Overall Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Logs Console */}
                    <div className="flex-1 bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-y-auto max-h-64 border border-gray-700">
                        {logs.length === 0 && !training && !completed && (
                            <span className="text-gray-500">Waiting to start...</span>
                        )}
                        {logs.map((log, i) => (
                            <div key={i} className="text-green-400 mb-1">
                                <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                {log}
                            </div>
                        ))}
                        {completed && (
                            <div className="text-blue-400 font-bold mt-2">Training Completed Successfully.</div>
                        )}
                    </div>

                    {completed && (
                        <div className="mt-6 flex items-center justify-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span>Model Ready for Evaluation</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
