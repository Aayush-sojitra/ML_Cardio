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
    Heart
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
