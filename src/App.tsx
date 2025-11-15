import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Brain, Play, FileText, Settings, Menu, X, Moon, Sun, Bell, Search, User, AlertTriangle, CheckCircle, Info, XCircle as XIcon, Activity, Droplets } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ForecastAgent from './components/ForecastAgent';
import PlannerAgent from './components/PlannerAgent';
import ExecutorAgent from './components/ExecutorAgent';
import SupervisorAgent from './components/SupervisorAgent';
import Simulations from './components/Simulations';
import Reports from './components/Reports';
import PumpDetails from './components/PumpDetails';
import SystemOverview from './components/SystemOverview';
import SettingsPage from './components/SettingsPage';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import ChatAssistant from './components/ChatAssistant';
import FavIcon from './FavIcon';
import ProfileMenu from './components/ProfileMenu';
import SearchBar from './components/SearchBar';
import NotificationPanel from './components/NotificationPanel';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'forecast', label: 'Forecast', icon: Brain },
    { id: 'planner', label: 'Planner', icon: Brain },
    { id: 'executor', label: 'Executor', icon: Brain },
    { id: 'supervisor', label: 'Supervisor', icon: Brain },
    { id: 'simulations', label: 'Simulations', icon: Play },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'pump-details', label: 'Pump Details', icon: Activity },
    { id: 'system', label: 'System Overview', icon: Menu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard darkMode={darkMode} />;
      case 'forecast':
        return <ForecastAgent darkMode={darkMode} />;
      case 'planner':
        return <PlannerAgent darkMode={darkMode} />;
      case 'executor':
        return <ExecutorAgent darkMode={darkMode} />;
      case 'supervisor':
        return <SupervisorAgent darkMode={darkMode} />;
      case 'simulations':
        return <Simulations darkMode={darkMode} />;
      case 'reports':
        return <Reports darkMode={darkMode} />;
      case 'pump-details':
        return <PumpDetails darkMode={darkMode} />;
      case 'system':
        return <SystemOverview darkMode={darkMode} />;
      case 'settings':
        return <SettingsPage darkMode={darkMode} onThemeToggle={() => setDarkMode(!darkMode)} />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <FavIcon />
      {/* Top Bar */}
      <header className={`fixed top-0 left-0 right-0 h-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b z-50 flex items-center justify-between px-4`}>
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <span className={`${darkMode ? 'text-white' : 'text-gray-900'} hidden sm:block`}>AquaOpt AI</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSearchBar(!showSearchBar)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} hidden sm:block`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      {!isMobile && (
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 240 : 80 }}
          className={`fixed left-0 top-16 bottom-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r overflow-hidden z-40`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    activeScreen === item.id
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </motion.aside>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 top-16"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                className={`fixed left-0 top-16 bottom-16 w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} z-50 overflow-y-auto`}
              >
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveScreen(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                          activeScreen === item.id
                            ? 'bg-blue-500 text-white'
                            : darkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          !isMobile && sidebarOpen ? 'ml-60' : !isMobile ? 'ml-20' : ''
        } ${isMobile ? 'pb-16' : ''}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - Mobile */}
      {isMobile && (
        <nav className={`fixed bottom-0 left-0 right-0 h-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t z-50 flex items-center justify-around px-2`}>
          {[
            { id: 'dashboard', icon: Home },
            { id: 'forecast', icon: Brain },
            { id: 'simulations', icon: Play },
            { id: 'reports', icon: FileText },
            { id: 'settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg ${
                  activeScreen === item.id
                    ? 'text-blue-500'
                    : darkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Chat Assistant */}
      <ChatAssistant darkMode={darkMode} />

      {/* Profile Menu */}
      {showProfileMenu && (
        <ProfileMenu
          isOpen={showProfileMenu}
          darkMode={darkMode}
          onClose={() => setShowProfileMenu(false)}
          onThemeToggle={() => setDarkMode(!darkMode)}
          onLogout={() => {
            setIsLoggedIn(false);
            setShowProfileMenu(false);
          }}
        />
      )}

      {/* Search Bar */}
      {showSearchBar && (
        <SearchBar
          isOpen={showSearchBar}
          darkMode={darkMode}
          onClose={() => setShowSearchBar(false)}
          onNavigate={(screen) => {
            setActiveScreen(screen);
            setShowSearchBar(false);
          }}
        />
      )}

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          isOpen={showNotifications}
          darkMode={darkMode}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}