export type TabType = 'overview' | 'itinerary' | 'destinations' | 'books_learning' | 'workbook' | 'quiz' | 'toolkit';

export interface ScheduleItem {
  time: string;
  activity: string;
  location?: string;
  description?: string;
  iconType: 'bus' | 'flight' | 'walk' | 'food' | 'hotel' | 'landmark' | 'science' | 'fun';
  highlight?: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  route: string;
  transport: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  hotel: string;
  theme: string;
  schedule: ScheduleItem[];
  tips: string[];
}

export interface HistoricalEvent {
  title: string;
  year?: string;
  date?: string;
  people?: string[];
  summary: string;
  details: string[];
  significance: string;
}

export interface CurriculumLink {
  subject: string;
  topic: string;
  activity: string;
}

export interface CrossCurricularProject {
  title: string;
  steps: {
    session: string;
    subject: string;
    description: string;
  }[];
}

export interface Destination {
  id: string;
  num: number;
  name: string;
  chineseName: string;
  pinyin: string;
  category: 'history' | 'future' | 'culture' | 'city';
  tag: string;
  brief: string;
  highlightSummary: string;
  koreaConnection: string;
  thematicMeaning?: string;
  features: string[];
  historicalEvents?: HistoricalEvent[];
  curriculumLinks: CurriculumLink[];
  crossProject?: CrossCurricularProject;
  missions: string[];
  keyQuestions: string[];
  accentColor: string;
  emoji: string;
}

export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  gradeTarget: string;
  coreTheme: string;
  tagline: string;
  coverColor: string;
  icon: string;
  summary: string;
  connectionToTour: string;
  selfDiscoveryTopics: {
    question: string;
    guidance: string;
  }[];
  quotes: string[];
}

export interface ActivityStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  goal: string;
  badge: string;
  questions: {
    id: string;
    prompt: string;
    hint: string;
    type: 'text' | 'textarea' | 'tags' | 'ranking';
    options?: string[];
  }[];
}

export interface QuizQuestion {
  id: number;
  destinationId: string;
  destinationName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  historicalContext: string;
}

export interface ChinesePhrase {
  category: string;
  korean: string;
  chinese: string;
  pinyin: string;
  pronunciationKorean: string;
  situationTip: string;
}

export interface ChecklistItem {
  id: string;
  category: 'documents' | 'electronics' | 'clothing' | 'hygiene' | 'learning';
  label: string;
  essential: boolean;
  checked: boolean;
}

export interface StudentProfile {
  name: string;
  school: string;
  grade: string;
  classNum: string;
  studentId: string;
  motto: string;
  favoriteDestination: string;
  myGoal: string;
  collectedStamps: string[];
  quizScore: number;
  answers: Record<string, string>;
  dailyLogs: {
    day1: string;
    day2: string;
    day3: string;
    day4: string;
  };
}
