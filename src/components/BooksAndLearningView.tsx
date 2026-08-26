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
  const [selectedBook, setSelectedBook] = useState<RecommendedBook>(RECOMMENDED_BOOKS[0]);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedQuote(quote);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 mb-3 shadow-sm">
            <span className="text-sm">📚</span>
            <span>중학교 권장 도서 & 진로·가치관 탐구 프로그램</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            도서 연계 <span className="text-purple-700">‘자기 이해와 삶의 방향’</span> 학습 활동 💡
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            책 속의 지혜와 상하이 현장의 감동을 엮어, 나 자신을 깊이 들여다보고 미래 삶의 방향을 따뜻하게 설계합니다 🌱
          </p>
        </div>

        {/* SECTION 1: 4 Recommended Books Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-purple-100">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-xl">📖</span>
              <span>탐방 테마별 맞춤 추천 도서 4선</span>
            </h3>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              중1~3 맞춤 추천
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {RECOMMENDED_BOOKS.map((book) => {
              const isSelected = selectedBook.id === book.id;
              return (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className={`p-4 rounded-3xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-purple-500 shadow-lg shadow-purple-100 scale-[1.02] ring-2 ring-purple-100'
                      : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{book.icon}</span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        {book.gradeTarget}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 mb-1 line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2 font-medium">{book.author}</p>
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {book.coreTheme}
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className={isSelected ? 'text-purple-700 font-extrabold' : 'text-slate-500'}>
                      {isSelected ? '선택됨 ✨' : '자세히 보기'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-600' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Book Detail Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Summary & Tour Link */}
              <div className="lg:w-7/12 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-700">
                  <span>{selectedBook.publisher}</span>
                  <span>•</span>
                  <span>{selectedBook.gradeTarget}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedBook.title}
                </h4>
                <p className="text-xs sm:text-sm text-purple-900 font-bold bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                  🌟 {selectedBook.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium">
                  {selectedBook.summary}
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong className="block text-emerald-900 mb-1 flex items-center space-x-1.5 font-bold">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span>상하이 탐방지와의 연결고리:</span>
                  </strong>
                  <p className="font-medium text-slate-700 leading-relaxed">{selectedBook.connectionToTour}</p>
                </div>
              </div>

              {/* Right Column: Quotes & Guided Self-Discovery */}
              <div className="lg:w-5/12 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                      <Quote className="w-3.5 h-3.5 text-amber-600" />
                      <span>책 속의 명문장 (낭독 & 필사)</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">TTS 음성 지원</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedBook.quotes.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 italic relative group shadow-sm"
                      >
                        <p className="mb-2 leading-relaxed font-medium">"{q}"</p>
                        <div className="flex items-center justify-end space-x-2 pt-1 border-t border-slate-100">
                          <button
                            onClick={() => speakText(q, 'ko-KR')}
                            className="p-1 rounded text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition"
                            title="낭독 듣기"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopyQuote(q)}
                            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 transition"
                          >
                            {copiedQuote === q ? '복사됨!' : '인용구 복사'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-xs font-bold text-purple-900 block mb-2">
                    🎯 이 책을 읽고 던져볼 질문:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedBook.selfDiscoveryTopics.map((item, idx) => (
                      <li key={idx} className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-sm">
                        <strong className="text-slate-900 block mb-0.5">Q. {item.question}</strong>
                        <span className="text-slate-500 text-[11px] block font-medium">{item.guidance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 4-Step Interactive Learning Activity */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-bold text-sky-700 block mb-1">
                4단계 실천형 워크시트
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
                      ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
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
                  <span className="text-xs font-bold text-sky-700 mb-1 block">
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
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
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
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
                      />
                    ) : (
                      <textarea
                        rows={4}
                        placeholder="진솔하고 깊이 있는 생각을 자유롭게 적어보세요..."
                        value={answers[q.id] || ''}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition resize-y"
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
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition shadow-sm"
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

