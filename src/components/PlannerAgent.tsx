import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, CheckCircle, XCircle, PlayCircle, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PlannerAgentProps {
  darkMode: boolean;
}

export default function PlannerAgent({ darkMode }: PlannerAgentProps) {
  const [priceScenario, setPriceScenario] = useState('normal');
  const [planStatus, setPlanStatus] = useState<'idle' | 'optimizing' | 'ready'>('ready');

  // Generate pump schedule data (Gantt-style)
  const scheduleData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    small1: i >= 6 && i < 22 ? 50 : 0,
    small3: i >= 8 && i < 20 ? 48.5 : 0,
    large1: i >= 0 && i < 6 || i >= 22 ? 49 : 0,
    large2: i >= 0 && i < 6 || i >= 22 ? 50 : 0,
    price: 60 + Math.random() * 30 + (i > 8 && i < 17 ? 25 : 0),
  }));

  const costComparison = [
    { strategy: 'Historical', cost: 3450, savings: 0 },
    { strategy: 'Constant Flow', cost: 2890, savings: 16 },
    { strategy: 'AI Optimized', cost: 2256, savings: 35 },
  ];

  const handleOptimize = () => {
    setPlanStatus('optimizing');
    setTimeout(() => setPlanStatus('ready'), 2000);
  };

  const handleApprove = () => {
    alert('Plan approved and sent to Executor Agent!');
  };

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl">Planner Agent</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              MILP-based schedule optimization
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOptimize}
            disabled={planStatus === 'optimizing'}
            className={`flex items-center gap-2 px-4 py-2 border ${
              darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
            } rounded-lg transition-colors ${
              planStatus === 'optimizing' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Settings className={`w-5 h-5 ${planStatus === 'optimizing' ? 'animate-spin' : ''}`} />
            <span>Re-optimize</span>
          </button>
          <button
            onClick={handleApprove}
            disabled={planStatus !== 'ready'}
            className={`flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors ${
              planStatus !== 'ready' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Approve Plan</span>
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Optimization Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Price Scenario
            </label>
            <select
              value={priceScenario}
              onChange={(e) => setPriceScenario(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="low">Low Volatility</option>
              <option value="normal">Normal</option>
              <option value="high">High Volatility</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Constraint Mode
            </label>
            <select
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option>Standard (2h cycles)</option>
              <option>Relaxed (1h cycles)</option>
              <option>Strict (3h cycles)</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Horizon
            </label>
            <select
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option>24 hours</option>
              <option>48 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Cost Comparison (24h)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={costComparison} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis type="number" stroke={darkMode ? '#9ca3af' : '#6b7280'} label={{ value: '€', position: 'insideBottom', offset: -5 }} />
            <YAxis type="category" dataKey="strategy" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="cost" radius={[0, 8, 8, 0]}>
              {costComparison.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : index === 1 ? '#f59e0b' : '#6b7280'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-green-500 text-xl">
            €1,194 saved · 35% reduction vs historical
          </p>
        </div>
      </div>

      {/* Pump Schedule Gantt */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Optimized Pump Schedule (24h)</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="flex gap-1 mb-2">
              <div className="w-24" />
              <div className="flex-1 grid" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="text-center text-xs text-gray-500">
                    {i}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pump rows */}
            {['Small 1', 'Small 3', 'Large 1', 'Large 2'].map((pump, pumpIndex) => (
              <div key={pump} className="flex gap-1 mb-2">
                <div className="w-24 text-sm py-2">{pump}</div>
                <div className="flex-1 grid" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
                  {scheduleData.map((hour, hourIndex) => {
                    const key = ['small1', 'small3', 'large1', 'large2'][pumpIndex] as keyof typeof hour;
                    const freq = hour[key] as number;
                    const isActive = freq > 0;
                    return (
                      <div
                        key={hourIndex}
                        className={`h-8 rounded ${
                          isActive
                            ? 'bg-green-500'
                            : darkMode
                            ? 'bg-gray-700'
                            : 'bg-gray-200'
                        } flex items-center justify-center`}
                      >
                        {isActive && <span className="text-[10px] text-white">{freq}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Price indicator */}
            <div className="flex gap-1 mt-4">
              <div className="w-24 text-sm py-2">Price</div>
              <div className="flex-1 grid" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
                {scheduleData.map((hour, hourIndex) => {
                  const priceLevel = hour.price < 70 ? 'low' : hour.price < 85 ? 'medium' : 'high';
                  return (
                    <div
                      key={hourIndex}
                      className={`h-4 rounded ${
                        priceLevel === 'low'
                          ? 'bg-green-500'
                          : priceLevel === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>Low price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span>Medium price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span>High price</span>
          </div>
        </div>
      </div>

      {/* Constraints Check */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className="text-lg mb-4">Constraint Validation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Constant outflow maintained', status: true },
            { name: 'Storage limits respected', status: true },
            { name: 'Pump cycles ≥ 2h', status: true },
            { name: 'Min frequency ≥ 47.5 Hz', status: true },
            { name: 'Daily emptying scheduled', status: true },
            { name: 'Surge capacity available', status: true },
          ].map((constraint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3"
            >
              {constraint.status ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <span>{constraint.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}