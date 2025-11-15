import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Droplets } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <Droplets className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-white text-3xl mb-2">AquaOpt AI</h1>
          <p className="text-blue-100">Multi-Agent Wastewater Optimization</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-gray-900 text-xl mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@aquaopt.ai"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors text-center"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <button
              onClick={onLogin}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg transition-colors text-center"
            >
              Sign in with SSO
            </button>
            <button
              onClick={onLogin}
              className="w-full border border-blue-600 hover:bg-blue-50 text-blue-600 py-3 rounded-lg transition-colors text-center"
            >
              Enter Demo Mode
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Blominmäki WWTP · HSY & Valmet
          </p>
        </motion.div>

        <p className="text-center text-blue-100 text-sm mt-6">
          Junction 2025 Challenge Prototype
        </p>
      </motion.div>
    </div>
  );
}