
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
  isFadingOut: boolean;
}

export const NeonFlicker: React.FC<EffectProps> = ({ log, config, isFadingOut }) => {
  const intensity = config.intensity || 5;
  const fontSizeClass = config.fontSize || 'text-4xl';
  
  return (
    <div className={`fixed inset-0 z-[120] pointer-events-none flex items-center justify-center transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <style>{`
        @keyframes neonFlash {
          0%, 100% { filter: brightness(1) saturate(1); background: transparent; }
          2% { background: rgba(255, 0, 100, 0.1); }
          5% { filter: brightness(10) saturate(5); }
          10% { filter: brightness(1) saturate(1); }
          12% { filter: invert(1); background: rgba(0, 255, 100, 0.2); }
          15% { filter: brightness(1); }
        }
        @keyframes subFace {
          0%, 48%, 52%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        .neon-text {
          animation: neonFlash ${1 / intensity}s infinite;
          text-shadow: 0 0 10px currentColor, 0 0 30px currentColor, 0 0 60px rgba(255,0,0,0.8);
        }
        .mascot-shadow {
          position: absolute;
          font-size: 50vh;
          animation: subFace 4s infinite;
          color: white;
          filter: blur(10px);
        }
      `}</style>
      <div className="absolute inset-0 bg-black/40" />
      <div className="mascot-shadow flex items-center justify-center w-full h-full opacity-0">🤡</div>
      <div className="text-center relative z-10">
        <h2 className={`font-black italic uppercase tracking-[-0.1em] ${config.color || 'text-pink-500'} ${fontSizeClass} neon-text`}>
          {log.message}
        </h2>
        <div className="mt-4 text-[10px] font-mono text-white/20 tracking-[2em] animate-pulse">MANDATORY_HAPPINESS_PROTOCOL</div>
      </div>
    </div>
  );
};
