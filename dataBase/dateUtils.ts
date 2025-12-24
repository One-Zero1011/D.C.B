
export const VIRTUAL_ERA = "DY"; // Dimension Year
export const YEAR_OFFSET = 1000;

export interface VirtualDate {
  year: number;
  month: number;
  day: number;
  weekDay: string;
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 시뮬레이션 고정 시작 날짜: 2024년 9월 1일 (가상 연도 3024년)
const FIXED_START_DATE = new Date(2024, 8, 1); 

/**
 * 시뮬레이션의 초기화 날짜를 반환합니다.
 */
export function getInitialSimulationDate(): Date {
  return new Date(FIXED_START_DATE);
}

/**
 * 실제 Date 객체를 가상 차원 날짜로 변환합니다.
 * date 인자가 없으면 고정된 시작 날짜를 사용합니다.
 */
export function getVirtualDate(date: Date = getInitialSimulationDate()): VirtualDate {
  return {
    year: date.getFullYear() + YEAR_OFFSET,
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekDay: WEEK_DAYS[date.getDay()],
  };
}

/**
 * 가상 날짜를 "DY 3025.10.11(토)" 형식으로 포맷팅합니다.
 */
export function formatVirtualDate(vDate: VirtualDate): string {
  const m = String(vDate.month).padStart(2, '0');
  const d = String(vDate.day).padStart(2, '0');
  return `${VIRTUAL_ERA} ${vDate.year}.${m}.${d}(${vDate.weekDay})`;
}
