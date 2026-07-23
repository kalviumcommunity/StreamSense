import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import KPICard from '../components/KPICard';
import RecommendationCard from '../components/RecommendationCard';
import EngagementTrendChart from '../components/Charts/EngagementTrendChart';
import GenreDistributionChart from '../components/Charts/GenreDistributionChart';
import RetentionChart from '../components/Charts/RetentionChart';
import CompletionRateChart from '../components/Charts/CompletionRateChart';
import { kpiData } from '../data/kpiData';
import { engagementTrendData, genreDistributionData, retentionByTypeData, completionRateData } from '../data/chartData';
import { contentData } from '../data/contentData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Dashboard = () => {
  const recentRecommendations = contentData?.slice(0, 4) || [];
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John 👋</h1>
        <p className="text-slate-400">{currentDate}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpiData?.map((kpi, index) => (
          <KPICard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
            color={kpi.color}
            description={kpi.description}
            index={index}
          />
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EngagementTrendChart data={engagementTrendData} />
        <GenreDistributionChart data={genreDistributionData} />
        <RetentionChart data={retentionByTypeData} />
        <CompletionRateChart data={completionRateData} />
      </motion.div>

      <motion.div variants={itemVariants} className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Recommendations</h2>
          <Link to="/recommendations" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentRecommendations.map((item, index) => (
            <RecommendationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
