
import { LogEntry, VisualEffectType, VisualEffectConfig } from "../types";

/**
 * 글리치 로그 생성 함수의 파라미터 옵션
 */
export interface VisualEffectOptions {
  /** 로그의 고유 ID (생략 시 자동 생성) */
  id?: string;
  /** 효과를 발생시킨 캐릭터 ID (선택 사항) */
  characterId?: string;
  /** 화면에 출력될 핵심 텍스트 메시지 */
  text: string;
  /** 
   * 효과의 종류 (types.ts 정의 참조)
   * - flood: 텍스트 증식
   * - error: 경고 점멸
   * - system_crash: 시스템 붕괴 화면
   */
  type: VisualEffectType;
  /** 
   * 효과 지속 시간 (ms). 기본값: 2000ms
   */
  duration?: number; 
  /**
   * 효과의 강도 (1 ~ 10).
   * flood: 텍스트 증식 속도와 양
   * error: 진동 세기 등
   * 기본값: 5
   */
  intensity?: number;
  /** 
   * 텍스트 색상 (Tailwind CSS 클래스). 
   * 예: 'text-red-500', 'text-green-400'
   * 기본값: 'text-red-600' 
   */
  color?: string;
  /**
   * 텍스트 크기 (Tailwind CSS 클래스).
   * 예: 'text-xl', 'text-4xl'
   * 기본값: style에 따라 다름
   */
  fontSize?: string;
  /**
   * 텍스트 출력 간격 (ms).
   * 값이 낮을수록 텍스트가 빠르게 증식합니다.
   * 기본값: intensity에 따라 자동 계산
   */
  speed?: number;
}

/**
 * 특수 시각 효과(글리치, 오류 화면 등)를 연출하기 위한 LogEntry를 생성하는 서비스 함수입니다.
 * 
 * @param options 효과 설정 옵션
 * @returns LogEntry 객체 (type: 'glitch')
 */
export function createVisualEffectLog(options: VisualEffectOptions): LogEntry {
  const {
    id = crypto.randomUUID(),
    characterId,
    text,
    type,
    duration = 2000,
    intensity = 5,
    color = 'text-red-600',
    fontSize,
    speed
  } = options;

  const effectConfig: VisualEffectConfig = {
    style: type,
    duration,
    intensity,
    color,
    fontSize,
    speed
  };

  return {
    id,
    timestamp: Date.now(),
    type: 'glitch',
    characterId,
    message: text,
    effectConfig
  };
}
