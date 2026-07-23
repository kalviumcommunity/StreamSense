import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, Pause, Star, TrendingUp, Shield, Info } from 'lucide-react';
import { contentData } from '../data/contentData';
import { engagementTrendData } from '../data/chartData';
import EngagementTrendChart from '../components/Charts/EngagementTrendChart';
import StatusBadge from '../components/StatusBadge';

const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find item or use a mock if contentData doesn't have it (or if contentData is undefined)
  const item = contentData?.find(c => c.id === id || c.id === parseInt(id)) || {
    id: id,
    title: 'Unknown Title',
    type: 'Movie',
    genre: 'Unknown',
    year: '2025',
    recommendation: 'Monitor',
    watchTime: 0,
    completionRate: 0,
    pauseFrequency: 0,
    avgRating: 0,
    engagementScore: 0,
    retentionImpact: 'Low',
  };

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        <h2 className="text-2xl font-bold mb-4">Content not found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  const getExplanation = (status) => {
    switch(status) {
      case 'Renew':
        return `This title shows strong viewer engagement with high completion rates and positive retention impact. The engagement score of ${item.engagementScore}/10 indicates consistent viewer interest, making it a strong candidate for renewal.`;
      case 'Monitor':
        return `This title shows moderate engagement metrics. While some indicators are promising, others suggest room for improvement. Continued monitoring is recommended before making a final decision.`;
      case 'Remove':
        return `This title shows declining engagement with low completion rates and minimal retention impact. The data suggests reallocating resources to better-performing content.`;
      default:
        return 'Not enough data to provide a recommendation explanation.';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Renew': return 'border-emerald-500';
      case 'Monitor': return 'border-amber-500';
      case 'Remove': return 'border-rose-500';
      default: return 'border-blue-500';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-white min-h-screen"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Hero Section */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="px-3 py-1 bg-slate-700 rounded-full">{item.type}</span>
            <span className="px-3 py-1 bg-slate-700 rounded-full">{item.genre}</span>
            <span className="px-3 py-1 bg-slate-700 rounded-full">{item.year}</span>
          </div>
        </div>
        <StatusBadge status={item.recommendation} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Watch Time', value: `${item.watchTime} min avg`, icon: Clock, color: 'text-blue-400' },
          { label: 'Completion Rate', value: `${item.completionRate}%`, icon: CheckCircle, color: 'text-emerald-400' },
          { label: 'Pause Frequency', value: `${item.pauseFrequency} per session`, icon: Pause, color: 'text-amber-400' },
          { label: 'Avg Rating', value: `${item.avgRating}/5`, icon: Star, color: 'text-amber-400' },
          { label: 'Engagement Score', value: `${item.engagementScore}/10`, icon: TrendingUp, color: 'text-purple-400' },
          { label: 'Retention Impact', value: item.retentionImpact, icon: Shield, color: 'text-rose-400' }
        ].map((metric, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex items-center hover:bg-slate-800/80 transition-colors"
          >
            <div className={`p-3 rounded-lg bg-slate-700/50 mr-4 ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
              <p className="text-xl font-semibold">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Engagement Trend</h2>
        <div className="h-[300px] w-full">
          <EngagementTrendChart data={engagementTrendData} />
        </div>
      </div>

      {/* Recommendation Explanation */}
      <div className={`bg-slate-800/50 backdrop-blur-xl border-l-4 border-t border-b border-r border-white/10 rounded-2xl p-6 ${getStatusColor(item.recommendation)}`}>
        <div className="flex items-start">
          <Info className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Why this recommendation?</h3>
            <p className="text-slate-300 leading-relaxed">
              {getExplanation(item.recommendation)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentDetails;
