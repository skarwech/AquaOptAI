import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Gauge, Zap, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PumpDetailsProps {
  darkMode: boolean;
}

export default function PumpDetails({ darkMode }: PumpDetailsProps) {
  const [selectedPump, setSelectedPump] = useState<'small' | 'large'>('small');
  const [selectedCurve, setSelectedCurve] = useState<'hq' | 'efficiency' | 'power' | 'npsh'>('hq');

  // Mock pump curve data
  const hqCurveData = Array.from({ length: 20 }, (_, i) => {
    const q = i * 500;
    return {
      flow: q,
      head47: 12 - (q / 10000) * 4,
      head48: 13 - (q / 10000) * 4.2,
      head49: 14 - (q / 10000) * 4.4,
      head50: 15 - (q / 10000) * 4.6,
    };
  });

  const efficiencyCurveData = Array.from({ length: 20 }, (_, i) => {
    const h = i * 0.5;
    const peak = 10;
    return {
      head: h,
      eff47: Math.max(0, 75 - Math.abs(h - peak) * 3),
      eff48: Math.max(0, 78 - Math.abs(h - peak) * 3),
      eff49: Math.max(0, 81 - Math.abs(h - peak) * 3),
      eff50: Math.max(0, 84 - Math.abs(h - peak) * 3),
    };
  });

  const powerCurveData = Array.from({ length: 20 }, (_, i) => {
    const q = i * 500;
    return {
      flow: q,
      power47: 80 + (q / 10000) * 40,
      power48: 85 + (q / 10000) * 42,
      power49: 90 + (q / 10000) * 44,
      power50: 95 + (q / 10000) * 46,
    };
  });

  const npshCurveData = Array.from({ length: 20 }, (_, i) => {
    const q = i * 500;
    return {
      flow: q,
      npshr: 2 + (q / 10000) * 4,
    };
  });

  const smallPumpSpecs = [
    { param: 'Nominal Flow', value: '5,000 m³/h' },
    { param: 'Nominal Head', value: '12 m' },
    { param: 'Max Efficiency', value: '84%' },
    { param: 'Rated Power', value: '110 kW' },
    { param: 'Min Frequency', value: '47.5 Hz' },
    { param: 'Max Frequency', value: '50 Hz' },
  ];

  const largePumpSpecs = [
    { param: 'Nominal Flow', value: '8,000 m³/h' },
    { param: 'Nominal Head', value: '15 m' },
    { param: 'Max Efficiency', value: '86%' },
    { param: 'Rated Power', value: '320 kW' },
    { param: 'Min Frequency', value: '47.5 Hz' },
    { param: 'Max Frequency', value: '50 Hz' },
  ];

  const renderCurve = () => {
    switch (selectedCurve) {
      case 'hq':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={hqCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis
                dataKey="flow"
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Flow (m³/h)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Head (m)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="head47" stroke="#3b82f6" strokeWidth={2} name="47.5 Hz" />
              <Line type="monotone" dataKey="head48" stroke="#8b5cf6" strokeWidth={2} name="48.5 Hz" />
              <Line type="monotone" dataKey="head49" stroke="#ec4899" strokeWidth={2} name="49.5 Hz" />
              <Line type="monotone" dataKey="head50" stroke="#10b981" strokeWidth={2} name="50 Hz" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'efficiency':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={efficiencyCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis
                dataKey="head"
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Head (m)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="eff47" stroke="#f59e0b" strokeWidth={2} name="47.5 Hz" />
              <Line type="monotone" dataKey="eff48" stroke="#f97316" strokeWidth={2} name="48.5 Hz" />
              <Line type="monotone" dataKey="eff49" stroke="#ef4444" strokeWidth={2} name="49.5 Hz" />
              <Line type="monotone" dataKey="eff50" stroke="#dc2626" strokeWidth={2} name="50 Hz" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'power':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={powerCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis
                dataKey="flow"
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Flow (m³/h)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="power47" stroke="#000000" strokeWidth={2} name="47.5 Hz" />
              <Line type="monotone" dataKey="power48" stroke="#374151" strokeWidth={2} name="48.5 Hz" />
              <Line type="monotone" dataKey="power49" stroke="#6b7280" strokeWidth={2} name="49.5 Hz" />
              <Line type="monotone" dataKey="power50" stroke="#9ca3af" strokeWidth={2} name="50 Hz" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'npsh':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={npshCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis
                dataKey="flow"
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'Flow (m³/h)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ value: 'NPSHr (m)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="npshr" stroke="#06b6d4" strokeWidth={2} name="NPSHr" />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={`p-4 md:p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-2">Pump Performance Details</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Detailed pump curves and specifications
        </p>
      </div>

      {/* Pump Type Selector */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSelectedPump('small')}
          className={`flex-1 px-6 py-3 rounded-lg border-2 transition-colors ${
            selectedPump === 'small'
              ? 'border-blue-500 bg-blue-500/10 text-blue-500'
              : darkMode
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          Small Pumps (4x)
        </button>
        <button
          onClick={() => setSelectedPump('large')}
          className={`flex-1 px-6 py-3 rounded-lg border-2 transition-colors ${
            selectedPump === 'large'
              ? 'border-blue-500 bg-blue-500/10 text-blue-500'
              : darkMode
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          Large Pumps (4x)
        </button>
      </div>

      {/* Specifications */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
        <h3 className="text-lg mb-4">Technical Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(selectedPump === 'small' ? smallPumpSpecs : largePumpSpecs).map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            >
              <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {spec.param}
              </p>
              <p className="text-lg">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curve Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[
          { id: 'hq', label: 'H vs Q', icon: Activity },
          { id: 'efficiency', label: 'η vs H', icon: Gauge },
          { id: 'power', label: 'P vs Q', icon: Zap },
          { id: 'npsh', label: 'NPSHr', icon: Info },
        ].map((curve) => {
          const Icon = curve.icon;
          return (
            <button
              key={curve.id}
              onClick={() => setSelectedCurve(curve.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                selectedCurve === curve.id
                  ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{curve.label}</span>
            </button>
          );
        })}
      </div>

      {/* Pump Curves */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className="text-lg mb-4">
          {selectedCurve === 'hq' && 'Head vs Flow Curve (Multi-frequency)'}
          {selectedCurve === 'efficiency' && 'Efficiency vs Head Curve (Multi-frequency)'}
          {selectedCurve === 'power' && 'Power vs Flow Curve (Multi-frequency)'}
          {selectedCurve === 'npsh' && 'Net Positive Suction Head Required'}
        </h3>
        {renderCurve()}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
          <p className="text-sm text-blue-500">
            <Info className="w-4 h-4 inline mr-2" />
            {selectedCurve === 'hq' && 'Operating points shown for variable frequency drive (VFD) control between 47.5-50 Hz'}
            {selectedCurve === 'efficiency' && 'Orange curves show efficiency optimization across different frequencies'}
            {selectedCurve === 'power' && 'Black curves indicate power consumption at various operating points'}
            {selectedCurve === 'npsh' && 'Required NPSH to avoid cavitation - ensure available NPSH exceeds this curve'}
          </p>
        </div>
      </div>
    </div>
  );
}
