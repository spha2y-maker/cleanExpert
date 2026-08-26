import React, { useState } from 'react';
import {
  CHINESE_PHRASES,
  IMMIGRATION_ENGLISH_PHRASES,
  PACKING_CHECKLIST,
} from '../data/explorationData';
import { ChecklistItem, ChinesePhrase, ImmigrationEnglishPhrase } from '../types';
import { speakText } from '../utils/speechHelper';
import {
  Luggage,
  Volume2,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Calculator,
  ShieldAlert,
  Phone,
  Clock,
  Sparkles,
  Search,
  Plane,
  FileText,
  HelpCircle,
} from 'lucide-react';

export const TravelToolkitView: React.FC = () => {
  // Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('jukhyang_checklist');
    return saved ? JSON.parse(saved) : PACKING_CHECKLIST;
  });
  const [newItemLabel, setNewItemLabel] = useState('');

  // Language Mode: 'chinese' | 'english'
  const [activeLanguage, setActiveLanguage] = useState<'chinese' | 'english'>('chinese');

  // Search / Category Filters
  const [chineseCategory, setChineseCategory] = useState<string>('all');
  const [englishCategory, setEnglishCategory] = useState<string>('all');
  const [phraseSearch, setPhraseSearch] = useState('');

  // Currency Converter State
  const [exchangeRate, setExchangeRate] = useState<number>(195); // 1 CNY = 195 KRW approx
  const [krwAmount, setKrwAmount] = useState<number>(50000);
  const [cnyAmount, setCnyAmount] = useState<number>(250);

  const toggleCheck = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updated);
    localStorage.setItem('jukhyang_checklist', JSON.stringify(updated));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemLabel.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: 'learning',
      label: newItemLabel.trim(),
      essential: false,
      checked: false,
    };
    const updated = [...checklist, newItem];
    setChecklist(updated);
    setNewItemLabel('');
    localStorage.setItem('jukhyang_checklist', JSON.stringify(updated));
  };

  const handleDeleteItem = (id: string) => {
    const updated = checklist.filter((item) => item.id !== id);
    setChecklist(updated);
    localStorage.setItem('jukhyang_checklist', JSON.stringify(updated));
  };

  const chineseCategories = [
    { id: 'all', label: '전체 회화 🌟' },
    { id: '기본 인사 & 예절', label: '기본 인사 👋' },
    { id: '자기소개 & 소통', label: '자기소개 🙋' },
    { id: '쇼핑 & 계산', label: '쇼핑/계산 🛍️' },
    { id: '식당 & 주문', label: '식당/주문 🍜' },
    { id: '길 찾기 & 긴급', label: '길찾기/긴급 🧭' },
  ];

  const englishCategories = [
    { id: 'all', label: '전체 영어 표현 🌟' },
    { id: '여권 및 신원 확인', label: '여권/신원확인 🛂' },
    { id: '입국 목적 & 단체 소속', label: '입국목적/소속 🏫' },
    { id: '체류 기간 & 숙소', label: '체류기간/숙소 🏨' },
    { id: '생체 인식 & 지문 등록', label: '생체인식/지문 📸' },
    { id: '세관 & 수하물 검사', label: '세관/수하물 🧳' },
    { id: '공항 & 기내 긴급 소통', label: '공항/기내긴급 🆘' },
  ];

  const filteredChinesePhrases = CHINESE_PHRASES.filter((p) => {
    const matchesCat = chineseCategory === 'all' || p.category === chineseCategory;
    const matchesQuery =
      p.korean.includes(phraseSearch) ||
      p.chinese.includes(phraseSearch) ||
      p.pronunciationKorean.includes(phraseSearch);
    return matchesCat && matchesQuery;
  });

  const filteredEnglishPhrases = IMMIGRATION_ENGLISH_PHRASES.filter((p) => {
    const matchesCat = englishCategory === 'all' || p.category === englishCategory;
    const matchesQuery =
      p.korean.toLowerCase().includes(phraseSearch.toLowerCase()) ||
      p.english.toLowerCase().includes(phraseSearch.toLowerCase()) ||
      p.pronunciationKorean.includes(phraseSearch);
    return matchesCat && matchesQuery;
  });

  const checkedCount = checklist.filter((i) => i.checked).length;

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3 shadow-sm">
            <span>🧳 탐방 준비 & 현지 서바이벌 툴킷</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            여행 준비물 체크리스트 & 중국어·입출국 심사 영어 🇨🇳✈️
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            출국 전 필수 소지품 점검부터 입출국 심사용 필수 영어와 현지 중국어 회화(원어민 음성 TTS), 위안화 환율 계산기까지 완벽 대비하세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Packing Checklist & Currency (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Checklist Card */}
            <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <span className="text-base">🎒</span>
                    <span>필수 준비물 체크리스트</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    완료: {checkedCount} / {checklist.length} (
                    {Math.round((checkedCount / checklist.length) * 100)}%)
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-mono font-black text-xs text-emerald-800 shadow-sm">
                  {Math.round((checkedCount / checklist.length) * 100)}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full mb-4 overflow-hidden border border-slate-200">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                />
              </div>

              {/* Add Custom Item Form */}
              <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="나만의 준비물 추가하기..."
                  value={newItemLabel}
                  onChange={(e) => setNewItemLabel(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* Items List */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-xs ${
                      item.checked
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50/40 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 pr-2">
                      <span className="text-emerald-600">
                        {item.checked ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          item.checked ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.essential && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 font-bold">
                          필수
                        </span>
                      )}
                    </div>

                    {item.id.startsWith('custom-') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="text-slate-400 hover:text-rose-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Currency Converter Card */}
            <div className="p-5 rounded-3xl bg-white border border-sky-200 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-sky-900 flex items-center space-x-2">
                  <span className="text-base">💱</span>
                  <span>위안화 (CNY) ⇋ 원화 (KRW) 계산기</span>
                </h3>
                <span className="text-[10px] text-sky-700 font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100">
                  1 CNY ≈ {exchangeRate}원
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    중국 위안 (元 CNY)
                  </label>
                  <input
                    type="number"
                    value={cnyAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCnyAmount(val);
                      setKrwAmount(Math.round(val * exchangeRate));
                    }}
                    className="w-full bg-transparent text-sm sm:text-base font-bold text-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    한국 원 (₩ KRW)
                  </label>
                  <input
                    type="number"
                    value={krwAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setKrwAmount(val);
                      setCnyAmount(Math.round((val / exchangeRate) * 10) / 10);
                    }}
                    className="w-full bg-transparent text-sm sm:text-base font-bold text-sky-800 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Immigration Tips Quick Guide */}
            <div className="p-5 rounded-3xl bg-indigo-50/70 border border-indigo-200 space-y-3 shadow-md">
              <h4 className="text-xs font-bold text-indigo-900 flex items-center space-x-1.5">
                <span className="text-base">💡</span>
                <span>공항 입출국 심사 3대 핵심 팁</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">1.</span>
                  <span><strong>여권 커버 사전 분리:</strong> 심사대 앞에서는 여권 커버를 미리 벗겨 탑승권과 함께 제출합니다.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">2.</span>
                  <span><strong>모자/마스크 탈의:</strong> 얼굴 인식 카메라 촬영 시 모자와 안경, 마스크를 잠시 벗고 렌즈를 바라봅니다.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">3.</span>
                  <span><strong>목적 명확히 답변:</strong> "School study tour" 또는 "Sightseeing"이라 자신감 있게 또박또박 대답합니다.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Language Phrases (Chinese + Immigration English) (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
              {/* Language Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-5 border border-slate-200">
                <button
                  onClick={() => {
                    setActiveLanguage('chinese');
                    setPhraseSearch('');
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 ${
                    activeLanguage === 'chinese'
                      ? 'bg-white text-emerald-800 shadow-md border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="text-base">🇨🇳</span>
                  <span>현지 중국어 생존 회화</span>
                </button>
                <button
                  onClick={() => {
                    setActiveLanguage('english');
                    setPhraseSearch('');
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 ${
                    activeLanguage === 'english'
                      ? 'bg-white text-indigo-900 shadow-md border border-indigo-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="text-base">🛃</span>
                  <span>입출국 심사 필수 영어</span>
                </button>
              </div>

              {/* Phrases Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <span className="text-base">
                      {activeLanguage === 'chinese' ? '🗣️' : '✈️'}
                    </span>
                    <span>
                      {activeLanguage === 'chinese'
                        ? '서바이벌 현지 중국어 회화 (원어민 발음)'
                        : '공항·세관·입출국 심사 필수 영어 (원어민 발음)'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    버튼을 누르면 실제 원어민 음성(TTS)이 재생됩니다.
                  </p>
                </div>

                <div className="relative w-full sm:w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="표현 검색..."
                    value={phraseSearch}
                    onChange={(e) => setPhraseSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              {/* Category Pills (Dynamic based on Language) */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
                {activeLanguage === 'chinese'
                  ? chineseCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setChineseCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                          chineseCategory === cat.id
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))
                  : englishCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setEnglishCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                          englishCategory === cat.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
              </div>

              {/* Phrases Cards List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {activeLanguage === 'chinese' ? (
                  /* Chinese Phrase Cards */
                  filteredChinesePhrases.length > 0 ? (
                    filteredChinesePhrases.map((phrase, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition space-y-2 group shadow-xs"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200">
                              {phrase.category}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">
                              {phrase.korean}
                            </h4>
                          </div>

                          <button
                            onClick={() => speakText(phrase.chinese, 'zh-CN')}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-900 text-xs font-bold transition group-hover:scale-105 shadow-xs"
                            title="중국어 음성 듣기"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>듣기 🔊</span>
                          </button>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="text-base font-bold text-emerald-800 font-sans">
                              {phrase.chinese}
                            </span>
                            <span className="font-mono text-sky-800 text-xs font-semibold">
                              [{phrase.pinyin}]
                            </span>
                          </div>
                          <span className="text-amber-800 font-bold text-xs">
                            발음: "{phrase.pronunciationKorean}"
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 italic font-medium">
                          💡 {phrase.situationTip}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      검색 조건에 맞는 중국어 회화가 없습니다.
                    </div>
                  )
                ) : (
                  /* English Immigration Phrase Cards */
                  filteredEnglishPhrases.length > 0 ? (
                    filteredEnglishPhrases.map((phrase, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition space-y-2 group shadow-xs ${
                          phrase.speakerRole === 'officer'
                            ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                            : 'bg-indigo-50/30 border-indigo-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-1.5 mb-1">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                                  phrase.speakerRole === 'officer'
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : 'bg-indigo-100 text-indigo-900 border-indigo-300'
                                }`}
                              >
                                {phrase.speakerRole === 'officer'
                                  ? '👮 심사관 질문'
                                  : '🎒 학생 답변 / 질문'}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                                {phrase.category}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">
                              {phrase.korean}
                            </h4>
                          </div>

                          <button
                            onClick={() => speakText(phrase.english, 'en-US')}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 border border-indigo-300 text-indigo-900 text-xs font-bold transition group-hover:scale-105 shadow-xs"
                            title="영어 음성 듣기"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>듣기 🔊</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                          <div className="text-sm font-black text-indigo-950 font-sans tracking-tight">
                            "{phrase.english}"
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
                            <span className="text-amber-800 font-bold">
                              발음 안내: [{phrase.pronunciationKorean}]
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 italic font-medium">
                          💡 {phrase.situationTip}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      검색 조건에 맞는 입출국 심사 영어 표현이 없습니다.
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Emergency & Safe Contacts */}
            <div className="p-5 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-3 shadow-md">
              <h4 className="text-xs font-bold text-rose-800 flex items-center space-x-1.5">
                <span className="text-base">🚨</span>
                <span>비상시 긴급 대처 수칙 & 연락망</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                  <strong className="text-rose-900 block mb-0.5">🇨🇳 대한민국 주상하이 총영사관</strong>
                  <span className="text-slate-600 font-medium">비상전화: +86-21-6295-5000 / 사건사고 당직실</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                  <strong className="text-rose-900 block mb-0.5">🚨 중국 현지 긴급 신고 번호</strong>
                  <span className="text-slate-600 font-medium">경찰 110 | 구급차(응급) 120 | 소방 119</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

