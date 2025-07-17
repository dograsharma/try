'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Save, BookOpen, Plus, Calendar, Download, Trash2, Edit3, Sparkles } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  prompt?: string;
  timestamp: Date;
}

const journalPrompts = [
  "What am I feeling right now, and why might I be feeling this way?",
  "What are three things I'm grateful for today?",
  "What challenges did I face today, and how did I handle them?",
  "What would I tell my younger self about the struggles I'm facing now?",
  "What brings me peace and comfort when I'm feeling overwhelmed?",
  "How have I grown or changed in the past month?",
  "What boundaries do I need to set to protect my mental health?",
  "What are some positive affirmations I can tell myself today?",
  "What activities or people make me feel most like myself?",
  "If I could release one worry or fear today, what would it be?"
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPrompts, setShowPrompts] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('sanjeevani-journal-entries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setEntries(entriesWithDates);
      } catch (error) {
        console.error('Error loading journal entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('sanjeevani-journal-entries', JSON.stringify(entries));
    }
  }, [entries]);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      title: currentTitle.trim() || 'Untitled Entry',
      content: currentEntry.trim(),
      prompt: selectedPrompt || undefined,
      timestamp: editingId ? entries.find(e => e.id === editingId)?.timestamp || new Date() : new Date()
    };

    if (editingId) {
      setEntries(prev => prev.map(e => e.id === editingId ? entry : e));
      setEditingId(null);
    } else {
      setEntries(prev => [entry, ...prev]);
    }

    // Reset form
    setCurrentEntry('');
    setCurrentTitle('');
    setSelectedPrompt('');
  };

  const editEntry = (entry: JournalEntry) => {
    setCurrentTitle(entry.title);
    setCurrentContent(entry.content);
    setSelectedPrompt(entry.prompt || '');
    setEditingId(entry.id);
  };

  const deleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const selectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setShowPrompts(false);
    if (!currentEntry.includes(prompt)) {
      setCurrentEntry(prev => prev ? `${prev}\n\n${prompt}\n\n` : `${prompt}\n\n`);
    }
  };

  const getRandomPrompt = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    selectPrompt(randomPrompt);
  };

  const exportEntries = () => {
    const exportData = entries.map(entry => ({
      title: entry.title,
      content: entry.content,
      prompt: entry.prompt,
      date: entry.timestamp.toLocaleDateString()
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `sanjeevani-journal-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const setCurrentContent = (content: string) => {
    setCurrentEntry(content);
  };

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
                Personal Journal
              </h1>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto leading-relaxed">
                A private space for reflection, processing emotions, and tracking your mental wellness journey.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Writing Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prompt Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-r from-lavender-50 to-cream-50 border border-lavender-200 rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-semibold text-lavender-800">
                    Journal Prompts
                  </h2>
                  <button
                    onClick={getRandomPrompt}
                    className="flex items-center space-x-2 text-lavender-600 hover:text-lavender-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Random Prompt</span>
                  </button>
                </div>
                
                {selectedPrompt && (
                  <div className="mb-4 p-3 bg-white/70 rounded-xl border border-lavender-200">
                    <p className="text-lavender-800 italic">"{selectedPrompt}"</p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {journalPrompts.slice(0, 3).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => selectPrompt(prompt)}
                      className="text-xs px-3 py-2 bg-lavender-100 text-lavender-700 rounded-lg hover:bg-lavender-200 transition-colors"
                    >
                      {prompt.substring(0, 50)}...
                    </button>
                  ))}
                  <button
                    onClick={() => setShowPrompts(!showPrompts)}
                    className="text-xs px-3 py-2 bg-lavender-200 text-lavender-800 rounded-lg hover:bg-lavender-300 transition-colors font-medium"
                  >
                    {showPrompts ? 'Less' : 'More'} Prompts
                  </button>
                </div>
                
                {showPrompts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 grid gap-2"
                  >
                    {journalPrompts.slice(3).map((prompt, index) => (
                      <button
                        key={index + 3}
                        onClick={() => selectPrompt(prompt)}
                        className="text-left text-sm p-3 bg-white/50 hover:bg-white/70 rounded-lg border border-lavender-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Writing Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft"
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    placeholder="Entry title (optional)"
                    className="w-full p-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-300 focus:border-transparent bg-white/50 backdrop-blur-sm font-medium"
                  />
                  
                  <textarea
                    value={currentEntry}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder="Start writing your thoughts, feelings, experiences, or anything that comes to mind..."
                    className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-300 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm leading-relaxed"
                    rows={12}
                    style={{ minHeight: '300px' }}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-sage-500">
                      {currentEntry.length} characters
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {editingId && (
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setCurrentEntry('');
                            setCurrentTitle('');
                            setSelectedPrompt('');
                          }}
                          className="px-4 py-2 text-sage-600 hover:text-sage-700 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={saveEntry}
                        disabled={!currentEntry.trim()}
                        className="flex items-center space-x-2 bg-sage-600 text-white px-6 py-3 rounded-xl hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-soft font-medium"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingId ? 'Update Entry' : 'Save Entry'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Journal Entries Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-sm border border-sage-200 rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-semibold text-sage-800">
                    Your Entries
                  </h2>
                  {entries.length > 0 && (
                    <button
                      onClick={exportEntries}
                      className="flex items-center space-x-1 text-sage-600 hover:text-sage-700 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  )}
                </div>
                
                {entries.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-sage-400 mx-auto mb-3" />
                    <p className="text-sage-500 text-sm">
                      Start your first journal entry above
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {entries.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-4 bg-sage-50 rounded-xl border border-sage-200 hover:bg-sage-100 transition-colors group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-sage-800 text-sm truncate flex-1">
                            {entry.title}
                          </h3>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => editEntry(entry)}
                              className="p-1 text-sage-500 hover:text-sage-700 transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="p-1 text-sage-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sage-600 text-xs mb-2 line-clamp-2">
                          {entry.content.substring(0, 100)}...
                        </p>
                        
                        <div className="flex items-center space-x-1 text-xs text-sage-500">
                          <Calendar className="w-3 h-3" />
                          <span>{entry.timestamp.toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Privacy Notice */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-mint-50 border border-mint-200 rounded-2xl p-4"
              >
                <h3 className="font-medium text-mint-800 mb-2 text-sm">
                  🔒 Your Privacy
                </h3>
                <p className="text-xs text-mint-700 leading-relaxed">
                  Your journal entries are stored locally on your device. 
                  They are completely private and never shared or uploaded anywhere.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}