
import React, { useEffect, useRef, useState } from 'react';
import { LogEntry, VisualEffectConfig } from '../types';
import { AlertTriangle, Terminal, XCircle, Skull } from 'lucide-react';

interface Props {
  logs: LogEntry[];
}

// ----------------------------------------------------------------------
// Visual Effect Overlay Component
// 로그 리스트와 독립적으로 화면 전체를 덮거나 중앙에 뜨는 효과를 담당합니다.
// ----------------------------------------------------------------------
const VisualEffectOverlay: React.FC<{ log: LogEntry; onComplete: () => void }> = ({ log, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 기본 설정값
  const defaultConfig: VisualEffectConfig = {
    style: 'error',
    duration: 2000,
    intensity: 5,
    color: 'text-red-600',
    fontSize: 'text-3xl' 
  };

  const config = log.effectConfig || defaultConfig;
  const fontSizeClass = config.fontSize || (config.style === 'flood' ? 'text-2xl' : 'text-4xl');

  useEffect(() => {
    let interval: number;
    const style = config.style;
    const duration = config.duration || 2000;
    const intensity = config.intensity || 5;

    // --- 1. FLOOD: 텍스트 증식 효과 ---
    if (style === 'flood') {
      let count = 0;
      const maxCount = 100 * intensity; 
      const speed = config.speed !== undefined 
        ? config.speed 
        : Math.max(20, 80 - (intensity * 5)); 

      interval = window.setInterval(() => {
        setDisplayText(prev => prev + " " + log.message);
        count++;
        if (containerRef.current) {
           containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        if (count >= maxCount) clearInterval(interval);
      }, speed);
    } 
    // --- 2. ERROR & CRASH: 정적 텍스트 (타이핑 효과 없음) ---
    else {
        setDisplayText(log.message);
    }

    // --- 자동 종료 타이머 ---
    const timer = setTimeout(() => {
      if (interval) clearInterval(interval);
      onComplete(); // 부모에게 효과 종료 알림
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [log, config, onComplete]);

  // 스타일별 렌더링 분기

  // [Type: Flood] - 화면 전체를 뒤덮으며 텍스트 증식
  if (config.style === 'flood') {
    const shadowIntensity = (config.intensity || 5) * 0.5;
    return (
      <div className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 overflow-hidden backdrop-blur-sm animate-in fade-in duration-75">
        <div 
          ref={containerRef}
          className={`w-full h-full overflow-hidden font-black animate-pulse break-all font-mono leading-tight text-center flex items-center justify-center opacity-90 border-4 border-red-900/50 p-4 ${config.color} ${fontSizeClass}`}
          style={{ textShadow: `${shadowIntensity}px 0 red, -${shadowIntensity}px 0 blue` }}
        >
          {displayText}
        </div>
        <div className="absolute bottom-10 text-red-500/50 text-xs uppercase tracking-[0.5em] animate-bounce">
          System Error // Cognitive Hazard Detected
        </div>
      </div>
    );
  }

  // [Type: System Crash] - BSOD 스타일 (완전 불투명, 정적, 무거운 분위기)
  if (config.style === 'system_crash') {
    return (
      <div className="absolute inset-0 z-50 bg-blue-900 flex flex-col p-8 font-mono text-white overflow-hidden animate-in zoom-in-95 duration-100">
        <div className="mb-8">
            <span className="bg-white text-blue-900 px-2 font-bold text-lg">FATAL_ERROR</span>
        </div>
        <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{log.message}</h1>
            <div className="text-sm md:text-base opacity-80 space-y-1">
                <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</p>
                <p>The current application will be terminated.</p>
                <p className="mt-4 text-xs text-blue-200">
                    * Press any key to terminate the current application.<br/>
                    * Press CTRL+ALT+DEL again to restart your computer.<br/>
                    * You will lose any unsaved information in all applications.
                </p>
            </div>
            <div className="mt-8 font-mono text-xs opacity-50 break-words">
                Memory Dump: 
                {Array.from({length: 20}).map(() => Math.floor(Math.random()*16777215).toString(16).toUpperCase()).join(' ')}...
            </div>
        </div>
        <div className="animate-pulse text-center mt-auto text-lg">SYSTEM HALTED</div>
      </div>
    );
  }

  // [Type: Error] - HUD 팝업 스타일 (반투명, 깜빡임, 경고창 느낌)
  // config.style === 'error'
  return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
         <div className="relative max-w-lg w-full bg-black border-2 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] p-6 md:p-10 flex flex-col items-center text-center animate-pulse">
            <div className="absolute top-0 left-0 bg-red-600 text-black text-xs font-bold px-2 py-1">WARNING</div>
            <div className="absolute top-0 right-0 bg-red-600 text-black text-xs font-bold px-2 py-1">ERR-404</div>
            
            <AlertTriangle size={64} className="text-red-500 mb-6" />
            
            <h2 className={`font-black uppercase tracking-widest ${config.color} ${fontSizeClass} mb-4`}>
                {log.message}
            </h2>
            
            <div className="w-full h-px bg-red-900 mb-4" />
            
            <div className="flex flex-col gap-1 text-red-400/70 text-xs font-mono">
                <span>Access Denied</span>
                <span>Security Protocol Violation</span>
                <span>Tracing Origin... Failed</span>
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         </div>
      </div>
  );
};

// ----------------------------------------------------------------------
// Main LogViewer Component
// ----------------------------------------------------------------------
const LogViewer: React.FC<Props> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeEffectLog, setActiveEffectLog] = useState<LogEntry | null>(null);
  
  // 중복 실행 방지를 위한 ID 추적 Ref
  const lastTriggeredIdRef = useRef<string | null>(null);

  useEffect(() => {
    // 1. 자동 스크롤
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    // 2. 글리치 로그 감지 (배열의 끝에서부터 검색)
    // processTurn에서 여러 로그가 한 번에 추가될 때, glitch 로그가 마지막이 아닐 수 있음.
    const latestGlitch = [...logs].reverse().find(log => log.type === 'glitch');

    if (latestGlitch) {
      // 새로운 글리치 로그인지 확인 (ID 비교)
      if (lastTriggeredIdRef.current !== latestGlitch.id) {
        setActiveEffectLog(latestGlitch);
        lastTriggeredIdRef.current = latestGlitch.id;
      }
    }
  }, [logs]);

  const getTypeStyle = (type: LogEntry['type']) => {
    switch (type) {
      case 'combat': return 'text-red-400 border-l-2 border-red-500 pl-2';
      case 'death': return 'text-red-600 font-bold bg-red-950/20 p-1 border border-red-900';
      case 'system': return 'text-amber-300 italic';
      case 'dialogue': return 'text-cyan-300';
      case 'growth': return 'text-green-400 font-bold border-l-2 border-green-500 pl-2 bg-green-950/10'; 
      case 'mission': return 'text-purple-300 border-l-2 border-purple-500 pl-2 bg-purple-900/10 py-1';
      case 'glitch': return 'text-red-500/50 text-[10px] font-mono tracking-widest opacity-70'; // 리스트에 남는 흔적
      default: return 'text-neutral-300';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-black border border-amber-900/30 overflow-hidden font-mono text-sm shadow-[inset_0_0_20px_rgba(0,0,0,1)] rounded-sm relative">
      
      {/* 1. Header */}
      <div className="bg-neutral-900 p-2 border-b border-amber-900/50 flex justify-between items-center shrink-0 relative z-10">
        <span className="text-amber-500/80 uppercase tracking-widest text-[13px]">작전 로그 // 실시간 피드</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150" />
        </div>
      </div>
      
      {/* 2. Log List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-black relative z-0">
        {logs.length === 0 && (
          <div className="text-neutral-600 text-center italic mt-10">시뮬레이션 대기 중...</div>
        )}
        {logs.map((log) => {
            // Glitch 로그는 리스트에는 간단한 흔적만 남김 (실제 효과는 오버레이로 처리)
            if (log.type === 'glitch') {
                return (
                    <div key={log.id} className={getTypeStyle(log.type)}>
                        [SYSTEM_ERROR]: {log.message.substring(0, 30)}...
                    </div>
                );
            }
            return (
                <div key={log.id} className={`transition-opacity duration-500 animate-in fade-in slide-in-from-bottom-2 ${getTypeStyle(log.type)}`}>
                <span className="text-neutral-600 mr-2 text-[13px]">[{new Date(log.timestamp).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}]</span>
                {log.message}
                </div>
            );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 3. Visual Effect Overlay Layer (Always on top of Log List) */}
      {activeEffectLog && (
        <VisualEffectOverlay 
          log={activeEffectLog} 
          onComplete={() => setActiveEffectLog(null)} 
        />
      )}
    </div>
  );
};

export default LogViewer;
