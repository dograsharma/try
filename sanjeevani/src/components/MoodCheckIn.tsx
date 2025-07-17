'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, TrendingUp } from 'lucide-react';

const moods = [
  { emoji: '😢', label: 'Very Sad', value: 1, color: 'text-blue-600' },
  { emoji: '😟', label: 'Sad', value: 2, color: 'text-blue-500' },
  { emoji: '😐', label: 'Neutral', value: 3, color: 'text-gray-500' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'text-green-500' },
  { emoji: '😊', label: 'Great', value: 5, color: 'text-green-600' },
];

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood) {
      // Here you would typically save to local storage or send to API
      console.log('Mood submitted:', { mood: selectedMood, reason });
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedMood(null);
        setReason('');
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-green-50 to-mint-50 border-2 border-green-200 rounded-2xl p-6 shadow-soft text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-green-800 mb-2">
          Thank you for sharing!
        </h3>
        <p className="text-green-700">
          Your mood has been recorded. Remember, every feeling is valid.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-sage-600" />
        <h3 className="font-serif text-xl font-semibold text-sage-800">
          How are you feeling today?
        </h3>
      </div>

      {/* Mood Selection */}
      <div className="space-y-4 mb-6">
        <p className="text-sage-600 text-sm">Select your current mood:</p>
        <div className="flex justify-between space-x-2">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                selectedMood === mood.value
                  ? 'bg-sage-100 border-2 border-sage-300 shadow-soft'
                  : 'bg-sage-50 border border-sage-200 hover:bg-sage-100'
              }`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className={`text-xs font-medium ${mood.color}`}>
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Optional Reason */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="space-y-3 mb-6"
        >
          <label className="block text-sm font-medium text-sage-700">
            What's contributing to this feeling? (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Share what's on your mind..."
            className="w-full p-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-300 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm"
            rows={3}
          />
        </motion.div>
      )}

      {/* Submit Button */}
      {selectedMood && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center space-x-2 bg-sage-600 text-white py-3 px-4 rounded-xl hover:bg-sage-700 transition-colors shadow-soft font-medium"
        >
          <Send className="w-4 h-4" />
          <span>Record My Mood</span>
        </motion.button>
      )}

      <p className="text-xs text-sage-500 text-center mt-4">
        Your mood data stays on your device and is completely private.
      </p>
    </motion.div>
  );
}