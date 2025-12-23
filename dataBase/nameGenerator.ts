
/**
 * 디멘션 코퍼레이션 요원 코드네임 생성기
 */

const PREFIXES = [
  "김", "박", "최", "강", "이", 
  "정", "조", "윤", "한", "오", 
  "신", "권", "황", "서", "문"
];

const SUFFIXES = [
  "서준", "서윤", "민준", "서연", "도윤", 
  "지우", "시우", "하윤", "예준", "서현",
  "하준", "하은", "지호", "민서", "연우",
  "주원", "지유", "지후", "도현", "윤서",
  "채원", "준우", "준서", "수아", "지아",
  "건우", "지민", "우진", "서아", "현우",
  "선우", "지윤", "은우", "예은", "소율",
  "민재", "서진", "이준", "현준", "예린",
  "수빈", "다은", "시은", "유진", "연서"
];

/**
 * 랜덤한 요원 식별명을 생성합니다.
 * 형식: [성]-[이름]
 */
export function generateAgentName(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  
  return `${prefix}${suffix}`;
}
