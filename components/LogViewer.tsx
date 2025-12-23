import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  const [isFadingOut, setIsFadingOut] = useState(false); // 퇴장 애니메이션 상태
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 기본 설정값
  const defaultConfig: VisualEffectConfig = {
    style: 'error',
    duration: 3000,
    intensity: 5,
    color: 'text-red-600',
    fontSize: 'text-3xl' 
  };

  const config = log.effectConfig || defaultConfig;
  const fontSizeClass = config.fontSize || (config.style === 'flood' ? 'text-2xl' : 'text-4xl');

  useEffect(() => {
    let interval: number;
    let exitTimer: number;
    const style = config.style;
    const duration = config.duration || 3000;
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
    // --- 2. EMOJI POPUP: 동시 퇴장 로직 ---
    else if (style === 'emojiPopUp') {
        setDisplayText(log.message);
        // 전체 지속 시간에서 1초(퇴장 애니메이션 시간)을 뺀 시점에 페이드 아웃 시작
        const fadeStart = Math.max(500, duration - 1000); 
        exitTimer = window.setTimeout(() => {
            setIsFadingOut(true);
        }, fadeStart);
    }
    // --- 3. OTHERS ---
    else {
        setDisplayText(log.message);
    }

    // --- 자동 종료 타이머 (컴포넌트 언마운트) ---
    const timer = setTimeout(() => {
      if (interval) clearInterval(interval);
      onComplete(); // 부모에게 효과 종료 알림
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [log, config, onComplete]);

  // 이모지 스웜/팝업 효과를 위한 랜덤 파티클 생성 (메모이제이션)
  const emojiParticles = useMemo(() => {
    if (config.style !== 'emoji_swarm' && config.style !== 'emojiPopUp') return [];
    
    // 이모지 리스트 결정
    let emojis = ["👁️", "🧠", "🩸", "💀", "🦷", "👹", "👁️‍🗨️", "🕸️", "🦴", "🐛"];
    if (config.style === 'emojiPopUp' && config.customEmojis && config.customEmojis.length > 0) {
      emojis = config.customEmojis;
    } else if (config.style === 'emojiPopUp') {
      emojis = ["👁️", "👀", "⭕", "🧿", "🌕"];
    }

    const intensity = config.intensity || 5;
    const duration = config.duration || 3000;

    if (config.style === 'emojiPopUp') {
       // PopUp: 순차적 등장을 위한 계산
       const count = intensity * 4 + 3; // 강도에 따른 개수
       // 이모지가 모두 등장하는 데 걸리는 시간 (전체 시간의 70% 정도)
       const spawnWindow = duration * 0.7; 
       const staggerDelay = spawnWindow / count;

       return Array.from({ length: count }).map((_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length], // 순서대로 순환 혹은 랜덤
        // 화면 중앙을 기준으로 약간 퍼지게, 혹은 전체 화면 랜덤
        left: `${Math.random() * 80 + 10}%`, 
        top: `${Math.random() * 80 + 10}%`,
        size: `${Math.random() * 4 + 3}rem`, // 3~7rem (큼직하게)
        rotation: '0deg', 
        delay: i * staggerDelay, // 순차적 딜레이 (ms)
        opacity: 1
      }));
    } else {
      // Swarm: 기존 랜덤 로직
      const count = intensity * 15;
      return Array.from({ length: count }).map((_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        size: `${Math.random() * 3 + 2}rem`,
        rotation: `${Math.random() * 360}deg`,
        delay: Math.random() * 1500, // 랜덤 딜레이 (ms)
        opacity: Math.random() * 0.3 + 0.7
      }));
    }
  }, [config.style, config.intensity, config.customEmojis, config.duration]);

  // 스타일별 렌더링 분기

  // [Type: Emoji PopUp] - 순차적 등장 -> 가로찢기 애니메이션 -> 동시 퇴장
  if (config.style === 'emojiPopUp') {
    return (
      <div className={`fixed inset-0 z-[100] pointer-events-none overflow-hidden transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes grotesqueEyeOpen {
            0% { transform: scale(0.1, 0.0) rotate(90deg); opacity: 0; filter: blur(4px); }
            40% { transform: scale(0.6, 1.8); opacity: 0.8; } /* 세로로 길게 (눈 뜨기 시작) */
            60% { transform: scale(1.6, 0.4); opacity: 1; }   /* 가로로 찢어짐 (충격) */
            85% { transform: scale(0.9, 1.1); opacity: 1; }   /* 반동 */
            100% { transform: scale(1, 1) rotate(0deg); opacity: 1; filter: blur(0px); }
          }
        `}</style>
        
        {emojiParticles.map((particle) => (
          <div 
            key={particle.id}
            className="absolute flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
            style={{
              left: particle.left,
              top: particle.top,
              fontSize: particle.size,
              // 애니메이션 지속시간 0.6초, 딜레이 적용
              animation: `grotesqueEyeOpen 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
              animationDelay: `${particle.delay}ms`,
              opacity: 0, // 애니메이션 시작 전에는 안 보임
              zIndex: Math.floor(particle.delay) // 늦게 나오는게 위로
            }}
          >
            {particle.emoji}
          </div>
        ))}
        
        {/* 중앙 텍스트 (옵션) - 페이드아웃에 영향받지 않게 하거나 같이 사라지게 할 수 있음. 여기선 같이 사라짐 */}
        {log.message && (
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-black tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,0,0,1)] bg-black/70 px-6 py-4 rounded border border-red-500/30 ${config.color || 'text-white'} ${fontSizeClass} animate-in zoom-in duration-500`}>
            {log.message}
          </div>
        )}
      </div>
    );
  }

  // [Type: Emoji Swarm] - 화면 가득 기괴한 이모지 증식 (배경처럼 깔림)
  if (config.style === 'emoji_swarm') {
     return (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center overflow-hidden backdrop-blur-[2px] animate-in fade-in duration-200">
           {/* Background Emojis */}
           {emojiParticles.map((particle) => (
              <div 
                key={particle.id}
                className="absolute animate-pulse pointer-events-none select-none filter blur-[0.5px]"
                style={{
                   left: particle.left,
                   top: particle.top,
                   fontSize: particle.size,
                   transform: `rotate(${particle.rotation})`,
                   animationDelay: `${particle.delay}ms`,
                   opacity: particle.opacity
                }}
              >
                 {particle.emoji}
              </div>
           ))}
           
           {/* Center Text Message */}
           <div className={`relative z-10 font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-bounce ${config.color || 'text-red-500'} ${fontSizeClass}`}>
              {log.message}
           </div>
           
           {/* Vignette & Noise Overlay */}
           <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_20%,#000_120%)]"></div>
        </div>
     );
  }

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

  // [Type: System Crash] - BSOD 스타일
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

  // [Type: Error] - HUD 팝업 스타일
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
    const latestGlitch = [...logs].reverse().find(log => log.type === 'glitch');

    if (latestGlitch) {
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
      case 'glitch': return 'text-red-500/50 text-[10px] font-mono tracking-widest opacity-70';
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

      {/* 3. Visual Effect Overlay Layer */}
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