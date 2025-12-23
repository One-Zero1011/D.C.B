
import { Character, Body, LogEntry } from '../types';
import { db } from './manager';

// --- Constants (밸런스 조절용 상수) ---

export const SIMULATION_CONSTANTS = {
  // 이벤트 발생 확률 (총합 1.0)
  PROB_ANOMALY: 0.45,    // 45%
  PROB_INTERACTION: 0.40,// 40%
  // 나머지 15%는 대기(Idle)
  
  // 성공 확률 보정 계수
  SUCCESS_DIVIDER: 200,  // (Strength + Sanity) / 200
  
  // 데미지 관련
  DAMAGE_MIN: 5,
  DAMAGE_MAX: 25,
  SANITY_DAMAGE_THRESHOLD: 20, // 이 이상의 물리 데미지를 입으면 정신력 감소
  SANITY_DAMAGE_VALUE: 10,
  
  // 보상 관련
  REWARD_SANITY_SUCCESS: 2,
  REWARD_AFFINITY_NPC: 1,
  
  // 상호작용 관련
  INTERACTION_BASE_CHANCE: 0.6, // 기본 긍정 확률 60%
  INTERACTION_AFFINITY_WEIGHT: 200, // 호감도 영향 가중치
  INTERACTION_POSITIVE_BONUS: { affinity: 5, sanity: 5 },
  INTERACTION_NEGATIVE_PENALTY: { affinity: -8, sanity: 5 }
};

// --- Helper Functions ---

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * 이번 턴에 발생할 이벤트 타입을 결정합니다.
 */
export function determineEventType(): 'anomaly' | 'interaction' | 'idle' {
  const roll = Math.random();
  if (roll < SIMULATION_CONSTANTS.PROB_ANOMALY) return 'anomaly';
  if (roll < SIMULATION_CONSTANTS.PROB_ANOMALY + SIMULATION_CONSTANTS.PROB_INTERACTION) return 'interaction';
  return 'idle';
}

/**
 * 물리적 데미지를 캐릭터에게 적용하고 결과를 반환합니다.
 */
export function applyPhysicalDamage(char: Character, damage: number): { char: Character; logs: string[] } {
  const newChar = { ...char, body: { ...char.body } };
  const logs: string[] = [];
  
  const parts: (keyof Body)[] = [
    'head', 'neck', 'torso', 
    'leftArm', 'rightArm', 
    'leftLeg', 'rightLeg', 
    'leftEye', 'rightEye', 
    'leftEar', 'rightEar'
  ];
  
  const targetPartKey = pick(parts);
  const targetPart = { ...newChar.body[targetPartKey] };
  
  targetPart.current = Math.max(0, targetPart.current - damage);
  newChar.body[targetPartKey] = targetPart;
  logs.push(`${char.name}의 ${targetPart.name} 부위에 ${damage}의 충격.`);

  if (targetPart.name === '목' && targetPart.current <= 0) {
    newChar.status = '사망';
    if (Math.random() < 0.25) {
      // 25% 확률로 실행됨
      logs.push(`치명적 손상: ${char.name}의 목이 절단됨. 생명 반응 소실.`);
    } else if (Math.random() >= 0.25 && Math.random() < 0.5) {
      // 25% 확률로 실행됨
      logs.push(`치명적 손상: ${char.name}의 경추 및 연부 조직이 완전히 짓이겨짐. 생존 가능성 전무.`);
    } else if (Math.random() >= 0.5 && Math.random() < 0.75) {
      // 25% 확률로 실행됨
      logs.push(`치명적 손상: ${char.name}의 경추가 도려내짐. 생존 가능성 0%.`);
    } else {
      // 25% 확률로 실행됨
      logs.push(`치명적 손상: ${char.name}의 목 조직이 완전히 유실됨. 생명 신호 소멸.`);
    }
  } else if (targetPart.name === '머리' && targetPart.current <= 0) {
    newChar.status = '사망';
    if (Math.random() < 0.25) {
      logs.push(`치명적 손상: ${char.name}의 머리가 절단됨. 생명 반응 소실.`);
    } else if (Math.random() >= 0.25 && Math.random() < 0.5) {
      logs.push(`치명적 손상: ${char.name}의 머리가 완전히 유실됨. 생존 가능성 전무.`);
    } else if (Math.random() >= 0.5 && Math.random() < 0.75) {
      logs.push(`치명적 손상: ${char.name}의 머리가 완전히 으스러짐. 생존 가능성 0%.`);
    } else{
      logs.push(`치명적 손상: ${char.name}의 머리가 완전히 관통됨. 생명 신호 소멸.`);
    }
  } else if (targetPart.name === '몸통' && targetPart.current <= 0) {
    newChar.status = '사망';
    if (Math.random() < 0.25) {
      logs.push(`치명적 손상: ${char.name}의 복부가 깊게 절개됨. 생명 반응 소실.`);
    } else if (Math.random() >= 0.25 && Math.random() < 0.5) {
      logs.push(`치명적 손상: ${char.name}의 몸통이 함몰됨. 생존 가능성 전무.`);
    } else if (Math.random() >= 0.5 && Math.random() < 0.75) {
      logs.push(`치명적 손상: ${char.name}의 몸통 조직 괴멸 및 붕괴됨. 생존 가능성 0%.`);
    } else{
      logs.push(`치명적 손상: ${char.name}의 흉곽 붕괴 및 장기 파열. 생명 신호 소멸.`);
    }
  } else if (targetPart.current <= 0) {
    logs.push(`${char.name}의 ${targetPart.name} 기능 정지.`);
  }

  if (damage > SIMULATION_CONSTANTS.SANITY_DAMAGE_THRESHOLD) {
    newChar.sanity = Math.max(0, newChar.sanity - SIMULATION_CONSTANTS.SANITY_DAMAGE_VALUE);
    logs.push(`정신적 충격으로 인해 ${char.name}의 정신력이 감소했습니다.`);
  }

  return { char: newChar, logs };
}

/**
 * 이상 현상 해결 시도 결과를 계산합니다.
 */
export function resolveAnomalyOutcome(actor: Character): { success: boolean; damage: number } {
  const successChance = (actor.strength + actor.sanity) / SIMULATION_CONSTANTS.SUCCESS_DIVIDER;
  const isSuccess = Math.random() < successChance;
  
  let damage = 0;
  if (!isSuccess) {
    damage = Math.floor(Math.random() * (SIMULATION_CONSTANTS.DAMAGE_MAX - SIMULATION_CONSTANTS.DAMAGE_MIN)) + SIMULATION_CONSTANTS.DAMAGE_MIN;
  }

  return { success: isSuccess, damage };
}

/**
 * 캐릭터 간 상호작용 결과를 계산합니다.
 */
export function resolveInteractionOutcome(actor: Character, target: Character): { isPositive: boolean } {
  const currentAffinity = actor.affinities[target.id] || 0;
  const chance = SIMULATION_CONSTANTS.INTERACTION_BASE_CHANCE + (currentAffinity / SIMULATION_CONSTANTS.INTERACTION_AFFINITY_WEIGHT);
  return { isPositive: Math.random() < chance };
}
