
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';

interface EffectProps {
  displayText: string;
  config: VisualEffectConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const Flood: React.FC<EffectProps> = ({ displayText, config, containerRef }) => {
  const shadowIntensity = (config.intensity || 5) * 0.5;
  const fontSizeClass = config.fontSize || 'text-2xl';

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
};
