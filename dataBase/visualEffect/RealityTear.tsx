
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
  isFadingOut: boolean;
}

export const RealityTear: React.FC<EffectProps> = ({ log, isFadingOut }) => {
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
};
