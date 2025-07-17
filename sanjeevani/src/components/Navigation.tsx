'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  PenTool, 
  BookOpen, 
  Heart, 
  Calendar,
  Sparkles
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/chat', label: 'AI Support', icon: MessageCircle },
  { href: '/post', label: 'Share', icon: PenTool },
  { href: '/journal', label: 'Journal', icon: BookOpen },
  { href: '/mood', label: 'Mood', icon: Heart },
  { href: '/book', label: 'Therapy', icon: Calendar },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage-200 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-sage-600 group-hover:text-sage-700 transition-colors breathing" />
            </div>
            <span className="font-serif text-2xl font-semibold text-sage-800 group-hover:text-sage-900 transition-colors">
              Sanjeevani
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 group ${
                    isActive
                      ? 'text-sage-800 bg-sage-100'
                      : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-sage-100 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button - placeholder for now */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-sage-600 hover:text-sage-800 hover:bg-sage-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - simplified for now */}
      <div className="md:hidden border-t border-sage-200 bg-white/95 backdrop-blur-md">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navItems.slice(0, 6).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'text-sage-800 bg-sage-100'
                    : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="truncate w-full text-center">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}