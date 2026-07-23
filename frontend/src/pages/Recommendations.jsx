import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, AlertTriangle, XCircle, Filter } from 'lucide-react';
import { contentData } from '../data/contentData';
import RecommendationCard from '../components/RecommendationCard';

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('Engagement Score');

  const tabs = [
    { id: 'All', label: 'All', color: 'bg-blue-500' },
    { id: 'Renew', label: 'Renew', color: 'bg-emerald-500' },
    { id: 'Monitor', label: 'Monitor', color: 'bg-amber-500' },
    { id: 'Remove', label: 'Remove', color: 'bg-rose-500' }
  ];

  const counts = {
    Renew: contentData?.filter(i => i.recommendation === 'Renew').length || 0,
    Monitor: contentData?.filter(i => i.recommendation === 'Monitor').length || 0,
    Remove: contentData?.filter(i => i.recommendation === 'Remove').length || 0,
  };

  const filteredData = useMemo(() => {
    let data = contentData || [];
    if (activeTab !== 'All') {
      data = data.filter(item => item.recommendation === activeTab);
    }

    return data.sort((a, b) => {
      if (sortBy === 'Engagement Score') return b.engagementScore - a.engagementScore;
      if (sortBy === 'Title') return a.title.localeCompare(b.title);
      if (sortBy === 'Rating') return b.avgRating - a.avgRating;
      return 0;
    });
  }, [activeTab, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-white min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Recommendation Center</h1>
        
        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-slate-200 cursor-pointer"
          >
            <option value="Engagement Score" className="bg-slate-800">Sort by Engagement</option>
            <option value="Title" className="bg-slate-800">Sort by Title</option>
            <option value="Rating" className="bg-slate-800">Sort by Rating</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Renew</p>
            <p className="text-3xl font-bold text-emerald-400">{counts.Renew}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Monitor</p>
            <p className="text-3xl font-bold text-amber-400">{counts.Monitor}</p>
          </div>
          <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Remove</p>
            <p className="text-3xl font-bold text-rose-400">{counts.Remove}</p>
          </div>
          <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 pb-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${tab.color}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredData.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <RecommendationCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredData.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400">
            No content found in this category.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Recommendations;
