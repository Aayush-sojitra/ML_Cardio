import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell as RechartsCell,
    Legend
} from 'recharts';
import { api } from '../services/api';
import { ChartBar, TrendingUp, Activity, PieChart as PieIcon } from 'lucide-react';

export default function EDAPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const summary = await api.getDatasetSummary();
            // Mock EDA data based on typical Cardio dataset characteristics
            const mockEDA = {
                targetDistribution: [
                    { name: 'No Disease', value: 35021, color: '#10B981' },
                    { name: 'Disease', value: 34979, color: '#EF4444' }
                ],
                ageGroups: [
                    { name: '30-40', value: 5000 },
                    { name: '40-50', value: 15000 },
                    { name: '50-60', value: 35000 },
                    { name: '60+', value: 15000 }
                ]
            };
            setData(mockEDA);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <ChartBar className="w-8 h-8 text-rose-600" />
                    Dataset Insights
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Deep dive into the cardiovascular dataset distributions and correlations.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Target Distribution */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 mb-8">
                        <PieIcon className="w-5 h-5 text-rose-500" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Disease Prevalence</h3>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.targetDistribution}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.targetDistribution.map((entry, index) => (
                                        <RechartsCell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Age Distribution */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 mb-8">
                        <TrendingUp className="w-5 h-5 text-rose-500" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Age Demographics</h3>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.ageGroups}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '16px' }} />
                                <Bar dataKey="value" fill="#F43F5E" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Correlation Matrix */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 mb-8">
                        <Activity className="w-5 h-5 text-rose-500" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Clinical Correlation Matrix</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="min-w-[600px] grid grid-cols-7 gap-2">
                            <div className="text-[10px] font-bold text-gray-400 uppercase"></div>
                            {['Age', 'BP-Hi', 'BP-Lo', 'Chol', 'Gluc', 'BMI'].map(h => (
                                <div key={h} className="text-[10px] font-bold text-gray-400 uppercase text-center">{h}</div>
                            ))}

                            <Row label="Age" values={[1.0, 0.2, 0.1, 0.1, 0.1, 0.1]} />
                            <Row label="BP-Hi" values={[0.2, 1.0, 0.7, 0.2, 0.1, 0.3]} />
                            <Row label="BP-Lo" values={[0.1, 0.7, 1.0, 0.1, 0.1, 0.2]} />
                            <Row label="Chol" values={[0.1, 0.2, 0.1, 1.0, 0.4, 0.1]} />
                            <Row label="Gluc" values={[0.1, 0.1, 0.1, 0.4, 1.0, 0.1]} />
                            <Row label="BMI" values={[0.1, 0.3, 0.2, 0.1, 0.1, 1.0]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Row = ({ label, values }) => (
    <>
        <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center">{label}</div>
        {values.map((v, i) => (
            <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-bold text-white transition-transform hover:scale-110 cursor-pointer ${v === 1 ? 'bg-rose-600' : v > 0.5 ? 'bg-rose-500' : v > 0.2 ? 'bg-rose-300' : 'bg-rose-100'
                }`}>
                {v}
            </div>
        ))}
    </>
);
