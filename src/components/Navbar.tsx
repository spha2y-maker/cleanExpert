import React from 'react';
import { TabType } from '../types';
import {
  Compass,
  Calendar,
  Landmark,
  BookOpen,
  FileEdit,
  Award,
  Luggage,
  Printer,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  studentName: string;
  stampsCount: number;
  totalStamps: number;
  onOpenPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentName,
  stampsCount,
  totalStamps,
  onOpenPrint,
}) => {
  const navItems: { id: TabType; label: string; emoji: string; badge?: string }[] = [
    { id: 'overview', label: '탐방 홈', emoji: '🏠' },
    { id: 'itinerary', label: '일정표', emoji: '📅' },
    { id: 'destinations', label: '8대 방문지', emoji: '🏯', badge: '8곳' },
    { id: 'books_learning', label: '도서 & 진로성찰', emoji: '📚' },
    { id: 'workbook', label: '나의 워크북', emoji: '📝', badge: `${stampsCount}/${totalStamps}` },
    { id: 'quiz', label: '퀴즈 & 미션', emoji: '🏆' },
    { id: 'toolkit', label: '여행 툴킷 & 회화', emoji: '🎒' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/90 text-slate-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity with Cute Bamboo Panda theme */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
            id="nav-logo-brand"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200 border-2 border-emerald-300/80 flex items-center justify-center shadow-md shadow-emerald-200/50 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <span className="text-2xl">🎋</span>
              <span className="absolute -bottom-1 -right-1 text-sm">🐼</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ✨ 2026 담양 ➔ 상하이 ✈️
                </span>
                <span className="hidden md:inline-block text-[10px] text-emerald-600/90 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  GLOCAL JUKHYANG
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition">
                글로컬 죽향 역사·문화 탐방
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="main-desktop-nav">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-400/30 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-emerald-700 shadow-sm'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Student Badge & Print */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenPrint}
              id="btn-print-workbook"
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition shadow-sm"
              title="워크북 및 가이드 인쇄/PDF 저장"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">인쇄 / PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('workbook')}
              id="btn-student-status"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs hover:bg-amber-100/80 transition shadow-sm"
            >
              <span className="text-sm">🌟</span>
              <span className="font-bold truncate max-w-[85px] sm:max-w-[110px]">
                {studentName ? `${studentName} 대원` : '내 워크북'}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold font-mono text-[10px]">
                스탬프 {stampsCount}/{totalStamps}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Scrolling Bar */}
        <div className="lg:hidden flex items-center space-x-1.5 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={`mob-${item.id}`}
                id={`mob-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white text-emerald-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

