'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Video, 
  MessageSquare, 
  Phone,
  CheckCircle,
  User,
  Award,
  Heart,
  Languages
} from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  languages: string[];
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  sessionTypes: ('video' | 'phone' | 'chat' | 'in-person')[];
  fee: string;
  availability: string[];
  image: string;
  bio: string;
}

const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    title: 'Clinical Psychologist',
    specializations: ['Anxiety Disorders', 'Depression', 'Trauma Therapy', 'Mindfulness'],
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.9,
    reviews: 127,
    experience: '8 years',
    location: 'Mumbai, Maharashtra',
    sessionTypes: ['video', 'phone', 'in-person'],
    fee: '₹1,500-2,000',
    availability: ['Mon', 'Tue', 'Wed', 'Fri'],
    image: '/therapist-1.jpg',
    bio: 'Specializing in anxiety and trauma with a compassionate, evidence-based approach. Certified in CBT and mindfulness techniques.'
  },
  {
    id: '2',
    name: 'Dr. Arjun Mehta',
    title: 'Psychiatrist & Therapist',
    specializations: ['Bipolar Disorder', 'ADHD', 'Stress Management', 'Relationship Counseling'],
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.8,
    reviews: 89,
    experience: '12 years',
    location: 'Delhi, NCR',
    sessionTypes: ['video', 'phone', 'in-person'],
    fee: '₹2,000-2,500',
    availability: ['Mon', 'Wed', 'Thu', 'Sat'],
    image: '/therapist-2.jpg',
    bio: 'Experienced psychiatrist focusing on mood disorders and stress management with integrated therapeutic approaches.'
  },
  {
    id: '3',
    name: 'Dr. Kavitha Reddy',
    title: 'Counseling Psychologist',
    specializations: ['Family Therapy', 'Grief Counseling', 'Self-Esteem', 'Career Guidance'],
    languages: ['English', 'Telugu', 'Tamil'],
    rating: 4.7,
    reviews: 156,
    experience: '6 years',
    location: 'Bangalore, Karnataka',
    sessionTypes: ['video', 'chat', 'in-person'],
    fee: '₹1,200-1,800',
    availability: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    image: '/therapist-3.jpg',
    bio: 'Warm and empathetic approach to family dynamics and personal growth. Specializes in culturally sensitive therapy.'
  },
  {
    id: '4',
    name: 'Dr. Rohit Singh',
    title: 'Behavioral Therapist',
    specializations: ['OCD', 'Phobias', 'Addiction Recovery', 'Anger Management'],
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.6,
    reviews: 203,
    experience: '10 years',
    location: 'Chandigarh, Punjab',
    sessionTypes: ['video', 'phone'],
    fee: '₹1,800-2,200',
    availability: ['Mon', 'Tue', 'Thu', 'Fri'],
    image: '/therapist-4.jpg',
    bio: 'Expert in behavioral interventions and addiction recovery with a practical, solution-focused methodology.'
  }
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

