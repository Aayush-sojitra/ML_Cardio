import React, { useState } from 'react';
import { ArrowRight, Trash2, Code, Zap } from 'lucide-react';
import { classNames } from '../utils/helpers';

const STEPS = [
    {
        id: 1,
        title: 'Handle Missing Values',
        description: 'Imputed missing ages with Mean (29.5). Dropped rows with missing target.',
        icon: Trash2,
        color: 'blue',
        before: { rows: '15,420', missing: '19' },
        after: { rows: '15,418', missing: '0' }
    },
    {
        id: 2,
        title: 'Categorical Encoding',
        description: 'Applied One-Hot Encoding to "Gender" and Label Encoding to "Category".',
        icon: Code,
        color: 'purple',
        before: { columns: '14' },
        after: { columns: '18' }
    },
    {
        id: 3,
        title: 'Feature Scaling',
        description: 'Standardized numerical features (Age, Income) to Mean=0, Std=1.',
        icon: Zap,
        color: 'emerald',
        before: { range: '0 - 100k' },
        after: { range: '-1.5 - 2.1' }
    }
];

export default function PreprocessingPage() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Preprocessing</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">See how raw data is transformed into model-ready inputs.</p>
            </div>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-translate-x-1/2" />

                <div className="space-y-12">
                    {STEPS.map((step, idx) => (
                        <div key={step.id} className={classNames("relative flex items-center md:justify-between group", idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>

                            {/* Icon Marker */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-800 border-4 border-gray-100 dark:border-gray-700 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:border-blue-100 dark:group-hover:border-blue-900/40 transition-colors">
                                <step.icon className={`w-6 h-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                            </div>

                            {/* Content Card */}
                            <div className={classNames("ml-20 md:ml-0 w-full md:w-5/12", idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto')}>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-${step.color}-100 text-${step.color}-800 dark:bg-${step.color}-900/30 dark:text-${step.color}-300`}>
                                            Step {step.id}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">{step.description}</p>

                                    {/* Before/After Metrics */}
                                    <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                                        <div>
                                            <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Before</span>
                                            {Object.entries(step.before).map(([key, val]) => (
                                                <div key={key} className="mt-1">
                                                    <span className="text-gray-400 text-xs capitalize">{key}: </span>
                                                    <span className="text-gray-900 dark:text-white font-mono text-sm">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pl-4 border-l border-gray-200 dark:border-gray-600">
                                            <span className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 font-semibold">After</span>
                                            {Object.entries(step.after).map(([key, val]) => (
                                                <div key={key} className="mt-1">
                                                    <span className="text-gray-400 text-xs capitalize">{key}: </span>
                                                    <span className="text-gray-900 dark:text-white font-mono text-sm">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
