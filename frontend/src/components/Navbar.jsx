import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Search, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={closeMenu}
            >
              <div className="bg-blue-50 p-2 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                LOCO<span className="text-blue-600">FY</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <div className="flex items-center gap-6">
                  <Link
                    to="/finder"
                    className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                  >
                    Browse
                  </Link>
                  <Link
                    to="/report"
                    className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                  >
                    Report
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                  >
                    Dashboard
                  </Link>
                </div>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-slate-200"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-slate-200 hover:border-red-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 p-2 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl rounded-b-2xl pb-4">
          <div className="px-4 pt-4 pb-2 space-y-1">
            {user ? (
              <>
                <Link
                  onClick={closeMenu}
                  to="/finder"
                  className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                >
                  Browse
                </Link>
                <Link
                  onClick={closeMenu}
                  to="/report"
                  className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                >
                  Report
                </Link>
                <Link
                  onClick={closeMenu}
                  to="/dashboard"
                  className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                >
                  Dashboard
                </Link>
                <div className="pt-4 pb-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex justify-center items-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors border border-slate-200"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  onClick={closeMenu}
                  to="/login"
                  className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <div className="pt-4 pb-2">
                  <Link
                    onClick={closeMenu}
                    to="/register"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 rounded-xl text-base font-semibold transition-colors shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
