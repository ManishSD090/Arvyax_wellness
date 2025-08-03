import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, Clock, Grid, List, ChevronDown, Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { sessionsAPI, searchAPI, isAuthenticated, getUser } from '../api';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// Search and Filter Component
const SearchAndFilter = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, selectedLevel, setSelectedLevel, categories, levels }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        </div>

        {/* Level Filter */}
        <div className="relative">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedCategory('');
            setSelectedLevel('');
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

// Session Card Component
const SessionCard = ({ session, onLike, onBookmark, onView }) => {
  const [isLiked, setIsLiked] = useState(session.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(session.isBookmarked || false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getCategoryColor = (category) => {
    const colors = {
      'Yoga': 'bg-teal-100 text-teal-700',
      'Meditation': 'bg-blue-100 text-blue-700',
      'Breathing': 'bg-green-100 text-green-700',
      'Relaxation': 'bg-purple-100 text-purple-700',
      'Mindfulness': 'bg-indigo-100 text-indigo-700',
      'Wellness': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700',
      'All Levels': 'bg-gray-100 text-gray-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const handleLike = async () => {
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }

    setIsLoading(true);
    try {
      await onLike(session.id);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }

    setIsLoading(true);
    try {
      await onBookmark(session.id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error bookmarking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSession = () => {
    navigate(`/session/${session.id}`);
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
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark();
            }}
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded-md text-sm font-medium">
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
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(session.category)}`}>
            {session.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(session.level)}`}>
            {session.level}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{session.likes || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Bookmark className="h-4 w-4" />
              <span>{session.bookmarks?.length || 0}</span>
            </span>
          </div>
          
          {/* View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewSession();
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Session
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      <span className="text-gray-600">Loading sessions...</span>
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

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Arvyax</h3>
            <p className="text-teal-200 text-sm">
              Empowering wellness through mindful practices and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Our Sessions</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Instructors</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-teal-200 text-sm mb-4">
              Subscribe to get updates on new sessions and wellness tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-teal-200 text-sm focus:outline-none focus:border-white/40"
              />
              <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-teal-200 text-sm">
            © 2024 Arvyax. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [user, setUser] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }
    
    const currentUser = getUser();
    setUser(currentUser);
  }, [navigate]);

  // Fetch sessions and metadata
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [sessionsData, categoriesData, levelsData] = await Promise.all([
          sessionsAPI.getAllSessions(),
          searchAPI.getCategories(),
          searchAPI.getLevels()
        ]);
        
        setSessions(sessionsData);
        setFilteredSessions(sessionsData);
        setCategories(categoriesData);
        setLevels(levelsData);
      } catch (err) {
        setError('Failed to load sessions. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchData();
    }
  }, []);

  // Filter and sort sessions
  useEffect(() => {
    let filtered = [...sessions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(session => session.category === selectedCategory);
    }

    // Apply level filter
    if (selectedLevel) {
      filtered = filtered.filter(session => session.level === selectedLevel);
    }

    // Apply sorting
    switch (sortBy) {
      case 'Most Recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Most Popular':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'Duration (Short to Long)':
        filtered.sort((a, b) => {
          const aMinutes = parseInt(a.duration);
          const bMinutes = parseInt(b.duration);
          return aMinutes - bMinutes;
        });
        break;
      case 'Duration (Long to Short)':
        filtered.sort((a, b) => {
          const aMinutes = parseInt(a.duration);
          const bMinutes = parseInt(b.duration);
          return bMinutes - aMinutes;
        });
        break;
      default:
        break;
    }

    setFilteredSessions(filtered);
  }, [sessions, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleLike = async (sessionId) => {
    try {
      await sessionsAPI.likeSession(sessionId);
      // Update the session in the list
      setSessions(prev => prev.map(session => 
        session.id === sessionId 
          ? { ...session, likes: (session.likes || 0) + 1, isLiked: true }
          : session
      ));
    } catch (error) {
      console.error('Error liking session:', error);
    }
  };

  const handleBookmark = async (sessionId) => {
    try {
      await sessionsAPI.bookmarkSession(sessionId);
      // Update the session in the list
      setSessions(prev => prev.map(session => 
        session.id === sessionId 
          ? { ...session, isBookmarked: !session.isBookmarked }
          : session
      ));
    } catch (error) {
      console.error('Error bookmarking session:', error);
    }
  };

  const handleView = (sessionId) => {
    // Navigate to session detail page or open modal
    console.log('View session:', sessionId);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (!isAuthenticated()) {
    return null; // Will redirect to login
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Wellness Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of yoga, meditation, and mindfulness practices
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          categories={categories}
          levels={levels}
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
              <option value="Most Recent">Most Recent</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Duration (Short to Long)">Duration (Short to Long)</option>
              <option value="Duration (Long to Short)">Duration (Long to Short)</option>
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
                Showing {filteredSessions.length} of {sessions.length} sessions
              </p>
            </div>

            {/* Sessions Grid */}
            {filteredSessions.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <SessionCard 
                      session={session}
                      onLike={handleLike}
                      onBookmark={handleBookmark}
                      onView={handleView}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search criteria or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedLevel('');
                  }}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Share Your Wellness Journey?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Create and publish your own sessions
          </p>
          <button 
            onClick={() => navigate('/MySessions')}
            className="bg-white text-teal-600 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
          >
            Get Started
          </button>
        </div>
      </div>

      <Footer />

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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;