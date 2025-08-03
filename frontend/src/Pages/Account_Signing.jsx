  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import bgImage from '../assets/hero_bg.svg';
  import { authAPI, setAuthToken, setUser } from '../api';

  const Account_Signing = () => {
    const [signInMode, setSignInMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      number: '',
      password: ''
    });

    const toggleMode = () => {
      setSignInMode(!signInMode);
      setError('');
      setSuccess('');
      setFormData({ username: '', email: '', number: '', password: '' });
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess('');

      try {
        let response;

        if (signInMode) {
          // Login validation
          if (!formData.email || !formData.password) {
            setError('Email and password are required');
            setLoading(false);
            return;
          }

          // Login logic
          response = await authAPI.login({
            email: formData.email,
            password: formData.password,
          });
        } else {
          // Signup validation
          if (!formData.username || !formData.email || !formData.number || !formData.password) {
            setError('All fields are required');
            setLoading(false);
            return;
          }

          // Signup logic
          response = await authAPI.signup({
            username: formData.username,
            email: formData.email,
            number: formData.number,
            password: formData.password,
          });
        }

        // Handle successful response
        if (response && response.token) {
          setAuthToken(response.token);
          setUser(response.user);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          setSuccess(signInMode ? 'Login successful! Redirecting...' : 'Account created successfully! Redirecting...');
          
          setTimeout(() => {
            navigate('/Dashboard');
          }, 1500);
        } else {
          setError('Unexpected response. Please try again.');
        }

      } catch (err) {
        console.error('Auth error:', err);
        const message = err.message || 'An unexpected error occurred.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };


    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl min-h-[500px] relative">
          
          {/* Error/Success Messages */}
          {error && (
            <div className="absolute z-1000 top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="absolute z-1000 top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          
          {/* Sign Up Container */}
          <div className={`absolute top-0 h-full transition-all duration-500 ease-in-out left-0 w-1/2 ${
            signInMode ? 'opacity-0 z-0' : 'transform translate-x-full opacity-100 z-50'
          }`}>
            <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
              <h1 className="font-bold text-teal-600 text-2xl mb-6">Create Account</h1>
              <input 
                required
                type="text" 
                name="username"
                placeholder="Username" 
                value={formData.username}
                onChange={handleInputChange}
                className="bg-gray-200 py-3 px-4 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
              <input 
                required
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-200 py-3 px-4 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
              <input 
                required
                type="text" 
                name="number"
                placeholder="Phone Number" 
                value={formData.number}
                onChange={handleInputChange}
                className="bg-gray-200 py-3 px-4 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
              <input 
                required
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                className="bg-gray-200 py-3 px-4 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
              <button 
                type="submit"
                disabled={loading}
                className="rounded-full border border-teal-800 bg-teal-800 text-white text-xs font-bold py-3 px-11 mt-4 tracking-wide uppercase hover:bg-teal-600 active:scale-95 transition-transform duration-75 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* Sign In Container */}
          <div className={`absolute top-0 h-full transition-all duration-500 ease-in-out left-0 w-1/2 z-20 ${
            signInMode ? '' : 'transform translate-x-full'
          }`}>
            <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
              <h1 className="font-bold text-teal-600 text-2xl mb-6">Sign In</h1>
              <input 
                required
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-200 py-3 px-4 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
              <input 
                required
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                className="bg-gray-200 py-3 px-4 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
              <a href="#" className="text-gray-600 text-sm my-4 hover:text-gray-800">Forgot your password?</a>
              <button 
                type="submit"
                disabled={loading}
                className="rounded-full border border-teal-800 bg-teal-800 text-white text-xs font-bold py-3 px-11 tracking-wide uppercase hover:bg-teal-600 active:scale-95 transition-transform duration-75 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Overlay */}
          <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-[100] ${
            signInMode ? '' : 'transform -translate-x-full'
          }`}>
            <div
              style={{ backgroundImage: `url(${bgImage})` }}
              className={`bg-cover bg-center text-teal-600 relative -left-full h-full w-[200%] transition-transform duration-500 ease-in-out ${
                signInMode ? 'translate-x-0' : 'translate-x-1/2'
              }`}
            >

            {/* Left Overlay — Sign In Side */}
              <div
                className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-500 ease-in-out ${
                  signInMode ? '-translate-x-1/5' : 'translate-x-0'
                }`}
              >
                <h1 className="font-bold text-4xl text-white mb-2">Welcome Back!</h1>
                <p className="text-lg text-white font-medium leading-5 my-5 mb-8">
                  Sign in to access your personalized wellness dashboard and continue your journey!
                </p>
                <button
                  onClick={toggleMode}
                  className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-11 tracking-wide uppercase hover:bg-white hover:text-teal-600 active:scale-95 transition-transform duration-75"
                >
                  Sign In
                </button>
              </div>

              {/* Right Overlay — Sign Up Side */}
              <div
                className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transition-transform duration-500 ease-in-out ${
                  signInMode ? 'translate-x-0' : 'translate-x-1/5'
                }`}
              >
                <h1 className="font-bold text-4xl text-white mb-2">Join Arvyax Wellness!</h1>
                <p className="text-white text-lg font-medium leading-5 my-5 mb-8">
                  Create your account to access personalized wellness sessions and track your progress!
                </p>
                <button
                  onClick={toggleMode}
                  className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-11 tracking-wide uppercase hover:bg-white hover:text-teal-600 active:scale-95 transition-transform duration-75"
                >
                  Sign Up
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  };

  export default Account_Signing;