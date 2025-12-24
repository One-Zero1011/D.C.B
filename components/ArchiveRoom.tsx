import React from 'react';
import { DIMENSION_LORE, getSyncRate, getStabilizationBreakdown, getStabilizationScore } from '../dataBase/storyService';
import { Character, LogEntry } from '../types';
import { Lock, Unlock, Database, Activity, Terminal, EyeOff, ShieldCheck, Swords, Radio, Sparkles } from 'lucide-react';

interface Props {
  characters: Character[];
  logs: LogEntry[];
  manualBonus?: number;
}

const ArchiveRoom: React.FC<Props> = ({ characters, logs, manualBonus = 0 }) => {
  const syncRate = getSyncRate(characters, logs, manualBonus);
  const totalScore = getStabilizationScore(characters, logs, manualBonus);
  const breakdown = getStabilizationBreakdown(characters, logs, manualBonus);

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
        
        {/* Stabilization Breakdown */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex flex-col items-center p-2 bg-amber-500/5 border border-amber-500/10 rounded-sm">
                <ShieldCheck size={14} className="text-amber-500 mb-1" />
                <span className="text-[8px] md:text-[9px] text-neutral-500 uppercase">오류 수정/미션</span>
                <span className="text-xs font-bold text-amber-200">{breakdown.anomalyScore} pt</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-red-500/5 border border-red-500/10 rounded-sm">
                <Swords size={14} className="text-red-500 mb-1" />
                <span className="text-[8px] md:text-[9px] text-neutral-500 uppercase">전투/처치 데이터</span>
                <span className="text-xs font-bold text-red-200">{breakdown.combatScore} pt</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-blue-500/5 border border-blue-500/10 rounded-sm">
                <Radio size={14} className="text-blue-500 mb-1" />
                <span className="text-[8px] md:text-[9px] text-neutral-500 uppercase">데이터 스트림</span>
                <span className="text-xs font-bold text-blue-200">{breakdown.dataScore} pt</span>
            </div>
            <div className={`flex flex-col items-center p-2 rounded-sm border ${manualBonus > 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-neutral-900/50 border-neutral-800'}`}>
                <Sparkles size={14} className={manualBonus > 0 ? 'text-green-500 mb-1' : 'text-neutral-700 mb-1'} />
                <span className="text-[8px] md:text-[9px] text-neutral-500 uppercase">수동 보정치</span>
                <span className={`text-xs font-bold ${manualBonus > 0 ? 'text-green-400' : 'text-neutral-600'}`}>{breakdown.manualBonus} pt</span>
            </div>
        </div>

        <div className="mt-4 flex justify-between text-[9px] md:text-[10px] text-neutral-600 uppercase tracking-widest">
           <span>{syncRate < 90 ? "Operating System: Global Manager" : "SYSTEM LEAK: DIMENSION 2.5 DETECTED"}</span>
           <span className="hidden md:inline">{syncRate < 95 ? "Reality Sync Active" : "REVEAL: 3D ASCENSION IN PROGRESS"}</span>
        </div>
      </div>

      {/* Lore Content List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-8 custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 to-black pb-20 md:pb-8">
        {DIMENSION_LORE.map((log, idx) => {
          const isUnlocked = totalScore >= log.syncThreshold;
          
          return (
            <div 
              key={idx}
              className={`p-4 md:p-6 border transition-all duration-500 relative overflow-hidden
                ${isUnlocked 
                  ? 'bg-neutral-900/40 border-amber-900/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                  : 'bg-black/40 border-neutral-900 opacity-40 grayscale'}`}
            >
              {isUnlocked ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-base md:text-lg font-bold text-amber-500 flex items-center gap-2">
                        {log.isSecret ? <Lock size={16} /> : <Unlock size={16} />}
                        {log.title}
                     </h3>
                     <span className="text-[10px] text-neutral-600 font-mono">THRESHOLD: {log.syncThreshold}pt</span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {log.content}
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start mb-4 opacity-50">
                    <h3 className="text-base md:text-lg font-bold text-neutral-700 flex items-center gap-2">
                      <Lock size={16} /> [LOCKED DATA]
                    </h3>
                    <span className="text-[10px] text-neutral-800 font-mono">REQ: {log.syncThreshold}pt</span>
                  </div>
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
          Total Stabilization Score: {Math.floor(totalScore)} / 1000
        </div>
      </footer>
    </div>
  );
};

export default ArchiveRoom;