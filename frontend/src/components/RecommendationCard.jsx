import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatusBadge from './StatusBadge';

export default function RecommendationCard({ item, index = 0 }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === 'Renew') return 'bg-emerald-500';
    if (status === 'Monitor') return 'bg-amber-500';
    if (status === 'Remove') return 'bg-rose-500';
    return 'bg-slate-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
      onClick={() => navigate(`/content/${item.id}`)}
      className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
    >
      <div className={`h-1 w-full ${getStatusColor(item.recommendation)}`} />
      
      <div 
        className="h-32 w-full flex items-center justify-center opacity-80 transition-opacity hover:opacity-100"
        style={{ backgroundColor: item.thumbnailColor }}
      >
        <span className="text-white/30 text-4xl font-bold uppercase tracking-widest">{item.title.substring(0, 2)}</span>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white line-clamp-1" title={item.title}>
            {item.title}
          </h3>
          <StatusBadge status={item.recommendation} />
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <span className="px-2 py-0.5 bg-slate-700/50 rounded">{item.type}</span>
          <span>•</span>
          <span>{item.genre}</span>
          <span>•</span>
          <span>{item.releaseYear}</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-1 text-xs">
            <span className="text-slate-400">Engagement Score</span>
            <span className="text-white font-semibold">{item.engagementScore}/10</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 mb-3">
            <div 
              className={`h-1.5 rounded-full ${getStatusColor(item.recommendation)}`} 
              style={{ width: `${(item.engagementScore / 10) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Views: {(item.totalViews / 1000000).toFixed(1)}M</span>
            <span>Completion: {item.completionRate}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
