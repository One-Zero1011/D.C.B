
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';
import { Eye } from 'lucide-react';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
  isFadingOut: boolean;
}

export const HypnoticLoop: React.FC<EffectProps> = ({ log, config, isFadingOut }) => {
  const fontSizeClass = config.fontSize || 'text-4xl';

  return (
    <div className={`fixed inset-0 z-[120] pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <style>{`
        @keyframes hypnoRotateGrotesque {
          from { transform: rotate(0deg) scale(1); }
          50 { transform: rotate(180deg) scale(1.15); }
          to { transform: rotate(360deg) scale(1); }
        }
        @keyframes eyePulse {
          0%, 100% { transform: scale(1); opacity: 0.3; filter: saturate(1); }
          50% { transform: scale(1.3); opacity: 0.7; filter: saturate(5); }
        }
        .hypno-wheel-eye {
          position: absolute;
          width: 350vmax;
          height: 350vmax;
          background: repeating-conic-gradient(
            from 0deg,
            #000 0deg 5deg,
            #111 5deg 10deg,
            ${config.color?.includes('red') ? '#330000' : '#001133'} 10deg 15deg
          );
          animation: hypnoRotateGrotesque 10s linear infinite;
        }
        .hypno-text-ring-svg {
          position: absolute;
          width: 90vh;
          height: 90vh;
          animation: hypnoRotateGrotesque 5s linear infinite reverse; /* 15s에서 5s로 속도 상향 */
          filter: drop-shadow(0 0 10px rgba(255,0,0,0.8));
        }
        .hypno-smile-text {
          font-weight: 900;
          font-size: 8px; /* 시각적 압박감을 위해 8px로 설정 */
          letter-spacing: 0.5em;
          text-transform: uppercase;
          font-family: 'serif';
        }
        .smile-red { fill: #ff0000; }
        .smile-green { fill: #00ff00; }
      `}</style>
      <div className="absolute inset-0 bg-black" />
      <div className="hypno-wheel-eye" />
      
      <svg className="hypno-text-ring-svg" viewBox="0 0 200 200">
        <path 
          id="circlePath" 
          d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" 
          fill="none" 
        />
        <text className="hypno-smile-text">
          <textPath href="#circlePath" startOffset="0%">
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
            <tspan className="smile-red">웃으세요 </tspan>
            <tspan className="smile-green">SMILE </tspan>
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[30vh] h-[30vh] bg-red-600/10 rounded-full blur-[80px] animate-pulse" />
          <Eye size={260} className="text-white/5 absolute animate-pulse" style={{ animation: 'eyePulse 2.5s infinite' }} />
      </div>

      <div className="relative z-10 text-center px-10">
        <h2 
          className={`font-serif italic font-black uppercase tracking-[0.8em] drop-shadow-[0_0_40px_rgba(0,0,0,1)] ${config.color || 'text-white'} ${fontSizeClass} animate-in zoom-in duration-1000`}
        >
          {log.message}
        </h2>
        <div className="mt-8 font-mono text-[10px] text-red-600/40 tracking-[2em] animate-pulse font-bold">MANDATORY HAPPINESS // 0x666</div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_10%,#000_95%)] pointer-events-none" />
    </div>
  );
};
