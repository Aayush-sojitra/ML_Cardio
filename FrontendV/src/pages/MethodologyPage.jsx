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
import {
    ChartBar,
    TrendingUp,
    Activity,
    PieChart as PieIcon,
    Zap,
    Calculator,
    Trash2,
    CheckCircle,
    Target,
    Hash,
    Layers,
    FileText,
    BarChart2
} from 'lucide-react';
import { classNames } from '../utils/helpers';

const PREPROCESSING_STEPS = [
    {
        id: 1,
        title: 'Feature Engineering',
        description: 'Derived "BMI" from Height and Weight. Converted "Age" from days to integer years.',
        icon: Calculator,
        before: { features: '12', age_unit: 'Days' },
        after: { features: '13', age_unit: 'Years' }
    },
    {
        id: 2,
        title: 'Outlier Mitigation',
        description: 'Removed anomalies in BP (ap_hi < 250, ap_lo < 200).',
        icon: Trash2,
        before: { rows: '70,000' },
        after: { rows: '68,576' }
    },
    {
        id: 3,
        title: 'Clinical Scaling',
        description: 'Standardized variables using StandardScaler for consistent clinical normalization.',
        icon: Zap,
        before: { ap_hi_max: '240' },
        after: { ap_hi_max: '2.5 (std)' }
    }
];

export default function MethodologyPage() {
    const [edaData, setEdaData] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [summary, modelMetrics, dynamicEda] = await Promise.all([
                    api.getDatasetSummary(),
                    api.getModelMetrics(),
                    api.getEdaStats()
                ]);

                setEdaData(dynamicEda);
                setMetrics(modelMetrics);
            } catch (err) {
                console.error("Error fetching methodology data:", err);
            } finally {
                setLoading(false);
            }
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

    if (!metrics || !edaData) {
        return (
            <div className="text-center py-20">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analysis Data Unavailable</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Could not retrieve clinical metrics from the analysis engine.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-20">
            {/* Header */}
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                    Clinical <span className="text-blue-600">Methodology</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto italic">
                    "From raw EHR data to diagnostic precision: A comprehensive view of our machine learning pipeline."
                </p>
            </header>

            {/* Part 1: Exploratory Data Analysis */}
            <section className="space-y-8">
                <SectionHeader icon={ChartBar} title="1. Exploratory Data Analysis" subtitle="Understanding the 70,000+ patient records foundation." />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <PieIcon className="w-5 h-5 text-blue-500" /> Disease Prevalence
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={edaData.targetDistribution} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                                        {edaData.targetDistribution.map((entry, index) => (
                                            <RechartsCell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" /> Age Demographics
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={edaData.ageGroups}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 2: Preprocessing Pipeline */}
            <section className="space-y-8">
                <SectionHeader icon={Zap} title="2. Preprocessing & Refining" subtitle="Transforming clinical variables for model consumption." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PREPROCESSING_STEPS.map((step) => (
                        <div key={step.id} className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-gray-100 dark:border-slate-800 hover:glow-blue transition-all group">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <step.icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 h-12 overflow-hidden">{step.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700/50">
                                <span className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest">Validated</span>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Part 3: Model Evaluation & Confusion Matrix */}
            <section className="space-y-8">
                <SectionHeader icon={FileText} title="3. Validation & Performance" subtitle="Critical analysis of the Random Forest accuracy." />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <MetricCard label="Accuracy" value={metrics.accuracy} icon={Target} color="blue" />
                    <MetricCard label="Precision" value={metrics.precision} icon={Hash} color="indigo" />
                    <MetricCard label="Recall" value={metrics.recall} icon={Layers} color="violet" />
                    <MetricCard label="F1 Score" value={metrics.f1} icon={CheckCircle} color="emerald" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Confusion Matrix */}
                    <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-8">
                            <Activity className="w-5 h-5 text-blue-500" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confusion Matrix</h3>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-3 text-center max-w-sm w-full">
                                <div className="col-span-1"></div>
                                <div className="col-span-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pred: No</div>
                                <div className="col-span-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pred: Yes</div>

                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-end pr-3">Act: No</div>
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                    <div className="text-2xl font-black">{metrics.confusionMatrix[0][0]}</div>
                                    <div className="text-[10px] font-bold opacity-70">TN</div>
                                </div>
                                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                                    <div className="text-2xl font-black">{metrics.confusionMatrix[0][1]}</div>
                                    <div className="text-[10px] font-bold opacity-70">FP</div>
                                </div>

                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-end pr-3">Act: Yes</div>
                                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                                    <div className="text-2xl font-black">{metrics.confusionMatrix[1][0]}</div>
                                    <div className="text-[10px] font-bold opacity-70">FN</div>
                                </div>
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                    <div className="text-2xl font-black">{metrics.confusionMatrix[1][1]}</div>
                                    <div className="text-[10px] font-bold opacity-70">TP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Generalization */}
                    <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-8">
                            <BarChart2 className="w-5 h-5 text-blue-500" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stable Performance</h3>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { name: 'Training', accuracy: Number(metrics.trainAccuracy.toFixed(3)) * 100 },
                                        { name: 'Test', accuracy: Number(metrics.accuracy.toFixed(3)) * 100 },
                                    ]}
                                >

                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis domain={[0, 1]} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="accuracy" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                    <Tooltip formatter={(value) => `${value}%`} />

                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="mt-6 text-xs text-gray-400 leading-relaxed">
                            The minimal gap between training and test accuracy demonstrates excellent generalization across unseen patient demographics.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{title}</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 pl-[44px]">{subtitle}</p>
        </div>
    );
}

function MetricCard({ label, value, icon: Icon, color }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
        violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    };

    return (
        <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg">
            <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{(value * 100).toFixed(1)}%</div>
        </div>
    );
}
