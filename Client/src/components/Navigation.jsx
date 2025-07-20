import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import Logo from '../assets/Logo.png'
import { 
  MapPin, Sun, Moon, Menu, X, Home, Cloud, Map, Users, UserPlus, Calendar, User 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/weather', name: 'Weather', icon: <Cloud size={20} /> },
    { path: '/routes', name: 'Routes', icon: <Map size={20} /> },
    { path: '/community', name: 'Community', icon: <Users size={20} /> },
    { path: '/social', name: 'Social', icon: <UserPlus size={20} /> },
    { path: '/events', name: 'Events', icon: <Calendar size={20} /> },
    { path: '/profile', name: 'Profile', icon: <User size={20} /> },
  ];

  const handleSignOut = async () => {
    try{
      localStorage.removeItem('authToken');
      navigate('/')
    }catch(error){
      console.error("Failed to logout:", error)
    }
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
          <Link to="/dashboard" className="flex items-center">
            
            <img src={Logo} alt="Veloxa Logo" className="ml-2 h-8 w-auto" />
          </Link>
          <div className="flex items-center">
            <button 
              onClick={toggleTheme} 
              className="mr-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} className="text-gray-800 dark:text-white" /> : <Menu size={24} className="text-gray-800 dark:text-white" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white dark:bg-gray-800 shadow-lg absolute left-0 right-0 z-10">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={`flex items-center p-4 ${
                    isActive(link.path) 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center p-4 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="flex flex-col h-screen w-64 bg-gray-100 dark:bg-gray-900 shadow-lg">
          <div className="p-5">
            <Link to="/dashboard" className="flex items-center">
    
              <img src={Logo} alt="Veloxa Logo" className="ml-2 h-8 w-auto" />
            </Link>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center p-4 ${
                  isActive(link.path) 
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={toggleTheme} 
              className="flex items-center mb-4 w-full p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span className="mr-3">
                {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
              </span>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full p-2 text-red-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;