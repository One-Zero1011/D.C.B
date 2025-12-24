
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { db } from '../dataBase/manager';
import { YEAR_OFFSET, VIRTUAL_ERA, getInitialSimulationDate, getVirtualDate } from '../dataBase/dateUtils';
import { getEventsForMonth } from '../dataBase/calendarService';
import { CalendarEvent } from '../types';

interface Props {
  onClose: () => void;
}

const CalendarModal: React.FC<Props> = ({ onClose }) => {
  // 실제 날짜 대신 가상 시작 날짜를 기준으로 초기 달력 설정
  const start = getInitialSimulationDate();
  const virtualStartYear = start.getFullYear() + YEAR_OFFSET;

  // 현재 달력을 보여줄 기준 날짜 (가상 연도 기준)
  const [currentDate, setCurrentDate] = useState(new Date(virtualStartYear, start.getMonth(), start.getDate()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 실제 JS Date 객체를 사용하여 날짜 계산 (윤년 등 고려)
  // 가상 연도를 실제 연도로 잠시 변환하여 계산 로직 수행
  const baseDate = new Date(year - YEAR_OFFSET, month, 1);
  const firstDayOfMonth = baseDate.getDay();
  const daysInMonth = new Date(year - YEAR_OFFSET, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 서비스 함수를 통해 이벤트 로드
  const eventsInMonth = getEventsForMonth(year, month);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-amber-500/50 p-6 max-w-lg w-full shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-sm text-[15px] flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-4">
            <h2 className="text-xl font-serif text-amber-500 tracking-widest uppercase">차원 타임라인</h2>
            <button onClick={onClose} className="md:hidden text-amber-700 hover:text-amber-400 transition-colors"><X /></button>
          </div>

          <div className="flex justify-between items-center mb-4 px-2">
            <button onClick={prevMonth} className="text-amber-500/50 hover:text-amber-500 transition-colors"><ChevronLeft /></button>
            <span className="text-lg font-serif text-amber-200 tracking-wider">
              {VIRTUAL_ERA} {year}. {String(month + 1).padStart(2, '0')}
            </span>
            <button onClick={nextMonth} className="text-amber-500/50 hover:text-amber-500 transition-colors"><ChevronRight /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {weekDays.map(d => (
              <div key={d} className={`text-[10px] font-bold uppercase py-1 ${d === '일' ? 'text-red-500/70' : d === '토' ? 'text-blue-500/70' : 'text-amber-500/30'}`}>
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {paddingDays.map(i => <div key={`pad-${i}`} className="h-10" />)}
            {days.map(day => {
              // "오늘" 표시 로직: 가상 시작일과 일치하는 날짜
              // (실제 시뮬레이션의 '오늘'을 연동하려면 props로 받아야 하지만, 
              // 여기서는 캘린더 기본 뷰를 시작 날짜로 고정)
              const isToday = virtualStartYear === year && start.getMonth() === month && start.getDate() === day;
              const dayEvents = eventsInMonth.filter(e => e.day === day);
              
              return (
                <div
                  key={day}
                  onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
                  className={`h-10 border flex flex-col items-center justify-center relative transition-all group hover:border-amber-500/50 cursor-pointer
                    ${isToday ? 'border-amber-500 bg-amber-500/10 text-amber-100' : 'border-neutral-800/50 text-neutral-500'}
                    ${dayEvents.length > 0 ? 'bg-amber-900/10' : ''}`}
                >
                  <span className="text-xs z-10">{day}</span>
                  <div className="flex gap-0.5 mt-0.5">
                    {dayEvents.map(e => (
                      <div key={e.id} className={`w-1 h-1 rounded-full ${e.type === 'critical' ? 'bg-red-500' : e.type === 'holiday' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                    ))}
                  </div>
                  {isToday && <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-amber-500 animate-pulse" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-48 flex flex-col border-t md:border-t-0 md:border-l border-amber-900/20 pt-4 md:pt-0 md:pl-6">
          <div className="hidden md:flex justify-end mb-4">
             <button onClick={onClose} className="text-amber-700 hover:text-amber-400 transition-colors"><X /></button>
          </div>
          <h3 className="text-[11px] text-amber-500/50 uppercase tracking-widest mb-4 flex items-center gap-2"><Info size={12}/> 이벤트 상세</h3>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[200px] md:max-h-none custom-scrollbar">
            {selectedEvent ? (
              <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                <div className={`text-[10px] px-1.5 py-0.5 inline-block rounded-sm mb-2 border ${selectedEvent.type === 'critical' ? 'border-red-900 text-red-500 bg-red-950/20' : selectedEvent.type === 'holiday' ? 'border-blue-900 text-blue-500 bg-blue-950/20' : 'border-amber-900 text-amber-500 bg-amber-950/20'}`}>
                  {selectedEvent.type.toUpperCase()}
                </div>
                <h4 className="text-sm font-bold text-amber-100 mb-1">{selectedEvent.title}</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{selectedEvent.description}</p>
              </div>
            ) : (
              <div className="text-[11px] text-neutral-700 italic">날짜를 선택하여 이벤트를 확인하십시오.</div>
            )}
          </div>
          <div className="mt-auto pt-4 text-[9px] text-neutral-600 uppercase tracking-tighter">
            Dimension Time: {VIRTUAL_ERA} {year}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
