import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const pageTitles = {
  '/dashboard': 'Executive Dashboard',
  '/analytics': 'Content Analytics',
  '/recommendations': 'Recommendation Center',
  '/dataset-upload': 'Dataset Upload',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

export default function Navbar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Derive page title from current path
  const pathBase = '/' + location.pathname.split('/')[1];
  const pageTitle = pageTitles[pathBase] || 'StreamSense';

  return (
    <header className="h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-40">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-slate-100">{pageTitle}</h1>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 w-80 focus-within:border-blue-500/50 transition-colors">
        <Search className="w-4 h-4 text-slate-500 mr-3 shrink-0" />
        <input
          type="text"
          placeholder="Search content, reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-950" />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
            <span className="hidden lg:block text-sm text-slate-300 font-medium">John Doe</span>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden lg:block" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 z-50">
              <a href="/settings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                Profile
              </a>
              <a href="/settings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                Settings
              </a>
              <hr className="border-white/10 my-1" />
              <a href="/login" className="block px-4 py-2 text-sm text-rose-400 hover:bg-white/5 transition-colors">
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
