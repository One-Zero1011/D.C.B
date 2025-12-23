
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

export interface Character {
  id: string;
  name: string;
  age: number;
  species: Species;
  gender: Gender;
  mbti: MBTI;
  
  // Base Stats
  maxHp: number;
  sanity: number;
  strength: number;
  
  // State
  body: Body;
  status: '생존' | '사망' | '광기';
  mentalState: string;
  
  // Relationships
  relationships: Record<string, string>; // ID -> Label
  affinities: Record<string, number>;    // ID -> Value (-100 to 100)
  npcAffinities: Record<string, number>; // NPC ID -> Value (-100 to 100)
  
  kills: number;
  anomaliesFixed: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  message: string;
  type: 'action' | 'combat' | 'system' | 'death' | 'dialogue';
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
  month: number; // 0-11
  day: number;
  title: string;
  description?: string;
  type: 'critical' | 'standard' | 'holiday';
}
