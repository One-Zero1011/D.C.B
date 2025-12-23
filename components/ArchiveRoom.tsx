
import React from 'react';
import { DIMENSION_LORE, getSyncRate } from '../dataBase/storyService';
import { Character } from '../types';
import { Lock, Unlock, Database, Activity, Terminal, EyeOff } from 'lucide-react';

interface Props {
  characters: Character[];
}

const ArchiveRoom: React.FC<Props> = ({ characters }) => {
  const syncRate = getSyncRate(characters);
  const totalAnomalies = characters.reduce((sum, c) => sum + c.anomaliesFixed, 0);

  return (
    <div className="h-full flex flex-col bg-neutral-950 border border-amber-900/30 rounded-lg overflow-hidden font-mono shadow-2xl relative">
      {/* Sync Status Header */}
      <div className="bg-black/60 p-6 md:p-8 border-b border-amber-900/20 shrink-0">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-2 md:gap-3">
             <Activity className="text-amber-500 animate-pulse" size={20} />
             <h2 className="text-xl md:text-2xl font-serif text-amber-500 tracking-[0.2em] md:tracking-[0.3em] uppercase">서사 안정화 지수</h2>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-amber-500">{syncRate}%</div>
        </div>
        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-amber-900/10">
          <div 
            className="h-full bg-gradient-to-r from-amber-900 via-amber-500 to-white transition-all duration-1000 ease-in-out"
            style={{ width: `${syncRate}%` }}
          />
        </div>
        <div className="mt-4 flex justify-between text-[9px] md:text-[10px] text-neutral-600 uppercase tracking-widest">
           <span>{syncRate < 90 ? "Operating System: Global Manager" : "SYSTEM LEAK: DIMENSION 2.5 DETECTED"}</span>
           <span className="hidden md:inline">{syncRate < 95 ? "Reality Sync Active" : "REVEAL: 3D ASCENSION IN PROGRESS"}</span>
        </div>
      </div>

      {/* Lore Content List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-8 custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 to-black pb-20 md:pb-8">
        {DIMENSION_LORE.map((log, idx) => {
          const isUnlocked = totalAnomalies >= log.syncThreshold;
          
          return (
            <div 
              key={idx}
              className={`p-4 md:p-6 border transition-all duration-500 relative overflow-hidden
                ${isUnlocked 
                  ? 'bg-neutral-900/40 border-amber-900/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                  : 'bg-black/40 border-neutral-900 opacity-40 grayscale'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${isUnlocked ? 'bg-amber-500/10 text-amber-500' : 'bg-neutral-800 text-neutral-600'}`}>
                    {isUnlocked ? (log.isSecret ? <EyeOff size={18} /> : <Unlock size={18} />) : <Lock size={18} />}
                  </div>
                  <div>
                    <h3 className={`text-base md:text-lg font-serif ${isUnlocked ? 'text-amber-200' : 'text-neutral-600'} tracking-wider`}>
                      {isUnlocked ? log.title : "기밀 데이터 접근 제한"}
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-neutral-600 uppercase font-mono">Archive Code: SEC-{(idx + 1).toString().padStart(3, '0')}</p>
                  </div>
                </div>
                {!isUnlocked && (
                  <div className="text-[9px] bg-amber-950/20 border border-amber-900/30 text-amber-600 px-2 py-1 uppercase tracking-tighter rounded">
                    Unlock: {log.syncThreshold}
                  </div>
                )}
              </div>

              {isUnlocked ? (
                <div className="text-xs md:text-sm text-neutral-300 leading-relaxed font-serif animate-in fade-in slide-in-from-bottom-2 duration-700">
                  {log.content}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-full bg-neutral-900/50 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-neutral-900/50 animate-pulse rounded" />
                </div>
              )}

              {/* Secret Stamp */}
              {isUnlocked && log.isSecret && (
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none select-none">
                  <Terminal size={100} className="text-amber-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="p-4 border-t border-amber-900/10 bg-black/40 text-center mb-[60px] md:mb-0">
        <div className="text-[9px] md:text-[10px] text-neutral-700 uppercase tracking-[0.2em]">
          Total Synchronization Progress: {totalAnomalies} / 100
        </div>
      </footer>
    </div>
  );
};

export default ArchiveRoom;
