
import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface Props {
  logs: LogEntry[];
}

const LogViewer: React.FC<Props> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Using auto behavior for instant jump to bottom on fast logs
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getTypeStyle = (type: LogEntry['type']) => {
    switch (type) {
      case 'combat': return 'text-red-400 border-l-2 border-red-500 pl-2';
      case 'death': return 'text-red-600 font-bold bg-red-950/20 p-1 border border-red-900';
      case 'system': return 'text-amber-300 italic';
      case 'dialogue': return 'text-cyan-300';
      case 'growth': return 'text-green-400 font-bold border-l-2 border-green-500 pl-2 bg-green-950/10'; // New Growth Style
      default: return 'text-neutral-300';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-black border border-amber-900/30 overflow-hidden font-mono text-sm shadow-[inset_0_0_20px_rgba(0,0,0,1)] rounded-sm">
      <div className="bg-neutral-900 p-2 border-b border-amber-900/50 flex justify-between items-center shrink-0">
        <span className="text-amber-500/80 uppercase tracking-widest text-[13px]">작전 로그 // 실시간 피드</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-black">
        {logs.length === 0 && (
          <div className="text-neutral-600 text-center italic mt-10">시뮬레이션 대기 중...</div>
        )}
        {logs.map((log) => (
          <div key={log.id} className={`transition-opacity duration-500 animate-in fade-in slide-in-from-bottom-2 ${getTypeStyle(log.type)}`}>
            <span className="text-neutral-600 mr-2 text-[13px]">[{new Date(log.timestamp).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}]</span>
            {log.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default LogViewer;
