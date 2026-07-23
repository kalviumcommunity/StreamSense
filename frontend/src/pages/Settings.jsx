import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Palette, Bell, Shield, Moon, Sun } from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
  <div 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${enabled ? 'bg-blue-500' : 'bg-slate-700'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
  </div>
);

const Settings = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@streamsense.io');
  const [darkMode, setDarkMode] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    weekly: true,
    removal: true,
    dataset: false
  });

  const accentColors = [
    { name: 'blue', value: 'bg-blue-500' },
    { name: 'purple', value: 'bg-purple-500' },
    { name: 'emerald', value: 'bg-emerald-500' },
    { name: 'amber', value: 'bg-amber-500' },
    { name: 'rose', value: 'bg-rose-500' }
  ];
  const [selectedColor, setSelectedColor] = useState('blue');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 text-white min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Profile Section */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center">
          <User className="w-5 h-5 mr-3 text-blue-400" />
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg">
              JD
            </div>
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-slate-400">Content Acquisition Manager</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25">
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>

      {/* Appearance Section */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center">
          <Palette className="w-5 h-5 mr-3 text-purple-400" />
          <h2 className="text-xl font-semibold">Appearance</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Theme</h3>
              <p className="text-sm text-slate-400">Switch between dark and light modes</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/50 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setDarkMode(true)}
                className={`p-2 rounded-md transition-colors ${darkMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setDarkMode(false)}
                className={`p-2 rounded-md transition-colors ${!darkMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Sun className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <h3 className="font-medium mb-1">Accent Color</h3>
              <p className="text-sm text-slate-400">Choose your primary brand color</p>
            </div>
            <div className="flex gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full ${color.value} ${selectedColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : 'opacity-70 hover:opacity-100'} transition-all`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <h3 className="font-medium mb-1">Compact Mode</h3>
              <p className="text-sm text-slate-400">Reduce spacing and font sizes</p>
            </div>
            <Toggle enabled={compactMode} onChange={setCompactMode} />
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div variants={itemVariants} className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center">
          <Bell className="w-5 h-5 mr-3 text-amber-400" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Email Notifications</h3>
              <p className="text-sm text-slate-400">Receive daily summaries via email</p>
            </div>
            <Toggle enabled={notifs.email} onChange={(val) => setNotifs({...notifs, email: val})} />
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <h3 className="font-medium mb-1">Push Notifications</h3>
              <p className="text-sm text-slate-400">Get alerts in your browser</p>
            </div>
            <Toggle enabled={notifs.push} onChange={(val) => setNotifs({...notifs, push: val})} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <h3 className="font-medium mb-1">Weekly Report Alerts</h3>
              <p className="text-sm text-slate-400">Notify when weekly reports are ready</p>
            </div>
            <Toggle enabled={notifs.weekly} onChange={(val) => setNotifs({...notifs, weekly: val})} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <h3 className="font-medium mb-1 flex items-center">
                Content Removal Alerts
                <Shield className="w-3.5 h-3.5 ml-2 text-rose-400" />
              </h3>
              <p className="text-sm text-slate-400">Critical alerts for dropping metrics</p>
            </div>
            <Toggle enabled={notifs.removal} onChange={(val) => setNotifs({...notifs, removal: val})} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <h3 className="font-medium mb-1">New Dataset Alerts</h3>
              <p className="text-sm text-slate-400">Notify when new data is uploaded</p>
            </div>
            <Toggle enabled={notifs.dataset} onChange={(val) => setNotifs({...notifs, dataset: val})} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
