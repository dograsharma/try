'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import MoodCheckIn from '@/components/MoodCheckIn';
import { BarChart3, TrendingUp, Calendar, Heart, Brain, Sun, Cloud, CloudRain } from 'lucide-react';

interface MoodEntry {
  id: string;
  mood: number;
  reason?: string;
  timestamp: Date;
  tags?: string[];
}

const moodLabels = {
  1: { label: 'Very Sad', emoji: '😢', color: 'text-blue-600', bg: 'bg-blue-50' },
  2: { label: 'Sad', emoji: '😟', color: 'text-blue-500', bg: 'bg-blue-50' },
  3: { label: 'Neutral', emoji: '😐', color: 'text-gray-500', bg: 'bg-gray-50' },
  4: { label: 'Good', emoji: '🙂', color: 'text-green-500', bg: 'bg-green-50' },
  5: { label: 'Great', emoji: '😊', color: 'text-green-600', bg: 'bg-green-50' },
};

const moodTags = [
  'Work Stress', 'Family', 'Health', 'Exercise', 'Sleep', 'Weather',
  'Social', 'Therapy', 'Meditation', 'Anxiety', 'Achievement', 'Rest'
];

export default function MoodPage() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  // Load mood history from localStorage
  useEffect(() => {
    const savedMoods = localStorage.getItem('sanjeevani-mood-history');
    if (savedMoods) {
      try {
        const parsed = JSON.parse(savedMoods);
        const moodsWithDates = parsed.map((mood: any) => ({
          ...mood,
          timestamp: new Date(mood.timestamp)
        }));
        setMoodHistory(moodsWithDates);
      } catch (error) {
        console.error('Error loading mood history:', error);
      }
    }
  }, []);

  // Save mood history to localStorage
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('sanjeevani-mood-history', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);

  // Add new mood entry (this would be called from a mood check-in component)
  const addMoodEntry = (mood: number, reason?: string, tags?: string[]) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      reason,
      tags,
      timestamp: new Date()
    };
    setMoodHistory(prev => [entry, ...prev]);
  };

  // Filter mood history based on selected period
  const getFilteredMoods = () => {
    const now = new Date();
    const filtered = moodHistory.filter(mood => {
      if (selectedPeriod === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return mood.timestamp >= weekAgo;
      } else if (selectedPeriod === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return mood.timestamp >= monthAgo;
      }
      return true;
    });
    return filtered;
  };

  // Calculate mood statistics
  const getMoodStats = () => {
    const filteredMoods = getFilteredMoods();
    if (filteredMoods.length === 0) return null;

    const average = filteredMoods.reduce((sum, mood) => sum + mood.mood, 0) / filteredMoods.length;
    const moodCounts = filteredMoods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const mostCommon = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[Number(a[0])] > moodCounts[Number(b[0])] ? a : b
    )[0];

    return {
      average: average.toFixed(1),
      mostCommon: Number(mostCommon),
      totalEntries: filteredMoods.length,
      moodCounts
    };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = getMoodStats();
  const filteredMoods = getFilteredMoods();

  const getMoodTrend = () => {
    if (filteredMoods.length < 2) return null;
    
    const recent = filteredMoods.slice(0, Math.min(5, filteredMoods.length));
    const older = filteredMoods.slice(Math.min(5, filteredMoods.length), Math.min(10, filteredMoods.length));
    
    if (older.length === 0) return null;
    
    const recentAvg = recent.reduce((sum, mood) => sum + mood.mood, 0) / recent.length;
    const olderAvg = older.reduce((sum, mood) => sum + mood.mood, 0) / older.length;
    
    return recentAvg - olderAvg;
  };

  const trend = getMoodTrend();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-sage-900 mb-4">
                Mood Tracking
              </h1>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto leading-relaxed">
                Track your emotional well-being over time and discover patterns in your mental health journey.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mood Check-in */}
            <div className="lg:col-span-2">
              <MoodCheckIn />
              
              {/* Mood History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold text-sage-800">
                    Mood History
                  </h2>
                  
                  <div className="flex items-center space-x-2">
                    {['week', 'month', 'all'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period as any)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedPeriod === period
                            ? 'bg-sage-600 text-white'
                            : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                        }`}
                      >
                        {period === 'all' ? 'All Time' : `Past ${period}`}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredMoods.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <p className="text-sage-500">
                      Start tracking your mood to see patterns and insights over time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMoods.slice(0, 10).map((entry, index) => {
                      const moodInfo = moodLabels[entry.mood as keyof typeof moodLabels];
                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`p-4 rounded-xl border ${moodInfo.bg} border-opacity-30`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{moodInfo.emoji}</span>
                              <div>
                                <div className={`font-medium ${moodInfo.color}`}>
                                  {moodInfo.label}
                                </div>
                                <div className="text-sm text-sage-500">
                                  {formatDate(entry.timestamp)}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              {entry.reason && (
                                <p className="text-sm text-sage-600 max-w-xs">
                                  {entry.reason}
                                </p>
                              )}
                              {entry.tags && entry.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2 justify-end">
                                  {entry.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="text-xs px-2 py-1 bg-sage-100 text-sage-600 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    {filteredMoods.length > 10 && (
                      <p className="text-center text-sm text-sage-500 mt-4">
                        Showing 10 most recent entries • {filteredMoods.length} total
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Statistics Sidebar */}
            <div className="space-y-6">
              {/* Mood Statistics */}
              {stats && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-sage-600" />
                    <h3 className="font-serif text-lg font-semibold text-sage-800">
                      Statistics
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-sage-50 rounded-xl">
                      <div className="text-2xl font-bold text-sage-800">
                        {stats.average}
                      </div>
                      <div className="text-sm text-sage-600">Average Mood</div>
                    </div>
                    
                    <div className="text-center p-4 bg-mint-50 rounded-xl">
                      <div className="text-2xl">
                        {moodLabels[stats.mostCommon as keyof typeof moodLabels]?.emoji}
                      </div>
                      <div className="text-sm text-sage-600">Most Common</div>
                    </div>
                    
                    <div className="text-center p-4 bg-cream-50 rounded-xl">
                      <div className="text-2xl font-bold text-sage-800">
                        {stats.totalEntries}
                      </div>
                      <div className="text-sm text-sage-600">Total Entries</div>
                    </div>
                    
                    {trend !== null && (
                      <div className={`text-center p-4 rounded-xl ${
                        trend > 0 ? 'bg-green-50' : trend < 0 ? 'bg-blue-50' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          {trend > 0 ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : trend < 0 ? (
                            <TrendingUp className="w-5 h-5 text-blue-600 rotate-180" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-gray-600" />
                          )}
                          <span className={`font-medium ${
                            trend > 0 ? 'text-green-800' : trend < 0 ? 'text-blue-800' : 'text-gray-800'
                          }`}>
                            {trend > 0 ? 'Improving' : trend < 0 ? 'Declining' : 'Stable'}
                          </span>
                        </div>
                        <div className="text-sm text-sage-600 mt-1">Recent Trend</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Mood Distribution */}
              {stats && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft"
                >
                  <h3 className="font-serif text-lg font-semibold text-sage-800 mb-4">
                    Mood Distribution
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(moodLabels).map(([moodValue, moodInfo]) => {
                      const count = stats.moodCounts[Number(moodValue)] || 0;
                      const percentage = stats.totalEntries > 0 ? (count / stats.totalEntries) * 100 : 0;
                      
                      return (
                        <div key={moodValue} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <span>{moodInfo.emoji}</span>
                              <span className={moodInfo.color}>{moodInfo.label}</span>
                            </div>
                            <span className="text-sage-600">{count}</span>
                          </div>
                          <div className="w-full bg-sage-100 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                              className="bg-sage-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-lavender-50 border border-lavender-200 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="w-5 h-5 text-lavender-600" />
                  <h3 className="font-serif text-lg font-semibold text-lavender-800">
                    Insights
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm text-lavender-700">
                  <p>
                    🌱 Regular mood tracking helps identify patterns and triggers
                  </p>
                  <p>
                    📊 Look for connections between activities, sleep, and mood
                  </p>
                  <p>
                    🎯 Small daily actions can significantly impact your well-being
                  </p>
                  <p>
                    💚 Remember: all emotions are valid and temporary
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}