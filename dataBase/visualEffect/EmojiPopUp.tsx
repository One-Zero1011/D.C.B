
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
  isFadingOut: boolean;
  particles: any[];
}

export const EmojiPopUp: React.FC<EffectProps> = ({ log, config, isFadingOut, particles }) => {
  const fontSizeClass = config.fontSize || 'text-4xl';

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
      
      {particles.map((particle) => (
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
};
