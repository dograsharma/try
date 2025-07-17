'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, ExternalLink, X, Wind } from 'lucide-react';

export default function UrgentSupportCard() {
  const [showBreathingModal, setShowBreathingModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-soft"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Heart className="w-8 h-8 text-red-500 pulse-gentle" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold text-red-800 mb-2">
              ❤️ Need Urgent Help?
            </h3>
            <p className="text-red-700 mb-4 leading-relaxed">
              You're not alone. Reach out for immediate support.
            </p>
            
            <div className="space-y-3">
              {/* Phone Support */}
              <div className="flex items-center space-x-3 text-red-700">
                <Phone className="w-5 h-5" />
                <div>
                  <span className="font-medium">Call: </span>
                  <a 
                    href="tel:9152987821" 
                    className="text-red-600 hover:text-red-800 font-semibold underline transition-colors"
                  >
                    9152987821 (iCall India)
                  </a>
                </div>
              </div>
              
              {/* Website Support */}
              <div className="flex items-center space-x-3 text-red-700">
                <ExternalLink className="w-5 h-5" />
                <div>
                  <span className="font-medium">Visit: </span>
                  <a 
                    href="https://snehi.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800 font-semibold underline transition-colors"
                  >
                    snehi.org
                  </a>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => setShowBreathingModal(true)}
                className="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors shadow-soft font-medium"
              >
                <Wind className="w-4 h-4 mr-2" />
                Breathing Tool
              </button>
              
              <a
                href="tel:9152987821"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-soft font-medium"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBreathingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-soft-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl font-semibold text-sage-800">
                  Breathing Exercise
                </h3>
                <button
                  onClick={() => setShowBreathingModal(false)}
                  className="p-2 hover:bg-sage-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-sage-600" />
                </button>
              </div>
              
              <div className="text-center">
                <div className="relative mb-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 mx-auto bg-gradient-to-r from-sage-200 to-mint-200 rounded-full flex items-center justify-center shadow-soft"
                  >
                    <Wind className="w-12 h-12 text-sage-600" />
                  </motion.div>
                </div>
                
                <div className="space-y-4 text-sage-700">
                  <p className="text-lg font-medium">Follow the circle</p>
                  <div className="space-y-2 text-sm leading-relaxed">
                    <p><strong>Inhale</strong> as the circle grows</p>
                    <p><strong>Exhale</strong> as the circle shrinks</p>
                    <p className="text-sage-600 mt-4">
                      Continue for as long as you need. You're safe.
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowBreathingModal(false)}
                  className="mt-6 px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors font-medium"
                >
                  I'm feeling better
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}