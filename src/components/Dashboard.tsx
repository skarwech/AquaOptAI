import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, TrendingUp, Droplets, Gauge, AlertCircle, CloudRain, Zap, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DashboardProps {
  darkMode: boolean;
}

export default function Dashboard({ darkMode }: DashboardProps) {
  const [currentL1, setCurrentL1] = useState(4.2);
  const [currentVolume, setCurrentVolume] = useState(156800);
  const [savingsPercent, setSavingsPercent] = useState(34.5);

  // Generate mock time series data
  const flowData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    F1: 8000 + Math.random() * 4000 + (i > 18 || i < 6 ? 2000 : 0),
    F2: 9000 + Math.random() * 3000,
  }));

  const priceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: 50 + Math.random() * 40 + (i > 8 && i < 17 ? 30 : 0),
  }));

  const cards = [
    {
      title: 'Tunnel Level (L1)',
      value: `${currentL1.toFixed(2)}m`,
      max: '8.00m',
      icon: Gauge,
      color: 'blue',
      trend: -0.3,
      percentage: (currentL1 / 8) * 100,
    },
    {
      title: 'Storage Volume (V)',
      value: `${(currentVolume / 1000).toFixed(1)}k m³`,
      max: '225.8k m³',
      icon: Droplets,
      color: 'cyan',
      trend: 0.2,
      percentage: (currentVolume / 225850) * 100,
    },
    {
      title: 'Energy Savings',
      value: `${savingsPercent}%`,
      subtitle: 'vs baseline',
      icon: TrendingDown,
      color: 'green',
      trend: 2.1,
      savings: '€1,243 today',
    },
    {
      title: 'Current Power',
      value: '847 kW',
      subtitle: '4 pumps active',
      icon: Zap,
      color: 'orange',
      trend: -1.5,
      percentage: 65,
    },
  ];

  const alerts = [
    {
      type: 'info',
      icon: CloudRain,
      message: 'Rain event detected - AI adjusting outflow strategy',
      time: '5 min ago',
    },
    {
      type: 'success',
      icon: TrendingDown,
      message: 'Shifted 12,000 m³ to low-price period - saved €156',
      time: '45 min ago',
    },
  ];

  const pumpStatus = [
    { id: 'S1', name: 'Small Pump 1', status: 'active', freq: 50.0, power: 110 },
    { id: 'S2', name: 'Small Pump 2', status: 'standby', freq: 0, power: 0 },
    { id: 'S3', name: 'Small Pump 3', status: 'active', freq: 48.5, power: 105 },
    { id: 'S4', name: 'Small Pump 4', status: 'standby', freq: 0, power: 0 },
    { id: 'L1', name: 'Large Pump 1', status: 'active', freq: 49.2, power: 315 },
    { id: 'L2', name: 'Large Pump 2', status: 'active', freq: 50.0, power: 317 },
    { id: 'L3', name: 'Large Pump 3', status: 'standby', freq: 0, power: 0 },
    { id: 'L4', name: 'Large Pump 4', status: 'standby', freq: 0, power: 0 },
  ];

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-2">Dashboard</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Blominmäki WWTP · Real-time Operations
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl p-4 md:p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${card.color}-500/10`}>
                  <Icon className={`w-6 h-6 text-${card.color}-500`} />
                </div>
                {card.trend && (
                  <div className={`flex items-center gap-1 text-sm ${card.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {card.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{Math.abs(card.trend)}%</span>
                  </div>
                )}
              </div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {card.title}
              </p>
              <p className="text-2xl md:text-3xl mb-1">{card.value}</p>
              {card.max && (
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Max: {card.max}
                </p>
              )}
              {card.subtitle && (
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {card.subtitle}
                </p>
              )}
              {card.savings && (
                <p className="text-sm text-green-500 mt-2">{card.savings}</p>
              )}
              {card.percentage !== undefined && (
                <div className="mt-3">
                  <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${card.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-${card.color}-500`}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Flow Chart */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg mb-4">Inflow & Outflow (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={flowData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="time" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Area type="monotone" dataKey="F1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Inflow (F1)" />
              <Area type="monotone" dataKey="F2" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Outflow (F2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Price Chart */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg mb-4">Energy Prices (€/MWh)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="time" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Area type="monotone" dataKey="price" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Price" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts & Pump Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {alert.time}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pump Status */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg mb-4">Pump Status</h3>
          <div className="grid grid-cols-2 gap-3">
            {pumpStatus.map((pump, index) => (
              <motion.div
                key={pump.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg border ${
                  pump.status === 'active'
                    ? darkMode
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-green-500 bg-green-50'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700/50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{pump.name}</span>
                  <div className={`w-2 h-2 rounded-full ${pump.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <p className="text-xs text-gray-500">
                  {pump.status === 'active' ? `${pump.freq} Hz · ${pump.power}kW` : 'Standby'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
