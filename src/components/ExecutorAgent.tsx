import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Play, Pause, SkipForward, AlertTriangle, Power } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExecutorAgentProps {
  darkMode: boolean;
}

export default function ExecutorAgent({ darkMode }: ExecutorAgentProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [tunnelLevel, setTunnelLevel] = useState(4.2);
  const [showOverride, setShowOverride] = useState(false);

  const executionData = Array.from({ length: 24 }, (_, i) => ({
    time: i,
    level: 4.2 + Math.sin(i / 4) * 1.5,
    target: 4.0,
  }));

  const pumps = [
    { id: 'S1', name: 'Small 1', active: true, freq: 50.0, target: 50.0 },
    { id: 'S3', name: 'Small 3', active: true, freq: 48.5, target: 48.5 },
    { id: 'L1', name: 'Large 1', active: true, freq: 49.2, target: 50.0 },
    { id: 'L2', name: 'Large 2', active: true, freq: 50.0, target: 50.0 },
  ];

  useEffect(() => {
    if (isExecuting) {
      const interval = setInterval(() => {
        setCurrentTime(t => (t + 1) % 24);
        setTunnelLevel(l => l + (Math.random() - 0.5) * 0.1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isExecuting]);

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl">Executor Agent</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Physics-based plan execution
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExecuting(!isExecuting)}
            className={`flex items-center gap-2 px-4 py-2 ${
              isExecuting ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            } text-white rounded-lg transition-colors`}
          >
            {isExecuting ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isExecuting ? 'Pause' : 'Execute Plan'}</span>
          </button>
          <button
            onClick={() => setShowOverride(!showOverride)}
            className={`flex items-center gap-2 px-4 py-2 border ${
              darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
            } rounded-lg transition-colors`}
          >
            <Power className="w-5 h-5" />
            <span>Override</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${
          isExecuting ? 'bg-green-500/10 border-green-500' : 'bg-blue-500/10 border-blue-500'
        } border rounded-xl p-4 mb-6`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isExecuting ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} />
          <span className={isExecuting ? 'text-green-500' : 'text-blue-500'}>
            {isExecuting ? 'Executing plan · Real-time control active' : 'Standby · Awaiting plan execution'}
          </span>
        </div>
      </motion.div>

      {/* Digital Twin Visualization */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Digital Twin - Tunnel Cross-Section</h3>
        
        {/* Tunnel Animation */}
        <div className="relative h-64 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg overflow-hidden">
          {/* Water Level */}
          <motion.div
            animate={{ height: `${(tunnelLevel / 8) * 100}%` }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 opacity-70"
          />
          
          {/* Level indicator */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
            <motion.div
              animate={{ bottom: `${(tunnelLevel / 8) * 100}%` }}
              className="absolute left-4 bg-white px-3 py-1 rounded-lg shadow-lg"
            >
              <span className="text-gray-900">{tunnelLevel.toFixed(2)}m</span>
            </motion.div>
          </div>

          {/* Pumps visualization */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around p-4">
            {pumps.filter(p => p.active).map((pump, index) => (
              <motion.div
                key={pump.id}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Power className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </div>

          {/* Scale markers */}
          <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-4 text-white text-xs">
            {[8, 6, 4, 2, 0].map(mark => (
              <div key={mark} className="flex items-center gap-2">
                <span>{mark}m</span>
                <div className="w-2 h-px bg-white/50" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Current Level</p>
            <p className="text-xl">{tunnelLevel.toFixed(2)}m</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Volume</p>
            <p className="text-xl">{((tunnelLevel / 8) * 225850).toFixed(0)} m³</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Inflow</p>
            <p className="text-xl">10,234 m³/h</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Outflow</p>
            <p className="text-xl">9,876 m³/h</p>
          </div>
        </div>
      </div>

      {/* Level Trajectory */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Level Trajectory (24h simulation)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={executionData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="time" stroke={darkMode ? '#9ca3af' : '#6b7280'} label={{ value: 'Hours', position: 'insideBottom', offset: -5 }} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} domain={[0, 8]} label={{ value: 'Level (m)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={2} name="Predicted Level" />
            <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target Level" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pump Control Status */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Pump Control Status</h3>
        <div className="space-y-3">
          {pumps.map((pump, index) => (
            <motion.div
              key={pump.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                pump.active
                  ? darkMode
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-green-500 bg-green-50'
                  : darkMode
                  ? 'border-gray-600 bg-gray-700/50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${pump.active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span>{pump.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Current</p>
                    <p>{pump.freq} Hz</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Target</p>
                    <p>{pump.target} Hz</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={pump.active ? 'text-green-500' : 'text-gray-500'}>
                      {pump.active ? 'Active' : 'Standby'}
                    </p>
                  </div>
                </div>
              </div>
              {pump.active && Math.abs(pump.freq - pump.target) > 0.5 && (
                <div className="mt-3 text-sm text-orange-500 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Ramping to target frequency...</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Override Panel */}
      <AnimatePresence>
        {showOverride && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg">Manual Override Controls</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pumps.map(pump => (
                <div key={pump.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className="mb-2">{pump.name}</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                      Stop
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      step="0.5"
                      defaultValue={pump.freq}
                      className={`flex-1 px-3 py-1 rounded border ${
                        darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                      }`}
                    />
                    <span className="text-sm">Hz</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500 rounded-lg">
              <p className="text-sm text-orange-500">
                ⚠️ Manual overrides will pause AI control. Use with caution.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
