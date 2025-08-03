import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, Clock, User, Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      title: "Morning Yoga Flow",
      date: new Date(2024, 0, 15, 8, 0),
      duration: 30,
      status: "confirmed",
      category: "Yoga",
      instructor: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Meditation Session",
      date: new Date(2024, 0, 15, 18, 30),
      duration: 20,
      status: "confirmed",
      category: "Meditation",
      instructor: "Mike Chen"
    }
  ]);

  const [availableSessions] = useState([
    {
      id: 1,
      title: "Morning Yoga Flow",
      category: "Yoga",
      duration: 30,
      instructor: "Sarah Johnson",
      time: "08:00 AM",
      available: true,
      image: "https://images.unsplash.com/photo-1506629905607-c65b4023b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Meditation Session",
      category: "Meditation",
      duration: 20,
      instructor: "Mike Chen",
      time: "06:30 PM",
      available: true,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getBookingsForDate = (date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.toDateString() === date.toDateString();
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowBookingModal(true);
  };

  const handleBookSession = (session) => {
    setSelectedSession(session);
    setShowSessionModal(true);
  };

  const confirmBooking = () => {
    if (selectedSession) {
      const newBooking = {
        id: Date.now(),
        title: selectedSession.title,
        date: new Date(selectedDate),
        duration: selectedSession.duration,
        status: "confirmed",
        category: selectedSession.category,
        instructor: selectedSession.instructor
      };
      
      setBookings([...bookings, newBooking]);
      setShowSessionModal(false);
      setSelectedSession(null);
    }
  };

  const cancelBooking = (bookingId) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Yoga': return 'bg-blue-100 text-blue-800';
      case 'Meditation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
          <p className="text-gray-600">Manage your wellness sessions and appointments</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h2>
              
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Book Session</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              const dayBookings = getBookingsForDate(day.date);
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isSelected = day.date.toDateString() === selectedDate.toDateString();
              
              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`min-h-[100px] p-2 border border-gray-200 cursor-pointer transition-colors ${
                    !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-50'
                  } ${isToday ? 'bg-teal-50 border-teal-300' : ''} ${
                    isSelected ? 'bg-teal-100 border-teal-400' : ''
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {day.date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayBookings.slice(0, 2).map(booking => (
                      <div
                        key={booking.id}
                        className={`text-xs p-1 rounded truncate ${getCategoryColor(booking.category)}`}
                        title={booking.title}
                      >
                        {booking.title}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayBookings.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>
          
          <div className="space-y-4">
            {bookings
              .filter(booking => new Date(booking.date) >= new Date())
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.title}</h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(booking.date)} at {formatTime(booking.date)}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(booking.category)}`}>
                          {booking.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Edit3 className="h-4 w-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => cancelBooking(booking.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Sessions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableSessions.map(session => (
              <div key={session.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-32">
                  <img 
                    src={session.image} 
                    alt={session.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {session.available ? 'Available' : 'Full'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{session.title}</h4>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(session.category)}`}>
                      {session.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration}min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{session.instructor}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{session.time}</span>
                    <button
                      onClick={() => handleBookSession(session)}
                      disabled={!session.available}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        session.available
                          ? 'bg-teal-600 hover:bg-teal-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {session.available ? 'Book Now' : 'Full'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book a Session</h3>
              <p className="text-gray-600 mb-6">
                Select a session to book for {formatDate(selectedDate)}
              </p>
              
              <div className="space-y-4 mb-6">
                {availableSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{session.title}</h4>
                      <p className="text-sm text-gray-600">{session.instructor} • {session.duration}min</p>
                    </div>
                    <button
                      onClick={() => handleBookSession(session)}
                      disabled={!session.available}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        session.available
                          ? 'bg-teal-600 hover:bg-teal-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showSessionModal && selectedSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Booking</h3>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={selectedSession.image} 
                    alt={selectedSession.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedSession.title}</h4>
                    <p className="text-sm text-gray-600">{selectedSession.instructor}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedSession.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{selectedSession.duration} minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Schedule; 