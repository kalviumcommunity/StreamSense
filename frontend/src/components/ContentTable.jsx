import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function ContentTable({ data }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: 'engagementScore', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-30" />;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-400" /> : 
      <ChevronDown className="w-4 h-4 text-blue-400" />;
  };

  const formatViews = (views) => {
    return views >= 1000000 ? (views / 1000000).toFixed(1) + 'M' : (views / 1000).toFixed(1) + 'K';
  };

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-slate-300 text-sm uppercase tracking-wider border-b border-white/10">
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('title')}>
                <div className="flex items-center gap-2">Title <SortIcon columnKey="title" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('type')}>
                <div className="flex items-center gap-2">Type <SortIcon columnKey="type" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('genre')}>
                <div className="flex items-center gap-2">Genre <SortIcon columnKey="genre" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('totalViews')}>
                <div className="flex items-center gap-2">Views <SortIcon columnKey="totalViews" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('watchTime')}>
                <div className="flex items-center gap-2">Avg Time (m) <SortIcon columnKey="watchTime" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('completionRate')}>
                <div className="flex items-center gap-2">Completion <SortIcon columnKey="completionRate" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('engagementScore')}>
                <div className="flex items-center gap-2">Engagement <SortIcon columnKey="engagementScore" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('recommendation')}>
                <div className="flex items-center gap-2">Status <SortIcon columnKey="recommendation" /></div>
              </th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {paginatedData.map((item, idx) => (
              <tr 
                key={item.id} 
                className={`hover:bg-slate-700/30 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-slate-900/20'}`}
              >
                <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                <td className="px-6 py-4 text-slate-300">{item.type}</td>
                <td className="px-6 py-4 text-slate-300">{item.genre}</td>
                <td className="px-6 py-4 text-slate-300">{formatViews(item.totalViews)}</td>
                <td className="px-6 py-4 text-slate-300">{item.watchTime}</td>
                <td className="px-6 py-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    {item.completionRate}%
                    <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${item.completionRate}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${item.engagementScore >= 8 ? 'text-emerald-400' : item.engagementScore >= 6 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {item.engagementScore}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.recommendation} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => navigate(`/content/${item.id}`)}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors inline-flex items-center justify-center"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="p-8 text-center text-slate-400">No content found matching the criteria.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-slate-900/30">
          <span className="text-sm text-slate-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-white/10 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-white/10 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
