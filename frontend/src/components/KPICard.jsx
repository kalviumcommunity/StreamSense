import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserMinus, CheckCircle, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const iconMap = {
  Users,
  UserMinus,
  CheckCircle,
  Clock,
  TrendingUp
};

export default function KPICard({ title, value, change, trend, icon, color, description, index = 0 }) {
  const IconComponent = iconMap[icon] || Users;
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${color}20` }}
      className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div 
          className="p-3 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <IconComponent size={24} strokeWidth={2} />
        </div>
        <div 
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
            ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}
        >
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <p className="text-slate-500 text-xs">{description}</p>
      </div>
    </motion.div>
  );
}
