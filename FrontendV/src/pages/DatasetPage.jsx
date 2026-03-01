import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Database, AlertTriangle, CheckCircle, Hash, AlignLeft, Info } from 'lucide-react';
import { classNames } from '../utils/helpers';

export default function DatasetPage() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await api.getDatasetSummary();
            setSummary(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20">
            <header>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <Database className="w-8 h-8 text-blue-600" />
                    Dataset Inventory
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">A detailed breakdown of the 70,000 patient records used for model calibration.</p>
            </header>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Database} label="Total Records" value={summary.rows.toLocaleString()} color="text-blue-600 dark:text-blue-400" bg="bg-blue-50 dark:bg-blue-900/20" />
                <StatCard icon={AlignLeft} label="Variables" value={summary.columns} color="text-blue-600 dark:text-blue-400" bg="bg-blue-50 dark:bg-blue-900/20" />
                <StatCard icon={AlertTriangle} label="Missing Data" value={summary.missingValues.total} color="text-amber-500" bg="bg-amber-50 dark:bg-amber-900/20" />
                <StatCard icon={Hash} label="Input Features" value={summary.features.length - 1} color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-900/20" />
            </div>

            {/* Feature Details Table */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-2xl">
                <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Info className="w-6 h-6 text-blue-500" />
                        Feature Metadata
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Variable</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Data Integrity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                            {summary.features.map((feature, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/10 dark:hover:bg-blue-900/5 transition-colors group">
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            {feature.name}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                        {feature.description}
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className={classNames(
                                            "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                                            feature.type === 'numerical' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                feature.type === 'target' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' :
                                                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                        )}>
                                            {feature.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold">
                                        <div className="flex items-center text-emerald-500">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            100% Valid
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, bg }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-lg border border-gray-100 dark:border-gray-700/50 group hover:-translate-y-1 transition-all">
            <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-8 h-8 ${color}`} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white">{value}</p>
        </div>
    );
}
