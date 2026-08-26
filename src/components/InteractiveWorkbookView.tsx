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
  MapPin,
  CheckSquare,
  BookOpen,
  HelpCircle,
  PenTool,
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
  const [selectedLocFilter, setSelectedLocFilter] = useState<string>('all');
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
      '윤봉길 의사가 김구 선생에게 "제 시계는 6원을 주고 산 것인데 선생님 시계는 2원짜리이니 바꾸어 찹시다. 저는 이제 한 시간밖에 더 살지 못합니다"라고 담담히 미소 짓던 결단의 순간.'
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

    // Location-specific sample answers for all 8 destinations
    onAnswerChange(
      'loc_nanjing-road_1',
      '일제 감시망이 극에 달했던 시기, 수많은 외국인과 인파가 뒤섞이는 남경로 조계지의 백화점과 교회가 오히려 가장 은밀하고 안전한 비밀 접선지가 될 수 있었습니다.'
    );
    onAnswerChange(
      'loc_nanjing-road_2',
      '영안백화점 옥상에서 1921년 59인의 독립운동 지도자들이 찍은 [통합 임시정부 신년 하례회 사진]을 떠올리며, 분열을 넘어 대의를 위해 하나로 뭉친 단결의 힘을 배웠습니다.'
    );
    onAnswerChange(
      'loc_nanjing-road_notes',
      '보행자 거리 곳곳에 남아 있는 근대 석조 건물 양식을 관찰함. 목은당 교회의 붉은 벽돌 종탑이 조계지 시절의 비밀 외교망을 묵묵히 증언하고 있었음.'
    );

    onAnswerChange(
      'loc_the-bund_1',
      '오성륜, 김익상, 이종암 세 청년이 20대의 나이에 일제 군벌 수괴 다나카 기이치를 처단하기 위해 세운 치밀한 3단계 암살 작전도를 보며, 목숨을 아끼지 않은 의열투쟁의 결연함에 깊은 전율을 느꼈습니다.'
    );
    onAnswerChange(
      'loc_the-bund_2',
      '황푸강 너머 19세기 서양 석조 조계지(와이탄)와 21세기 초고층 마천루(푸동)가 마주보는 풍경 속에서, 침탈당했던 아픈 과거를 딛고 일어선 역사적 교훈과 자존감을 되새겨야겠다고 생각했습니다.'
    );
    onAnswerChange(
      'loc_the-bund_notes',
      '신고전주의 및 아르데코 양식의 웅장한 석조 기둥 스케치. 피해자였던 미국인 톰슨 부부조차 감형 탄원서를 낼 정도로 세계 언론에 울림을 준 황포탄 의거의 현장을 확인함.'
    );

    onAnswerChange(
      'loc_luxun-park_1',
      '자신의 꽃다운 청춘과 마지막 남은 한 시간을 조국의 독립과 미래 후손들의 평화를 위해 기꺼이 바칠 수 있었던 순수한 신념과 민족에 대한 뜨거운 사랑에서 나왔다고 생각합니다.'
    );
    onAnswerChange(
      'loc_luxun-park_2',
      '《맞바꾼 회중시계》 속 약속처럼, 편안함만을 좇지 않고 내 주변 이웃과 공동체의 어려움에 공감하며 올바른 정의를 위해 작은 용기를 실천하는 리더가 되겠습니다.'
    );
    onAnswerChange(
      'loc_luxun-park_notes',
      '매헌 기념관 흉상 앞에서 모둠원들과 함께 묵념을 올림. 2층 전시실에서 물통 폭탄 모형과 두 아들에게 남긴 친필 유언("피와 뼈가 있다면 용감한 투사가 되어라")을 정독함.'
    );

    onAnswerChange(
      'loc_provisional-government_1',
      '단 한 푼의 재정 지원도 부족한 낡은 붉은 벽돌집에서 13년을 버텨낸 힘은 "반드시 우리 손으로 독립을 이루겠다"는 불굴의 애국심과 주권 재민의 민주공화정 신념이었습니다.'
    );
    onAnswerChange(
      'loc_provisional-government_2',
      '백범 김구 선생이 꿈꾼 "오직 한없이 가지고 싶은 것은 높은 문화의 힘"은 오늘날 K-팝, K-무비, 한국의 따뜻한 민주주의와 글로벌 나눔으로 전 세계에 실현되고 있습니다.'
    );
    onAnswerChange(
      'loc_provisional-government_notes',
      '1층 회의실과 2층 김구 집무실의 낡은 책상, 태극기를 관찰함. 좁고 가파른 계단을 오르내리며 독립운동가들의 고단하면서도 숭고했던 일상을 가슴 깊이 체감함.'
    );

    onAnswerChange(
      'loc_oriental-pearl_1',
      '인공지능 기반 지능형 교통망과 100% 신재생 에너지 스마트 빌딩이 연결된 미래 도시는 에너지 낭비를 줄이고 인간의 삶을 안전하고 편리하게 바꿀 것입니다.'
    );
    onAnswerChange(
      'loc_oriental-pearl_2',
      '담양의 청정 대나무 숲과 생태 관광 인프라에 상하이의 첨단 친환경 스마트 시티 기술을 융합하여, 세계인이 찾아오는 "탄소중립 생태 스마트 도시 담양"을 만들고 싶습니다.'
    );
    onAnswerChange(
      'loc_oriental-pearl_notes',
      '259m 투명 스카이워크 유리 바닥 위에서 푸동의 마천루를 내려다봄. 도시계획전시관 초대형 디오라마에서 2050 상하이 미래 마스터플랜의 친환경 수변 개발 구역을 확인.'
    );

    onAnswerChange(
      'loc_yuyuan-garden_1',
      '담양 소쇄원이 자연의 지형을 거스르지 않는 소박하고 담백한 무작위의 미학이라면, 예원은 18년에 걸쳐 인공 돌산과 구곡교, 용 벽을 정교하게 조각한 화려한 강남 원림의 정수라는 차이가 있습니다.'
    );
    onAnswerChange(
      'loc_yuyuan-garden_2',
      '부모님과 가족들이 사계절 내내 편안하게 산책하며 자연의 아름다움을 누릴 수 있도록, 따뜻한 온기와 지혜로운 책이 가득한 "마음의 힐링 정원 도서관"을 설계하고 싶습니다.'
    );
    onAnswerChange(
      'loc_yuyuan-garden_notes',
      '지그재그로 아홉 번 꺾인 구곡교를 건너며 경치를 감상함. 기와로 섬세하게 조각된 용 벽(Dragon Wall)의 곡선미와 호심정 찻집의 운치를 스케치함.'
    );

    onAnswerChange(
      'loc_science-tech-museum_1',
      '로봇과 AI가 고도화될수록 공감 능력, 윤리적 판단력, 예술적 감수성, 사람의 마음을 잇는 따뜻한 소통 능력이 인간만의 대체 불가능한 핵심 경쟁력이 될 것입니다.'
    );
    onAnswerChange(
      'loc_science-tech-museum_2',
      '기후 위기를 해결하기 위한 친환경 청정 에너지 기술과 바이오 헬스케어 인공지능 연구에 도전하여 전 세계 취약계층의 삶을 개선하는 과학자가 되고 싶습니다.'
    );
    onAnswerChange(
      'loc_science-tech-museum_notes',
      '로봇 세상관에서 AI 오목 대결 및 댄스 로봇의 관절 서보모터 제어 메커니즘을 체험. 우주 탐사관에서 무중력 훈련 장비의 물리적 원리를 관찰함.'
    );

    onAnswerChange(
      'loc_disneyland_1',
      '디즈니의 비결은 단순한 놀이기구가 아니라, 모든 어트랙션에 관람객이 주인공이 되어 감정을 이입하게 만드는 탄탄하고 감동적인 [스토리텔링]에 있습니다.'
    );
    onAnswerChange(
      'loc_disneyland_2',
      '담양의 대나무 전설과 조선 선비들의 가사문학, 그리고 임시정부 청년들의 독립운동 서사를 결합한 실감형 역사 테마 어드벤처 콘텐츠를 기획해보고 싶습니다.'
    );
    onAnswerChange(
      'loc_disneyland_notes',
      '트론 라이트사이클의 리니어 모터 가속 공학과 마법의 성 일루미네이션 프로젝션 매핑 기술을 관찰. 문화 콘텐츠가 국경을 넘어 사람들에게 주는 벅찬 감동을 분석함.'
    );

    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    handleTriggerSave();
  };

  const completedStampsCount = profile.collectedStamps.length;

  const filteredDestinations =
    selectedLocFilter === 'all'
      ? DESTINATIONS_DATA
      : DESTINATIONS_DATA.filter((d) => d.id === selectedLocFilter);

  return (
    <section className="py-10 bg-slate-50 text-slate-800 min-h-screen print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-emerald-100">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 text-xs sm:text-sm font-bold mb-1">
              <span className="text-base">📋</span>
              <span>학생 개인 맞춤형 디지털 포트폴리오 & 장소별 현장 활동지</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              나의 글로컬 역사·문화 탐방 워크북 ✨
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadSampleData}
              className="px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm transition"
              title="8대 장소별 활동지 및 성찰 일지 예시 데이터를 자동으로 채워봅니다."
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
              <h3 className="text-sm font-bold text-rose-900 print:text-rose-800 flex items-center space-x-2">
                <span className="text-base">⏱️</span>
                <span>3. 《맞바꾼 회중시계》 연계 ‘자기 이해와 삶의 방향’ 종합 성찰 기록</span>
              </h3>
              <button
                onClick={() => onNavigateTab('books_learning')}
                className="print:hidden text-xs font-bold text-rose-700 hover:underline"
              >
                《맞바꾼 회중시계》 질문 가이드 다시 보기 ➔
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

          {/* SECTION 4: Location-Specific Field Activity Worksheets (장소별 활동지) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 print:border-slate-300 gap-2">
              <div>
                <h3 className="text-sm font-bold text-emerald-900 print:text-emerald-800 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>4. 상하이 8대 탐방지별 현장 탐구 활동지 (Field Missions & Worksheets)</span>
                </h3>
                <p className="text-[11px] text-slate-500 print:text-slate-600 mt-0.5">
                  장소별 핵심 미션 확인, 교과 연계 탐구 질문, 현장 관찰 및 성찰 노트를 꼼꼼히 기록합니다.
                </p>
              </div>

              {/* On-screen filter tabs (hidden in print so all 8 are printed) */}
              <div className="print:hidden flex items-center flex-wrap gap-1.5 pt-2 sm:pt-0">
                <button
                  onClick={() => setSelectedLocFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    selectedLocFilter === 'all'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  전체 (8개소)
                </button>
                {DESTINATIONS_DATA.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedLocFilter(d.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                      selectedLocFilter === d.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{d.emoji}</span>
                    <span className="hidden md:inline">{d.name.split(' ')[0]}</span>
                    <span className="md:hidden">{d.num}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Worksheets List */}
            <div className="space-y-6">
              {filteredDestinations.map((dest) => {
                const isStamped = profile.collectedStamps.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    className="p-5 rounded-2xl bg-white print:bg-white border border-slate-200 print:border-slate-300 shadow-sm space-y-4 break-inside-avoid"
                  >
                    {/* Destination Sheet Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                          {dest.num}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{dest.emoji}</span>
                            <h4 className="text-base font-black text-slate-900 print:text-black">
                              {dest.name}
                            </h4>
                            <span className="text-xs text-slate-400 font-normal">
                              ({dest.chineseName} · {dest.pinyin})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 print:text-slate-600 mt-0.5 font-medium">
                            🏷️ <span className="font-bold text-slate-700">{dest.tag}</span> | {dest.brief}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isStamped
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-50 text-slate-500 border-slate-200'
                          }`}
                        >
                          {isStamped ? '🏅 스탬프 획득 완료' : '미완료 스탬프'}
                        </span>
                      </div>
                    </div>

                    {/* Part A: Field Missions */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/50 print:bg-emerald-50/30 border border-emerald-100">
                      <span className="text-xs font-bold text-emerald-900 block mb-1.5 flex items-center space-x-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                        <span>현장 탐방 필수 미션 (Check Missions)</span>
                      </span>
                      <ul className="space-y-1.5">
                        {dest.missions.map((m, mIdx) => (
                          <li key={mIdx} className="text-xs text-slate-700 flex items-start space-x-2">
                            <span className="text-emerald-600 font-bold mt-0.5">•</span>
                            <span className="font-medium">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Part B: Curriculum Connections */}
                    {dest.curriculumLinks && dest.curriculumLinks.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-sky-50/50 print:bg-sky-50/30 border border-sky-100">
                        <span className="text-xs font-bold text-sky-900 block mb-1.5 flex items-center space-x-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                          <span>교과 연계 탐구 가이드 (Curriculum Link)</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {dest.curriculumLinks.map((c, cIdx) => (
                            <div key={cIdx} className="bg-white p-2.5 rounded-lg border border-sky-100">
                              <span className="inline-block font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded text-[10px] mr-1.5">
                                [{c.subject}] {c.topic}
                              </span>
                              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                                {c.activity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Part C: Key Reflection Questions (Direct Answers) */}
                    <div className="space-y-3 pt-1">
                      <span className="text-xs font-bold text-slate-900 print:text-black block flex items-center space-x-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>현장 탐구 & 성찰 질문 작성란 (Activity Questions)</span>
                      </span>

                      {dest.keyQuestions.map((qText, qIdx) => {
                        const qKey = `loc_${dest.id}_${qIdx + 1}`;
                        return (
                          <div key={qKey} className="space-y-1">
                            <label className="text-xs font-bold text-slate-800 print:text-slate-800 block">
                              Q{qIdx + 1}. {qText}
                            </label>
                            <textarea
                              rows={2}
                              placeholder="현장에서 관찰하고 느낀 생각을 구체적으로 작성하세요..."
                              value={profile.answers[qKey] || ''}
                              onChange={(e) => onAnswerChange(qKey, e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 print:bg-slate-50 border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-emerald-500 font-medium"
                            />
                          </div>
                        );
                      })}

                      {/* Extra Field Observation Notes */}
                      <div className="space-y-1 pt-1">
                        <label className="text-xs font-bold text-slate-700 print:text-slate-700 block flex items-center space-x-1">
                          <PenTool className="w-3 h-3 text-slate-400" />
                          <span>추가 현장 스케치 / 자유 관찰 기록 (Field Notes)</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="인상 깊었던 건물 양식, 전시물, 모둠원들과의 토론 내용, 사진 촬영 메모 등을 자유롭게 적어보세요..."
                          value={profile.answers[`loc_${dest.id}_notes`] || ''}
                          onChange={(e) => onAnswerChange(`loc_${dest.id}_notes`, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 print:bg-slate-50 border border-slate-300 print:border-slate-300 text-xs text-slate-900 print:text-black focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: Daily Reflection Logs (Day 1~4) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-300 space-y-4">
            <h3 className="text-sm font-bold text-emerald-900 print:text-emerald-800 flex items-center space-x-2">
              <span className="text-base">📅</span>
              <span>5. 일자별 현장 성찰 일지 (Daily Journal)</span>
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


