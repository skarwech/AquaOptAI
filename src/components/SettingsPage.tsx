import { useState } from 'react';
import { motion } from 'motion/react';
import { Server, Database, Bell, Shield, Moon, Sun, CheckCircle, AlertCircle } from 'lucide-react';

interface SettingsPageProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

export default function SettingsPage({ darkMode, onThemeToggle }: SettingsPageProps) {
  const [opcuaConnected, setOpcuaConnected] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-2">Settings</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Configure system preferences and integrations
        </p>
      </div>

      {/* Appearance */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <h3 className="text-lg">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>Dark Mode</p>
            <p className="text-sm text-gray-500">Toggle dark/light theme</p>
          </div>
          <button
            onClick={onThemeToggle}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <motion.div
              animate={{ x: darkMode ? 28 : 2 }}
              className="absolute top-1 w-5 h-5 bg-white rounded-full"
            />
          </button>
        </div>
      </div>

      {/* OPC UA Configuration */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <Server className="w-5 h-5 text-cyan-500" />
          <h3 className="text-lg">OPC UA Connection</h3>
        </div>
        
        <div className={`flex items-center gap-3 p-3 rounded-lg mb-4 ${
          opcuaConnected
            ? 'bg-green-500/10 border border-green-500'
            : 'bg-red-500/10 border border-red-500'
        }`}>
          {opcuaConnected ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className={opcuaConnected ? 'text-green-500' : 'text-red-500'}>
            {opcuaConnected ? 'Connected to OPC UA Server' : 'Disconnected'}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Server URL
            </label>
            <input
              type="text"
              defaultValue="opc.tcp://localhost:4840"
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Namespace
            </label>
            <input
              type="text"
              defaultValue="ns=2;s=HSY.Blominmäki"
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setOpcuaConnected(!opcuaConnected)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {opcuaConnected ? 'Reconnect' : 'Connect'}
            </button>
            <button
              className={`px-4 py-2 border rounded-lg ${
                darkMode
                  ? 'border-gray-600 hover:bg-gray-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Test Connection
            </button>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg">Data Sources</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>HSY Sensor Data</p>
              <p className="text-sm text-gray-500">PCS Controller via OPC UA</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-green-500">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p>DNA Weather API</p>
              <p className="text-sm text-gray-500">Rain forecasts</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-green-500">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p>Energy Prices API</p>
              <p className="text-sm text-gray-500">15-min spot prices</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Alert Notifications', desc: 'Constraint violations and warnings' },
            { label: 'Daily Reports', desc: 'Energy savings summary' },
            { label: 'System Updates', desc: 'Agent status changes' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p>{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: notifications ? 28 : 2 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg">Security & Privacy</h3>
        </div>
        <div className="space-y-3">
          <button
            className={`w-full text-left px-4 py-3 rounded-lg border ${
              darkMode
                ? 'border-gray-600 hover:bg-gray-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Change Password
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg border ${
              darkMode
                ? 'border-gray-600 hover:bg-gray-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Two-Factor Authentication
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg border ${
              darkMode
                ? 'border-gray-600 hover:bg-gray-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Export Data (GDPR)
          </button>
        </div>
      </div>
    </div>
  );
}
