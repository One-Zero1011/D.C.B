
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
  isFadingOut: boolean;
}

export const VHSGlitch: React.FC<EffectProps> = ({ log, config, isFadingOut }) => {
  const fontSizeClass = config.fontSize || 'text-4xl';

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
};
