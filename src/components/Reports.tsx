import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Calendar, TrendingDown, Zap, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ReportsProps {
  darkMode: boolean;
}

export default function Reports({ darkMode }: ReportsProps) {
  const [timeRange, setTimeRange] = useState('week');

  const dailySavings = [
    { day: 'Mon', historical: 3450, optimized: 2256, savings: 1194 },
    { day: 'Tue', historical: 3280, optimized: 2145, savings: 1135 },
    { day: 'Wed', historical: 3890, optimized: 2567, savings: 1323 },
    { day: 'Thu', historical: 3120, optimized: 2034, savings: 1086 },
    { day: 'Fri', historical: 3650, optimized: 2389, savings: 1261 },
    { day: 'Sat', historical: 2890, optimized: 1956, savings: 934 },
    { day: 'Sun', historical: 2780, optimized: 1823, savings: 957 },
  ];

  const costBreakdown = [
    { name: 'Peak Hours', value: 1234, color: '#ef4444' },
    { name: 'Normal Hours', value: 2345, color: '#f59e0b' },
    { name: 'Off-Peak Hours', value: 3456, color: '#10b981' },
  ];

  const savingsTrend = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    savings: 30 + Math.random() * 15,
  }));

  const kpis = [
    { label: 'Total Savings (7 days)', value: '€8,890', change: '+12%', icon: TrendingDown, color: 'green' },
    { label: 'Energy Reduction', value: '34.5%', change: '+2.1%', icon: Zap, color: 'blue' },
    { label: 'Avg. Daily Savings', value: '€1,270', change: '+8%', icon: Award, color: 'purple' },
    { label: 'Constraint Compliance', value: '99.2%', change: '+0.5%', icon: Award, color: 'orange' },
  ];

  const judgingMetrics = [
    { criterion: 'Applicability', score: '85%', detail: 'OPC UA integration, 90% infrastructure compatible' },
    { criterion: 'Scalability', score: '92%', detail: 'Multi-site deployment ready, cloud-based agents' },
    { criterion: 'Environmental Impact', score: '88%', detail: '34.5% energy reduction, CO₂ savings tracked' },
    { criterion: 'Economic Impact', score: '91%', detail: '€1,270/day average savings, ROI < 6 months' },
    { criterion: 'Innovation', score: '95%', detail: 'Multi-agent AI, Digital Twin, self-optimization' },
  ];

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl mb-2">Energy Savings Reports</h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Performance metrics and impact analysis
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${kpi.color}-500/10`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-500`} />
                </div>
                <span className="text-green-500 text-sm">{kpi.change}</span>
              </div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {kpi.label}
              </p>
              <p className="text-2xl">{kpi.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Daily Savings Chart */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Daily Cost Comparison (7 days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailySavings}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="day" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} label={{ value: '€', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="historical" fill="#6b7280" name="Historical" radius={[4, 4, 0, 0]} />
            <Bar dataKey="optimized" fill="#10b981" name="AI Optimized" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-green-500 text-xl">
            Total Weekly Savings: €8,890 · 35% avg reduction
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cost Breakdown Pie */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg mb-4">Cost Distribution by Time Period</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={costBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {costBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {costBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm">€{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Trend */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg mb-4">Savings % Trend (30 days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={savingsTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="day" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} domain={[0, 50]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Judging Criteria Metrics */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className="text-lg mb-4">Junction 2025 Challenge Metrics</h3>
        <div className="space-y-4">
          {judgingMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg">{metric.criterion}</h4>
                <span className="text-2xl text-green-500">{metric.score}</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {metric.detail}
              </p>
              <div className={`mt-3 w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: metric.score }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-green-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
