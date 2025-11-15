import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Upload, Download, SkipBack, SkipForward, Pause } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SimulationsProps {
  darkMode: boolean;
}

export default function Simulations({ darkMode }: SimulationsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [scenario, setScenario] = useState('historical');

  // Generate comparison data
  const comparisonData = Array.from({ length: 48 }, (_, i) => ({
    hour: i,
    historical: 3500 + Math.random() * 1000 + (i > 8 && i < 17 ? 1200 : 0),
    aiOptimized: 2800 + Math.random() * 800 + (i < 6 || i > 22 ? 800 : 200),
    savings: 0,
  })).map(d => ({
    ...d,
    savings: Math.max(0, d.historical - d.aiOptimized),
  }));

  const levelData = Array.from({ length: 48 }, (_, i) => ({
    hour: i,
    historical: 4.5 + Math.sin(i / 6) * 1.2,
    aiOptimized: 4.0 + Math.sin(i / 8) * 0.8,
  }));

  const scenarios = [
    { id: 'historical', name: 'Historical Replay', date: '2024-11-10', savings: 0 },
    { id: 'normal', name: 'Normal Conditions', date: '2024-11-15', savings: 34 },
    { id: 'storm', name: 'Storm Event', date: '2024-10-25', savings: 28 },
    { id: 'peak', name: 'Peak Prices', date: '2024-11-01', savings: 42 },
  ];

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-2">Digital Twin Simulations</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Offline historical replay and scenario testing
        </p>
      </div>

      {/* Control Panel */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h3 className="text-lg">Simulation Controls</h3>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 border ${
                darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              } rounded-lg transition-colors`}
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">Load Data</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border ${
                darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              } rounded-lg transition-colors`}
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`p-3 rounded-lg border-2 transition-colors text-left ${
                scenario === s.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <p className="text-sm mb-1">{s.name}</p>
              <p className="text-xs text-gray-500">{s.date}</p>
              {s.savings > 0 && (
                <p className="text-xs text-green-500 mt-1">+{s.savings}% savings</p>
              )}
            </button>
          ))}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(47, currentStep + 1))}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="47"
              value={currentStep}
              onChange={(e) => setCurrentStep(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <span className="text-sm whitespace-nowrap">
            Hour {currentStep} / 48
          </span>
        </div>
      </div>

      {/* Cost Comparison Chart */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Cost Comparison: Historical vs AI-Optimized</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis
              dataKey="hour"
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'Hours', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: '€/h', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#6b7280"
              strokeWidth={2}
              name="Historical"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="aiOptimized"
              stroke="#10b981"
              strokeWidth={2}
              name="AI Optimized"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-green-500 text-xl">
            Total Savings: €1,456 (34% reduction over 48h)
          </p>
        </div>
      </div>

      {/* Level Comparison */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Tunnel Level Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={levelData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis
              dataKey="hour"
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'Hours', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              domain={[0, 8]}
              label={{ value: 'Level (m)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#6b7280"
              strokeWidth={2}
              name="Historical"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="aiOptimized"
              stroke="#3b82f6"
              strokeWidth={2}
              name="AI Optimized"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Simulation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Energy Saved
          </p>
          <p className="text-2xl mb-1">1,456 kWh</p>
          <p className="text-sm text-green-500">34% reduction</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Cost Saved
          </p>
          <p className="text-2xl mb-1">€1,456</p>
          <p className="text-sm text-green-500">vs historical</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Constraint Compliance
          </p>
          <p className="text-2xl mb-1">100%</p>
          <p className="text-sm text-green-500">All met</p>
        </motion.div>
      </div>
    </div>
  );
}
