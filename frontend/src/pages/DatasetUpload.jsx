import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';

const DatasetUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    alert('Upload functionality coming in next sprint!');
  };

  const handleUploadClick = () => {
    alert('Upload functionality coming in next sprint!');
  };

  const recentUploads = [
    { name: 'engagement_data_july.csv', size: '12.4 MB', date: 'Jul 18, 2025', status: 'Processed', records: '45,230 records' },
    { name: 'viewer_metrics_q2.xlsx', size: '8.7 MB', date: 'Jul 10, 2025', status: 'Processed', records: '32,100 records' },
    { name: 'ratings_export.csv', size: '3.2 MB', date: 'Jul 5, 2025', status: 'Processing', records: '12,800 records' },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      Processed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
      Processing: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
      Failed: 'bg-rose-500/20 text-rose-400 border-rose-500/50'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${colors[status] || colors.Processed}`}>
        {status}
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 text-white min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Dataset Upload</h1>
        <p className="text-slate-400">Upload your viewer engagement data for analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Drag & Drop Zone */}
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-white/20 bg-slate-800/30 hover:bg-slate-800/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
                <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-blue-400' : 'text-slate-400'}`} />
              </div>
              <h3 className="text-lg font-semibold mb-1">Drag & drop your files here</h3>
              <p className="text-slate-400 text-sm mb-4">or click to browse</p>
              <p className="text-xs text-slate-500">CSV, XLSX, JSON (Max 50MB)</p>
            </div>
          </div>

          <button 
            onClick={handleUploadClick}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25"
          >
            Upload Files
          </button>

          {/* Recent Uploads */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold">Recent Uploads</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-900/50 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">File Name</th>
                    <th className="px-6 py-4 font-medium">Size</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Records</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentUploads.map((file, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-200">{file.name}</td>
                      <td className="px-6 py-4 text-slate-400">{file.size}</td>
                      <td className="px-6 py-4 text-slate-400">{file.date}</td>
                      <td className="px-6 py-4">{getStatusBadge(file.status)}</td>
                      <td className="px-6 py-4 text-slate-400">{file.records}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dataset Summary */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">Dataset Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Total Records</span>
                <span className="font-semibold">90,130</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Last Updated</span>
                <span className="font-semibold">Jul 18, 2025</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Data Sources</span>
                <span className="font-semibold">3 files</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Data Quality</span>
                <span className="font-semibold text-emerald-400">96.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DatasetUpload;
