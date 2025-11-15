import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, CheckCircle, Info, TrendingUp, Activity, Zap, Bell } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  time: string;
  icon: any;
  unread: boolean;
}

export default function NotificationPanel({ isOpen, onClose, darkMode }: NotificationPanelProps) {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High Inflow Detected',
      message: 'Forecast Agent predicts inflow spike to 12,500 m³/h in next 4 hours. Prepare surge capacity.',
      time: '5 min ago',
      icon: AlertTriangle,
      unread: true,
    },
    {
      id: '2',
      type: 'success',
      title: 'Energy Optimization Complete',
      message: 'Planner Agent achieved 34.5% energy savings for today. €1,270 cost reduction confirmed.',
      time: '15 min ago',
      icon: CheckCircle,
      unread: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Pump P2 Maintenance Due',
      message: 'Scheduled maintenance window: Nov 18, 2025, 02:00-06:00. Digital Twin simulation ready.',
      time: '1 hour ago',
      icon: Activity,
      unread: true,
    },
    {
      id: '4',
      type: 'alert',
      title: 'Storm Event Incoming',
      message: 'Weather forecast shows 25mm rainfall expected. System preparing for surge management.',
      time: '2 hours ago',
      icon: TrendingUp,
      unread: false,
    },
    {
      id: '5',
      type: 'success',
      title: 'OPC UA Connection Stable',
      message: 'All 15 data points streaming successfully. Latency: 85ms, Uptime: 99.8%',
      time: '3 hours ago',
      icon: CheckCircle,
      unread: false,
    },
    {
      id: '6',
      type: 'info',
      title: 'Price Forecast Updated',
      message: 'Low-price period identified: 22:00-06:00 tomorrow. Optimal pumping window scheduled.',
      time: '4 hours ago',
      icon: Zap,
      unread: false,
    },
    {
      id: '7',
      type: 'success',
      title: 'Executor Agent: Task Complete',
      message: 'Digital Twin simulation completed 500 iterations. Optimal control strategy deployed.',
      time: '5 hours ago',
      icon: CheckCircle,
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: darkMode ? 'bg-green-500/10' : 'bg-green-50',
          text: 'text-green-500',
          border: 'border-green-500/20',
        };
      case 'warning':
        return {
          bg: darkMode ? 'bg-yellow-500/10' : 'bg-yellow-50',
          text: 'text-yellow-500',
          border: 'border-yellow-500/20',
        };
      case 'info':
        return {
          bg: darkMode ? 'bg-blue-500/10' : 'bg-blue-50',
          text: 'text-blue-500',
          border: 'border-blue-500/20',
        };
      case 'alert':
        return {
          bg: darkMode ? 'bg-red-500/10' : 'bg-red-50',
          text: 'text-red-500',
          border: 'border-red-500/20',
        };
      default:
        return {
          bg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
          text: darkMode ? 'text-gray-400' : 'text-gray-500',
          border: 'border-gray-500/20',
        };
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-16 bottom-0 w-full max-w-md shadow-2xl border-l z-50 flex flex-col ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4">
            <button
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                darkMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              All
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alerts
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const styles = getTypeStyles(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border-b transition-colors cursor-pointer ${
                  darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'
                } ${notification.unread ? styles.bg : ''}`}
              >
                <div className="flex gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${styles.bg} ${styles.border}`}
                  >
                    <Icon className={`w-5 h-5 ${styles.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={`text-sm ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        } ${notification.unread ? '' : ''}`}
                      >
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p
                      className={`text-sm mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            className={`w-full py-2 rounded-lg text-sm transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Mark All as Read
          </button>
        </div>
      </motion.div>
    </>
  );
}
