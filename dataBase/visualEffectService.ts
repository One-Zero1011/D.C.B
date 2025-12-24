import { LogEntry, VisualEffectType, VisualEffectConfig } from "../types";

/**
 * [ VisualEffectService 사용 가이드 ]
 * 
 * 이 서비스는 시뮬레이션 중 발생하는 특수 연출(글리치, 공포 효과, 시스템 오류)을 생성합니다.
 */

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
   * 효과의 종류
   */
  type: VisualEffectType;
  /** 효과 지속 시간 (ms). 기본값: 2000ms */
  duration?: number; 
  /**
   * 효과의 강도 (1 ~ 10).
   */
  intensity?: number;
  /** 
   * 텍스트 색상 (Tailwind CSS 클래스). 
   */
  color?: string;
  /**
   * 텍스트 크기 (Tailwind CSS 클래스).
   */
  fontSize?: string;
  /**
   * 텍스트 출력 간격 (ms).
   */
  speed?: number;
  /**
   * emojiPopUp 및 emoji_swarm 효과에서 사용할 커스텀 이모지 배열.
   */
  customEmojis?: string[];
  /**
   * emojiPopUp에서 사용할 이모지의 최소 크기 (px)
   */
  minEmojiSize?: number;
  /**
   * emojiPopUp에서 사용할 이모지의 최대 크기 (px)
   */
  maxEmojiSize?: number;
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
    speed,
    customEmojis,
    minEmojiSize,
    maxEmojiSize
  } = options;

  const effectConfig: VisualEffectConfig = {
    style: type,
    duration,
    intensity,
    color,
    fontSize,
    speed,
    customEmojis,
    minEmojiSize,
    maxEmojiSize
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