import { LayoutGrid, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
            <LayoutGrid size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">TaskManager</span>
        </Link>

        {/* NAVIGATION BUTTONS */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              
             
              {location.pathname !== '/dashboard' && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 cursor-pointer rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all"
                >
                  Dashboard
                </Link>
              )}

             
              {location.pathname === '/dashboard' && (
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
              
            </div>
          ) : (
            
            <Link
              to="/login"
              className="flex cursor-center items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <LogIn size={18} />
              SignIn
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;