import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  LogOut,
  Settings,
  Bookmark,
  Heart
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUser } from '../api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/Account_Signing');
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const getNavLinkClass = (path) => {
    const baseClass = "px-3 py-2 text-sm font-medium transition-colors";
    if (isActivePage(path)) {
      return `${baseClass} text-teal-600 border-b-2 border-teal-600`;
    }
    return `${baseClass} text-gray-600 hover:text-gray-900`;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span 
                className="text-xl font-bold text-gray-900 cursor-pointer" 
                onClick={() => navigate('/Dashboard')}
              >
                Arvyax
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate('/Dashboard')}
                className={getNavLinkClass('/Dashboard')}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/MySessions')}
                className={getNavLinkClass('/MySessions')}
              >
                My Sessions
              </button>
              <button 
                onClick={() => navigate('/Schedule')}
                className={getNavLinkClass('/Schedule')}
              >
                Schedule
              </button>
              <button 
                onClick={() => navigate('/Profile')}
                className={getNavLinkClass('/Profile')}
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* User Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {getInitials(user?.username)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.username || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.username || 'User'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/Profile');
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate('/MySessions');
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>My Sessions</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate('/Dashboard');
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Liked Sessions</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate('/Profile');
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-1">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar; 