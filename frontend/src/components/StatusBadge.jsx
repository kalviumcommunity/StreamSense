import React from 'react';
import { motion } from 'framer-motion';

export default function StatusBadge({ status }) {
  if (status === 'Renew') {
    return (
      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30">
        Renew
      </span>
    );
  }
  
  if (status === 'Monitor') {
    return (
      <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/30">
        Monitor
      </span>
    );
  }
  
  if (status === 'Remove') {
    return (
      <motion.span
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-xs font-semibold border border-rose-500/30 inline-block"
      >
        Remove
      </motion.span>
    );
  }
  
  return (
    <span className="px-3 py-1 bg-slate-500/20 text-slate-400 rounded-full text-xs font-semibold border border-slate-500/30">
      {status}
    </span>
  );
}
