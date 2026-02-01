import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../Api/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signIn(formData);
            
            // Session Management
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            alert(`Welcome back, ${data.user.firstName}!`);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-white/20">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-center text-sm text-slate-500">
                        Please enter your details to sign in.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="name@company.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                {/* Toggle Button */}
                                <button
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all shadow-lg shadow-indigo-200"
                        >
                            Sign In
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-600">
                        New to TaskManager?{' '}
                        <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;