
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
  flood (텍스트 증식)
  - 설명: 지정된 텍스트가 화면 전체를 뒤덮으며 빠르게 증식합니다.
  - 특징: intensity에 따라 증식 속도와 양이 결정되며, 텍스트에 붉은색/파란색 잔상(text-shadow) 효과가 적용되어 정신 착란이나 시스템 폭주를 연출합니다.
  error (경고 팝업)
  - 설명: 화면 중앙에 붉은색 테두리의 HUD 스타일 경고창이 나타납니다.
  - 특징: "WARNING", "ERR-404", "Access Denied" 같은 문구와 함께 위험 아이콘이 뜨며, 노이즈(Scanline) 필터와 함께 깜빡이는(Pulse) 애니메이션이 적용됩니다.
  system_crash (블루스크린)
  - 설명: 화면 전체가 파란색(Blue Screen of Death)으로 바뀌며 치명적인 오류를 알립니다.
  - 특징: "FATAL_ERROR", 메모리 덤프 코드 등이 표시되며, 가장 강도가 높고 무거운 분위기의 시스템 붕괴를 연출할 때 사용됩니다.
  emoji_swarm (이모지 군집)
  - 설명: 기괴하거나 지정된 이모지들이 화면 전체(배경)에 무작위로 흩뿌려집니다.
  - 특징: 이모지들이 회전하거나 크기가 제각각이며, 화면 가장자리가 어두워지는 비네트 효과와 함께 환각을 보는 듯한 느낌을 줍니다.
  emojiPopUp (이모지 순차 팝업)
  - 설명: 지정된 이모지들이 시간차를 두고 화면 곳곳에서 튀어나옵니다.
  - 특징: (최근 수정됨) "눈을 뜨는" 듯한 애니메이션(세로로 길어졌다 가로로 찢어지며 등장)이 적용되어 있으며, 모든 이모지가 등장한 후 마지막에 동시에 서서히 사라집니다. 주로 "감시당하는 느낌"이나 "공포" 연출에 사용됩니다.
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
