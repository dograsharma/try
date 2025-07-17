'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Send, Heart, MessageCircle, Clock, Shield, Users } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  timestamp: Date;
  reactions: number;
}

// Mock posts for demonstration - in real app, these would come from a backend
const mockPosts: Post[] = [
  {
    id: '1',
    content: "Today was really tough. I'm struggling with anxiety about work, but I'm trying to remind myself that it's okay to not be perfect. Taking it one day at a time.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    reactions: 8
  },
  {
    id: '2',
    content: "Had my first therapy session today. Nervous but hopeful. It feels good to finally take this step toward healing. If anyone is considering therapy, you're brave for even thinking about it.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    reactions: 12
  },
  {
    id: '3',
    content: "Practiced meditation for the first time in weeks. It's amazing how 10 minutes can shift your entire mindset. Sometimes the smallest steps feel like the biggest victories.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    reactions: 15
  }
];

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!newPost.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate moderation and posting delay
    setTimeout(() => {
      const post: Post = {
        id: Date.now().toString(),
        content: newPost,
        timestamp: new Date(),
        reactions: 0
      };

      setPosts(prev => [post, ...prev]);
      setNewPost('');
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const addReaction = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, reactions: post.reactions + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-sage-900 mb-4">
                Anonymous Sharing
              </h1>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto leading-relaxed">
                Share your thoughts, experiences, and feelings in a safe, supportive, and completely anonymous space.
              </p>
              
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-sage-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Anonymous</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Supportive Community</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Safe Space</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 text-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    Your post has been shared anonymously. Thank you for opening up.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post Creation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft mb-8"
          >
            <h2 className="font-serif text-xl font-semibold text-sage-800 mb-4">
              Share what's on your mind
            </h2>
            
            <div className="space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Express your thoughts, feelings, experiences, or anything that's weighing on your heart. This is a judgment-free space..."
                className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-300 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm"
                rows={4}
                maxLength={500}
              />
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-sage-500">
                  {newPost.length}/500 characters
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={!newPost.trim() || isSubmitting}
                  className="flex items-center space-x-2 bg-sage-600 text-white px-6 py-3 rounded-xl hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-soft font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sharing...' : 'Share Anonymously'}</span>
                </button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-sage-50 rounded-xl">
              <p className="text-xs text-sage-600 leading-relaxed">
                <strong>Privacy Notice:</strong> Your post is completely anonymous. No personal information is stored or shared. 
                Posts are moderated for safety and may be removed if they contain harmful content.
              </p>
            </div>
          </motion.div>

          {/* Recent Posts */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-sage-900">
              Recent Anonymous Shares
            </h2>
            
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200"
                >
                  <div className="space-y-4">
                    <p className="text-sage-800 leading-relaxed">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                      <div className="flex items-center space-x-4 text-sm text-sage-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeAgo(post.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>Anonymous</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => addReaction(post.id)}
                        className="flex items-center space-x-2 text-sage-500 hover:text-sage-700 transition-colors group"
                      >
                        <Heart className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                        <span className="text-sm">{post.reactions}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 bg-lavender-50 border border-lavender-200 rounded-2xl p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-lavender-800 mb-3">
              Community Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-lavender-700">
              <li>• Be kind and supportive to others sharing their experiences</li>
              <li>• No personal attacks, discrimination, or hate speech</li>
              <li>• Avoid sharing specific personal details that could identify you</li>
              <li>• If you're in crisis, please reach out to professional help: 9152987821</li>
              <li>• Posts promoting self-harm or dangerous behaviors will be removed</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}