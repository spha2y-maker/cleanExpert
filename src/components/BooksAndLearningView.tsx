import React, { useState } from 'react';
import { RECOMMENDED_BOOKS, LEARNING_ACTIVITY_STEPS } from '../data/explorationData';
import { RecommendedBook, TabType } from '../types';
import { speakText } from '../utils/speechHelper';
import {
  BookOpen,
  Sparkles,
  Heart,
  Volume2,
  Compass,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Quote,
  PenTool,
  Bookmark,
  Share2,
  Clock,
  Flame,
  Award,
} from 'lucide-react';

interface BooksAndLearningViewProps {
  answers: Record<string, string>;
  onAnswerChange: (id: string, val: string) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const BooksAndLearningView: React.FC<BooksAndLearningViewProps> = ({
  answers,
  onAnswerChange,
  onNavigateTab,
}) => {
  const book: RecommendedBook = RECOMMENDED_BOOKS[0];
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedQuote(quote);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const bookInsights = [
    {
      icon: '⏱️',
      title: '6원짜리 새 시계와 2원짜리 낡은 시계',
      desc: '의거 당일 아침, 윤봉길은 김구에게 "제게 남은 시간은 이제 한 시간뿐입니다"라며 자신의 새 시계를 건넸습니다. 죽음을 앞두고도 의연했던 청년의 결연한 약속이 담겨 있습니다.',
      color: 'bg-rose-50 border-rose-200 text-rose-900',
    },
    {
      icon: '🌱',
      title: '스물네 살 청년의 숭고한 결단',
      desc: '충남 예산에서 농촌 청소년 야학을 열고 《농민독본》을 쓰던 지식인 청년이, 왜 자신의 안락한 삶을 버리고 조국의 독립을 위해 상하이로 향했는지 깊이 조명합니다.',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
    },
    {
      icon: '🏛️',
      title: '백범 김구의 눈물과 임시정부',
      desc: '윤봉길의 시계를 품에 안고 남은 생애 동안 조국 독립운동을 이끌었던 백범 김구. 두 사람이 나눈 약속은 100년이 지난 오늘날 대한민국 임시정부의 역사로 이어졌습니다.',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    },
    {
      icon: '💡',
      title: '오늘날 우리에게 주어진 ‘시간’의 가치',
      desc: '자신의 마지막 한 시간을 세상의 빛을 위해 바친 윤봉길 의사를 통해, 오늘을 살아가는 중학생 청소년들이 나에게 주어진 시간을 어떻게 가치 있게 쓸지 성찰하게 합니다.',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
  ];

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 mb-3 shadow-sm">
            <span className="text-sm">📚</span>
            <span>도서 연계 진로·가치관 성찰 프로그램</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            《맞바꾼 회중시계》로 만나는 <span className="text-rose-700">‘자기 이해와 삶의 방향’</span> ⏱️
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            김남중 작가의 명작 《맞바꾼 회중시계》 속 100년 전 청년들의 숭고한 결단과 약속을 통해, 나 자신을 깊이 들여다보고 미래 삶의 나침반을 설계합니다 🌱
          </p>
        </div>

        {/* SECTION 1: Master Book Showcase - 《맞바꾼 회중시계》 */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-rose-200">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-xl">📖</span>
              <span>탐방 지정 필독 도서: 《{book.title}》 (김남중 글 / 김동성 그림)</span>
            </h3>
            <span className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {book.gradeTarget}
            </span>
          </div>

          {/* Book Master Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-xl mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Summary & Tour Link */}
              <div className="lg:w-7/12 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-rose-700">
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200">
                    {book.publisher}
                  </span>
                  <span>•</span>
                  <span>{book.author}</span>
                  <span>•</span>
                  <span>{book.gradeTarget}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-4xl p-3 bg-rose-50 rounded-2xl border border-rose-100 shadow-inner">
                    {book.icon}
                  </span>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {book.title}
                    </h4>
                    <span className="inline-block text-xs font-bold text-slate-600 mt-1">
                      핵심 주제: {book.coreTheme}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-rose-900 font-bold bg-rose-50/80 p-3 rounded-2xl border border-rose-200 leading-snug">
                  🌟 {book.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium">
                  {book.summary}
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong className="block text-emerald-900 mb-1 flex items-center space-x-1.5 font-bold text-xs sm:text-sm">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span>상하이 탐방지와의 연결고리:</span>
                  </strong>
                  <p className="font-medium text-slate-700 leading-relaxed">
                    {book.connectionToTour}
                  </p>
                </div>
              </div>

              {/* Right Column: Quotes & Guided Self-Discovery */}
              <div className="lg:w-5/12 space-y-4">
                {/* Quotes Section */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                      <Quote className="w-3.5 h-3.5 text-amber-600" />
                      <span>책 속의 명문장 (낭독 & 필사)</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">🔊 TTS 발음 지원</span>
                  </div>

                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {book.quotes.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 italic relative group shadow-xs"
                      >
                        <p className="mb-2 leading-relaxed font-medium">"{q}"</p>
                        <div className="flex items-center justify-end space-x-2 pt-1 border-t border-slate-100">
                          <button
                            onClick={() => speakText(q, 'ko-KR')}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="낭독 듣기"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopyQuote(q)}
                            className="text-[11px] font-bold text-rose-700 hover:text-rose-900 transition"
                          >
                            {copiedQuote === q ? '복사됨! ✓' : '인용구 복사'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Self Discovery Topics */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <span className="text-xs font-bold text-rose-950 block mb-2 flex items-center space-x-1">
                    <span>🎯</span>
                    <span>《맞바꾼 회중시계》가 청소년에게 던지는 3대 질문:</span>
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {book.selfDiscoveryTopics.map((item, idx) => (
                      <li key={idx} className="bg-white p-2.5 rounded-xl border border-rose-100 shadow-xs">
                        <strong className="text-slate-900 block mb-0.5">Q{idx + 1}. {item.question}</strong>
                        <span className="text-slate-500 text-[11px] block font-medium">{item.guidance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Thematic Insights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bookInsights.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between ${item.color}`}
              >
                <div>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h5 className="text-sm font-black mb-1.5">{item.title}</h5>
                  <p className="text-xs leading-relaxed opacity-90 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: 4-Step Interactive Learning Activity */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-bold text-rose-700 block mb-1">
                《맞바꾼 회중시계》 연계 4단계 실천형 워크시트
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                ‘자기 이해와 삶의 방향’ 인터랙티브 활동 📝
              </h3>
            </div>

            <button
              onClick={() => onNavigateTab('workbook')}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-200 transition"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>전체 워크북 뷰로 이동</span>
            </button>
          </div>

          {/* Steps Navigation Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {LEARNING_ACTIVITY_STEPS.map((st) => {
              const isActive = activeStepTab === st.stepNumber;
              const hasAnsweredAll = st.questions.every((q) => !!answers[q.id]?.trim());

              return (
                <button
                  key={st.stepNumber}
                  onClick={() => setActiveStepTab(st.stepNumber)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                        STEP 0{st.stepNumber}
                      </span>
                      {hasAnsweredAll && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">{st.title}</div>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-2">{st.badge}</div>
                </button>
              );
            })}
          </div>

          {/* Active Step Content Form */}
          {LEARNING_ACTIVITY_STEPS.filter((s) => s.stepNumber === activeStepTab).map((st) => (
            <div
              key={st.stepNumber}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-6"
            >
              {/* Step Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-rose-700 mb-1 block">
                    {st.badge} | 목표: {st.goal}
                  </span>
                  <h4 className="text-lg sm:text-2xl font-black text-slate-900">{st.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">{st.subtitle}</p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    ✍️ 작성 즉시 자동 저장됩니다 (로컬 스토리지)
                  </span>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {st.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <label className="text-sm sm:text-base font-bold text-slate-900 block">
                          {q.prompt}
                        </label>
                        <p className="text-xs text-slate-500 flex items-center space-x-1 font-medium">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>{q.hint}</span>
                        </p>
                      </div>
                    </div>

                    {q.type === 'text' ? (
                      <input
                        type="text"
                        placeholder="나만의 한 문장 좌우명을 적어보세요..."
                        value={answers[q.id] || ''}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition"
                      />
                    ) : (
                      <textarea
                        rows={4}
                        placeholder="진솔하고 깊이 있는 생각을 자유롭게 적어보세요..."
                        value={answers[q.id] || ''}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition resize-y"
                      />
                    )}

                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 font-medium">
                      <span>글자 수: {(answers[q.id] || '').length}자</span>
                      <span>
                        {answers[q.id]?.trim() ? (
                          <span className="text-emerald-700 font-bold">✓ 저장 완료</span>
                        ) : (
                          '아직 작성 전'
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Between Steps */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  disabled={activeStepTab === 1}
                  onClick={() => setActiveStepTab((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-slate-700 transition"
                >
                  이전 단계
                </button>

                <div className="text-xs text-slate-500 font-mono font-bold">
                  {activeStepTab} / {LEARNING_ACTIVITY_STEPS.length}
                </div>

                {activeStepTab < LEARNING_ACTIVITY_STEPS.length ? (
                  <button
                    onClick={() => setActiveStepTab((prev) => Math.min(LEARNING_ACTIVITY_STEPS.length, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm"
                  >
                    다음 단계
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateTab('workbook')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition shadow-sm"
                  >
                    워크북 종합 리포트 보기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


