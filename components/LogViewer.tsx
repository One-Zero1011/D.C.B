
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { LogEntry, VisualEffectConfig } from '../types';
import { NeonFlicker } from '../dataBase/visualEffect/NeonFlicker';
import { PixelMeltdown } from '../dataBase/visualEffect/PixelMeltdown';
import { HypnoticLoop } from '../dataBase/visualEffect/HypnoticLoop';
import { RealityTear } from '../dataBase/visualEffect/RealityTear';
import { VHSGlitch } from '../dataBase/visualEffect/VHSGlitch';
import { EmojiPopUp } from '../dataBase/visualEffect/EmojiPopUp';
import { Flood } from '../dataBase/visualEffect/Flood';
import { SystemCrash } from '../dataBase/visualEffect/SystemCrash';
import { DefaultError } from '../dataBase/visualEffect/DefaultError';

interface Props {
  logs: LogEntry[];
  onEffectStateChange?: (active: boolean) => void;
}

const VisualEffectOverlay: React.FC<{ log: LogEntry; onComplete: () => void }> = ({ log, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);
  
  const config = log.effectConfig || {
    style: 'error',
    duration: 3000,
    intensity: 5,
    color: 'text-red-600',
    fontSize: 'text-3xl' 
  } as VisualEffectConfig;

  useEffect(() => {
    let interval: number;
    let exitTimer: number;
    const { style, duration = 3000, intensity = 5, speed } = config;

    if (style === 'flood') {
      let count = 0;
      const maxCount = 100 * intensity; 
      const floodSpeed = speed !== undefined ? speed : Math.max(20, 80 - (intensity * 5)); 

      interval = window.setInterval(() => {
        setDisplayText(prev => prev + " " + log.message);
        count++;
        if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
        if (count >= maxCount) clearInterval(interval);
      }, floodSpeed);
    } else if (['emojiPopUp', 'screen_crack', 'reality_tear', 'vhs_glitch', 'quantum_ghost', 'data_leak', 'neon_flicker', 'pixel_meltdown', 'hypnotic_loop'].includes(style)) {
        const fadeStart = Math.max(500, duration - 1000); 
        exitTimer = window.setTimeout(() => setIsFadingOut(true), fadeStart);
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

  const particles = useMemo(() => {
    if (config.style !== 'emojiPopUp') return [];
    const intensity = config.intensity || 5;
    const duration = config.duration || 3000;
    const emojis = config.customEmojis && config.customEmojis.length > 0 ? config.customEmojis : ["👁️", "👀", "⭕", "🧿", "🌕"];
    const count = intensity * 4 + 3; 
    const staggerDelay = (duration * 0.7) / count;

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${Math.random() * 80 + 10}%`, 
      top: `${Math.random() * 80 + 10}%`,
      size: `${Math.random() * ((config.maxEmojiSize || 112) - (config.minEmojiSize || 48)) + (config.minEmojiSize || 48)}px`,
      delay: i * staggerDelay
    }));
  }, [config]);

  // 통합 렌더러
  switch (config.style) {
    case 'neon_flicker': return <NeonFlicker log={log} config={config} isFadingOut={isFadingOut} />;
    case 'pixel_meltdown': return <PixelMeltdown log={log} config={config} isFadingOut={isFadingOut} />;
    case 'hypnotic_loop': return <HypnoticLoop log={log} config={config} isFadingOut={isFadingOut} />;
    case 'reality_tear': return <RealityTear log={log} config={config} isFadingOut={isFadingOut} />;
    case 'vhs_glitch': return <VHSGlitch log={log} config={config} isFadingOut={isFadingOut} />;
    case 'emojiPopUp': return <EmojiPopUp log={log} config={config} isFadingOut={isFadingOut} particles={particles} />;
    case 'flood': return <Flood displayText={displayText} config={config} containerRef={containerRef} />;
    case 'system_crash': return <SystemCrash log={log} />;
    default: return <DefaultError log={log} config={config} />;
  }
};

const LogViewer: React.FC<Props> = ({ logs, onEffectStateChange }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeEffectLog, setActiveEffectLog] = useState<LogEntry | null>(null);
  const lastTriggeredIdRef = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    const latestGlitch = [...logs].reverse().find(log => log.type === 'glitch');

    if (latestGlitch && lastTriggeredIdRef.current !== latestGlitch.id) {
      setActiveEffectLog(latestGlitch);
      lastTriggeredIdRef.current = latestGlitch.id;
      onEffectStateChange?.(true);
    }
  }, [logs, onEffectStateChange]);

  const handleEffectComplete = () => {
    setActiveEffectLog(null);
    onEffectStateChange?.(false);
  };

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
        {logs.map((log) => (
          <div key={log.id} className={`transition-opacity duration-500 animate-in fade-in slide-in-from-bottom-2 ${getTypeStyle(log.type)}`}>
            {log.type !== 'glitch' && <span className="text-neutral-600 mr-2 text-[13px]">[{new Date(log.timestamp).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}]</span>}
            {log.type === 'glitch' ? `[SYSTEM_ERROR]: ${log.message.substring(0, 30)}...` : log.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {activeEffectLog && <VisualEffectOverlay log={activeEffectLog} onComplete={handleEffectComplete} />}
    </div>
  );
};

export default LogViewer;
