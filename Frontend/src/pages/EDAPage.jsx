import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { api } from '../services/api';

export default function EDAPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await api.getEDAData();
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exploratory Data Analysis</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Visualizing distributions and feature relationships.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribution Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Target Variable Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.histograms}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Correlation Heatmap (Mock Visual) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Feature Correlation Matrix</h3>
                    <div className="h-80 flex items-center justify-center">
                        {/* Simplified Grid Visualization */}
                        <div className="grid grid-cols-4 gap-1 w-full max-w-sm">
                            {['Age', 'Income', 'Score', 'Class'].map((label, i) => (
                                <div key={`header-${i}`} className="text-xs font-semibold text-center text-gray-500 mb-1">{label}</div>
                            ))}

                            {/* Row 1 */}
                            <Cell value={1.0} /> <Cell value={0.8} /> <Cell value={-0.2} /> <Cell value={0.5} />
                            {/* Row 2 */}
                            <Cell value={0.8} /> <Cell value={1.0} /> <Cell value={0.4} /> <Cell value={0.3} />
                            {/* Row 3 */}
                            <Cell value={-0.2} /> <Cell value={0.4} /> <Cell value={1.0} /> <Cell value={-0.1} />
                            {/* Row 4 */}
                            <Cell value={0.5} /> <Cell value={0.3} /> <Cell value={-0.1} /> <Cell value={1.0} />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center"><span className="w-3 h-3 bg-blue-100 mr-1 rounded"></span> Low</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 mr-1 rounded"></span> High</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-red-400 mr-1 rounded"></span> Negative</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Cell = ({ value }) => {
    let bg = 'bg-gray-100';
    if (value === 1) bg = 'bg-blue-600';
    else if (value > 0.7) bg = 'bg-blue-500';
    else if (value > 0.4) bg = 'bg-blue-300';
    else if (value > 0) bg = 'bg-blue-100';
    else bg = 'bg-red-300'; // Negative

    return (
        <div className={`aspect-square ${bg} rounded text-[10px] text-white flex items-center justify-center font-medium hover:opacity-80 transition-opacity cursor-pointer`}>
            {value}
        </div>
    );
};
