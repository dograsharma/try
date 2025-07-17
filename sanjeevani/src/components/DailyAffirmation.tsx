'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

const affirmations = [
  {
    text: "You are worthy of love and kindness, especially from yourself.",
    author: "Self-Compassion"
  },
  {
    text: "Every breath is a new beginning, every moment a fresh start.",
    author: "Mindfulness"
  },
  {
    text: "Your feelings are valid, and it's okay to not be okay sometimes.",
    author: "Emotional Acceptance"
  },
  {
    text: "You have survived 100% of your difficult days so far. You're stronger than you know.",
    author: "Resilience"
  },
  {
    text: "Progress, not perfection. Every small step forward matters.",
    author: "Growth Mindset"
  },
  {
    text: "You are enough, exactly as you are, in this very moment.",
    author: "Self-Worth"
  },
  {
    text: "Your mental health matters. Taking care of yourself is not selfish.",
    author: "Self-Care"
  },
  {
    text: "It's okay to rest. It's okay to take breaks. You don't have to be productive every moment.",
    author: "Rest & Recovery"
  },
  {
    text: "You are not your thoughts. You are the observer of your thoughts.",
    author: "Mindfulness"
  },
  {
    text: "Healing is not linear. Be patient and gentle with your journey.",
    author: "Healing Journey"
  }
];

export default function DailyAffirmation() {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get affirmation based on current date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const affirmationIndex = dayOfYear % affirmations.length;
    setCurrentAffirmation(affirmations[affirmationIndex]);
  }, []);

  const getNewAffirmation = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      setCurrentAffirmation(affirmations[randomIndex]);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-lavender-50 to-cream-50 border border-lavender-200 rounded-2xl p-6 shadow-soft relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-lavender-100 rounded-full blur-2xl opacity-50 -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-cream-100 rounded-full blur-2xl opacity-50 translate-y-8 -translate-x-8"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-lavender-600 breathing" />
            <h3 className="font-serif text-xl font-semibold text-lavender-800">
              Today's Affirmation
            </h3>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={getNewAffirmation}
            disabled={isRefreshing}
            className="p-2 text-lavender-600 hover:text-lavender-700 hover:bg-lavender-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <motion.div
          key={currentAffirmation.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <blockquote className="text-lg leading-relaxed text-lavender-900 font-medium italic">
            "{currentAffirmation.text}"
          </blockquote>
          
          <footer className="text-sm text-lavender-600">
            — {currentAffirmation.author}
          </footer>
        </motion.div>

        <div className="mt-6 pt-4 border-t border-lavender-200">
          <p className="text-xs text-lavender-500 text-center">
            Take a moment to breathe and let these words settle in your heart.
          </p>
        </div>
      </div>
    </motion.div>
  );
}