
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
  isFadingOut: boolean;
}

export const PixelMeltdown: React.FC<EffectProps> = ({ log, config, isFadingOut }) => {
  const fontSizeClass = config.fontSize || 'text-4xl';

  return (
    <div className={`fixed inset-0 z-[120] pointer-events-none transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <style>{`
        @keyframes meltDownGore {
          0% { transform: scaleY(0); transform-origin: top; filter: brightness(2); }
          20% { transform: scaleY(1); }
          100% { transform: translateY(110vh); opacity: 0; filter: hue-rotate(90deg); }
        }
        .pixel-drip {
          position: absolute;
          width: 15px;
          background: linear-gradient(to bottom, #ff0044, #330000, transparent);
          animation: meltDownGore linear forwards;
          box-shadow: 0 0 10px rgba(255,0,0,0.3);
        }
        .digital-organ {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.4);
          writing-mode: vertical-rl;
        }
      `}</style>
      {Array.from({ length: 60 }).map((_, i) => (
        <React.Fragment key={i}>
          <div 
              className="pixel-drip" 
              style={{ 
                left: `${i * 1.7}%`, 
                height: `${Math.random() * 50 + 50}vh`,
                animationDuration: `${Math.random() * 1.5 + 0.5}s`,
                animationDelay: `${Math.random() * 2}s`
              }} 
          />
          {i % 5 === 0 && (
              <div 
                  className="digital-organ animate-pulse"
                  style={{ left: `${i * 1.7}%`, top: `${Math.random() * 80}%`, animationDelay: `${Math.random()}s` }}
              >
                  {Math.random() > 0.5 ? "ERROR_BODY_PART" : "SEGMENTATION_FAULT"}
              </div>
          )}
        </React.Fragment>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
          <h2 className={`font-black uppercase tracking-tighter bg-red-950/80 px-12 py-6 border-y-4 border-red-600 ${config.color || 'text-white'} ${fontSizeClass} backdrop-blur-xl shadow-[0_0_100px_rgba(255,0,0,0.4)]`}>
              {log.message}
          </h2>
      </div>
    </div>
  );
};
