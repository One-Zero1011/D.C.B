
import React from 'react';
import { LogEntry } from '../../types';

interface EffectProps {
  log: LogEntry;
}

export const SystemCrash: React.FC<EffectProps> = ({ log }) => {
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
};
