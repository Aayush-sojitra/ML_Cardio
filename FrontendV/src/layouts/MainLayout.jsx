import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Database,
    ChartBar,
    Settings,
    PlayCircle,
    CheckCircle,
    BrainCircuit,
    Menu,
    X,
    Moon,
    Sun,
    ChevronDown,
    Heart,
    ArrowRight
} from 'lucide-react';
import { classNames } from '../utils/helpers';

const NAVIGATION = [
    { name: 'Analysis', href: '/prediction', icon: Heart },
    { name: 'Dataset', href: '/dataset', icon: Database },
    { name: 'Methodology', href: '/methodology', icon: BrainCircuit },
];

export default function MainLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
            {/* Top Navbar */}
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
                <header className="w-full max-w-5xl backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg ring-1 ring-black/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-1.5 rounded-lg shadow-lg shadow-blue-500/30">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400">
                                    Cardio Predictor
                                </span>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-1">
                                <NavLink to="/" end className={({ isActive }) => classNames(
                                    isActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
                                    'px-4 py-2 rounded-full text-sm transition-all duration-200'
                                )}>
                                    Home
                                </NavLink>

                                <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

                                {NAVIGATION.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) => classNames(
                                            isActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:text-blue-400 font-semibold shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
                                            'group flex items-center px-4 py-2 rounded-full text-sm transition-all duration-200'
                                        )}
                                    >
                                        <span>{item.name}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                                >
                                    {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
                                </button>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 absolute -bottom-2 left-0 right-0 translate-y-full rounded-2xl shadow-xl overflow-hidden mt-2">
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => classNames(
                                    isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                                    'block px-3 py-3 rounded-xl text-base font-medium'
                                )}>
                                    Home
                                </NavLink>
                                {NAVIGATION.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) => classNames(
                                            isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                                            'block px-3 py-3 rounded-xl text-base font-medium flex items-center'
                                        )}
                                    >
                                        <item.icon className="w-5 h-5 mr-3 opacity-70" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    )}
                </header>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex-grow">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-950 text-white py-12 px-4 border-t border-gray-800">
                <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Heart className="w-5 h-5 mx-0" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-white uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                            Cardio Predictor
                        </span>
                    </div>

                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    <div className="text-center space-y-4">
                        <p className="text-gray-400 font-medium tracking-wide">
                            Developed by <span className="text-white font-bold ml-1">Aayush Sojitra</span>
                        </p>

                        <a
                            href="https://github.com/Aayush-sojitra"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold transition-all hover:scale-105 active:scale-95 group"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span>Follow on GitHub</span>
                            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-4">
                        © {new Date().getFullYear()} CardioShield Diagnostics • All Technical Rights Reserved
                    </p>
                </div>
            </footer>
        </div>
    );
}
