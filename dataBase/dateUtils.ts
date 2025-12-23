
export const VIRTUAL_ERA = "DY"; // Dimension Year
export const YEAR_OFFSET = 1000;

export interface VirtualDate {
  year: number;
  month: number;
  day: number;
  weekDay: string;
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 실제 Date 객체를 가상 차원 날짜로 변환합니다.
 */
export function getVirtualDate(date: Date = new Date()): VirtualDate {
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
