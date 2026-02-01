import { ArrowLeft, Home, OctagonAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon with pulsed background */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
        <OctagonAlert size={80} className="relative text-red-500 mx-auto" />
      </div>

      {/* Error Text */}
      <h1 className="text-7xl font-black text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
        Oops! The page you're looking for doesn't exist or has been moved. 
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Home size={18} />
          Go to Home
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

     
      <p className="mt-16 text-xs text-slate-400 uppercase tracking-[0.2em]">
        TaskFlow @ MJPRU System Error
      </p>
    </div>
  );
}

export default Error;