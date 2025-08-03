import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Plus, 
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sessionsAPI } from '../api';
import Layout from '../components/Layout';

const CreateSession = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    image: '',
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    'Yoga', 'Meditation', 'Breathing', 'Relaxation', 'Mindfulness', 'Wellness'
  ];

  const levels = [
    'Beginner', 'Intermediate', 'Advanced', 'All Levels'
  ];

  const durations = [
    '5min', '10min', '15min', '20min', '30min', '45min', '60min'
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  // Auto-save functionality - DISABLED to prevent issues
  // useEffect(() => {
  //   const autoSaveTimer = setTimeout(() => {
  //     if (formData.title || formData.description) {
  //       handleAutoSave();
  //     }
  //   }, 3000); // Auto-save after 3 seconds of inactivity

  //   return () => clearTimeout(autoSaveTimer);
  // }, [formData]);

  // const handleAutoSave = async () => {
  //   if (!formData.title && !formData.description) return;

  //   try {
  //     setAutoSaveStatus('Saving...');
      
  //     // Only create draft if we have meaningful content
  //     if (formData.title.trim().length < 3 && formData.description.trim().length < 10) {
  //       setAutoSaveStatus('');
  //       return;
  //     }

  //     // Create a draft session
  //     const draftData = {
  //       ...formData,
  //       status: 'draft'
  //     };

  //     console.log('Auto-saving draft session...');
  //     await sessionsAPI.createSession(draftData);
      
  //     setAutoSaveStatus('Auto-saved');
  //     setLastSaved(new Date());
      
  //     setTimeout(() => {
  //       setAutoSaveStatus('');
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Auto-save failed:', error);
  //     setAutoSaveStatus('Auto-save failed');
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.level || !formData.duration) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Creating published session...');
      const sessionData = {
        ...formData,
        status: 'published'
      };
      
      const createdSession = await sessionsAPI.createSession(sessionData);
      console.log('Session created successfully:', createdSession);
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/MySessions');
      }, 2000);
    } catch (error) {
      console.error('Error creating session:', error);
      setError(error.message || 'Failed to create session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.title && !formData.description) {
      setError('Please add at least a title or description to save as draft');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Saving draft session...');
      const draftData = {
        ...formData,
        status: 'draft'
      };
      
      const createdDraft = await sessionsAPI.createSession(draftData);
      console.log('Draft saved successfully:', createdDraft);
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/MySessions');
      }, 2000);
    } catch (error) {
      console.error('Error saving draft:', error);
      setError(error.message || 'Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Created Successfully!</h2>
            <p className="text-gray-600">Redirecting to My Sessions...</p>
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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/MySessions')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Session</h1>
              <p className="text-gray-600">Design your wellness session for others to discover</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {autoSaveStatus && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-blue-700">{autoSaveStatus}</span>
            {lastSaved && (
              <span className="text-blue-500 text-sm">
                (Last saved: {lastSaved.toLocaleDateString()})
              </span>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter session title"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Describe what this session offers and what participants can expect..."
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level *
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                >
                  <option value="">Select level</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                >
                  <option value="">Select duration</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Session Image</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sampleImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setFormData(prev => ({ ...prev, image }))}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    formData.image === image 
                      ? 'border-teal-500 ring-2 ring-teal-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {formData.image === image && (
                    <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Select an image that represents your session. You can also enter a custom image URL below.
            </p>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags</h2>
            
            <div className="space-y-4">
              {/* Add Tag */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Tags List */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-teal-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span>Save as Draft</span>
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
              <span>Create & Publish</span>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateSession; 