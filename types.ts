
export type MBTI = 
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export type Species = 
  | '인간' 
  | '오브젝트 헤드' 
  | '수인' 
  | '안드로이드' 
  | '초월체' 
  | '정령';

export type Gender = '남성' | '여성' | '무성' | '유동적';

export interface BodyPart {
  name: string;
  current: number;
  max: number;
  isVital: boolean;
}

export interface Body {
  head: BodyPart;
  neck: BodyPart;
  torso: BodyPart;
  leftArm: BodyPart;
  rightArm: BodyPart;
  leftLeg: BodyPart;
  rightLeg: BodyPart;
  leftEye: BodyPart;
  rightEye: BodyPart;
  leftEar: BodyPart;
  rightEar: BodyPart;
}

// --- Mission & Story Types ---

export interface MissionChoice {
  text: string;
  nextStageId: string | null; // null이면 임무 종료
  requiredStat?: 'strength' | 'sanity' | 'intelligence'; // 해당 스탯이 높으면 선택 확률 증가
  risk: 'low' | 'high' | 'fatal';
  reward?: {
    credits?: number;
    sanity?: number;
    hp?: number;
  };
}

/**
 * 시각적 효과(Visual Effect)의 종류
 * 
 * - `flood`: 텍스트가 화면을 뒤덮으며 증식하는 공포 효과 (예: "내 얼굴 내 얼굴...")
 * - `error`: 텍스트가 붉은색으로 점멸하며 경고음 같은 시각적 노이즈 발생
 * - `system_crash`: 치명적인 시스템 오류를 알리는 정적인 오버레이 (블루스크린 스타일)
 * - `emoji_swarm`: 기괴한 이모지들이 화면 전체를 뒤덮으며 증식하는 환각 효과
 * - `emojiPopUp`: 지정된 이모지들이 화면 곳곳에서 눈을 뜨듯이 튀어나오는 효과
 */
export type VisualEffectType = 'flood' | 'error' | 'system_crash' | 'emoji_swarm' | 'emojiPopUp';

/**
 * 글리치 효과의 세부 설정
 */
export interface VisualEffectConfig {
  style: VisualEffectType; // 효과 스타일
  duration?: number;       // 지속 시간 (ms)
  intensity?: number;      // 강도 (1~10)
  color?: string;          // 텍스트 색상 (Tailwind class, e.g., 'text-red-500')
  fontSize?: string;       // 텍스트 크기 (Tailwind class, e.g., 'text-xl', 'text-6xl')
  speed?: number;          // 텍스트 출력 간격 (ms). 낮을수록 빠름.
  customEmojis?: string[]; // emojiPopUp 등에서 사용할 커스텀 이모지 리스트
}

export interface MissionStage {
  id: string;
  description: string; // 나폴리탄/호러 지문
  // 스테이지 진입 시 발동할 시각적 효과 설정
  visualEffect?: {
    text: string;           // 화면에 출력될 텍스트
    type: VisualEffectType; // 효과 종류
    duration?: number;      // 지속 시간 (ms, 기본 2000)
    intensity?: number;     // 강도 (1~10, 기본 5)
    color?: string;         // 색상 (Tailwind class, 기본 text-red-600)
    fontSize?: string;      // 텍스트 크기 (선택 사항)
    speed?: number;         // 텍스트 출력 간격 (ms, 선택 사항)
    customEmojis?: string[]; // 이모지 팝업용 리스트
  };
  choices: MissionChoice[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  stages: Record<string, MissionStage>; // ID -> Stage
  initialStageId: string;
}

export interface Character {
  id: string;
  name: string;
  age: number;
  species: Species;
  gender: Gender;
  mbti: MBTI;
  
  // Base Stats
  maxHp: number;
  maxSanity: number; 
  sanity: number;    
  strength: number;
  
  // State
  body: Body;
  status: '생존' | '사망' | '광기';
  mentalState: string;
  
  // Active Mission State (New)
  activeMission?: {
    missionId: string;
    stageId: string;
    turnCount: number;
  } | null;

  // Relationships
  relationships: Record<string, string>; 
  affinities: Record<string, number>;    
  npcAffinities: Record<string, number>; 
  
  kills: number;
  anomaliesFixed: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  message: string;
  type: 'action' | 'combat' | 'system' | 'death' | 'dialogue' | 'growth' | 'mission' | 'glitch'; 
  characterId?: string;
  // 글리치 효과를 위한 추가 설정 (type이 'glitch'일 때 사용)
  effectConfig?: VisualEffectConfig;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  effect: 'hp' | 'sanity' | 'body';
  icon: string;
}

export interface CalendarEvent {
  id: string;
  year: number;
  month: number; 
  day: number;
  title: string;
  description?: string;
  type: 'critical' | 'standard' | 'holiday';
}
