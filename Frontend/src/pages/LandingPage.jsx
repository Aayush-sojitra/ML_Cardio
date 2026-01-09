import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, TrendingUp, Cpu, Activity } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center py-16 lg:py-24">
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                    <span className="block">Machine Learning</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                        Pipeline Dashboard
                    </span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                    A comprehensive interface to explore, analyze, and deploy Machine Learning models without writing a single line of code.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        to="/dataset"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                    >
                        Explore Dataset
                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                    </Link>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-full shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                        View Source
                    </a>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                    icon={Database}
                    title="Data Processing"
                    description="Clean, normalize, and encode your data with visual feedback at every step."
                />
                <FeatureCard
                    icon={TrendingUp}
                    title="EDA"
                    description="Interactive charts and heatmaps to understand feature relationships."
                />
                <FeatureCard
                    icon={Cpu}
                    title="Model Training"
                    description="Train models with custom hyperparameters and watch progress in real-time."
                />
                <FeatureCard
                    icon={Activity}
                    title="Evaluation"
                    description="Detailed metrics, confusion matrices, and ROC curves to validate performance."
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full blur-2xl font-bold" />
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    );
}
