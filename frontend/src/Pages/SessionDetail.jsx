import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Heart, 
  Bookmark, 
  Share2, 
  Play,
  Tag,
  Calendar,
  Star,
  Eye,
  Edit3,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { sessionsAPI, isAuthenticated, getUser } from '../api';
import Layout from '../components/Layout';

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Try to get session from backend first
        try {
          const sessionData = await sessionsAPI.getSessionById(id);
          setSession(sessionData);
        } catch (backendError) {
          console.warn('Backend not available, trying sample data:', backendError.message);
          
          // Fallback to sample data - using all sessions from dashboard
          const sampleSessions = [
            {
              id: 1,
              title: "Morning Yoga Flow",
              category: "Yoga",
              level: "Beginner",
              duration: "30min",
              description: "Start your day with energizing poses and mindful breathing. This gentle flow sequence will awaken your body and mind, setting a positive tone for the day ahead.",
              image: "https://images.unsplash.com/photo-1506629905607-c65b4023b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 12,
              isLiked: false,
              isBookmarked: false,
              createdAt: "2024-01-20T10:00:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 45,
              bookmarks: [],
              tags: ["Morning", "Energy", "Flow"]
            },
            {
              id: 2,
              title: "Mindful Meditation",
              category: "Meditation",
              level: "All Levels",
              duration: "15min",
              description: "Guided session for stress relief and mental clarity. Learn to quiet your mind and find inner peace through simple breathing techniques.",
              image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 8,
              isLiked: true,
              isBookmarked: false,
              createdAt: "2024-01-19T15:30:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 32,
              bookmarks: [],
              tags: ["Stress Relief", "Clarity", "Peace"]
            },
            {
              id: 3,
              title: "Sound Healing Journey",
              category: "Relaxation",
              level: "Advanced",
              duration: "45min",
              description: "Deep relaxation through therapeutic sound frequencies. Experience the healing power of sound as you drift into a state of deep tranquility.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 25,
              isLiked: false,
              isBookmarked: true,
              createdAt: "2024-01-18T09:15:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 78,
              bookmarks: [],
              tags: ["Sound Healing", "Deep Relaxation", "Therapeutic"]
            },
            {
              id: 4,
              title: "Evening Wind Down",
              category: "Yoga",
              level: "Intermediate",
              duration: "40min",
              description: "Gentle stretches and breathing exercises for restful sleep. Perfect for unwinding after a busy day and preparing your body for deep sleep.",
              image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 15,
              isLiked: false,
              isBookmarked: false,
              createdAt: "2024-01-17T18:45:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 56,
              bookmarks: [],
              tags: ["Evening", "Sleep", "Relaxation"]
            },
            {
              id: 5,
              title: "Breathing Mastery",
              category: "Breathing",
              level: "All Levels",
              duration: "20min",
              description: "Learn powerful breathing techniques for stress management. Master the art of conscious breathing to reduce anxiety and improve focus.",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 18,
              isLiked: true,
              isBookmarked: true,
              createdAt: "2024-01-16T14:20:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 89,
              bookmarks: [],
              tags: ["Breathing", "Stress Management", "Focus"]
            },
            {
              id: 6,
              title: "Sun Salutation Flow",
              category: "Yoga",
              level: "Beginner",
              duration: "25min",
              description: "Classic yoga sequence to energize your body and mind. Perfect for morning practice to greet the day with vitality and intention.",
              image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 22,
              isLiked: false,
              isBookmarked: false,
              createdAt: "2024-01-15T08:30:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 67,
              bookmarks: [],
              tags: ["Sun Salutation", "Morning", "Energy"]
            },
            {
              id: 7,
              title: "Deep Meditation Retreat",
              category: "Meditation",
              level: "Advanced",
              duration: "60min",
              description: "Extended meditation session for deep inner exploration. Journey into your consciousness and discover profound peace and clarity.",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 35,
              isLiked: true,
              isBookmarked: true,
              createdAt: "2024-01-14T16:45:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 123,
              bookmarks: [],
              tags: ["Deep Meditation", "Retreat", "Inner Peace"]
            },
            {
              id: 8,
              title: "Restorative Yoga",
              category: "Yoga",
              level: "All Levels",
              duration: "35min",
              description: "Gentle, healing practice using props to support your body. Perfect for recovery, stress relief, and deep relaxation.",
              image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 19,
              isLiked: false,
              isBookmarked: false,
              createdAt: "2024-01-13T12:15:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 45,
              bookmarks: [],
              tags: ["Restorative", "Healing", "Relaxation"]
            },
            {
              id: 9,
              title: "Box Breathing Technique",
              category: "Breathing",
              level: "Intermediate",
              duration: "12min",
              description: "Learn the powerful box breathing method used by Navy SEALs. Improve focus, reduce stress, and enhance mental clarity.",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 28,
              isLiked: false,
              isBookmarked: true,
              createdAt: "2024-01-12T10:30:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 92,
              bookmarks: [],
              tags: ["Box Breathing", "Focus", "Military Technique"]
            },
            {
              id: 10,
              title: "Crystal Healing Meditation",
              category: "Wellness",
              level: "Intermediate",
              duration: "30min",
              description: "Harness the energy of crystals for healing and balance. Learn to work with crystal energy for emotional and physical wellness.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 31,
              isLiked: true,
              isBookmarked: false,
              createdAt: "2024-01-11T19:20:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 156,
              bookmarks: [],
              tags: ["Crystal Healing", "Energy Work", "Balance"]
            },
            {
              id: 11,
              title: "Power Vinyasa Flow",
              category: "Yoga",
              level: "Advanced",
              duration: "50min",
              description: "Dynamic, flowing sequence that builds strength and flexibility. Challenge yourself with this energizing practice.",
              image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 44,
              isLiked: false,
              isBookmarked: true,
              createdAt: "2024-01-10T07:45:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 203,
              bookmarks: [],
              tags: ["Power Yoga", "Vinyasa", "Strength"]
            },
            {
              id: 12,
              title: "Mindfulness for Beginners",
              category: "Mindfulness",
              level: "Beginner",
              duration: "10min",
              description: "Simple mindfulness practices for daily life. Learn to be present and aware in everything you do.",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 16,
              isLiked: true,
              isBookmarked: false,
              createdAt: "2024-01-09T13:15:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 78,
              bookmarks: [],
              tags: ["Mindfulness", "Beginners", "Daily Practice"]
            },
            {
              id: 13,
              title: "Quick Office Yoga",
              category: "Yoga",
              level: "Beginner",
              duration: "8min",
              description: "Simple yoga poses you can do at your desk. Perfect for busy professionals to stay active and reduce workplace stress.",
              image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 42,
              isLiked: false,
              isBookmarked: true,
              createdAt: "2024-01-08T14:20:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 167,
              bookmarks: [],
              tags: ["Office Yoga", "Quick", "Workplace"]
            },
            {
              id: 14,
              title: "Chakra Balancing",
              category: "Wellness",
              level: "Intermediate",
              duration: "35min",
              description: "Align and balance your seven energy centers through guided meditation and visualization. Restore harmony to your entire being.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 38,
              isLiked: true,
              isBookmarked: false,
              createdAt: "2024-01-07T11:30:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 134,
              bookmarks: [],
              tags: ["Chakra", "Energy", "Balance"]
            },
            {
              id: 15,
              title: "Mindful Eating",
              category: "Mindfulness",
              level: "Beginner",
              duration: "12min",
              description: "Transform your relationship with food through mindful eating practices. Learn to eat with awareness and gratitude.",
              image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 29,
              isLiked: false,
              isBookmarked: true,
              createdAt: "2024-01-06T09:15:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 73,
              bookmarks: [],
              tags: ["Mindful Eating", "Food Awareness", "Gratitude"]
            },
            {
              id: 16,
              title: "Sleep Meditation",
              category: "Meditation",
              level: "All Levels",
              duration: "15min",
              description: "Gentle guided meditation to help you fall asleep naturally. Create a peaceful bedtime routine for deep, restful sleep.",
              image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 51,
              isLiked: true,
              isBookmarked: true,
              createdAt: "2024-01-05T20:45:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 234,
              bookmarks: [],
              tags: ["Sleep", "Bedtime", "Rest"]
            },
            {
              id: 17,
              title: "Body Scan Meditation",
              category: "Meditation",
              level: "Beginner",
              duration: "18min",
              description: "Systematic journey through your body with mindful awareness. Perfect for beginners to learn body-mind connection.",
              image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 33,
              isLiked: false,
              isBookmarked: false,
              createdAt: "2024-01-04T16:20:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 87,
              bookmarks: [],
              tags: ["Body Scan", "Awareness", "Mind-Body"]
            },
            {
              id: 18,
              title: "Stress Relief Breathing",
              category: "Breathing",
              level: "All Levels",
              duration: "5min",
              description: "Quick breathing techniques to instantly reduce stress and anxiety. Use these methods anywhere, anytime for immediate relief.",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              likes: 67,
              isLiked: true,
              isBookmarked: false,
              createdAt: "2024-01-03T12:10:00Z",
              creator: { username: "TestUser" },
              status: "published",
              views: 189,
              bookmarks: [],
              tags: ["Quick Relief", "Stress", "Anxiety"]
            }
          ];
          
          // Find session by ID - try both string and number comparison
          const foundSession = sampleSessions.find(s => 
            s.id.toString() === id.toString() || s.id === parseInt(id)
          );
          
          if (foundSession) {
            setSession(foundSession);
          } else {
            // If not found, show the first session as a fallback
            console.warn(`Session with ID ${id} not found, showing first session as fallback`);
            setSession(sampleSessions[0]);
          }
        }
        
        // Check if user is authenticated and get user data
        if (isAuthenticated()) {
          const currentUser = getUser();
          setUser(currentUser);
        }
      } catch (err) {
        setError('Failed to load session details');
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSession();
    }
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }

    try {
      await sessionsAPI.likeSession(id);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking session:', error);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated()) {
      navigate('/Account_Signing');
      return;
    }

    try {
      await sessionsAPI.bookmarkSession(id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error bookmarking session:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: session?.title,
        text: session?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleStartSession = () => {
    // This would typically start the actual session
    alert('Starting session: ' + session?.title);
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800',
      'All Levels': 'bg-blue-100 text-blue-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Yoga': 'bg-purple-100 text-purple-800',
      'Meditation': 'bg-indigo-100 text-indigo-800',
      'Breathing': 'bg-teal-100 text-teal-800',
      'Relaxation': 'bg-pink-100 text-pink-800',
      'Mindfulness': 'bg-blue-100 text-blue-800',
      'Wellness': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
              <span className="text-gray-600">Loading session details...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The session you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/Dashboard')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Session Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={session.image}
              alt={session.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full transition-colors ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-full transition-colors ${
                  isBookmarked 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Session Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(session.category)}`}>
                  {session.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(session.level)}`}>
                  {session.level}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{session.duration}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
              {session.creator && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Created by {session.creator.username || 'Unknown'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Session Details */}
          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{session.likes || 0}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{session.bookmarks?.length || 0}</div>
                <div className="text-sm text-gray-600">Bookmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{session.views || 0}</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{session.duration}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Session</h2>
              <p className="text-gray-700 leading-relaxed">{session.description}</p>
            </div>

            {/* Tags */}
            {session.tags && session.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {session.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Session Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Category: <span className="font-medium">{session.category}</span></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Level: <span className="font-medium">{session.level}</span></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Duration: <span className="font-medium">{session.duration}</span></span>
                  </div>
                  {session.createdAt && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">Created: <span className="font-medium">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </span></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Creator Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Creator: <span className="font-medium">
                      {session.creator?.username || 'Unknown'}
                    </span></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Status: <span className="font-medium capitalize">{session.status}</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartSession}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Start Session</span>
              </button>
              
              {user && session.creator && user.id === session.creator._id && (
                <>
                  <button
                    onClick={() => navigate(`/edit-session/${id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit3 className="h-5 w-5" />
                    <span>Edit Session</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SessionDetail; 