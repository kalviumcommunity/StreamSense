import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ 
        width: isFocused ? '100%' : '100%',
        maxWidth: isFocused ? '400px' : '320px',
        borderColor: isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
      }}
      className="relative flex items-center bg-slate-800/50 backdrop-blur-md border rounded-xl overflow-hidden transition-colors shadow-sm"
    >
      <div className="pl-4 pr-2 text-slate-400">
        <Search size={18} className={isFocused ? "text-blue-400" : "text-slate-400"} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none py-2.5 pr-4 text-sm text-slate-200 placeholder-slate-500"
      />
    </motion.div>
  );
}
