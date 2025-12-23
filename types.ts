
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

export interface MissionStage {
  id: string;
  description: string; // 나폴리탄/호러 지문
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
  type: 'action' | 'combat' | 'system' | 'death' | 'dialogue' | 'growth' | 'mission'; // mission 타입 추가
  characterId?: string;
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