export default function BookPage() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleBookAppointment = () => {
    if (selectedTherapist && selectedDate && selectedTime && selectedType) {
      setBookingComplete(true);
      setTimeout(() => {
        setBookingComplete(false);
        setShowBooking(false);
        setSelectedTherapist(null);
        setSelectedDate('');
        setSelectedTime('');
        setSelectedType('');
      }, 3000);
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getSessionLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Video Call';
      case 'phone': return 'Phone Call';
      case 'chat': return 'Text Chat';
      case 'in-person': return 'In-Person';
      default: return 'Video Call';
    }
  };

  // Generate next 7 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-sage-900 mb-4">
                Book Therapy Sessions
              </h1>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto leading-relaxed">
                Connect with licensed mental health professionals who understand your needs and can guide your healing journey.
              </p>
            </motion.div>
          </div>

          {!showBooking ? (
            /* Therapist Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {therapists.map((therapist, index) => (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 card-hover"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-sage-400 to-mint-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                      {therapist.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-semibold text-sage-900 mb-1">
                        {therapist.name}
                      </h3>
                      <p className="text-sage-600 text-sm mb-2">{therapist.title}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-sage-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{therapist.rating}</span>
                          <span>({therapist.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{therapist.experience}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-sage-500">
                        <MapPin className="w-4 h-4" />
                        <span>{therapist.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-sage-800 mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-1">
                        {therapist.specializations.slice(0, 3).map((spec, specIndex) => (
                          <span
                            key={specIndex}
                            className="text-xs px-2 py-1 bg-sage-100 text-sage-700 rounded-lg"
                          >
                            {spec}
                          </span>
                        ))}
                        {therapist.specializations.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-sage-100 text-sage-700 rounded-lg">
                            +{therapist.specializations.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-sage-800 mb-2">Languages</h4>
                      <div className="flex items-center space-x-1 text-sm text-sage-600">
                        <Languages className="w-4 h-4" />
                        <span>{therapist.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-sage-800 mb-2">Session Types</h4>
                      <div className="flex items-center space-x-2">
                        {therapist.sessionTypes.map((type, typeIndex) => (
                          <div key={typeIndex} className="flex items-center space-x-1 text-sage-600">
                            {getSessionIcon(type)}
                            <span className="text-xs">{getSessionLabel(type)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                    <div>
                      <div className="text-lg font-semibold text-sage-900">{therapist.fee}</div>
                      <div className="text-sm text-sage-500">per session</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedTherapist(therapist);
                        setShowBooking(true);
                      }}
                      className="bg-sage-600 text-white px-6 py-2 rounded-xl hover:bg-sage-700 transition-colors shadow-soft font-medium"
                    >
                      Book Session
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Booking Interface */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {bookingComplete ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="font-serif text-2xl font-semibold text-green-800 mb-2">
                    Appointment Booked Successfully!
                  </h2>
                  <p className="text-green-700 mb-4">
                    Your session with {selectedTherapist?.name} has been scheduled for{' '}
                    {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}{' '}
                    at {selectedTime}.
                  </p>
                  <p className="text-sm text-green-600">
                    You will receive a confirmation email with session details shortly.
                  </p>
                </motion.div>
              ) : (
                <div className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-8 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-semibold text-sage-900">
                      Book Appointment
                    </h2>
                    <button
                      onClick={() => setShowBooking(false)}
                      className="text-sage-500 hover:text-sage-700 transition-colors"
                    >
                      ← Back to Therapists
                    </button>
                  </div>

                  {selectedTherapist && (
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Therapist Info */}
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 bg-gradient-to-r from-sage-400 to-mint-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                            {selectedTherapist.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-serif text-xl font-semibold text-sage-900">
                              {selectedTherapist.name}
                            </h3>
                            <p className="text-sage-600">{selectedTherapist.title}</p>
                            <div className="flex items-center space-x-2 mt-2 text-sm text-sage-500">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{selectedTherapist.rating} ({selectedTherapist.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sage-800 mb-2">About</h4>
                          <p className="text-sage-600 text-sm leading-relaxed">
                            {selectedTherapist.bio}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sage-800 mb-2">Fee</h4>
                          <p className="text-lg font-semibold text-sage-900">
                            {selectedTherapist.fee} per session
                          </p>
                        </div>
                      </div>

                      {/* Booking Form */}
                      <div className="space-y-6">
                        {/* Session Type */}
                        <div>
                          <h4 className="font-medium text-sage-800 mb-3">Session Type</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedTherapist.sessionTypes.map((type) => (
                              <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`flex items-center space-x-2 p-3 rounded-xl border transition-colors ${
                                  selectedType === type
                                    ? 'bg-sage-100 border-sage-300 text-sage-800'
                                    : 'bg-white border-sage-200 text-sage-600 hover:bg-sage-50'
                                }`}
                              >
                                {getSessionIcon(type)}
                                <span className="text-sm font-medium">
                                  {getSessionLabel(type)}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Date Selection */}
                        <div>
                          <h4 className="font-medium text-sage-800 mb-3">Select Date</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {getAvailableDates().map((dateOption) => (
                              <button
                                key={dateOption.date}
                                onClick={() => setSelectedDate(dateOption.date)}
                                className={`p-3 rounded-xl border text-sm transition-colors ${
                                  selectedDate === dateOption.date
                                    ? 'bg-sage-100 border-sage-300 text-sage-800'
                                    : 'bg-white border-sage-200 text-sage-600 hover:bg-sage-50'
                                }`}
                              >
                                {dateOption.display}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                          <h4 className="font-medium text-sage-800 mb-3">Select Time</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`p-3 rounded-xl border text-sm transition-colors ${
                                  selectedTime === time
                                    ? 'bg-sage-100 border-sage-300 text-sage-800'
                                    : 'bg-white border-sage-200 text-sage-600 hover:bg-sage-50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Book Button */}
                        <button
                          onClick={handleBookAppointment}
                          disabled={!selectedDate || !selectedTime || !selectedType}
                          className="w-full bg-sage-600 text-white py-4 rounded-xl hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-soft font-medium"
                        >
                          Confirm Booking
                        </button>

                        <p className="text-xs text-sage-500 text-center leading-relaxed">
                          By booking, you agree to our terms and privacy policy. 
                          No payment is required at this time. You can cancel or reschedule up to 24 hours before your appointment.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Information Section */}
          {!showBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-gradient-to-r from-lavender-50 to-cream-50 border border-lavender-200 rounded-2xl p-8"
            >
              <div className="text-center mb-6">
                <Heart className="w-8 h-8 text-lavender-600 mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-semibold text-lavender-800 mb-2">
                  Your Mental Health Matters
                </h3>
                <p className="text-lavender-700 max-w-2xl mx-auto">
                  Taking the step to seek professional help is a sign of strength. 
                  Our licensed therapists are here to support you on your journey to wellness.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-6 h-6 text-lavender-600" />
                  </div>
                  <h4 className="font-medium text-lavender-800">Licensed Professionals</h4>
                  <p className="text-sm text-lavender-600">
                    All therapists are licensed and verified mental health professionals
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center mx-auto">
                    <Video className="w-6 h-6 text-lavender-600" />
                  </div>
                  <h4 className="font-medium text-lavender-800">Flexible Sessions</h4>
                  <p className="text-sm text-lavender-600">
                    Choose from video, phone, chat, or in-person sessions
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 text-lavender-600" />
                  </div>
                  <h4 className="font-medium text-lavender-800">Confidential & Safe</h4>
                  <p className="text-sm text-lavender-600">
                    Your privacy is protected with secure, confidential sessions
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}