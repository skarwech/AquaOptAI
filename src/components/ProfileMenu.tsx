import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, HelpCircle, LogOut, Shield, Bell, Moon, Sun } from 'lucide-react';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
  onLogout: () => void;
}

export default function ProfileMenu({ isOpen, onClose, darkMode, onThemeToggle, onLogout }: ProfileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Profile Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15 }}
        className={`fixed right-4 top-16 mt-2 w-80 rounded-xl shadow-2xl border z-50 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
              <span>MK</span>
            </div>
            <div className="flex-1">
              <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Mika Korhonen</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Senior Operator
              </p>
            </div>
          </div>
          <div className={`mt-3 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              operator@blominmaki.hsy.fi
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="px-4 py-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Role</span>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Administrator</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </button>
          
          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Account Settings</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Notification Preferences</span>
          </button>

          <button
            onClick={onThemeToggle}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Footer */}
        <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center`}>
            Version 2.1.0 • Blominmäki WWTP
          </p>
        </div>
      </motion.div>
    </>
  );
}
