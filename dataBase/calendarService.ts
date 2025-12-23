
import { CalendarEvent } from "../types";
import { db } from "./manager";

/**
 * 캘린더에 새로운 이벤트를 등록합니다.
 * 어느 컴포넌트에서든 호출하여 시스템 이벤트나 시뮬레이션 이벤트를 추가할 수 있습니다.
 */
export function registerCalendarEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
  const newEvent = db.addCalendarEvent(event);
  console.log(`[CalendarService] New Event Registered: ${newEvent.title} at ${newEvent.year}-${newEvent.month + 1}-${newEvent.day}`);
  return newEvent;
}

/**
 * 특정 연도와 월에 해당하는 모든 이벤트를 가져옵니다.
 */
export function getEventsForMonth(year: number, month: number): CalendarEvent[] {
  return db.getCalendarEvents().filter(e => e.year === year && e.month === month);
}
