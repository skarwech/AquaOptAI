import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Server, Brain, Cpu, Network, Zap, Info } from 'lucide-react';

interface SystemOverviewProps {
  darkMode: boolean;
}

export default function SystemOverview({ darkMode }: SystemOverviewProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    {
      id: 'pcs',
      name: 'PCS Controller',
      icon: Database,
      color: 'gray',
      description: 'Physical control system managing pumps and sensors',
      connections: ['opcua'],
      details: [
        'Real-time sensor data: L1, V, F1, F2',
        'Pump control: Frequency, on/off',
        'Historical data logging',
        'Safety interlocks',
      ],
    },
    {
      id: 'opcua',
      name: 'OPC UA Server',
      icon: Server,
      color: 'cyan',
      description: 'Industrial protocol for data exchange and aggregation',
      connections: ['agents'],
      details: [
        'Browse server nodes',
        'Read/Write operations',
        'Min/Max/Avg aggregates',
        'Timestamp synchronization',
      ],
    },
    {
      id: 'agents',
      name: 'Multi-Agent System',
      icon: Brain,
      color: 'purple',
      description: 'AI agents coordinating for optimization',
      connections: ['forecast', 'planner', 'executor', 'supervisor'],
      details: [
        'Forecast: LSTM prediction',
        'Planner: MILP optimization',
        'Executor: Physics control',
        'Supervisor: Coordination',
      ],
    },
    {
      id: 'forecast',
      name: 'Forecast Agent',
      icon: Brain,
      color: 'blue',
      description: 'Predicts inflow, rain, and energy prices',
      connections: ['planner'],
      details: [
        'LSTM neural networks',
        'DNA weather integration',
        'Energy price API',
        '24-48h horizon',
      ],
    },
    {
      id: 'planner',
      name: 'Planner Agent',
      icon: Brain,
      color: 'purple',
      description: 'Optimizes pump schedules using MILP',
      connections: ['executor'],
      details: [
        'Mixed-integer linear programming',
        'Constraint satisfaction',
        'Cost minimization',
        'Schedule generation',
      ],
    },
    {
      id: 'executor',
      name: 'Executor Agent',
      icon: Brain,
      color: 'green',
      description: 'Executes plans with physics-based control',
      connections: ['opcua'],
      details: [
        'Digital twin simulation',
        'Real-time execution',
        'Deviation handling',
        'Safety checks',
      ],
    },
    {
      id: 'supervisor',
      name: 'Supervisor Agent',
      icon: Network,
      color: 'orange',
      description: 'Coordinates all agents and monitors system',
      connections: ['forecast', 'planner', 'executor'],
      details: [
        'Agent coordination',
        'Constraint monitoring',
        'Performance metrics',
        'Alert management',
      ],
    },
  ];

  const dataFlow = [
    { from: 'PCS Controller', to: 'OPC UA Server', label: 'Sensor Data', color: 'blue' },
    { from: 'OPC UA Server', to: 'Multi-Agent System', label: 'Aggregated Data', color: 'cyan' },
    { from: 'Forecast Agent', to: 'Planner Agent', label: 'Predictions', color: 'blue' },
    { from: 'Planner Agent', to: 'Executor Agent', label: 'Optimized Schedule', color: 'purple' },
    { from: 'Executor Agent', to: 'OPC UA Server', label: 'Control Commands', color: 'green' },
    { from: 'Supervisor Agent', to: 'All Agents', label: 'Coordination', color: 'orange' },
  ];

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-2">System Architecture</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          AquaOpt AI - Multi-agent system overview
        </p>
      </div>

      {/* Interactive Diagram */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-6">System Components</h3>
        
        <div className="space-y-8">
          {/* Layer 1: Physical */}
          <div>
            <p className="text-sm text-gray-500 mb-3">Physical Layer</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nodes.slice(0, 2).map((node) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedNode === node.id
                        ? `border-${node.color}-500 bg-${node.color}-500/10`
                        : darkMode
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-${node.color}-500/10`}>
                        <Icon className={`w-6 h-6 text-${node.color}-500`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2">{node.name}</h4>
                        <p className="text-sm text-gray-500">{node.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="text-gray-500">↓ Data Flow ↓</div>
          </div>

          {/* Layer 2: Multi-Agent Container */}
          <div>
            <p className="text-sm text-gray-500 mb-3">AI Layer</p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedNode('agents')}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all mb-4 ${
                selectedNode === 'agents'
                  ? 'border-purple-500 bg-purple-500/10'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-2">Multi-Agent System (MCP2)</h4>
                  <p className="text-sm text-gray-500">Coordinated AI agents for optimization</p>
                </div>
              </div>
              
              {/* Individual Agents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                {nodes.slice(3).map((node) => {
                  const Icon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode(node.id);
                      }}
                      className={`p-4 rounded-lg border cursor-pointer ${
                        selectedNode === node.id
                          ? `border-${node.color}-500 bg-${node.color}-500/10`
                          : darkMode
                          ? 'border-gray-700 bg-gray-700/50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 text-${node.color}-500 mb-2`} />
                      <p className="text-sm">{node.name}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Data Flow</h3>
        <div className="space-y-3">
          {dataFlow.map((flow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            >
              <span className="text-sm">{flow.from}</span>
              <div className={`flex-1 h-px bg-${flow.color}-500 relative`}>
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-${flow.color}-500`} />
              </div>
              <span className="text-sm">{flow.to}</span>
              <span className={`px-2 py-1 rounded text-xs bg-${flow.color}-500/20 text-${flow.color}-500`}>
                {flow.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg">
              {nodes.find(n => n.id === selectedNode)?.name}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {nodes.find(n => n.id === selectedNode)?.description}
          </p>
          <div className="space-y-2">
            <p className="text-sm">Key Features:</p>
            {nodes.find(n => n.id === selectedNode)?.details.map((detail, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                <span className="text-sm">{detail}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* OPC UA Integration Info */}
      <div className={`${darkMode ? 'bg-blue-500/10 border-blue-500' : 'bg-blue-50 border-blue-300'} border rounded-xl p-6 mt-6`}>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-blue-500 mb-2">OPC UA Integration Highlights</h4>
            <ul className="space-y-1 text-sm text-blue-600">
              <li>• 85% applicability across HSY infrastructure via standard OPC UA protocol</li>
              <li>• Min/Max/Avg aggregates for historical analysis and replay</li>
              <li>• Digital Twin powered by Pandas DataFrame simulation</li>
              <li>• Seamless integration with existing SCADA systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
