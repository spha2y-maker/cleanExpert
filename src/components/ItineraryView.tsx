import React, { useState } from 'react';
import { ITINERARY_DATA } from '../data/explorationData';
import { Destination, TabType } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Hotel,
  Bus,
  Plane,
  Footprints,
  Sparkles,
  Info,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface ItineraryViewProps {
  onSelectDestination: (destId: string) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onSelectDestination,
  onNavigateTab,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(0); // 0 = all, 1~4 = specific day
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  const toggleActivity = (key: string) => {
    setCompletedActivities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getEmojiIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return '🚌';
      case 'flight':
        return '✈️';
      case 'food':
        return '🥟';
      case 'hotel':
        return '🏨';
      case 'science':
        return '🤖';
      case 'fun':
        return '🏰';
      case 'walk':
        return '🚶';
      case 'landmark':
      default:
        return '📍';
    }
  };

  const displayedDays =
    selectedDay === 0
      ? ITINERARY_DATA
      : ITINERARY_DATA.filter((d) => d.dayNumber === selectedDay);

  const dayEmojis = ['🗺️', '✈️', '🇰🇷', '🤖', '🎋'];

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-emerald-100 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 text-xs sm:text-sm font-bold mb-2">
              <span className="text-base">📅</span>
              <span>3박 4일 정밀 일정표 (2026.10.13 ~ 10.16)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              일자별 상세 일정 & 테마 루트 ✨
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 font-medium">
              담양에서 인천공항, 상하이 주요 역사·문화 명소를 거쳐 안전하게 귀가하는 즐거운 탐방 안내 🎒
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto bg-white p-1.5 rounded-2xl border border-emerald-100 shadow-sm scrollbar-none">
            <button
              onClick={() => setSelectedDay(0)}
              id="itinerary-filter-all"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedDay === 0
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              🌟 전체 일정
            </button>
            {ITINERARY_DATA.map((day) => (
              <button
                key={day.dayNumber}
                id={`itinerary-filter-day-${day.dayNumber}`}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedDay === day.dayNumber
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {dayEmojis[day.dayNumber]} 제{day.dayNumber}일 ({day.date.slice(6)})
              </button>
            ))}
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-10">
          {displayedDays.map((day) => (
            <div
              key={day.dayNumber}
              id={`day-card-${day.dayNumber}`}
              className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-md shadow-emerald-50/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Day Header Banner */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex flex-col items-center justify-center text-white font-black shadow-md shadow-emerald-200 flex-shrink-0">
                    <span className="text-[10px] uppercase tracking-wider font-bold">DAY</span>
                    <span className="text-2xl leading-none font-black">{day.dayNumber}</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {day.date} ({day.dayOfWeek})
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {day.route}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center space-x-1 font-medium">
                        <Bus className="w-3.5 h-3.5 text-slate-400" />
                        <span>{day.transport}</span>
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-emerald-800">
                      "{day.theme}"
                    </h3>
                  </div>
                </div>

                {/* Meals & Hotel Info Pill Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                      🍳
                    </span>
                    <div className="truncate">
                      <span className="text-slate-400 block text-[10px] font-bold">조식</span>
                      <span className="text-slate-700 font-semibold truncate">{day.meals.breakfast}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                      🍱
                    </span>
                    <div className="truncate">
                      <span className="text-slate-400 block text-[10px] font-bold">중식</span>
                      <span className="text-slate-700 font-semibold truncate">{day.meals.lunch}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-black">
                      🍲
                    </span>
                    <div className="truncate">
                      <span className="text-slate-400 block text-[10px] font-bold">석식</span>
                      <span className="text-slate-700 font-semibold truncate">{day.meals.dinner}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                      🏨
                    </span>
                    <div className="truncate">
                      <span className="text-slate-400 block text-[10px] font-bold">숙박</span>
                      <span className="text-slate-700 font-semibold truncate">{day.hotel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 via-teal-300 to-slate-200">
                {day.schedule.map((item, idx) => {
                  const activityKey = `d${day.dayNumber}-act${idx}`;
                  const isCompleted = !!completedActivities[activityKey];

                  return (
                    <div
                      key={idx}
                      className={`relative group p-4 rounded-2xl transition-all duration-200 border ${
                        item.highlight
                          ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                          : 'bg-white border-slate-200/90 hover:border-emerald-200 hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Timeline Node Icon */}
                      <button
                        onClick={() => toggleActivity(activityKey)}
                        className={`absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition border ${
                          isCompleted
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-sm'
                            : item.highlight
                            ? 'bg-white border-emerald-500 text-emerald-700 shadow-sm'
                            : 'bg-white border-slate-300 text-slate-500'
                        }`}
                        title="완료 체크하기"
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </button>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center space-x-1.5 flex-shrink-0">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.time}</span>
                          </span>

                          <div className="flex items-center space-x-2">
                            <span className="text-xl">
                              {getEmojiIcon(item.iconType)}
                            </span>
                            <h4
                              className={`text-sm sm:text-base font-bold ${
                                item.highlight ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                              } ${isCompleted ? 'line-through text-slate-400' : ''}`}
                            >
                              {item.activity}
                            </h4>
                          </div>
                        </div>

                        {item.location && (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
                            <MapPin className="w-3 h-3 text-sky-600" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 pl-0 sm:pl-11 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Daily Travel Tips & Rules */}
              {day.tips.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                  <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold mb-2">
                    <span className="text-base">💡</span>
                    <span>제{day.dayNumber}일 탐방 체크포인트 & 꿀팁 유의사항</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {day.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="flex items-start space-x-2">
                        <span className="text-amber-600 font-bold">👉</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Callout to Destination Detail */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-100 via-sky-50 to-amber-100 border border-emerald-200 text-center shadow-md">
          <span className="text-3xl mb-2 inline-block">✨ 🏮 🐼</span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
            방문지에 얽힌 100년 전 독립운동 역사와 첨단 미래 이야기를 더 깊이 알고 싶다면?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-2xl mx-auto font-medium">
            남경로 영안백화점 옥상 59인의 사진, 와이탄 의열단 3인조의 저격 작전, 루쉰공원 윤봉길 의사의 숨결을 만나보세요.
          </p>
          <button
            onClick={() => onNavigateTab('destinations')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md shadow-emerald-300/40 hover:scale-105 transition"
          >
            <span>🏯 8대 방문지 심층 가이드 바로가기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

