import React, { useState, useEffect } from 'react';
import { TabType, StudentProfile } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ItineraryView } from './components/ItineraryView';
import { DestinationsView } from './components/DestinationsView';
import { BooksAndLearningView } from './components/BooksAndLearningView';
import { InteractiveWorkbookView } from './components/InteractiveWorkbookView';
import { QuizAndMissionsView } from './components/QuizAndMissionsView';
import { TravelToolkitView } from './components/TravelToolkitView';
import { DESTINATIONS_DATA } from './data/explorationData';
import {
  Compass,
  Calendar,
  Landmark,
  BookOpen,
  Award,
  Luggage,
  Sparkles,
  Heart,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const INITIAL_PROFILE: StudentProfile = {
  name: '',
  school: '담양 관내 중학교',
  grade: '3학년',
  classNum: '',
  studentId: '',
  motto: '',
  favoriteDestination: '',
  myGoal: '',
  collectedStamps: [],
  quizScore: 0,
  answers: {},
  dailyLogs: {
    day1: '',
    day2: '',
    day3: '',
    day4: '',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Student Profile & Workbook state with localStorage persistence
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('jukhyang_student_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jukhyang_student_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  const handleUpdateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  const handleToggleStamp = (destId: string) => {
    setProfile((prev) => {
      const isAlreadyStamped = prev.collectedStamps.includes(destId);
      const updatedStamps = isAlreadyStamped
        ? prev.collectedStamps.filter((id) => id !== destId)
        : [...prev.collectedStamps, destId];

      return {
        ...prev,
        collectedStamps: updatedStamps,
      };
    });
  };

  const handleOpenPrint = () => {
    setActiveTab('workbook');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Sticky Modern Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentName={profile.name}
        stampsCount={profile.collectedStamps.length}
        totalStamps={DESTINATIONS_DATA.length}
        onOpenPrint={handleOpenPrint}
      />

      {/* Main Content Area */}
      <main>
        {activeTab === 'overview' && (
          <div>
            <HeroSection
              onNavigate={setActiveTab}
              stampsCount={profile.collectedStamps.length}
              totalStamps={DESTINATIONS_DATA.length}
            />

            {/* Overview Content Highlights */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
              {/* Feature Grid 1: Overview of 4 Pillars */}
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-2 px-3 py-1 bg-emerald-100 rounded-full border border-emerald-300 w-fit mx-auto shadow-xs">
                  ✨ EXPLORATION ARCHITECTURE ✨
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
                  2026 글로컬 죽향 역사·문화 탐방의 4대 가치 🌟
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
                  단순한 관광을 넘어 역사적 성찰, 과학적 영감, 글로벌 감각, 그리고 내면의 성장을 완성합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => setActiveTab('destinations')}
                  className="p-6 rounded-3xl bg-white border border-rose-100 hover:border-rose-400 cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                    🇰🇷
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition mb-2">
                    1. 독립투혼의 숨결
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    상하이 임시정부청사(마당로 붉은 벽돌집), 루쉰공원 윤봉길 의사 매헌기념관, 1922 황포탄 의열단 3인조의 기개를 생생히 마주합니다.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('destinations')}
                  className="p-6 rounded-3xl bg-white border border-sky-100 hover:border-sky-400 cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                    🗼
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition mb-2">
                    2. 2050 스마트 미래
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    높이 468m 동방명주 전망대와 도시계획전시관을 통해 동아시아 미래 스마트시티의 청사진과 첨단 건축 기술을 관찰합니다.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('books_learning')}
                  className="p-6 rounded-3xl bg-white border border-amber-100 hover:border-amber-400 cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                    📚
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition mb-2">
                    3. 자기 이해와 삶의 방향
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    《백범일지》, 《윤봉길 평전》, 《미래 과학 콘서트》 등 중학생 맞춤 도서를 읽고 나만의 10년 후 인생 비전 선언서를 완성합니다.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('destinations')}
                  className="p-6 rounded-3xl bg-white border border-purple-100 hover:border-purple-400 cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                    🏰
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition mb-2">
                    4. 글로벌 문화와 테마파크
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    아시아 최대 상하이 디즈니랜드와 예원 옛거리에서 K-컬처와 글로벌 스토리텔링 산업의 힘을 온몸으로 체험합니다.
                  </p>
                </div>
              </div>

              {/* Action Banner to Itinerary and Destinations */}
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-50 to-sky-100 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-black text-emerald-800 bg-white/90 px-3 py-1 rounded-full border border-emerald-300 shadow-xs">
                    🚀 START LEARNING JOURNEY 🎒
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    지금 바로 8대 방문지와 3박 4일 일정을 탐험해 보세요!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-xl font-medium">
                    담양에서 시작하여 인천공항을 거쳐 상하이 전역을 잇는 풍성한 교과 연계 프로젝트와 학생용 디지털 워크북이 준비되어 있습니다.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md transition transform hover:scale-105"
                  >
                    일정표 보러가기 🗓️
                  </button>
                  <button
                    onClick={() => setActiveTab('destinations')}
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition transform hover:scale-105"
                  >
                    8대 방문지 둘러보기 🗺️
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView
            onSelectDestination={(id) => {
              setActiveTab('destinations');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'destinations' && (
          <DestinationsView
            collectedStamps={profile.collectedStamps}
            onToggleStamp={handleToggleStamp}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'books_learning' && (
          <BooksAndLearningView
            answers={profile.answers}
            onAnswerChange={handleAnswerChange}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'workbook' && (
          <InteractiveWorkbookView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onAnswerChange={handleAnswerChange}
            onToggleStamp={handleToggleStamp}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizAndMissionsView onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'toolkit' && <TravelToolkitView />}
      </main>

      {/* Global Modern Footer */}
      <footer className="print:hidden bg-white border-t border-slate-200 text-slate-600 py-10 mt-16 text-xs shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-xl shadow-xs">
              🎋
            </div>
            <div>
              <p className="font-bold text-slate-800">
                2026. 글로컬 죽향 역사·문화 탐방 교육 프로그램
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                전라남도 담양교육지원청 | 중학교 3학년 대상 자기 이해 및 삶의 방향 진로 탐구 웹북
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className="hover:text-emerald-600 text-slate-600 transition"
            >
              🗓️ 3박 4일 일정표
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('destinations')}
              className="hover:text-emerald-600 text-slate-600 transition"
            >
              🗺️ 8대 방문지 가이드
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('books_learning')}
              className="hover:text-emerald-600 text-slate-600 transition"
            >
              📚 추천도서 & 진로학습
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('workbook')}
              className="hover:text-emerald-600 text-slate-600 transition"
            >
              ✏️ 나의 워크북
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('toolkit')}
              className="hover:text-emerald-600 text-slate-600 transition"
            >
              🗣️ 중국어 회화
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center md:text-right font-medium">
            <span>© 2026 Glocal Jukhyang Exploration. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
