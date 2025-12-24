
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
    destroyPart?: keyof Body; // 특정 부위 파괴 (추가됨)
  };
}

/**
 * 시각적 효과(Visual Effect)의 종류
 */
export type VisualEffectType = 
  | 'flood' 
  | 'error' 
  | 'system_crash' 
  | 'emoji_swarm' 
  | 'emojiPopUp'
  | 'screen_crack'  
  | 'reality_tear'  
  | 'vhs_glitch'
  | 'quantum_ghost' 
  | 'data_leak'
  | 'neon_flicker'    // 신규: 네온 점멸
  | 'pixel_meltdown'  // 신규: 픽셀 흘러내림
  | 'hypnotic_loop';  // 신규: 최면 스파이럴

/**
 * 글리치 효과의 세부 설정
 */
export interface VisualEffectConfig {
  style: VisualEffectType; 
  duration?: number;       
  intensity?: number;      
  color?: string;          
  fontSize?: string;       
  speed?: number;          
  customEmojis?: string[]; 
  minEmojiSize?: number;   
  maxEmojiSize?: number;   
}

export interface MissionStage {
  id: string;
  description: string; 
  visualEffect?: {
    text: string;           
    type: VisualEffectType; 
    duration?: number;      
    intensity?: number;     
    color?: string;         
    fontSize?: string;      
    speed?: number;         
    customEmojis?: string[]; 
    minEmojiSize?: number;
    maxEmojiSize?: number;
  };
  choices: MissionChoice[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  stages: Record<string, MissionStage>; 
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
  effectConfig?: VisualEffectConfig;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  effect: 'hp' | 'sanity' | 'body' | 'gift';
  icon: string;
  targetNpcId?: string; // 선물용 아이템일 경우 대상 NPC ID
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
