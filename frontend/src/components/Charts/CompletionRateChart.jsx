import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-white/10 rounded-xl p-3 shadow-xl">
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.payload.fill }}>
            {entry.payload.genre}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CompletionRateChart = ({ data }) => {
  const palette = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4'];
  
  const chartData = data?.map((item, index) => ({
    ...item,
    fill: palette[index % palette.length],
  })) || [];

  const avgRate = chartData.length > 0 
    ? Math.round(chartData.reduce((acc, curr) => acc + curr.rate, 0) / chartData.length) 
    : 0;

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col relative">
      <h3 className="text-lg font-semibold text-white mb-6">Completion Rates</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="30%" 
            outerRadius="100%" 
            barSize={15} 
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background={{ fill: 'rgba(255,255,255,0.05)' }}
              clockWise={true}
              dataKey="rate"
              cornerRadius={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              iconSize={10} 
              layout="vertical" 
              verticalAlign="middle" 
              align="right" 
              iconType="circle" 
              payload={chartData.map(item => ({ value: item.genre, type: 'circle', id: item.genre, color: item.fill }))} 
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-[60%] left-[50%] transform -translate-x-[60%] -translate-y-1/2 text-center pointer-events-none md:left-[45%]">
           <p className="text-3xl font-bold text-white">{avgRate}%</p>
           <p className="text-xs text-slate-400">Average</p>
        </div>
      </div>
    </div>
  );
};

export default CompletionRateChart;
