import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Settings, Bell, Shield, Heart, Bookmark, LogOut, Edit3, Calendar, Lock, Eye, Download, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { getUser, isAuthenticated, authAPI } from '../api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }

    // Get user data from localStorage
    const userData = getUser();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/Account_Signing');
    } catch (error) {
      console.error('Error logging out:', error);
      // Force logout even if API fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/Account_Signing');
    }
  };

  const handlePrivacyAction = (action) => {
    setModalType(action);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleModalAction = async () => {
    try {
      setLoading(true);
      
      switch (modalType) {
        case 'password':
          // Simulate password change
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccess('Password changed successfully!');
          break;
        case '2fa':
          // Simulate 2FA setup
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccess('Two-factor authentication enabled!');
          break;
        case 'privacy':
          // Simulate privacy settings update
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccess('Privacy settings updated!');
          break;
        case 'export':
          // Simulate data export
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccess('Data export completed! Check your email.');
          break;
        case 'delete':
          // Simulate account deletion
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccess('Account deletion request submitted. You will receive a confirmation email.');
          break;
        default:
          break;
      }
      
      setTimeout(() => {
        setShowModal(false);
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getJoinDate = () => {
    if (!user) return 'January 2024';
    const date = new Date(user.createdAt || Date.now());
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'password':
        return {
          title: 'Change Password',
          description: 'Enter your current password and new password to update your account security.',
          fields: [
            { name: 'currentPassword', label: 'Current Password', type: 'password', required: true },
            { name: 'newPassword', label: 'New Password', type: 'password', required: true },
            { name: 'confirmPassword', label: 'Confirm New Password', type: 'password', required: true }
          ],
          buttonText: 'Change Password'
        };
      case '2fa':
        return {
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account by enabling two-factor authentication.',
          fields: [
            { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
            { name: 'method', label: 'Verification Method', type: 'select', options: ['SMS', 'Email', 'Authenticator App'], required: true }
          ],
          buttonText: 'Enable 2FA'
        };
      case 'privacy':
        return {
          title: 'Privacy Settings',
          description: 'Control who can see your profile and session information.',
          fields: [
            { name: 'profileVisibility', label: 'Profile Visibility', type: 'select', options: ['Public', 'Friends Only', 'Private'], required: true },
            { name: 'sessionVisibility', label: 'Session Visibility', type: 'select', options: ['Public', 'Friends Only', 'Private'], required: true },
            { name: 'dataSharing', label: 'Data Sharing', type: 'checkbox', label: 'Allow data sharing for research purposes' }
          ],
          buttonText: 'Update Privacy Settings'
        };
      case 'export':
        return {
          title: 'Export Data',
          description: 'Download all your personal data including sessions, preferences, and activity history.',
          fields: [
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'dataTypes', label: 'Data Types', type: 'checkbox', options: ['Sessions', 'Profile Data', 'Activity History', 'Preferences'], required: true }
          ],
          buttonText: 'Export Data'
        };
      case 'delete':
        return {
          title: 'Delete Account',
          description: 'This action cannot be undone. All your data will be permanently deleted.',
          fields: [
            { name: 'reason', label: 'Reason for Deletion', type: 'select', options: ['No longer needed', 'Privacy concerns', 'Technical issues', 'Other'], required: true },
            { name: 'confirmation', label: 'Type "DELETE" to confirm', type: 'text', required: true }
          ],
          buttonText: 'Delete Account',
          danger: true
        };
      default:
        return { title: '', description: '', fields: [], buttonText: '' };
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              <span className="text-gray-600">Loading profile...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
            <button
              onClick={() => navigate('/Account_Signing')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const modalContent = getModalContent();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{getInitials(user.username)}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {getJoinDate()}</p>
                {user.number && (
                  <p className="text-sm text-gray-500">Phone: {user.number}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Sessions Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bookmark className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Bookmarked Sessions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Created Sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-gray-600" />
            Privacy & Security
          </h3>
          <div className="space-y-4">
            <button 
              onClick={() => handlePrivacyAction('password')}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Change Password</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={() => handlePrivacyAction('2fa')}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Two-Factor Authentication</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={() => handlePrivacyAction('privacy')}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Privacy Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={() => handlePrivacyAction('export')}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Download className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Data Export</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={() => handlePrivacyAction('delete')}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-between text-red-600"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="h-5 w-5 text-red-500" />
                <span className="text-red-600">Delete Account</span>
              </div>
              <span className="text-red-400">→</span>
            </button>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <Bell className="h-4 w-4 text-teal-600" />
              </div>
              <span className="text-gray-700">Advanced Notifications</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700">Profile Customization</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Enhanced Security</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-gray-700">Advanced Settings</span>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{modalContent.title}</h3>
              <p className="text-gray-600 mb-6">{modalContent.description}</p>
              
              <div className="space-y-4 mb-6">
                {modalContent.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <option value="">Select {field.label}</option>
                        {field.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="text-sm text-gray-700">{field.label}</span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalAction}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    modalContent.danger 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Processing...' : modalContent.buttonText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile; 