import { ArrowRight, CheckCircle2, LayoutGrid, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <div className="min-h-[calc(100-64px)] bg-white flex flex-col">
            {/* Hero Section */}
            <main className="grow flex flex-col items-center justify-center px-4 py-20 bg-linear-to-b from-slate-50 to-white">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
                        <Zap size={16} /> Now with Real-time CRUD
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Manage your tasks with <span className="text-indigo-600">Precision.</span>
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        TaskFlow helps you stay organized and hit your goals. A simple,
                        secure, and high-performance task manager built for the modern developer.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
                            className="w-full cursor-pointer sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
                        >
                            {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform cursor-pointer" />
                        </button>

                        {!isAuthenticated && (
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full cursor-pointer sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>

               
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto cursor-pointer">
                    <FeatureCard
                        icon={<ShieldCheck className="text-indigo-600" />}
                        title="Secure Auth"
                        desc="JWT based authentication to keep tasks private and safe."
                    />
                    <FeatureCard
                        icon={<LayoutGrid className="text-indigo-600" />}
                        title="Clean UI"
                        desc="Built with Tailwind CSS for a professional and responsive experience."
                    />
                    <FeatureCard
                        icon={<CheckCircle2 className="text-indigo-600" />}
                        title="Easy CRUD"
                        desc="Seamlessly create, update, and delete tasks in real-time."
                    />
                </div>
            </main>

            {/*  Footer */}
            <footer className="py-10 border-t border-slate-300 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <p className="text-slate-400 text-sm font-medium text-center">
                        © All Rights Reserved 2026 <span className="text-indigo-600">@ MJPRU</span>.
                    </p>
                </div>
            </footer>
        </div>
    );
};


const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{desc}</p>
    </div>
);

export default Home;