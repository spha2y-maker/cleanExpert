import React, { useState } from 'react';
import { QUIZ_QUESTIONS, DESTINATIONS_DATA } from '../data/explorationData';
import { TabType } from '../types';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Camera,
  Target,
  RefreshCw,
  Trophy,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface QuizAndMissionsViewProps {
  onNavigateTab: (tab: TabType) => void;
}

export const QuizAndMissionsView: React.FC<QuizAndMissionsViewProps> = ({
  onNavigateTab,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<Record<number, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [missionChecked, setMissionChecked] = useState<Record<string, boolean>>({});

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optIndex: number) => {
    if (isAnswerSubmitted[currentQ.id]) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex,
    }));
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswers[currentQ.id] === undefined) return;
    setIsAnswerSubmitted((prev) => ({
      ...prev,
      [currentQ.id]: true,
    }));

    const isCorrect = selectedAnswers[currentQ.id] === currentQ.correctAnswer;
    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setIsAnswerSubmitted({});
    setCurrentQuestionIndex(0);
    setShowSummary(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const toggleMission = (id: string) => {
    setMissionChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fieldMissions = [
    {
      id: 'm-1',
      dest: '남경로',
      emoji: '🛍️',
      title: '1918 영안백화점 옥상 흔적 탐색',
      desc: '영안백화점(현 융안백화점) 건물을 배경으로 1921년 59인의 독립운동가를 기리는 사진 촬영',
    },
    {
      id: 'm-2',
      dest: '외탄 (와이탄)',
      emoji: '🏛️',
      title: '1922 의열단 3인조의 기개 재현',
      desc: '황포탄 부두 근처에서 푸동 스카이라인을 배경으로 당당한 독립투사의 포즈 취하기',
    },
    {
      id: 'm-3',
      dest: '루쉰공원',
      emoji: '🌸',
      title: '매헌 기념관 추모 방명록 작성',
      desc: '윤봉길 의사 흉상에 묵념하고 방명록에 담양 중학생의 진로와 다짐 한 줄 남기기',
    },
    {
      id: 'm-4',
      dest: '임시정부청사',
      emoji: '🇰🇷',
      title: '마당로 붉은 벽돌집 앞 단체 인증',
      desc: '대한민국 임시정부 현판과 태극기 앞에서 단정한 자세로 모둠 기념사진 촬영하기',
    },
    {
      id: 'm-5',
      dest: '동방명주',
      emoji: '🗼',
      title: '259m 투명 유리 스카이워크 챌린지',
      desc: '발아래 푸동의 도로와 마천루가 훤히 내려다보이는 유리 바닥 위에서 용기 있는 인증샷',
    },
    {
      id: 'm-6',
      dest: '예원 (豫園)',
      emoji: '🏮',
      title: '구곡교 & 용 벽(Dragon Wall) 찾기',
      desc: '아홉 번 꺾인 다리 구곡교를 건너며 용머리 기와 조각의 섬세한 미학 스케치하기',
    },
    {
      id: 'm-7',
      dest: '과학기술관',
      emoji: '🤖',
      title: '인공지능 로봇과의 한판 승부',
      desc: '로봇 세상 체험관에서 로봇과 오목/가위바위보 대결에 직접 참여해보기',
    },
    {
      id: 'm-8',
      dest: '디즈니랜드',
      emoji: '🏰',
      title: '마법의 성 앞 환한 미소 남기기',
      desc: '인챈티드 캐슬 앞에서 모둠원 전원의 얼굴이 활짝 나온 최고의 추억 사진 완성하기',
    },
  ];

  const completedMissionsCount = Object.values(missionChecked).filter(Boolean).length;

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3 shadow-sm">
            <span>🏆 상하이 탐방 마스터 챌린지</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            탐방 골든벨 퀴즈 & 현장 실천 미션 🎯
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            8대 방문지 자료 속 핵심 역사와 과학 상식을 퀴즈로 풀고, 현장에서 수행할 생생한 미션을 체크해 보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Gamified Quiz Console (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-xl">
              {!showSummary ? (
                <div>
                  {/* Quiz Progress Header */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-200 text-amber-900">
                        QUESTION {currentQuestionIndex + 1} / {totalQuestions}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        [{currentQ.destinationName}]
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {QUIZ_QUESTIONS.map((q, idx) => {
                        const isAnswered = isAnswerSubmitted[q.id];
                        const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                        const isCurrent = idx === currentQuestionIndex;

                        return (
                          <div
                            key={q.id}
                            className={`w-3 h-3 rounded-full transition-all ${
                              isCurrent
                                ? 'ring-2 ring-amber-500 bg-amber-400 scale-110'
                                : isAnswered
                                ? isCorrect
                                  ? 'bg-emerald-500'
                                  : 'bg-rose-400'
                                : 'bg-slate-200'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-relaxed">
                    {currentQ.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3 mb-6">
                    {currentQ.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQ.id] === optIdx;
                      const isSubmitted = isAnswerSubmitted[currentQ.id];
                      const isCorrect = optIdx === currentQ.correctAnswer;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50/50 hover:border-amber-300';
                      if (isSelected && !isSubmitted) {
                        btnStyle = 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-sm';
                      } else if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between shadow-xs ${btnStyle}`}
                        >
                          <div className="flex items-center space-x-3 pr-2">
                            <span className="w-6 h-6 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-700">
                              {optIdx + 1}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isSubmitted && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box when submitted */}
                  {isAnswerSubmitted[currentQ.id] && (
                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 mb-6 space-y-2 text-xs">
                      <div className="flex items-center space-x-1.5 text-emerald-900 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>💡 정답 해설:</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {currentQ.explanation}
                      </p>
                      <div className="text-[11px] text-sky-800 pt-2 border-t border-emerald-200 font-medium">
                        <strong>📖 교재 배경지식:</strong> {currentQ.historicalContext}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-end space-x-3 pt-2">
                    {!isAnswerSubmitted[currentQ.id] ? (
                      <button
                        disabled={selectedAnswers[currentQ.id] === undefined}
                        onClick={handleSubmitAnswer}
                        className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:pointer-events-none text-white font-black text-xs sm:text-sm shadow-md transition"
                      >
                        정답 제출하기 ✨
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition"
                      >
                        <span>
                          {currentQuestionIndex < totalQuestions - 1
                            ? '다음 문제로'
                            : '퀴즈 결과 보기'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Summary Results */
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-amber-200">
                    <Trophy className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-black text-amber-700 uppercase tracking-widest block mb-1">
                      CHALLENGE COMPLETE 🎉
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      탐방 골든벨 완료! 🏅
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
                      총 {totalQuestions}문제 중{' '}
                      <span className="text-amber-600 font-bold text-lg">
                        {calculateScore()}문제
                      </span>{' '}
                      정답을 맞혔습니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 max-w-md mx-auto text-xs text-slate-800">
                    {calculateScore() === totalQuestions ? (
                      <p className="text-emerald-800 font-bold">
                        🎉 축하합니다! 상하이 역사와 미래를 완벽하게 섭렵한 [특급 글로컬 리더]입니다! 🎋
                      </p>
                    ) : calculateScore() >= 5 ? (
                      <p className="text-sky-800 font-bold">
                        👍 훌륭합니다! 상하이의 주요 역사와 미래 기술을 깊이 이해하고 있습니다. ✨
                      </p>
                    ) : (
                      <p className="text-amber-800 font-bold">
                        📖 8대 방문지 가이드를 다시 한번 복습하고 만점에 재도전해 보세요! 🎈
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-3 pt-2">
                    <button
                      onClick={handleRestartQuiz}
                      className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>다시 풀기</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab('destinations')}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition shadow-md shadow-emerald-200"
                    >
                      방문지 가이드 복습하기 ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Field Action Missions Checklist (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <span className="text-base">📸</span>
                  <h3 className="text-base font-bold text-slate-900">현장 8대 인증 미션</h3>
                </div>
                <span className="text-xs font-bold text-emerald-800 font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                  {completedMissionsCount} / {fieldMissions.length}
                </span>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {fieldMissions.map((m) => {
                  const isChecked = !!missionChecked[m.id];
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleMission(m.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start space-x-3 shadow-xs ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50/40 hover:border-amber-200'
                      }`}
                    >
                      <button
                        className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5 transition border ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-sky-800">
                            [{m.dest}]
                          </span>
                          <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

