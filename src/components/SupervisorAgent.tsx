import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Network, CheckCircle, Activity, TrendingUp, Database } from 'lucide-react';

interface SupervisorAgentProps {
  darkMode: boolean;
}

export default function SupervisorAgent({ darkMode }: SupervisorAgentProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    { id: 'forecast', name: 'Forecast', status: 'active', color: 'blue', lastUpdate: '30s ago' },
    { id: 'planner', name: 'Planner', status: 'active', color: 'purple', lastUpdate: '2m ago' },
    { id: 'executor', name: 'Executor', status: 'active', color: 'green', lastUpdate: '5s ago' },
  ];

  const aggregates = [
    { metric: 'Total Power', value: '847 kW', min: '245', max: '1,234', avg: '756', unit: 'kW' },
    { metric: 'Outflow (F2)', value: '9,876 m³/h', min: '8,450', max: '15,890', avg: '10,234', unit: 'm³/h' },
    { metric: 'Inflow (F1)', value: '10,234 m³/h', min: '7,890', max: '16,780', avg: '11,045', unit: 'm³/h' },
    { metric: 'Energy Cost', value: '€3.21/h', min: '€1.89', max: '€5.67', avg: '€3.45', unit: '/h' },
  ];

  const communications = [
    { from: 'Forecast', to: 'Planner', message: 'Rain event predicted in 14h - high inflow expected', time: '2m ago', type: 'warning' },
    { from: 'Planner', to: 'Executor', message: 'New optimized schedule ready for execution', time: '5m ago', type: 'success' },
    { from: 'Executor', to: 'Supervisor', message: 'Plan execution at 98% accuracy - minor deviation detected', time: '1m ago', type: 'info' },
    { from: 'Supervisor', to: 'All', message: 'Daily emptying cycle completed successfully', time: '30m ago', type: 'success' },
  ];

  const constraints = [
    { name: 'Constant outflow maintained', status: true, value: '9,876 m³/h ±2%' },
    { name: 'Storage within limits', status: true, value: '4.2m / 8.0m (52%)' },
    { name: 'Pump start/stop ≥ 2h', status: true, value: 'All compliant' },
    { name: 'Min frequency ≥ 47.5 Hz', status: true, value: 'All compliant' },
    { name: 'Daily emptying scheduled', status: true, value: 'Next in 14h' },
    { name: 'Surge capacity available', status: true, value: '48% reserve' },
  ];

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl">Supervisor Agent</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Multi-agent coordination & monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedAgent(agent.id)}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${agent.color}-500/10`}>
                <Brain className={`w-6 h-6 text-${agent.color}-500`} />
              </div>
              <div className={`flex items-center gap-2 ${
                agent.status === 'active' ? 'text-green-500' : 'text-gray-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                }`} />
                <span className="text-sm capitalize">{agent.status}</span>
              </div>
            </div>
            <h3 className="text-lg mb-2">{agent.name} Agent</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Last update: {agent.lastUpdate}
            </p>
          </motion.div>
        ))}
      </div>

      {/* System Flow Diagram */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-6">Agent Coordination Flow</h3>
        
        <div className="relative">
          {/* Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* PCS Controller */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl border-2 border-gray-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}
            >
              <Database className="w-8 h-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm">PCS Controller</p>
              <p className="text-xs text-gray-500 mt-1">OPC UA Server</p>
            </motion.div>

            {/* Forecast */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border-2 border-blue-500 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'} text-center`}
            >
              <Brain className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm">Forecast</p>
              <p className="text-xs text-gray-500 mt-1">LSTM Prediction</p>
            </motion.div>

            {/* Planner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-xl border-2 border-purple-500 ${darkMode ? 'bg-purple-500/10' : 'bg-purple-50'} text-center`}
            >
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-sm">Planner</p>
              <p className="text-xs text-gray-500 mt-1">MILP Optimizer</p>
            </motion.div>

            {/* Executor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`p-4 rounded-xl border-2 border-green-500 ${darkMode ? 'bg-green-500/10' : 'bg-green-50'} text-center`}
            >
              <Brain className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm">Executor</p>
              <p className="text-xs text-gray-500 mt-1">Physics Control</p>
            </motion.div>
          </div>

          {/* Flow arrows (simplified for mobile) */}
          <div className="mt-4 flex justify-center">
            <div className="text-gray-500 text-sm">
              PCS → Forecast → Planner → Executor → PCS
            </div>
          </div>
        </div>
      </div>

      {/* Aggregated Metrics */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Aggregated Metrics (24h rolling)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-2">Metric</th>
                <th className="text-right py-3 px-2">Current</th>
                <th className="text-right py-3 px-2">Min</th>
                <th className="text-right py-3 px-2">Max</th>
                <th className="text-right py-3 px-2">Avg</th>
              </tr>
            </thead>
            <tbody>
              {aggregates.map((agg, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <td className="py-3 px-2">{agg.metric}</td>
                  <td className="text-right py-3 px-2">{agg.value}</td>
                  <td className="text-right py-3 px-2 text-green-500">{agg.min} {agg.unit}</td>
                  <td className="text-right py-3 px-2 text-red-500">{agg.max} {agg.unit}</td>
                  <td className="text-right py-3 px-2 text-blue-500">{agg.avg} {agg.unit}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inter-Agent Communications */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Inter-Agent Communications</h3>
        <div className="space-y-3">
          {communications.map((comm, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-500">{comm.from}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-sm text-purple-500">{comm.to}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  comm.type === 'success'
                    ? 'bg-green-500/20 text-green-500'
                    : comm.type === 'warning'
                    ? 'bg-orange-500/20 text-orange-500'
                    : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {comm.type}
                </span>
              </div>
              <p className="text-sm mb-2">{comm.message}</p>
              <p className="text-xs text-gray-500">{comm.time}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Constraint Compliance */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className="text-lg mb-4">Constraint Compliance</h3>
        <div className="space-y-3">
          {constraints.map((constraint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                  constraint.status ? 'text-green-500' : 'text-red-500'
                }`} />
                <div>
                  <p>{constraint.name}</p>
                  <p className="text-sm text-gray-500">{constraint.value}</p>
                </div>
              </div>
              {constraint.status && (
                <span className="text-green-500 text-sm">✓</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
