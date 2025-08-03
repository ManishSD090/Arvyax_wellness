import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Bell, 
  User, 
  Grid, 
  List, 
  ChevronDown,
  Clock,
  Eye,
  Edit3,
  Upload,
  Calendar,
  Tag,
  Loader2,
  AlertCircle,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { sessionsAPI, isAuthenticated, getUser } from '../api';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// Tabs Component
const Tabs = ({ activeTab, onTabChange, draftCount, publishedCount }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
      <button
        onClick={() => onTabChange('drafts')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeTab === 'drafts'
            ? 'bg-teal-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
        }`}
      >
        <span>Drafts</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          activeTab === 'drafts' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {draftCount}
        </span>
      </button>
      
      <button
        onClick={() => onTabChange('published')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeTab === 'published'
            ? 'bg-teal-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
        }`}
      >
        <span>Published</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          activeTab === 'published' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {publishedCount}
        </span>
      </button>
    </div>
  );
};

// Session Card Component
const SessionCard = ({ session, onEdit, onPublish, onView, onDelete, onRetry }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  // Debug logging
  console.log('SessionCard render:', {
    id: session._id || session.id,
    title: session.title,
    status: session.status
  });

  const getStatusBadge = () => {
    if (session.status === 'draft') {
      return (
        <span className="absolute top-3 left-3 px-2 py-1 bg-gray-900/60 text-white text-xs font-medium rounded-md backdrop-blur-sm">
          Draft
        </span>
      );
    } else {
      return (
        <span className="absolute top-3 left-3 px-2 py-1 bg-teal-500/90 text-white text-xs font-medium rounded-md backdrop-blur-sm">
          Published
        </span>
      );
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      'Meditation': 'bg-purple-100 text-purple-700',
      'Mindfulness': 'bg-blue-100 text-blue-700',
      'Yoga': 'bg-green-100 text-green-700',
      'Wellness': 'bg-orange-100 text-orange-700',
      'Breathing': 'bg-teal-100 text-teal-700',
      'Relaxation': 'bg-indigo-100 text-indigo-700',
      'Sleep': 'bg-violet-100 text-violet-700',
      'Energy': 'bg-yellow-100 text-yellow-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const sessionDate = new Date(date);
    const diffInHours = Math.floor((now - sessionDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}m ago`;
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      await onPublish(session._id || session.id);
    } catch (error) {
      console.error('Error publishing session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(session._id || session.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSession = () => {
    navigate(`/session/${session._id || session.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer" onClick={handleViewSession}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={session.image}
          alt={session.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Status Badge */}
        {getStatusBadge()}
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-sm font-medium">
          <Clock className="inline h-3 w-3 mr-1" />
          {session.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {session.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {session.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(session.category)}`}>
            {session.category}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {session.level}
          </span>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{session.views || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatTimeAgo(session.updatedAt)}</span>
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewSession();
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View
            </button>
            
            {session.status === 'draft' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(session._id || session.id);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
            )}
            
            {session.status === 'draft' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePublish();
                }}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Publishing...' : 'Publish'}
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Session</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{session.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Empty State Component
const EmptyState = ({ type, onCreateNew }) => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        {type === 'drafts' ? (
          <Edit3 className="h-10 w-10 text-gray-400" />
        ) : (
          <Upload className="h-10 w-10 text-gray-400" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {type === 'drafts' ? 'No Drafts Yet' : 'No Published Sessions'}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {type === 'drafts' 
          ? 'Start creating your first wellness session. Your drafts will appear here.'
          : 'Once you publish your sessions, they will appear here for others to discover.'
        }
      </p>
      <button 
        onClick={onCreateNew}
        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
      >
        <Plus className="h-5 w-5" />
        <span>Create New Session</span>
      </button>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      <span className="text-gray-600">Loading your sessions...</span>
    </div>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
    <p className="text-gray-600 mb-4 text-center max-w-md">{message}</p>
    <button
      onClick={onRetry}
      className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Success Toast Component
const SuccessToast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
    <CheckCircle className="h-5 w-5" />
    <span>{message}</span>
    <button onClick={onClose} className="ml-2">
      <XCircle className="h-5 w-5" />
    </button>
  </div>
);

// Main My Sessions Component
const MySessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('drafts');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Latest');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }
    
    const currentUser = getUser();
    setUser(currentUser);
  }, [navigate]);

  // Fetch sessions with improved error handling
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching sessions...');
        const sessionsData = await sessionsAPI.getMySessions();
        console.log('Sessions fetched:', sessionsData);
        
        // Ensure we have an array of sessions
        const sessionsArray = Array.isArray(sessionsData) ? sessionsData : [];
        setSessions(sessionsArray);
        
        console.log('Sessions state updated:', sessionsArray.length, 'sessions');
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Failed to load your sessions. Please try again.');
        // Set empty array to prevent undefined errors
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchSessions();
    }
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

  const draftSessions = sessions.filter(session => session.status === 'draft');
  const publishedSessions = sessions.filter(session => session.status === 'published');
  const currentSessions = activeTab === 'drafts' ? draftSessions : publishedSessions;

  const handleEdit = (sessionId) => {
    // Navigate to edit page or open edit modal
    console.log('Edit session:', sessionId);
    // For now, we'll navigate to create session with the session ID
    // In a real app, you'd have an edit session page
    navigate(`/create-session?edit=${sessionId}`);
  };

  const handlePublish = async (sessionId) => {
    try {
      console.log('Publishing session:', sessionId);
      await sessionsAPI.publishSession(sessionId);
      
      // Update the session in the list
      setSessions(prev => prev.map(session => 
        (session._id === sessionId || session.id === sessionId)
          ? { ...session, status: 'published', updatedAt: new Date().toISOString() }
          : session
      ));
      
      setSuccessMessage('Session published successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Trigger a refresh to ensure data consistency
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error publishing session:', error);
      setError('Failed to publish session. Please try again.');
    }
  };

  const handleView = (sessionId) => {
    // Navigate to session detail page or open modal
    console.log('View session:', sessionId);
    navigate(`/session/${sessionId}`);
  };

  const handleDelete = async (sessionId) => {
    try {
      console.log('Deleting session:', sessionId);
      await sessionsAPI.deleteSession(sessionId);
      
      // Remove the session from the list
      setSessions(prev => prev.filter(session => 
        session._id !== sessionId && session.id !== sessionId
      ));
      setSuccessMessage('Session deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Trigger a refresh to ensure data consistency
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting session:', error);
      setError('Failed to delete session. Please try again.');
    }
  };

  const handleCreateNew = () => {
    // Navigate to create session page
    navigate('/create-session');
  };

  const handleRetry = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Add a manual refresh function
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Debug function to check session data
  const handleDebug = async () => {
    try {
      const debugData = await sessionsAPI.debugSessions();
      console.log('Debug data:', debugData);
      alert(`Debug Info:\nTotal Sessions: ${debugData.totalSessions}\nUser Sessions: ${debugData.userSessions}\nUser ID: ${debugData.userId}`);
    } catch (error) {
      console.error('Debug error:', error);
      alert('Debug failed: ' + error.message);
    }
  };

  if (!isAuthenticated()) {
    return null; // Will redirect to login
  }

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
            <p className="text-gray-600">Manage your wellness sessions and drafts</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleRefresh}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={handleDebug}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Debug</span>
              </button>
            )}
            
            <button
              onClick={handleCreateNew}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2 shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Session</span>
            </button>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
            <p>Total Sessions: {sessions.length}</p>
            <p>Draft Sessions: {draftSessions.length}</p>
            <p>Published Sessions: {publishedSessions.length}</p>
            <p>Current Tab: {activeTab}</p>
          </div>
        )}

        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          draftCount={draftSessions.length}
          publishedCount={publishedSessions.length}
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors appearance-none pr-8"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Title A-Z">Title A-Z</option>
              <option value="Title Z-A">Title Z-A</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {currentSessions.length} {activeTab === 'drafts' ? 'draft' : 'published'} sessions
              </p>
            </div>

            {/* Sessions Grid */}
            {currentSessions.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {currentSessions.map((session, index) => (
                  <div
                    key={session._id || session.id || `session-${index}`}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <SessionCard
                      session={session}
                      onEdit={handleEdit}
                      onPublish={handlePublish}
                      onView={handleView}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState type={activeTab} onCreateNew={handleCreateNew} />
            )}
          </>
        )}
      </div>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={handleCreateNew}
        className="fixed bottom-6 right-6 md:hidden bg-teal-500 hover:bg-teal-600 text-white w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Success Toast */}
      {successMessage && (
        <SuccessToast 
          message={successMessage} 
          onClose={() => setSuccessMessage('')} 
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
};

export default MySessions;