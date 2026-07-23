import React from 'react';
import { motion } from 'framer-motion';
import { FileText, FileDown, Sheet, Calendar, Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { reportsData } from '../data/reportsData';

const Reports = () => {
  const handleDownload = () => {
    alert('Download functionality coming in next sprint!');
  };

  const chartData = [
    { month: 'Feb', reports: 2 },
    { month: 'Mar', reports: 3 },
    { month: 'Apr', reports: 5 },
    { month: 'May', reports: 4 },
    { month: 'Jun', reports: 2 },
    { month: 'Jul', reports: 4 },
  ];

  const getStatusBadge = (status) => {
    return status === 'Ready' 
      ? <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50">Ready</span>
      : <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/50">Generating</span>;
  };

  const getTypeBadge = (type) => {
    return type === 'Weekly'
      ? <span className="px-2 py-1 text-xs rounded-md bg-blue-500/20 text-blue-400">Weekly</span>
      : <span className="px-2 py-1 text-xs rounded-md bg-purple-500/20 text-purple-400">Monthly</span>;
  };

  // Mock data fallback if reportsData is not available
  const safeReportsData = reportsData || [
    { id: 1, title: 'Engagement Overview Q3', type: 'Monthly', date: 'Jul 01, 2025', status: 'Ready', highlights: ['Overall engagement up 12%', 'Top genre: Sci-Fi'] },
    { id: 2, title: 'Weekly Churn Analysis', type: 'Weekly', date: 'Jul 15, 2025', status: 'Ready', highlights: ['Churn rate stabilized at 4.2%', 'New series driving retention'] },
    { id: 3, title: 'Mid-July Performance', type: 'Weekly', date: 'Jul 22, 2025', status: 'Generating', highlights: ['Processing viewer metrics...'] },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-white min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Generate Weekly Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Generate Monthly Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {safeReportsData.map((report, idx) => (
            <motion.div 
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between gap-6 hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  {getTypeBadge(report.type)}
                  {getStatusBadge(report.status)}
                </div>
                <p className="text-sm text-slate-400 mb-4 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {report.date}
                </p>
                <ul className="space-y-1">
                  {report.highlights.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-slate-500 before:rounded-full before:mr-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
                <button 
                  onClick={handleDownload}
                  disabled={report.status !== 'Ready'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                    report.status === 'Ready' 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  PDF
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={report.status !== 'Ready'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                    report.status === 'Ready' 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Sheet className="w-4 h-4 mr-2" />
                  CSV
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
              Report Analytics
            </h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#334155', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="reports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-400 mt-4 text-center">Reports generated over last 6 months</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;
