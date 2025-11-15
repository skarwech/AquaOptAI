import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, TrendingUp, FileText, Activity, Settings, AlertTriangle } from 'lucide-react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onNavigate: (screen: string) => void;
}

export default function SearchBar({ isOpen, onClose, darkMode, onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const recentSearches = [
    'Pump efficiency metrics',
    'Energy consumption report',
    'Storm surge event 2024-11',
    'OPC UA configuration',
  ];

  const quickActions = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Activity, screen: 'dashboard' },
    { id: 'forecast', label: 'Forecast Agent', icon: TrendingUp, screen: 'forecast' },
    { id: 'reports', label: 'Energy Reports', icon: FileText, screen: 'reports' },
    { id: 'settings', label: 'System Settings', icon: Settings, screen: 'settings' },
  ];

  const searchResults = [
    { title: 'Pump P1 Performance', category: 'Pump Details', screen: 'pump-details', icon: Activity },
    { title: 'Energy Savings Report', category: 'Reports', screen: 'reports', icon: FileText },
    { title: 'Forecast Accuracy', category: 'Forecast Agent', screen: 'forecast', icon: TrendingUp },
    { title: 'System Alerts', category: 'Dashboard', screen: 'dashboard', icon: AlertTriangle },
    { title: 'OPC UA Integration', category: 'Settings', screen: 'settings', icon: Settings },
  ];

  const filteredResults = query
    ? searchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleResultClick = (screen: string) => {
    onNavigate(screen);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-hidden ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Search className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for screens, reports, pumps, settings..."
                autoFocus
                className={`flex-1 bg-transparent border-none outline-none ${
                  darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query && filteredResults.length > 0 && (
              <div className="p-2">
                <p className={`px-3 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Search Results
                </p>
                {filteredResults.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.screen)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {result.title}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {result.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {query && filteredResults.length === 0 && (
              <div className="p-8 text-center">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No results found for "{query}"
                </p>
              </div>
            )}

            {!query && (
              <>
                {/* Quick Actions */}
                <div className="p-2">
                  <p className={`px-3 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleResultClick(action.screen)}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-gray-700 bg-gray-750' : 'hover:bg-gray-100 bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-blue-500" />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {action.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Searches */}
                <div className="p-2 border-t border-gray-700">
                  <p className={`px-3 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Recent Searches
                  </p>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>↑</kbd>
                <kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Enter</kbd>
                <span>Select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Esc</kbd>
                <span>Close</span>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
