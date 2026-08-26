import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/explorationData';
import { Destination, TabType } from '../types';
import { speakText } from '../utils/speechHelper';
import confetti from 'canvas-confetti';
import {
  Landmark,
  Search,
  Volume2,
  CheckCircle,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers,
  FileEdit,
  ArrowRight,
  X,
  Target,
  GraduationCap,
  History,
  Compass,
} from 'lucide-react';

interface DestinationsViewProps {
  collectedStamps: string[];
  onToggleStamp: (destId: string) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  collectedStamps,
  onToggleStamp,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  const categories = [
    { id: 'all', label: '🌟 전체 명소 (8곳)' },
    { id: 'history', label: '🇰🇷 역사·독립운동' },
    { id: 'future', label: '🚀 미래·스마트과학' },
    { id: 'culture', label: '🏮 문화·콘텐츠' },
  ];

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.chineseName.includes(searchQuery) ||
      dest.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || dest.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleStampWithConfetti = (destId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyCollected = collectedStamps.includes(destId);
    onToggleStamp(destId);

    if (!isAlreadyCollected) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-emerald-100 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-700 text-xs sm:text-sm font-bold mb-2">
              <span className="text-base">🏯</span>
              <span>탐방 핵심 거점 8선 & 교과 융합 탐구</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              8대 방문지 심층 가이드 & 미션 ✨
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 font-medium">
              100년 전 독립투사들의 숨결부터 2050 미래 스마트시티까지, 각 방문지별 역사적 의의와 교과 연계 프로젝트를 탐색하세요 🐼
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="방문지, 인물, 키워드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-emerald-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => {
            const hasStamp = collectedStamps.includes(dest.id);

            return (
              <div
                key={dest.id}
                id={`dest-card-${dest.id}`}
                onClick={() => setActiveModalDest(dest)}
                className="group relative rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 p-5 sm:p-6 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-mono font-bold text-xs text-emerald-800">
                      0{dest.num}
                    </span>

                    <button
                      onClick={(e) => handleStampWithConfetti(dest.id, e)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition border ${
                        hasStamp
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
                      }`}
                      title={hasStamp ? '스탬프 획득 완료' : '스탬프 획득하기'}
                    >
                      <CheckCircle
                        className={`w-3.5 h-3.5 ${
                          hasStamp ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{hasStamp ? '🏅 스탬프 콕!' : '스탬프 찍기'}</span>
                    </button>
                  </div>

                  {/* Emoji & Names */}
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {dest.emoji}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition">
                        {dest.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                        <span>{dest.chineseName}</span>
                        <span className="text-slate-300">|</span>
                        <span className="font-mono text-[11px] text-teal-600 font-bold">{dest.pinyin}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(dest.chineseName, 'zh-CN');
                          }}
                          className="text-slate-400 hover:text-emerald-600 ml-1 transition"
                          title="중국어 발음 듣기"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tagline & Brief */}
                  <div className="my-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-2">
                      {dest.tag}
                    </span>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                      {dest.brief}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Preview & Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center space-x-1 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-sky-600" />
                    <span>교과연계 {dest.curriculumLinks.length}건</span>
                  </span>

                  <span className="text-emerald-600 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>상세보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Full In-Depth Destination Details */}
        {activeModalDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-800">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalDest(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start space-x-4 mb-6 pr-10">
                <span className="text-4xl p-3 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
                  {activeModalDest.emoji}
                </span>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      제{activeModalDest.num}번 방문지
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{activeModalDest.tag}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {activeModalDest.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
                    <span className="font-bold text-emerald-700">{activeModalDest.chineseName}</span>
                    <span className="font-mono text-teal-700 font-semibold">({activeModalDest.pinyin})</span>
                    <button
                      onClick={() => speakText(activeModalDest.chineseName, 'zh-CN')}
                      className="p-1 rounded bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition"
                      title="발음 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Highlight Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6">
                <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold mb-1">
                  <span className="text-base">✨</span>
                  <span>핵심 탐방 포인트</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {activeModalDest.highlightSummary}
                </p>
              </div>

              {/* Grid: Features & Korea Connection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-sky-800 flex items-center space-x-2 mb-3">
                    <Compass className="w-4 h-4 text-sky-600" />
                    <span>공간 및 방문지 특색</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    {activeModalDest.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-amber-800 flex items-center space-x-2 mb-3">
                    <History className="w-4 h-4 text-amber-600" />
                    <span>우리나라 역사 및 문화와의 관련성</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-medium">
                    {activeModalDest.koreaConnection}
                  </p>
                  {activeModalDest.thematicMeaning && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                      <strong className="text-emerald-800">💡 테마적 의의:</strong>{' '}
                      {activeModalDest.thematicMeaning}
                    </div>
                  )}
                </div>
              </div>

              {/* Historical Incident Details */}
              {activeModalDest.historicalEvents && activeModalDest.historicalEvents.length > 0 && (
                <div className="mb-6 space-y-4">
                  <h4 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <span className="text-lg">📜</span>
                    <span>역사적 사건 심층 기록 (교재 내용 100% 수록)</span>
                  </h4>
                  {activeModalDest.historicalEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-emerald-200 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <h5 className="text-sm sm:text-base font-bold text-emerald-900">
                          {evt.title}
                        </h5>
                        {evt.year && (
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                            {evt.year}
                          </span>
                        )}
                      </div>

                      {evt.people && (
                        <div className="text-xs text-slate-600">
                          <strong className="text-slate-800">주요 인물:</strong>{' '}
                          {evt.people.join(', ')}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-800 font-semibold bg-white p-3 rounded-xl border border-slate-200">
                        {evt.summary}
                      </p>

                      <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                        {evt.details.map((d, di) => (
                          <li key={di} className="flex items-start space-x-2">
                            <span className="text-teal-600 font-bold">▪</span>
                            <span className="leading-relaxed">{d}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="text-xs text-emerald-800 pt-2 border-t border-slate-200 font-medium">
                        <strong>📌 역사적 의의:</strong> {evt.significance}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cross-Curricular Project */}
              {activeModalDest.crossProject && (
                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 mb-6">
                  <div className="flex items-center space-x-2 text-purple-900 text-sm font-bold mb-3">
                    <span className="text-base">✨</span>
                    <span>{activeModalDest.crossProject.title}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeModalDest.crossProject.steps.map((st, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-purple-200 shadow-sm">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 block w-max mb-1">
                          {st.session}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{st.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Curriculum Links & Activities */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-sky-900 flex items-center space-x-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                  <span>교과 연계 학습 활동 가이드</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalDest.curriculumLinks.map((curr, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                          [{curr.subject}]
                        </span>
                        <span className="text-xs font-bold text-slate-900">{curr.topic}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{curr.activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Field Missions & Key Questions */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-amber-800 flex items-center space-x-1.5 mb-2">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    <span>현장 필수 미션 🎯</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {activeModalDest.missions.map((m, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5 mb-2">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>스스로에게 던지는 질문 (자기 성찰 💭)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {activeModalDest.keyQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-600 font-bold">?</span>
                        <span className="italic">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={(e) => handleStampWithConfetti(activeModalDest.id, e)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                    collectedStamps.includes(activeModalDest.id)
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-sm'
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {collectedStamps.includes(activeModalDest.id)
                      ? '🎉 스탬프 획득 완료!'
                      : '이곳의 스탬프 찍기'}
                  </span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setActiveModalDest(null);
                      onNavigateTab('books_learning');
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200 hover:bg-purple-100 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>추천 도서 보기</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModalDest(null);
                      onNavigateTab('workbook');
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200 hover:bg-sky-100 transition"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>워크북 기록하기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

