
import { CalendarEvent } from "../../types";

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    year: 3024,
    month: 9, // 10월
    day: 1,
    title: '제4차 차원 대전쟁 기념일',
    type: 'holiday',
    description: '구 세계가 멸망하고 디멘션 코퍼레이션이 설립된 날입니다.'
  },
  {
    id: 'e2',
    year: 3024,
    month: 9,
    day: 15,
    title: '정기 보안 감사',
    type: 'critical',
    description: '모든 요원의 정신 오염도를 전수 조사합니다.'
  },
  {
    id: 'e3',
    year: 3024,
    month: 10, // 11월
    day: 11,
    title: '신규 안드로이드 배치',
    type: 'standard',
    description: '제3 거주 구역에 신형 정찰 요원들이 배치됩니다.'
  }
];
