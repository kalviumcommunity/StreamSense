import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Navigate to dashboard after "login"
    console.log('Login credentials:', data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ x: [0, 50, -20, 0], y: [0, -30, 40, 0] }} 
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ x: [0, -40, 30, 0], y: [0, 50, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute bottom-[0%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30">
            <Activity className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">StreamSense</h1>
          <p className="text-slate-400 text-sm">Smart Analytics for Streaming Decisions</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                className={`w-full bg-slate-900/60 border ${errors.email ? 'border-rose-500' : 'border-white/10'} text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                placeholder="you@company.com"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
                })}
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full bg-slate-900/60 border ${errors.password ? 'border-rose-500' : 'border-white/10'} text-white rounded-xl pl-11 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                placeholder="••••••••"
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 6, message: "Minimum 6 characters" } 
                })}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-900/60 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
                {...register("rememberMe")}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 cursor-pointer">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </button>
        </form>
      </motion.div>
      
      <p className="mt-10 text-sm text-slate-500 relative z-10 font-medium">
        © 2025 StreamSense. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
