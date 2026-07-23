import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ContentTable from '../components/ContentTable';
import { contentData } from '../data/contentData';

const Analytics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    genre: 'All',
    type: 'All',
    tier: 'All',
    recommendation: 'All'
  });

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  const filteredData = useMemo(() => {
    let data = contentData || [];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => item.title.toLowerCase().includes(lowerQuery));
    }

    if (activeFilters.genre !== 'All') {
      data = data.filter(item => item.genre === activeFilters.genre);
    }
    if (activeFilters.type !== 'All') {
      data = data.filter(item => item.type === activeFilters.type);
    }
    if (activeFilters.tier !== 'All') {
      data = data.filter(item => item.subscriptionTier === activeFilters.tier);
    }
    if (activeFilters.recommendation !== 'All') {
      data = data.filter(item => item.recommendation === activeFilters.recommendation);
    }

    return data;
  }, [searchQuery, activeFilters]);

  const totalTitles = filteredData.length;
  const avgEngagement = filteredData.length > 0
    ? (filteredData.reduce((acc, curr) => acc + curr.engagementScore, 0) / filteredData.length).toFixed(1)
    : 0;
  
  const renewCount = filteredData.filter(item => item.recommendation === 'Renew').length;
  const monitorCount = filteredData.filter(item => item.recommendation === 'Monitor').length;
  const removeCount = filteredData.filter(item => item.recommendation === 'Remove').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Content Performance Analysis</h1>
        <p className="text-slate-400">Deep dive into your library's performance metrics and analytics.</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search titles..." />
        </div>
        <div>
          <Filters onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-slate-800/80 border border-white/5 rounded-xl p-4 text-center shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Total Titles</p>
          <p className="text-2xl font-bold text-white">{totalTitles}</p>
        </div>
        <div className="bg-slate-800/80 border border-white/5 rounded-xl p-4 text-center shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Avg Engagement</p>
          <p className="text-2xl font-bold text-blue-400">{avgEngagement}</p>
        </div>
        <div className="bg-slate-800/80 border border-emerald-500/20 rounded-xl p-4 text-center shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Renew</p>
          <p className="text-2xl font-bold text-emerald-400">{renewCount}</p>
        </div>
        <div className="bg-slate-800/80 border border-amber-500/20 rounded-xl p-4 text-center shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Monitor</p>
          <p className="text-2xl font-bold text-amber-400">{monitorCount}</p>
        </div>
        <div className="bg-slate-800/80 border border-rose-500/20 rounded-xl p-4 text-center shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Remove</p>
          <p className="text-2xl font-bold text-rose-400">{removeCount}</p>
        </div>
      </div>

      <ContentTable data={filteredData} />
    </motion.div>
  );
};

export default Analytics;
