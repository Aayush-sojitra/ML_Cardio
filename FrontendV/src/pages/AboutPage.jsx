import React from 'react';
import { Heart, Github, Linkedin, Mail, ExternalLink, ShieldCheck, Database, Cpu, ChartBar, Settings, PlayCircle } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-16 pb-20">
            {/* Project Vision */}
            <div className="text-center space-y-6 pt-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[28px] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/40 transform -rotate-6">
                    <Heart className="w-12 h-12 text-white fill-white" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                    CardioShield ML:<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Precision Cardiology</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    A clinical-grade diagnostic assistant designed to democratize cardiovascular risk assessment through high-performance machine learning.
                </p>
            </div>

            {/* Methodology Hub */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WorkflowCard
                    icon={ChartBar}
                    title="Insightful EDA"
                    desc="Analyzing 70,000+ patient records to identify key correlations between lifestyle and cardiac health."
                />
                <WorkflowCard
                    icon={Settings}
                    title="Data Pipeline"
                    desc="Automated preprocessing including BMI derivation and physiological outlier mitigation."
                />
                <WorkflowCard
                    icon={PlayCircle}
                    title="Model Training"
                    desc="Logistic Regression engine optimized via stochastic gradient descent for clinical accuracy."
                />
            </div>

            {/* Core Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TechCard
                    icon={Cpu}
                    title="Intelligence"
                    tech="Scikit-Learn"
                    desc="Logistic Regression engine optimized for 72.33% accuracy on binary CVD prediction."
                />
                <TechCard
                    icon={Database}
                    title="Foundation"
                    tech="Pandas & Numpy"
                    desc="High-performance data engineering and outlier mitigation for 70k+ records."
                />
                <TechCard
                    icon={ShieldCheck}
                    title="Interface"
                    tech="React & Tailwind"
                    desc="Modern glassmorphism UI designed for intuitive healthcare workflows."
                />
            </div>

            {/* Detailed Methodology Section */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-gray-100 dark:border-slate-700/50">
                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-black mb-6 text-gray-900 dark:text-white border-l-4 border-blue-600 pl-4">The Methodology</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 italic">
                        "CardioShield was developed to solve the challenge of detecting cardiovascular diseases early in asymptomatic patients."
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        By analyzing biological attributes (Age, BMI) and clinical indicators (Blood Pressure, Glucose, Cholesterol), the model identifies subtle patterns that correlate with cardiac risk. The current version uses a **Logistic Regression classifier**, selected for its balance between performance and explainability.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <SocialLink icon={Github} label="View Source Code" href="https://github.com" />
                        <SocialLink icon={ExternalLink} label="UCI Dataset Access" href="https://kaggle.com" />
                    </div>
                </div>
            </div>

            {/* Contact Footer */}
            <footer className="text-center pt-8">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6 underline decoration-blue-500 decoration-2 underline-offset-4">Connect with Development</p>
                <div className="inline-flex items-center gap-8 p-6 bg-white dark:bg-gray-950 rounded-full shadow-lg border border-gray-100 dark:border-gray-800">
                    <a href="#" className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"><Mail className="w-6 h-6" /></a>
                    <a href="#" className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"><Linkedin className="w-6 h-6" /></a>
                    <a href="#" className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"><Github className="w-6 h-6" /></a>
                </div>
            </footer>
        </div>
    );
}

function WorkflowCard({ icon: Icon, title, desc }) {
    return (
        <div className="bg-blue-50/50 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-blue-100 dark:border-slate-800 group hover:shadow-xl hover:glow-blue hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <Icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    );
}

function TechCard({ icon: Icon, title, tech, desc }) {
    return (
        <div className="p-8 bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-xl group hover:-translate-y-1 hover:glow-blue transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{title}</h3>
            <div className="text-xl font-black text-gray-900 dark:text-white mb-2">{tech}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    );
}

function SocialLink({ icon: Icon, label, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all font-bold text-sm"
        >
            <Icon className="w-4 h-4" />
            {label}
        </a>
    );
}
