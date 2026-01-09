import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Banner */}
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

                <div className="px-8 pb-8 relative">
                    <div className="flex justify-between items-end -mt-12 mb-6">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
                            <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl">🤖</div>
                        </div>
                        <div className="flex space-x-4 mb-2">
                            <SocialLink icon={Github} href="https://github.com" />
                            <SocialLink icon={Linkedin} href="https://linkedin.com" />
                            <SocialLink icon={Mail} href="mailto:example@email.com" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Machine Learning Project</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">A comprehensive end-to-end ML pipeline demonstration built with React and Python.</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                This project demonstrates a complete machine learning workflow, from raw data ingestion to model deployment.
                                It features a custom implementation of Random Forest and Linear Regression algorithms from scratch (without sklearn),
                                along with a modern, responsive dashboard for interaction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <TechItem label="React 19" />
                                <TechItem label="Vite" />
                                <TechItem label="Tailwind CSS 4" />
                                <TechItem label="Recharts" />
                                <TechItem label="Framer Motion" />
                                <TechItem label="Python Backend (Mock)" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialLink({ icon: Icon, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-gray-700 rounded-full shadow-sm hover:shadow"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}

function TechItem({ label }) {
    return (
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
        </div>
    );
}
