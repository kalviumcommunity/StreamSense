import React, { useState, useEffect } from 'react';

export default function Filters({ onFilterChange }) {
  const [genre, setGenre] = useState('All');
  const [type, setType] = useState('All');
  const [tier, setTier] = useState('All');
  const [recommendation, setRecommendation] = useState('All');

  useEffect(() => {
    onFilterChange({ genre, type, tier, recommendation });
  }, [genre, type, tier, recommendation, onFilterChange]);

  const selectClasses = "bg-slate-800/80 border border-white/10 text-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer pr-10 hover:bg-slate-700/80";
  
  const selectWrapper = "relative flex-1 min-w-[140px] max-w-[200px]";

  const Icon = () => (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 items-center w-full">
      <div className={selectWrapper}>
        <select className={`w-full ${selectClasses}`} value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="All">All Genres</option>
          {['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Documentary', 'Horror', 'Romance', 'Animation', 'Crime'].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <Icon />
      </div>

      <div className={selectWrapper}>
        <select className={`w-full ${selectClasses}`} value={type} onChange={e => setType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Movie">Movies</option>
          <option value="Series">Series</option>
        </select>
        <Icon />
      </div>

      <div className={selectWrapper}>
        <select className={`w-full ${selectClasses}`} value={tier} onChange={e => setTier(e.target.value)}>
          <option value="All">All Tiers</option>
          <option value="Premium">Premium</option>
          <option value="Standard">Standard</option>
          <option value="Basic">Basic</option>
        </select>
        <Icon />
      </div>

      <div className={selectWrapper}>
        <select className={`w-full ${selectClasses}`} value={recommendation} onChange={e => setRecommendation(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Renew">Renew</option>
          <option value="Monitor">Monitor</option>
          <option value="Remove">Remove</option>
        </select>
        <Icon />
      </div>
    </div>
  );
}
