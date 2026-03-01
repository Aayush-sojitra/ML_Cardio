import React, { useState } from 'react';
import { api } from '../services/api';
import {
    Activity,
    Heart,
    User,
    Scale,
    Ruler,
    Droplets,
    Wind,
    Beer,
    Dumbbell,
    AlertCircle,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';

const FormField = ({ label, icon: Icon, children }) => (
    <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-100 ml-1">
            <Icon className="w-4 h-4 text-blue-500" />
            {label}
        </label>
        {children}
    </div>
);

const Sparkles = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
);

const Heartline = ({ className }) => (
    <div className={`relative h-16 w-full overflow-hidden opacity-30 ${className}`}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <path
                d="M0 50 L100 50 L110 30 L120 70 L130 50 L200 50 L210 10 L220 90 L230 50 L300 50 L310 40 L320 60 L330 50 L400 50 L410 30 L420 70 L430 50 L500 50 L510 10 L520 90 L530 50 L600 50 L610 40 L620 60 L630 50 L700 50 L710 30 L720 70 L730 50 L800 50 L810 10 L820 90 L830 50 L900 50 L910 40 L920 60 L930 50 L1000 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="animate-heartline text-blue-500"
            />
        </svg>
    </div>
);

export default function PredictionPage() {
    const [inputs, setInputs] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        ap_hi: '',
        ap_lo: '',
        cholesterol: '',
        gluc: '',
        smoke: '0',
        alco: '0',
        active: '0'
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        // Convert string inputs to numbers for the ML model
        const numericalInputs = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, Number(value)])
        );

        try {
            const data = await api.predict(numericalInputs);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to connect to the prediction engine.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Side: Form */}
                <div className="flex-1">
                    <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 transition-all duration-300">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                                Cardiovascular Diagnosis
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Fill in the details below to analyze patient risk using our ML model.
                            </p>
                        </header>

                        <form onSubmit={handlePredict} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField label="Age (Years)" icon={User}>
                                <input
                                    type="number"
                                    name="age"
                                    value={inputs.age}
                                    onChange={handleChange}
                                    placeholder="Enter Age"
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    required
                                />
                            </FormField>

                            <FormField label="Gender" icon={User}>
                                <select
                                    name="gender"
                                    value={inputs.gender}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select Gender
                                    </option>
                                    <option value="1" className="bg-white dark:bg-slate-900">Female</option>
                                    <option value="2" className="bg-white dark:bg-slate-900">Male</option>
                                </select>
                            </FormField>

                            <FormField label="Height (cm)" icon={Ruler}>
                                <input
                                    type="number"
                                    name="height"
                                    value={inputs.height}
                                    onChange={handleChange}
                                    placeholder="i.e. 165"
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    required
                                />
                            </FormField>

                            <FormField label="Weight (kg)" icon={Scale}>
                                <input
                                    type="number"
                                    name="weight"
                                    value={inputs.weight}
                                    onChange={handleChange}
                                    placeholder="i.e. 70"
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    required
                                />
                            </FormField>

                            <FormField label="Systolic BP" icon={Heart}>
                                <input
                                    type="number"
                                    name="ap_hi"
                                    value={inputs.ap_hi}
                                    onChange={handleChange}
                                    placeholder="i.e. 120"
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    required
                                />
                            </FormField>

                            <FormField label="Diastolic BP" icon={Activity}>
                                <input
                                    type="number"
                                    name="ap_lo"
                                    value={inputs.ap_lo}
                                    onChange={handleChange}
                                    placeholder="i.e. 80"
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    required
                                />
                            </FormField>

                            <FormField label="Cholesterol" icon={Droplets}>
                                <select
                                    name="cholesterol"
                                    value={inputs.cholesterol}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select Cholesterol Level
                                    </option>
                                    <option value="1">Normal</option>
                                    <option value="2">Above Normal</option>
                                    <option value="3">Well Above Normal</option>
                                </select>
                            </FormField>

                            <FormField label="Glucose" icon={Sparkles}>
                                <select
                                    name="gluc"
                                    value={inputs.gluc}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select Glucose Level
                                    </option>
                                    <option value="1">Normal</option>
                                    <option value="2">Above Normal</option>
                                    <option value="3">Well Above Normal</option>
                                </select>
                            </FormField>

                            <div className="col-span-1 sm:col-span-2 grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-slate-700/50 pt-6 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                    <Wind className={inputs.smoke === '1' ? "text-orange-500" : "text-gray-400"} />
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-300">Smoke</span>
                                    <input type="checkbox" checked={inputs.smoke === '1'} onChange={(e) => setInputs(prev => ({ ...prev, smoke: e.target.checked ? '1' : '0' }))} className="w-5 h-5 rounded-full accent-blue-600 cursor-pointer" />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Beer className={inputs.alco === '1' ? "text-purple-500" : "text-gray-400"} />
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-300">Alcohol</span>
                                    <input type="checkbox" checked={inputs.alco === '1'} onChange={(e) => setInputs(prev => ({ ...prev, alco: e.target.checked ? '1' : '0' }))} className="w-5 h-5 rounded-full accent-blue-600 cursor-pointer" />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Dumbbell className={inputs.active === '1' ? "text-green-500" : "text-gray-400"} />
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-300">Active</span>
                                    <input type="checkbox" checked={inputs.active === '1'} onChange={(e) => setInputs(prev => ({ ...prev, active: e.target.checked ? '1' : '0' }))} className="w-5 h-5 rounded-full accent-blue-600 cursor-pointer" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="col-span-1 sm:col-span-2 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl py-4 font-bold shadow-xl hover:shadow-blue-500/30 dark:hover:glow-blue transition-all active:scale-[0.98] disabled:opacity-70"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-6 h-6" />
                                            <span>Run Clinical Analysis</span>
                                        </>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="w-full md:w-80 lg:w-96 flex flex-col gap-6">
                    <div className={`flex-1 min-h-[400px] flex flex-col items-center justify-center p-8 rounded-3xl border transition-all duration-700 ${result
                        ? result.prediction === 1
                            ? "bg-red-50/80 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 glow-red"
                            : "bg-green-50/80 dark:bg-green-950/20 border-green-200 dark:border-green-900/50 glow-green"
                        : "bg-white/50 dark:bg-slate-900/40 border-dashed border-gray-300 dark:border-slate-700/50"
                        }`}>
                        {!result && !loading && (
                            <div className="text-center space-y-4">
                                <Activity className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 animate-pulse" />
                                <p className="text-gray-500 font-medium">Ready for input data</p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex flex-col items-center gap-6 w-full px-4">
                                <Heartline className="w-full h-12" />
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                                    <p className="font-bold text-blue-600 animate-pulse tracking-widest uppercase text-xs">Clinical Processing...</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-center p-6 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 space-y-2">
                                <AlertCircle className="w-10 h-10 mx-auto" />
                                <p className="font-bold">Analysis Failed</p>
                                <p className="text-xs">{error}</p>
                            </div>
                        )}

                        {result && (
                            <div className="text-center w-full animate-in fade-in zoom-in duration-500">
                                <div className={`inline-flex p-4 rounded-full mb-6 ${result.prediction === 1 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                                    }`}>
                                    {result.prediction === 1 ? <AlertCircle className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12" />}
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Diagnostic Result</h3>
                                <div className={`text-3xl font-black mb-4 ${result.prediction === 1 ? "text-red-600" : "text-green-600"
                                    }`}>
                                    {result.prediction === 1 ? "CARDIO DETECTED" : "CARDIO NOT DETECTED"}
                                </div>
                                <Heartline className={result.prediction === 1 ? "opacity-40 text-red-500" : "opacity-40 text-green-500"} />
                                <div className="space-y-4">
                                    <div className="bg-white/40 dark:bg-black/20 p-4 rounded-2xl border border-black/5">
                                        <div className="text-xs font-bold text-gray-400 mb-1 uppercase">Probability Rate</div>
                                        <div className="text-2xl font-mono font-bold text-gray-700 dark:text-gray-200">
                                            {(result.probability.disease * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic px-4">
                                        "{result.message}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-600/30 overflow-hidden relative group">
                        <div className="relative z-10">
                            <h4 className="font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-blue-200" />
                                Model Insight
                            </h4>
                            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                                                               Our Random Forest engine evaluates features based on weights derived from 70,000+ clinical records, maintaining a ~73% baseline accuracy.
                            </p>
                        </div>
                        <Activity className="absolute right-[-20px] bottom-[-20px] w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                    </div>
                </div>

            </div>
        </div>
    );
}
