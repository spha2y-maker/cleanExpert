import React, { useState } from 'react';
import { DESTINATIONS_DATA, LEARNING_ACTIVITY_STEPS } from '../data/explorationData';
import { StudentProfile, TabType } from '../types';
import confetti from 'canvas-confetti';
import {
  FileText,
  User,
  School,
  Award,
  Calendar,
  CheckCircle2,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  Heart,
  Compass,
  BookmarkCheck,
  Send,
} from 'lucide-react';

interface InteractiveWorkbookViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updates: Partial<StudentProfile>) => void;
  onAnswerChange: (id: string, val: string) => void;
  onToggleStamp: (destId: string) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const InteractiveWorkbookView: React.FC<InteractiveWorkbookViewProps> = ({
  profile,
  onUpdateProfile,
  onAnswerChange,
  onToggleStamp,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'profile' | 'stamps' | 'journal' | 'reflection'>('all');
  const [savedToast, setSavedToast] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleTriggerSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleLoadSampleData = () => {
    onUpdateProfile({
      name: '김죽향',
      school: '담양중학교',
      grade: '3학년',
      classNum: '1반',
      studentId: '15번',
      motto: '대나무처럼 곧게 서고, 세상의 바람에는 지혜롭고 유연하게!',
      myGoal: '상하이의 역사적 숨결을 가슴에 새기고, 나의 미래 진로(글로벌 문화 기획자)를 구체화하기',
      collectedStamps: ['nanjing-road', 'the-bund', 'luxun-park', 'provisional-government', 'oriental-pearl', 'yuyuan-garden', 'science-tech-museum', 'disneyland'],
      dailyLogs: {
        day1: '담양에서 출발해 상하이 푸동공항에 도착했을 때 가슴이 벅찼다. 남경로의 화려한 네온사인 뒤에서 100년 전 독립운동가들이 목숨 걸고 비밀 회합을 가졌다는 사실이 영화처럼 생생했다. 황포강 유람선에서 바라본 와이탄과 푸동의 대조는 잊을 수 없다.',
        day2: '매헌 윤봉길 의사의 24세 나이를 생각하니 지금의 나와 몇 살 차이 나지 않는 청년이었다는 생각에 숙연해졌다. 임시정부 청사 2층 김구 선생의 낡은 책상을 보며 국권 회복을 향한 굳은 신념을 배웠다.',
        day3: '과학기술관의 AI 로봇 체험과 동방명주 2050 스마트시티 모델을 보며 미래 기술의 속도감에 감탄했다. 디즈니랜드에서는 문화 콘텐츠가 사람의 마음을 움직이는 힘을 직접 체험했다.',
        day4: '3박 4일의 모든 일정을 마치고 담양으로 돌아오는 길, 이제 나는 단순한 중학생이 아니라 담양을 사랑하고 세계를 바라보는 글로컬 리더로 성장해야겠다고 다짐했다.',
      },
    });

    onAnswerChange(
      'val-1',
      '1) 정직: 어떤 유혹에도 흔들리지 않는 대나무의 곧은 중심.\n2) 유연성: 거센 바람에도 부러지지 않고 유연하게 적응하는 소통 능력.\n3) 용기: 윤봉길 의사처럼 옳은 가치를 위해 당당히 나아가는 실천력.'
    );
    onAnswerChange(
      'val-2',
      '새로운 문화와 기술 앞에서도 주눅 들지 않고 적극적으로 질문하고 탐구하는 능동적인 나 자신을 발견하고 싶습니다.'
    );
    onAnswerChange(
      'val-3',
      '윤봉길 의사가 김구 선생에게 "제 시계는 6원을 주고 산 것인데 선생님 시계는 2원짜리이니 바꾸어 찹시다. 저는 이제 한 시간밖에 더 살지 못합니다"라고 담담히 미소 짓던 장면.'
    );
    onAnswerChange(
      'val-4',
      '"선생님, 지금의 청소년들은 미래에 대한 불안이 많습니다. 흔들릴 때마다 무엇을 나침반 삼아야 할까요?"라고 묻고 싶습니다. 김구 선생님은 "마음 좋은 사람이 되어 네 이웃과 나라를 위해 작은 빛을 밝혀라"라고 격려해 주셨을 것 같습니다.'
    );
    onAnswerChange(
      'val-5',
      'AI 기반 스마트 모빌리티와 친환경 스마트 빌딩 기술. 도시가 환경을 파괴하지 않고 자연과 공존하는 2050 비전이 매우 인상적이었습니다.'
    );
    onAnswerChange(
      'val-6',
      '인간의 감성을 어루만지는 스토리텔링 문화 산업에 관심이 많습니다. 한국의 유구한 역사와 담양의 아름다운 전통문화를 글로벌 테마파크나 웹툰/영상으로 승화시키는 글로벌 문화 크리에이터가 되고 싶습니다.'
    );
    onAnswerChange(
      'val-7',
      '대나무의 굳센 기개로 내면을 채우고, 세계를 무대로 따뜻한 문화를 꽃피우자!'
    );
    onAnswerChange(
      'val-8',
      '2036년 10년 후, 나는 K-컬처와 지역 전통문화를 융합하여 전 세계에 한국의 아름다움을 알리는 글로벌 문화 기획자가 되어 있을 것입니다. 담양의 청소년들에게 더 넓은 세상을 선물하는 멘토가 되겠습니다.'
    );

    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    handleTriggerSave();
  };

  const completedStampsCount = profile.collectedStamps.length;

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-emerald-100">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 text-xs sm:text-sm font-bold mb-1">
              <span className="text-base">📋</span>
              <span>학생 개인 맞춤형 디지털 포트폴리오</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              나의 글로컬 역사·문화 탐방 워크북 ✨
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadSampleData}
              className="px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm transition"
              title="예시 답변 및 스탬프를 자동으로 채워봅니다."
            >
              🪄 예시 데이터 채우기
            </button>

            <button
              onClick={handlePrint}
              id="print-btn-action"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-200 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>🖨️ 인쇄 / PDF 저장</span>
            </button>
          </div>
        </div>

        {/* Printable Workbook Main Document Container */}
        <div className="space-y-8 bg-white print:bg-white print:text-black border border-emerald-100 print:border-slate-300 rounded-3xl p-6 sm:p-10 shadow-xl print:shadow-none">
          {/* Header Banner */}
          <div className="text-center pb-6 border-b-2 border-emerald-500/40">
            <span className="text-xs font-black text-emerald-700 print:text-emerald-800 tracking-wider uppercase">
              🎋 2026. 글로컬 죽향 역사·문화 탐방 학습 결과 보고서
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 print:text-black mt-1">
              상하이 탐방 & ‘자기 이해와 삶의 방향’ 워크북 🎒
            </h1>
            <p className="text-xs text-slate-500 print:text-slate-600 mt-1 font-medium">
              담양교육지원청 | 일시: 2026. 10. 13.(화) ~ 10. 16.(금) [3박 4일]
            </p>
          </div>

          {/* SECTION 1: Student Identification Info */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-300">
            <h3 className="text-sm font-bold text-sky-900 print:text-sky-800 flex items-center space-x-2 mb-4">
              <span className="text-base">👤</span>
              <span>1. 탐방 대원 인적 사항 & 나의 다짐</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  학교명
                </label>
                <input
                  type="text"
                  placeholder="예: 담양중"
                  value={profile.school}
                  onChange={(e) => onUpdateProfile({ school: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  학년
                </label>
                <input
                  type="text"
                  placeholder="3학년"
                  value={profile.grade}
                  onChange={(e) => onUpdateProfile({ grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  학반
                </label>
                <input
                  type="text"
                  placeholder="1반"
                  value={profile.classNum}
                  onChange={(e) => onUpdateProfile({ classNum: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  번호
                </label>
                <input
                  type="text"
                  placeholder="15번"
                  value={profile.studentId}
                  onChange={(e) => onUpdateProfile({ studentId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  이름 (성명)
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={profile.name}
                  onChange={(e) => onUpdateProfile({ name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-emerald-300 print:border-slate-300 text-xs font-bold text-emerald-800 print:text-emerald-700 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  나의 인생 좌우명 (Motto)
                </label>
                <input
                  type="text"
                  placeholder="예: 대나무처럼 바르게, 세상에는 유연하게!"
                  value={profile.motto}
                  onChange={(e) => onUpdateProfile({ motto: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 print:text-slate-600 block mb-1">
                  이번 탐방에서 꼭 이루고 싶은 나의 목표
                </label>
                <input
                  type="text"
                  placeholder="예: 역사적 현장에서 독립운동가의 용기를 배우고 미래 진로 방향 찾기"
                  value={profile.myGoal}
                  onChange={(e) => onUpdateProfile({ myGoal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: 8-Destination Stamp Tour Passport Board */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-amber-900 print:text-amber-800 flex items-center space-x-2">
                <span className="text-base">🏅</span>
                <span>2. 상하이 8대 명소 스탬프 투어 패스포트</span>
              </h3>
              <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                달성률: {completedStampsCount} / {DESTINATIONS_DATA.length} (
                {Math.round((completedStampsCount / DESTINATIONS_DATA.length) * 100)}%)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DESTINATIONS_DATA.map((dest) => {
                const isStamped = profile.collectedStamps.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    onClick={() => onToggleStamp(dest.id)}
                    className={`p-3.5 rounded-2xl text-center cursor-pointer transition-all border ${
                      isStamped
                        ? 'bg-emerald-50 print:bg-emerald-50 border-emerald-300 print:border-emerald-600 text-emerald-900 shadow-sm'
                        : 'bg-white print:bg-white border-slate-200 print:border-slate-300 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="text-2xl mb-1">{dest.emoji}</div>
                    <div className="text-xs font-bold truncate text-slate-900">{dest.name}</div>
                    <div className="text-[10px] font-mono mt-1 font-bold">
                      {isStamped ? '★ STAMP COMPLETE ★' : '미완료 (클릭)'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: 4-Step '자기 이해와 삶의 방향' Answers Review */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-300 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:border-slate-300">
              <h3 className="text-sm font-bold text-purple-900 print:text-purple-800 flex items-center space-x-2">
                <span className="text-base">💡</span>
                <span>3. 도서 연계 ‘자기 이해와 삶의 방향’ 종합 성찰 기록</span>
              </h3>
              <button
                onClick={() => onNavigateTab('books_learning')}
                className="print:hidden text-xs font-bold text-sky-700 hover:underline"
              >
                질문 가이드 다시 보기 ➔
              </button>
            </div>

            <div className="space-y-6">
              {LEARNING_ACTIVITY_STEPS.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-4 rounded-xl bg-white print:bg-white border border-slate-200 print:border-slate-300 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-800 print:text-sky-800">
                      STEP 0{st.stepNumber}. {st.title}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 print:text-slate-500">
                      {st.badge}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {st.questions.map((q) => (
                      <div key={q.id} className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 print:text-slate-800 block">
                          • {q.prompt}
                        </label>
                        <textarea
                          rows={3}
                          placeholder="내용을 기록하세요..."
                          value={profile.answers[q.id] || ''}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 print:bg-slate-50 border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-sky-500 font-medium"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: Daily Reflection Logs (Day 1~4) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-300 space-y-4">
            <h3 className="text-sm font-bold text-emerald-900 print:text-emerald-800 flex items-center space-x-2">
              <span className="text-base">📅</span>
              <span>4. 일자별 현장 성찰 일지 (Daily Journal)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-800 print:text-slate-700 block mb-1">
                  [제1일 10.13] 🌉 남경로 & 와이탄 야경 속 첫인상
                </label>
                <textarea
                  rows={4}
                  placeholder="1일차 탐방 소감과 느낀 점을 기록하세요..."
                  value={profile.dailyLogs.day1}
                  onChange={(e) =>
                    onUpdateProfile({
                      dailyLogs: { ...profile.dailyLogs, day1: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 print:text-slate-700 block mb-1">
                  [제2일 10.14] 🇰🇷 루쉰공원 윤봉길 의사 & 임시정부청사
                </label>
                <textarea
                  rows={4}
                  placeholder="2일차 역사적 감동과 나의 결심을 기록하세요..."
                  value={profile.dailyLogs.day2}
                  onChange={(e) =>
                    onUpdateProfile({
                      dailyLogs: { ...profile.dailyLogs, day2: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 print:text-slate-700 block mb-1">
                  [제3일 10.15] 🤖 과학기술관 첨단 미래 & 디즈니랜드
                </label>
                <textarea
                  rows={4}
                  placeholder="3일차 미래 과학과 문화 콘텐츠 체험 소감을 기록하세요..."
                  value={profile.dailyLogs.day3}
                  onChange={(e) =>
                    onUpdateProfile({
                      dailyLogs: { ...profile.dailyLogs, day3: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 print:text-slate-700 block mb-1">
                  [제4일 10.16] 🎋 귀국 후 총평 & 글로컬 실천 서약
                </label>
                <textarea
                  rows={4}
                  placeholder="탐방을 마치며 담양과 세상에 전하고 싶은 나의 약속을 기록하세요..."
                  value={profile.dailyLogs.day4}
                  onChange={(e) =>
                    onUpdateProfile({
                      dailyLogs: { ...profile.dailyLogs, day4: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white print:bg-white border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Box */}
          <div className="pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500 print:text-slate-600 font-medium">
              위 내용은 본인이 직접 탐방하고 성찰하여 작성한 진솔한 학습 포트폴리오임을 확인합니다.
            </p>
            <div className="mt-4 inline-flex items-center space-x-3 text-xs font-bold text-emerald-800 print:text-black">
              <span>작성자 성명: {profile.name || '( 미입력 )'}</span>
              <span>(서명 또는 인)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

