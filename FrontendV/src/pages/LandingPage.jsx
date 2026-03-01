import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, HeartPulse, BrainCircuit, ActivitySquare } from 'lucide-react';
import { classNames } from '../utils/helpers';


export default function LandingPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-20">
            {/* Hero Section */}
            <div className="relative text-center py-20 lg:py-32 overflow-hidden">

                <div className="inline-flex items-center gap-2 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                    <HeartPulse className="w-4 h-4" />
                    Predictive Cardiology AI
                </div>

                <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
                    Empowering Early <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                        CVD Intervention
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                    CardioShield leverages sophisticated Machine Learning models trained on 70,000+ patient records to provide clinical-grade cardiovascular risk assessments.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 items-center">
                    <Link
                        to="/prediction"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl shadow-2xl text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-[0.98] shadow-blue-500/30"
                    >
                        Start Risk Assessment
                        <ArrowRight className="ml-2 -mr-1 h-6 w-6" />
                    </Link>
                    <Link
                        to="/dataset"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-lg font-bold rounded-2xl text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        View Dataset
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                <StatCard label="Accuracy" value="73.1%" detail="Random Forest" />
                <StatCard label="Dataset" value="70k" detail="Patient Records" />
                <StatCard label="Features" value="12" detail="Clinical Indicators" />
                <StatCard label="Speed" value="<0.5s" detail="Per Prediction" />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
                <FeatureCard
                    icon={ActivitySquare}
                    title="Real-time Analytics"
                    description="Get instantaneous risk scores based on blood pressure, cholesterol, and lifestyle factors."
                />
                <FeatureCard
                    icon={BrainCircuit}
                    title="Explainable AI"
                    description="Understand how individual features like BMI or age influence the patient's risk profile."
                />
                <FeatureCard
                    icon={ShieldCheck}
                    title="Clinical Precision"
                    description="Validated against standardized UCI datasets for consistent performance across demographics."
                />
            </div>
        </div>
    );
}

function StatCard({ label, value, detail }) {
    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 text-center">
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{value}</div>
            <div className="text-[10px] text-blue-500 dark:text-blue-400 font-bold">{detail}</div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="group relative p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 inline-flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{description}</p>
        </div>
    );
}
