'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import DailyAffirmation from '@/components/DailyAffirmation';
import MoodCheckIn from '@/components/MoodCheckIn';
import UrgentSupportCard from '@/components/UrgentSupportCard';
import { 
  MessageCircle, 
  PenTool, 
  BookOpen, 
  Calendar,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';

const quickActions = [
  {
    title: 'Talk to AI Support',
    description: 'Chat with our compassionate AI companion for immediate support and guidance.',
    href: '/chat',
    icon: MessageCircle,
    color: 'from-sage-500 to-mint-500',
    textColor: 'text-sage-600',
    bgColor: 'bg-sage-50'
  },
  {
    title: 'Share Anonymously',
    description: 'Express your thoughts and feelings in a safe, anonymous space.',
    href: '/post',
    icon: PenTool,
    color: 'from-lavender-500 to-purple-500',
    textColor: 'text-lavender-600',
    bgColor: 'bg-lavender-50'
  },
  {
    title: 'Personal Journal',
    description: 'Reflect and release through private journaling and mindful writing.',
    href: '/journal',
    icon: BookOpen,
    color: 'from-cream-500 to-yellow-500',
    textColor: 'text-cream-700',
    bgColor: 'bg-cream-50'
  },
  {
    title: 'Book Therapy',
    description: 'Connect with professional therapists for personalized support.',
    href: '/book',
    icon: Calendar,
    color: 'from-mint-500 to-green-500',
    textColor: 'text-mint-600',
    bgColor: 'bg-mint-50'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-sage-900 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-sage-600 to-mint-600 bg-clip-text text-transparent">
                  Sanjeevani
                </span>
              </h1>
              <p className="text-lg md:text-xl text-sage-700 leading-relaxed mb-8">
                A compassionate space for mental wellness, healing, and growth. 
                You're not alone in your journey.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sage-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Anonymous • Safe • Supportive</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </motion.div>
          </div>

          {/* Top Section - Affirmation and Mood */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <DailyAffirmation />
            <MoodCheckIn />
          </div>

          {/* Urgent Support Card */}
          <div className="mb-12">
            <UrgentSupportCard />
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold text-sage-900 mb-4">
                How can we support you today?
              </h2>
              <p className="text-sage-600 max-w-2xl mx-auto">
                Choose from our tools designed to support your mental wellness journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={action.href}
                      className="group block h-full"
                    >
                      <div className={`${action.bgColor} border border-sage-200 rounded-2xl p-6 shadow-soft card-hover h-full transition-all duration-200 group-hover:border-sage-300`}>
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 bg-gradient-to-r ${action.color} rounded-xl text-white shadow-soft`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className={`font-serif text-xl font-semibold ${action.textColor} mb-2 group-hover:text-opacity-80 transition-colors`}>
                              {action.title}
                            </h3>
                            <p className="text-sage-600 text-sm leading-relaxed mb-4">
                              {action.description}
                            </p>
                            
                            <div className="flex items-center space-x-2 text-sage-500 group-hover:text-sage-700 transition-colors">
                              <span className="text-sm font-medium">Get started</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16 py-8 border-t border-sage-200"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-sage-600 pulse-gentle" />
              <h3 className="font-serif text-xl font-semibold text-sage-800">
                Remember
              </h3>
            </div>
            <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
              Healing is a journey, not a destination. Every step you take towards 
              self-care and wellness matters. You are brave for being here.
            </p>
            <p className="text-sm text-sage-500 mt-4">
              Your privacy is protected. All interactions are anonymous and confidential.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
