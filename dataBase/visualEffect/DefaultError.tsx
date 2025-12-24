
import React from 'react';
import { LogEntry, VisualEffectConfig } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface EffectProps {
  log: LogEntry;
  config: VisualEffectConfig;
}

export const DefaultError: React.FC<EffectProps> = ({ log, config }) => {
  const fontSizeClass = config.fontSize || 'text-4xl';

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
