import React, { useState } from 'react';
import { ArrowRight, Trash2, Code, Zap, Calculator, ChevronRight, CheckCircle } from 'lucide-react';
import { classNames } from '../utils/helpers';

const STEPS = [
    {
        id: 1,
        title: 'Feature Engineering',
        description: 'Derived "BMI" from Height and Weight. Converted "Age" from days to integer years for anatomical relevance.',
        icon: Calculator,
        color: 'rose',
        before: { features: '12', age_unit: 'Days' },
        after: { features: '13', age_unit: 'Years' }
    },
    {
        id: 2,
        title: 'Outlier Mitigation',
        description: 'Identified and removed physiological anomalies in blood pressure (ap_hi < 250, ap_lo < 200).',
        icon: Trash2,
        color: 'orange',
        before: { rows: '70,000' },
        after: { rows: '68,765' }
    },
    {
        id: 3,
        title: 'Clinical Scaling',
        description: 'Standardized variables using StandardScaler to ensure systolic pressure doesn\'t overshadow cholesterol in gradient descent.',
        icon: Zap,
        color: 'amber',
        before: { ap_hi_max: '240' },
        after: { ap_hi_max: '2.5 (std)' }
    }
];

export default function PreprocessingPage() {
    return (
        <div className="space-y-12 pb-20">
            <header>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <Zap className="w-8 h-8 text-rose-600" />
                    Data Refining Pipeline
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Tracing the transformation from raw EHR records to optimized model inputs.</p>
            </header>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-100 via-orange-100 to-transparent dark:from-rose-900/20 dark:via-orange-900/20 md:-translate-x-1/2" />

                <div className="space-y-16">
                    {STEPS.map((step, idx) => (
                        <div key={step.id} className={classNames("relative flex items-center md:justify-between group", idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>

                            {/* Icon Marker */}
                            <div className={`absolute left-10 md:left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-gray-800 border-4 border-gray-50 dark:border-gray-700 rounded-[28px] flex items-center justify-center z-10 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon className="w-8 h-8 text-rose-600" />
                            </div>

                            {/* Content Card */}
                            <div className={classNames("ml-24 md:ml-0 w-full md:w-5/12", idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto')}>
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-[36px] shadow-2xl border border-white/20 dark:border-gray-700/30 hover:shadow-rose-500/10 transition-all">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">{step.title}</h3>
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
                                            Stage {step.id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">{step.description}</p>

                                    {/* Before/After Metrics */}
                                    <div className="grid grid-cols-2 gap-4 bg-gray-50/50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50">
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black flex items-center gap-1">
                                                Input
                                            </span>
                                            {Object.entries(step.before).map(([key, val]) => (
                                                <div key={key} className="flex flex-col">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase">{key.replace('_', ' ')}</span>
                                                    <span className="text-gray-600 dark:text-gray-300 font-bold text-sm tracking-tight">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pl-6 border-l-2 border-dashed border-gray-200 dark:border-gray-700 space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-black">
                                                Propagated
                                            </span>
                                            {Object.entries(step.after).map(([key, val]) => (
                                                <div key={key} className="flex flex-col">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase">{key.replace('_', ' ')}</span>
                                                    <span className="text-rose-600 dark:text-rose-400 font-black text-sm tracking-tight">{val}</span>
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

            <div className="bg-gradient-to-r from-rose-600 to-red-700 p-8 rounded-[40px] text-white flex flex-col items-center text-center shadow-2xl shadow-rose-500/30">
                <CheckCircle className="w-12 h-12 mb-4 text-rose-200" />
                <h3 className="text-2xl font-black mb-2">Pipeline Verified</h3>
                <p className="text-rose-100 text-sm max-w-lg leading-relaxed">
                    Data is strictly validated for physiological consistency and clinical relevance before being passed to the Logistic Regression engine.
                </p>
                <ChevronRight className="w-8 h-8 mt-6 text-rose-300 animate-bounce" />
            </div>
        </div>
    );
}
