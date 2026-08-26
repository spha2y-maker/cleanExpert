import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import {
  Compass,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  FileText,
  Flame,
  Globe2,
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: TabType) => void;
  stampsCount: number;
  totalStamps: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  stampsCount,
  totalStamps,
}) => {
  // Countdown to 2026-10-13 06:00:00
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-13T06:00:00+09:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-sky-50/50 to-amber-50/40 text-slate-800 py-12 sm:py-16 border-b border-emerald-100">
      {/* Decorative Cute Floating Emojis & Light Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      
      {/* Soft floating pastel blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Cute Emojis */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-emerald-800 border border-emerald-200 shadow-sm">
            <span className="text-sm">🗓️</span>
            <span>2026. 10. 13.(화) ~ 10. 16.(금) [3박 4일]</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-sky-800 border border-sky-200 shadow-sm">
            <span className="text-sm">🎋</span>
            <span>담양교육지원청 글로컬 역사·문화 탐방</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-purple-800 border border-purple-200 shadow-sm">
            <span className="text-sm">💖</span>
            <span>중3 대상 자기 이해 & 삶의 방향 설계</span>
          </span>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold shadow-sm animate-bounce">
            🐼 죽향이 & 팡팡이와 함께 떠나는 설레는 역사·미래 배움 여행! ✨
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5 text-slate-900">
            담양의 <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy">죽향(竹鄕)</span> 정신을 품고,
            <br />
            상하이의 <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">역사·미래</span>를 만나다 ✈️
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
            100년 전 대한민국 임시정부와 의열투사의 불꽃 같은 신념부터 🇰🇷, 2050년 푸동의 스마트시티와 첨단 과학기술까지 🗼 — 
            <strong className="text-emerald-800 font-bold"> ‘나를 이해하고 세상으로 삶의 방향을 넓히는’</strong> 특별한 배움의 여정이 시작됩니다! 🌟
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              id="hero-btn-itinerary"
              onClick={() => onNavigate('itinerary')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-400/30 hover:shadow-emerald-400/50 hover:scale-[1.03] active:scale-[0.98] transition"
            >
              <span className="text-lg">📅</span>
              <span>3박 4일 일정표 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-destinations"
              onClick={() => onNavigate('destinations')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-800 font-bold text-sm sm:text-base border-2 border-emerald-200 hover:border-emerald-400 shadow-md hover:scale-[1.03] active:scale-[0.98] transition"
            >
              <span className="text-lg">🏯</span>
              <span>8대 핵심 방문지 가이드</span>
            </button>

            <button
              id="hero-btn-workbook"
              onClick={() => onNavigate('workbook')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-sm sm:text-base border border-purple-300 shadow-md hover:scale-[1.03] active:scale-[0.98] transition"
            >
              <span className="text-lg">📝</span>
              <span>나만의 진로 워크북</span>
            </button>
          </div>
        </div>

        {/* Countdown & Quick Stats Bento Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Card 1: D-Day Countdown */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-emerald-100 shadow-lg shadow-emerald-100/50 flex flex-col justify-between hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5">
                <span className="text-base">⏰</span>
                <span>탐방 출발 카운트다운</span>
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                2026.10.13 06:00
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] text-emerald-600 uppercase font-bold">일</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-sky-50/80 border border-sky-100">
                <div className="text-xl sm:text-2xl font-black text-sky-700 font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-sky-600 uppercase font-bold">시간</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-100">
                <div className="text-xl sm:text-2xl font-black text-amber-700 font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-amber-600 uppercase font-bold">분</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-rose-50/80 border border-rose-100">
                <div className="text-xl sm:text-2xl font-black text-rose-600 font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-rose-500 uppercase font-bold">초</div>
              </div>
            </div>
          </div>

          {/* Card 2: Core Route Info */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-sky-100 shadow-lg shadow-sky-100/50 flex flex-col justify-between hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-800 flex items-center space-x-1.5">
                <span className="text-base">📍</span>
                <span>탐방 경로 요약</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                인천 직항 ✈️
              </span>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-900">담양 ➔ 인천공항 ➔ 상하이 푸동</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 pl-4 font-medium">
                <span>비행시간 약 2시간 | 시차 -1시간 🕒</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span className="font-semibold text-slate-800">상하이 특급호텔 3박 연계 🏨</span>
              </div>
            </div>
          </div>

          {/* Card 3: Passport Stamps Progress */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-100 shadow-lg shadow-amber-100/50 flex flex-col justify-between hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800 flex items-center space-x-1.5">
                <span className="text-base">🏅</span>
                <span>스탬프 투어 패스포트</span>
              </span>
              <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {stampsCount} / {totalStamps} 완료
              </span>
            </div>
            <div>
              <div className="w-full bg-amber-100 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(stampsCount / totalStamps) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 flex items-center justify-between font-medium">
                <span>8대 방문지 스탬프 모으기</span>
                <span className="text-emerald-700 font-bold">
                  {stampsCount === totalStamps ? '🎉 스탬프 전원 완주!' : `앞으로 ${totalStamps - stampsCount}개 남음! 💪`}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section Preview with Cute Emojis */}
        <div className="mt-10 pt-8 border-t border-emerald-100/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-3xl bg-white/90 hover:bg-white transition border border-rose-100 shadow-sm hover:shadow-md group">
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🇰🇷</div>
            <h4 className="text-sm font-black text-slate-900 mb-1">독립투혼의 숨결</h4>
            <p className="text-xs text-slate-500">임정청사 · 매헌기념관 · 황포탄</p>
          </div>
          <div className="p-4 rounded-3xl bg-white/90 hover:bg-white transition border border-sky-100 shadow-sm hover:shadow-md group">
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🗼</div>
            <h4 className="text-sm font-black text-slate-900 mb-1">2050 스마트 미래</h4>
            <p className="text-xs text-slate-500">동방명주 468m · 도시계획관</p>
          </div>
          <div className="p-4 rounded-3xl bg-white/90 hover:bg-white transition border border-purple-100 shadow-sm hover:shadow-md group">
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🤖</div>
            <h4 className="text-sm font-black text-slate-900 mb-1">4차 산업혁명 과학</h4>
            <p className="text-xs text-slate-500">과학기술관 80% 오감 체험</p>
          </div>
          <div className="p-4 rounded-3xl bg-white/90 hover:bg-white transition border border-amber-100 shadow-sm hover:shadow-md group">
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🏰</div>
            <h4 className="text-sm font-black text-slate-900 mb-1">글로벌 문화콘텐츠</h4>
            <p className="text-xs text-slate-500">디즈니랜드 · 예원 옛거리</p>
          </div>
        </div>
      </div>
    </section>
  );
};

