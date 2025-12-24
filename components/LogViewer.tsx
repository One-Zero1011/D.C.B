import React, { useEffect, useRef, useState, useMemo } from 'react';
import { LogEntry, VisualEffectConfig } from '../types';
import { AlertTriangle, Terminal, XCircle, Skull } from 'lucide-react';

interface Props {
  logs: LogEntry[];
}

const VisualEffectOverlay: React.FC<{ log: LogEntry; onComplete: () => void }> = ({ log, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    else if (['emojiPopUp', 'screen_crack', 'reality_tear', 'vhs_glitch', 'quantum_ghost', 'data_leak'].includes(style)) {
        setDisplayText(log.message);
        const fadeStart = Math.max(500, duration - 1000); 
        exitTimer = window.setTimeout(() => {
            setIsFadingOut(true);
        }, fadeStart);
    }
    else {
        setDisplayText(log.message);
    }

    const timer = setTimeout(() => {
      if (interval) clearInterval(interval);
      onComplete(); 
    }, duration);

    return () => {
      if (interval) clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [log, config, onComplete]);

  const emojiParticles = useMemo(() => {
    if (config.style !== 'emoji_swarm' && config.style !== 'emojiPopUp') return [];
    
    let emojis = (config.customEmojis && config.customEmojis.length > 0)
      ? config.customEmojis
      : (config.style === 'emojiPopUp' 
          ? ["👁️", "👀", "⭕", "🧿", "🌕"] 
          : ["👁️", "🧠", "🩸", "💀", "🦷", "👹", "👁️‍🗨️", "🕸️", "🦴", "🐛"]);

    const intensity = config.intensity || 5;
    const duration = config.duration || 3000;

    const minSize = config.minEmojiSize || 48; 
    const maxSize = config.maxEmojiSize || 112; 

    if (config.style === 'emojiPopUp') {
       const count = intensity * 4 + 3; 
       const spawnWindow = duration * 0.7; 
       const staggerDelay = spawnWindow / count;

       return Array.from({ length: count }).map((_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        left: `${Math.random() * 80 + 10}%`, 
        top: `${Math.random() * 80 + 10}%`,
        size: `${Math.random() * (maxSize - minSize) + minSize}px`,
        rotation: '0deg', 
        delay: i * staggerDelay, 
        opacity: 1
      }));
    } else {
      const count = intensity * 15;
      return Array.from({ length: count }).map((_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        size: `${Math.random() * 48 + 32}px`,
        rotation: `${Math.random() * 360}deg`,
        delay: Math.random() * 1500, 
        opacity: Math.random() * 0.3 + 0.7
      }));
    }
  }, [config.style, config.intensity, config.customEmojis, config.duration, config.minEmojiSize, config.maxEmojiSize]);

  // --- Renderers ---

  if (config.style === 'reality_tear') {
    return (
      <div className={`fixed inset-0 z-[120] pointer-events-none transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes tearJagged {
            0% { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); opacity: 0; }
            10% { opacity: 1; }
            40% { clip-path: polygon(0 45%, 100% 40%, 100% 60%, 0 55%); }
            100% { clip-path: polygon(-10% 40%, 110% 35%, 110% 65%, -10% 60%); }
          }
          @keyframes codeFlow {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .tear-content {
            position: absolute;
            inset: 0;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            animation: tearJagged 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
            border-top: 2px solid rgba(168, 85, 247, 0.8);
            border-bottom: 2px solid rgba(168, 85, 247, 0.8);
            box-shadow: 0 0 50px rgba(168, 85, 247, 0.5);
          }
          .code-stream {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: rgba(168, 85, 247, 0.4);
            white-space: pre;
            line-height: 1;
            animation: codeFlow 10s linear infinite;
            user-select: none;
          }
        `}</style>
        <div className="tear-content">
          <div className="code-stream">
            {Array.from({ length: 50 }).map(() => (
              Math.random().toString(16).repeat(10) + "\n"
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-purple-900/20" />
          <div className="relative z-10 flex flex-col items-center">
             <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter drop-shadow-[0_0_20px_rgba(168,85,247,1)]">
                {log.message || "REALITY_TEAR"}
             </h2>
             <div className="mt-2 text-[10px] text-purple-400 font-mono tracking-[0.5em] animate-pulse">DIMENSIONAL_COLLAPSE_IN_PROGRESS</div>
          </div>
        </div>
      </div>
    );
  }

  if (config.style === 'quantum_ghost') {
    return (
      <div className={`fixed inset-0 z-[120] pointer-events-none transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes ghostShift {
            0% { transform: translate(-2px, -2px); opacity: 0.3; }
            50% { transform: translate(4px, 2px); opacity: 0.1; }
            100% { transform: translate(-2px, -2px); opacity: 0.3; }
          }
        `}</style>
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen" style={{ animation: 'ghostShift 0.1s infinite' }} />
        <div className="absolute inset-0 bg-red-500/5 mix-blend-screen" style={{ animation: 'ghostShift 0.15s infinite reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-8xl font-black text-white/5 uppercase tracking-tighter scale-150 rotate-12">{log.message}</h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className={`font-black uppercase tracking-[1em] ${config.color || 'text-white'} ${fontSizeClass} animate-pulse`}>
                {log.message}
            </h2>
        </div>
      </div>
    );
  }

  if (config.style === 'data_leak') {
    return (
      <div className={`fixed inset-0 z-[120] pointer-events-none transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes hexFall {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .hex-drop {
            position: absolute;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #f59e0b;
            white-space: nowrap;
            writing-mode: vertical-rl;
            animation: hexFall linear forwards;
          }
        `}</style>
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="hex-drop opacity-40" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Math.random().toString(16).substring(2, 10).toUpperCase()}
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 border border-amber-500/50 p-8 text-center backdrop-blur-md">
            <div className="text-amber-500 text-xs font-mono mb-2">CRITICAL_DATA_LEAK</div>
            <h2 className={`font-black uppercase tracking-widest ${config.color || 'text-amber-500'} ${fontSizeClass}`}>
              {log.message}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (config.style === 'screen_crack') {
    return (
      <div className={`fixed inset-0 z-[110] pointer-events-none transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes crackIn {
            0% { opacity: 0; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          .shard {
            position: absolute;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(2px) contrast(1.2) brightness(1.2);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
          }
        `}</style>
        <div className="shard inset-0" style={{ clipPath: 'polygon(0 0, 40% 0, 30% 40%, 0 30%)', animation: 'crackIn 0.1s ease-out forwards' }} />
        <div className="shard inset-0" style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 30%, 60% 50%, 30% 40%)', animation: 'crackIn 0.15s ease-out forwards' }} />
        <div className="shard inset-0" style={{ clipPath: 'polygon(100% 30%, 100% 100%, 50% 100%, 60% 50%)', animation: 'crackIn 0.2s ease-out forwards' }} />
        <div className="shard inset-0" style={{ clipPath: 'polygon(0 30%, 30% 40%, 60% 50%, 50% 100%, 0 100%)', animation: 'crackIn 0.05s ease-out forwards' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-80">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/40 stroke-[0.5] fill-none">
                <path d="M50 50 L20 10 M50 50 L80 15 M50 50 L95 60 M50 50 L60 90 M50 50 L10 80 M50 50 L5 40" />
                <circle cx="50" cy="50" r="2" fill="white" className="animate-pulse" />
            </svg>
        </div>

        {log.message && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className={`font-black uppercase tracking-[0.5em] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] ${config.color || 'text-white'} ${fontSizeClass} animate-in zoom-in duration-300`}>
              {log.message}
            </h2>
            <div className="text-red-500 text-xs font-mono mt-4 animate-pulse uppercase tracking-widest">Display Buffer Corruption Detected</div>
          </div>
        )}
      </div>
    );
  }

  if (config.style === 'vhs_glitch') {
    return (
      <div className={`fixed inset-0 z-[110] pointer-events-none bg-black/10 transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes vhsScan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes colorDistort {
             0% { filter: hue-rotate(0deg) saturate(2); }
             50% { filter: hue-rotate(10deg) saturate(3) brightness(1.2); }
             100% { filter: hue-rotate(0deg) saturate(2); }
          }
          .vhs-line {
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            animation: vhsScan 4s linear infinite;
          }
        `}</style>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="vhs-line" style={{ top: '20%', animationDelay: '0s' }} />
        <div className="vhs-line" style={{ top: '50%', animationDelay: '-1s' }} />
        <div className="vhs-line" style={{ top: '80%', animationDelay: '-2s' }} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ animation: 'colorDistort 0.2s steps(2) infinite' }}>
            <h2 className={`font-mono font-bold italic tracking-tighter ${config.color || 'text-white'} ${fontSizeClass} drop-shadow-[2px_0_0_rgba(255,0,0,0.8)]`}>
                PLAY ▶ {log.message}
            </h2>
            <div className="mt-2 text-[10px] text-white/40 font-mono tracking-widest">LN 404 // SP MODE // {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    );
  }

  if (config.style === 'emojiPopUp') {
    return (
      <div className={`fixed inset-0 z-[110] pointer-events-none overflow-hidden transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <style>{`
          @keyframes grotesqueEyeOpen {
            0% { transform: scale(0, 0); opacity: 0; filter: blur(8px); }
            30% { transform: scale(2.5, 0.2); opacity: 0.8; } 
            60% { transform: scale(0.2, 2.8); opacity: 1; }   
            85% { transform: scale(1.5, 0.6); opacity: 1; }   
            100% { transform: scale(1, 1); opacity: 1; filter: blur(0px); }
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
              animation: `grotesqueEyeOpen 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
              animationDelay: `${particle.delay}ms`,
              opacity: 0,
              zIndex: Math.floor(particle.delay) 
            }}
          >
            {particle.emoji}
          </div>
        ))}
        
        {log.message && (
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-black tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,0,0,1)] bg-black/70 px-6 py-4 rounded border border-red-500/30 ${config.color || 'text-white'} ${fontSizeClass} animate-in zoom-in duration-500`}>
            {log.message}
          </div>
        )}
      </div>
    );
  }

  if (config.style === 'emoji_swarm') {
     return (
        <div className="absolute inset-0 z-[110] bg-black/40 flex items-center justify-center overflow-hidden backdrop-blur-[2px] animate-in fade-in duration-200">
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
           <div className={`relative z-10 font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-bounce ${config.color || 'text-red-500'} ${fontSizeClass}`}>
              {log.message}
           </div>
           <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_20%,#000_120%)]"></div>
        </div>
     );
  }

  if (config.style === 'flood') {
    const shadowIntensity = (config.intensity || 5) * 0.5;
    return (
      <div className="absolute inset-0 z-[110] bg-black/95 flex flex-col justify-center items-center p-4 overflow-hidden backdrop-blur-sm animate-in fade-in duration-75">
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

  if (config.style === 'system_crash') {
    return (
      <div className="absolute inset-0 z-[110] bg-blue-900 flex flex-col p-8 font-mono text-white overflow-hidden animate-in zoom-in-95 duration-100">
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

  return (
      <div className="absolute inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         </div>
      </div>
  );
};

const LogViewer: React.FC<Props> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeEffectLog, setActiveEffectLog] = useState<LogEntry | null>(null);
  const lastTriggeredIdRef = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="bg-neutral-900 p-2 border-b border-amber-900/50 flex justify-between items-center shrink-0 relative z-10">
        <span className="text-amber-500/80 uppercase tracking-widest text-[13px]">작전 로그 // 실시간 피드</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150" />
        </div>
      </div>
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