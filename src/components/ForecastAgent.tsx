import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, CloudRain, TrendingUp, RefreshCw, Sliders } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ForecastAgentProps {
  darkMode: boolean;
}

export default function ForecastAgent({ darkMode }: ForecastAgentProps) {
  const [horizon, setHorizon] = useState(24);
  const [isForecasting, setIsForecasting] = useState(false);

  // Generate forecast data with confidence intervals
  const forecastData = Array.from({ length: horizon }, (_, i) => {
    const baseInflow = 10000 + Math.random() * 3000;
    const rainBoost = i > 12 && i < 18 ? 4000 * Math.sin((i - 12) / 6 * Math.PI) : 0;
    return {
      hour: i,
      predicted: baseInflow + rainBoost,
      upper: baseInflow + rainBoost + 1500,
      lower: Math.max(0, baseInflow + rainBoost - 1500),
      rain: i > 12 && i < 18,
    };
  });

  const priceData = Array.from({ length: horizon }, (_, i) => ({
    hour: i,
    price: 60 + Math.random() * 30 + (i > 8 && i < 17 ? 25 : 0),
  }));

  const handleRefresh = () => {
    setIsForecasting(true);
    setTimeout(() => setIsForecasting(false), 2000);
  };

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl">Forecast Agent</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              LSTM-based inflow & price prediction
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isForecasting}
          className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ${
            isForecasting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${isForecasting ? 'animate-spin' : ''}`} />
          <span>Re-forecast</span>
        </button>
      </div>

      {/* Horizon Control */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg">Forecast Horizon</h3>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="12"
            max="48"
            step="12"
            value={horizon}
            onChange={(e) => setHorizon(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-xl min-w-[80px] text-right">{horizon}h</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>12h</span>
          <span>24h</span>
          <span>36h</span>
          <span>48h</span>
        </div>
      </div>

      {/* Key Predictions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <div className="flex items-center gap-3 mb-2">
            <CloudRain className="w-5 h-5 text-blue-500" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Rain Event</span>
          </div>
          <p className="text-2xl mb-1">85% likely</p>
          <p className="text-sm text-gray-500">Peak in 14-16h</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Peak Inflow</span>
          </div>
          <p className="text-2xl mb-1">15,400 m³/h</p>
          <p className="text-sm text-gray-500">At 15:00 tomorrow</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Optimal Window</span>
          </div>
          <p className="text-2xl mb-1">22:00-06:00</p>
          <p className="text-sm text-gray-500">Low price period</p>
        </motion.div>
      </div>

      {/* Inflow Forecast Chart */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Inflow Forecast (F1) with Confidence Intervals</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis
              dataKey="hour"
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'Hours ahead', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'm³/h', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value.toFixed(0)} m³/h`, '']}
            />
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="#3b82f6"
              fillOpacity={0.1}
              name="Upper bound"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#3b82f6"
              fillOpacity={0.1}
              name="Lower bound"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Rain indicators */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Rain periods:</span>
          {forecastData.filter(d => d.rain).map((d, i, arr) => (
            i === 0 || d.hour !== arr[i-1].hour + 1 ? (
              <span key={d.hour} className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-sm">
                {d.hour}:00
              </span>
            ) : null
          ))}
        </div>
      </div>

      {/* Energy Price Forecast */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Energy Price Forecast (15-min intervals)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis
              dataKey="hour"
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'Hours ahead', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: '€/MWh', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.3}
              name="Price"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Model Info */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className="text-lg mb-4">Model Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Model Type</p>
            <p>LSTM Neural Network</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Training Data</p>
            <p>HSY Historical (2023-2024)</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Accuracy (MAE)</p>
            <p>±847 m³/h (12h), ±1,243 m³/h (24h)</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Updated</p>
            <p>2 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
