import React, { useState } from 'react';
import { X, FileDown, FileUp, Users, Download, RotateCcw, Save, ShieldAlert, Database, HardDrive, Terminal, Play, CheckCircle2, ChevronRight, ChevronDown, CornerDownRight, Zap, SlidersHorizontal } from 'lucide-react';
import { db } from '../dataBase/manager';
import { VisualEffectType, VisualEffectConfig } from '../types';

interface Props {
  onClose: () => void;
  onSaveSim: () => void;
  onLoadSim: () => void;
  onExportAgents: () => void;
  onImportAgents: () => void;
  onReset: () => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
  onForceMission?: (missionId: string, stageId?: string) => void;
  onTriggerEffect?: (options: { type: VisualEffectType; text: string; duration?: number; intensity?: number; customEmojis?: string[]; minEmojiSize?: number; maxEmojiSize?: number }) => void;
  manualSyncBonus?: number;
  onAdjustManualBonus?: (bonus: number) => void;
}

const SettingsModal: React.FC<Props> = ({ 
  onClose, 
  onSaveSim, 
  onLoadSim, 
  onExportAgents, 
  onImportAgents,
  onReset,
  isDevMode = false,
  onToggleDevMode,
  onForceMission,
  onTriggerEffect,
  manualSyncBonus = 0,
  onAdjustManualBonus
}) => {
  const missions = db.getMissions();
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);

  // Visual Effect Tester State
  const [effectType, setEffectType] = useState<VisualEffectType>('error');
  const [effectText, setEffectText] = useState('SYSTEM ERROR');
  const [customEmojiString, setCustomEmojiString] = useState("👀,👁️,🧿");
  
  const toggleMission = (id: string) => {
    setExpandedMissionId(prev => prev === id ? null : id);
  };

  const handleRunEffect = () => {
    if (onTriggerEffect) {
      const isEmojiEffect = effectType === 'emojiPopUp' || effectType === 'emoji_swarm';
      const customEmojis = isEmojiEffect 
        ? customEmojiString.split(',').map(s => s.trim()).filter(s => s !== '')
        : undefined;

      onTriggerEffect({
        type: effectType,
        text: effectText,
        duration: 3500,
        intensity: 5,
        customEmojis,
        minEmojiSize: 80,
        maxEmojiSize: 150
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm p-0 md:p-4">
      <div className="bg-neutral-900 border-none md:border md:border-amber-500/50 p-4 md:p-6 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-none md:rounded-sm overflow-y-auto custom-scrollbar text-[15px] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-4 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-serif text-amber-500 tracking-widest uppercase flex items-center gap-2">
              <Save size={24} /> 시스템 환경 설정
            </h2>
            <span className="text-[10px] text-amber-500/40 font-mono">SYSTEM CONFIGURATION // DATA MANAGEMENT</span>
          </div>
          <button onClick={onClose} className="p-2 text-amber-700 hover:text-amber-400 transition-colors"><X size={28} /></button>
        </div>

        <div className="space-y-8 flex-1 overflow-y-auto p-1">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500/80 border-l-4 border-amber-500 pl-3">
              <HardDrive size={20} />
              <h3 className="text-sm font-bold uppercase tracking-wider">전체 시뮬레이션 백업</h3>
            </div>
            <div className="bg-black/30 p-4 border border-amber-900/20 rounded-sm">
              <p className="text-[12px] text-neutral-400 mb-4 leading-relaxed">
                현재 진행 중인 시뮬레이션의 <span className="text-amber-500">모든 상태</span>를 파일로 저장하거나 복원합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={onSaveSim} className="flex items-center justify-center gap-3 p-4 bg-neutral-800 border border-neutral-700 hover:border-amber-500 hover:bg-neutral-750 text-amber-100 rounded-sm transition-all group shadow-lg">
                  <div className="bg-neutral-900 p-2 rounded-full group-hover:bg-amber-500/20 transition-colors"><FileDown size={20} className="text-amber-500" /></div>
                  <div className="flex flex-col items-start"><span className="text-xs font-bold uppercase">파일로 저장</span><span className="text-[10px] text-neutral-500">Save to Local (.json)</span></div>
                </button>
                <button onClick={onLoadSim} className="flex items-center justify-center gap-3 p-4 bg-neutral-800 border border-neutral-700 hover:border-amber-500 hover:bg-neutral-750 text-amber-100 rounded-sm transition-all group shadow-lg">
                  <div className="bg-neutral-900 p-2 rounded-full group-hover:bg-amber-500/20 transition-colors"><FileUp size={20} className="text-amber-500" /></div>
                  <div className="flex flex-col items-start"><span className="text-xs font-bold uppercase">파일 불러오기</span><span className="text-[10px] text-neutral-500">Load from Local (.json)</span></div>
                </button>
              </div>
            </div>
          </div>

          {onToggleDevMode && (
             <div className="space-y-4">
               <div className="flex items-center gap-2 text-green-500/80 border-l-4 border-green-500 pl-3">
                 <Terminal size={20} />
                 <h3 className="text-sm font-bold uppercase tracking-wider">개발자 도구 (Developer Console)</h3>
               </div>
               <div className={`p-4 border rounded-sm transition-colors ${isDevMode ? 'bg-green-950/10 border-green-500/30' : 'bg-black/30 border-neutral-800'}`}>
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex flex-col">
                        <span className={`text-sm font-bold uppercase ${isDevMode ? 'text-green-500' : 'text-neutral-500'}`}>
                           {isDevMode ? 'SYSTEM OVERRIDE: ACTIVE' : 'Developer Access'}
                        </span>
                        <span className="text-[10px] text-neutral-500">미션 강제 진입 및 디버깅 기능을 활성화합니다.</span>
                     </div>
                     <button onClick={onToggleDevMode} className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDevMode ? 'bg-green-600' : 'bg-neutral-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-md ${isDevMode ? 'left-7' : 'left-1'}`} />
                     </button>
                  </div>

                  {isDevMode && (
                     <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                        {/* Stabilization Adjuster */}
                        <div className="border-t border-green-900/30 pt-4">
                            <h4 className="text-[11px] text-green-500/70 uppercase tracking-widest font-bold mb-3 flex items-center gap-2"><SlidersHorizontal size={10} /> Narrative Stabilization Override</h4>
                            <div className="bg-black/40 p-4 rounded-sm border border-green-500/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] text-neutral-500 uppercase">Manual Score Bonus</span>
                                    <span className="text-xs font-bold text-green-400">{manualSyncBonus} pt</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="1000" 
                                    step="10"
                                    value={manualSyncBonus}
                                    onChange={(e) => onAdjustManualBonus?.(Number(e.target.value))}
                                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <div className="flex justify-between mt-2 text-[9px] text-neutral-600 uppercase">
                                    <span>0pt</span>
                                    <span>Target: 1000pt (100%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-green-900/30 pt-4">
                            <h4 className="text-[11px] text-green-500/70 uppercase tracking-widest font-bold mb-3 flex items-center gap-2"><Zap size={10} /> Visual Effect Tester</h4>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2">
                                <select 
                                  value={effectType}
                                  onChange={(e) => setEffectType(e.target.value as VisualEffectType)}
                                  className="bg-black border border-green-900/50 text-green-400 text-xs px-2 py-2 rounded-sm outline-none focus:border-green-500 min-w-[120px]"
                                >
                                  <option value="error">Error</option>
                                  <option value="flood">Flood</option>
                                  <option value="system_crash">System Crash</option>
                                  <option value="emoji_swarm">Emoji Swarm</option>
                                  <option value="emojiPopUp">Emoji PopUp</option>
                                  <option value="screen_crack">Screen Crack</option>
                                  <option value="reality_tear">Reality Tear (Overhauled)</option>
                                  <option value="vhs_glitch">VHS Glitch</option>
                                  <option value="quantum_ghost">Quantum Ghost (New)</option>
                                  <option value="data_leak">Data Leak (New)</option>
                                </select>
                                <input 
                                  type="text"
                                  value={effectText}
                                  onChange={(e) => setEffectText(e.target.value)}
                                  className="flex-1 bg-black border border-green-900/50 text-green-100 text-xs px-3 py-2 rounded-sm outline-none focus:border-green-500"
                                />
                                <button onClick={handleRunEffect} className="bg-green-900/20 hover:bg-green-600 text-green-500 hover:text-white border border-green-900/50 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all">Trigger</button>
                              </div>
                            </div>
                        </div>

                        {onForceMission && (
                          <div className="border-t border-green-900/30 pt-4">
                            <h4 className="text-[11px] text-green-500/70 uppercase tracking-widest font-bold mb-3 flex items-center gap-2"><Play size={10} /> Mission Force Start</h4>
                            <div className="flex flex-col gap-2">
                               {missions.map(mission => (
                                  <div key={mission.id} className="bg-black/40 border border-green-500/20 rounded-sm overflow-hidden">
                                     <div className="flex items-center justify-between p-2 hover:bg-green-500/10 transition-colors">
                                        <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleMission(mission.id)}>
                                           <button className="text-neutral-500 hover:text-green-400">{expandedMissionId === mission.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</button>
                                           <div className="flex flex-col"><span className="text-xs font-bold text-neutral-300">{mission.title}</span></div>
                                        </div>
                                        <button onClick={() => onForceMission(mission.id)} className="p-1.5 bg-green-900/20 hover:bg-green-600 hover:text-white text-green-500 rounded text-[10px] font-bold uppercase tracking-wider">Start</button>
                                     </div>
                                  </div>
                               ))}
                            </div>
                          </div>
                        )}
                     </div>
                  )}
               </div>
             </div>
          )}

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-red-500/80 border-l-4 border-red-500 pl-3">
              <ShieldAlert size={20} />
              <h3 className="text-sm font-bold uppercase tracking-wider">긴급 초기화 프로토콜</h3>
            </div>
            <div className="bg-red-950/10 p-4 border border-red-900/30 rounded-sm flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left"><p className="text-[12px] text-neutral-400 leading-relaxed"><strong className="text-red-500 block mb-1">경고: 데이터 영구 소실 위험</strong>시스템을 강제로 초기화합니다.</p></div>
              <button onClick={onReset} className="w-full md:w-auto shrink-0 flex items-center justify-center gap-3 px-6 py-4 bg-red-950/30 border border-red-900/50 hover:bg-red-900 hover:border-red-500 text-red-500 hover:text-white rounded-sm transition-all group shadow-lg">
                <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-700" /><span className="text-xs font-bold uppercase tracking-widest">시스템 전체 초기화</span>
              </button>
            </div>
          </div>

        </div>

        <div className="mt-auto pt-6 border-t border-amber-900/20 text-center md:text-right">
          <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">Dimension Corp System v4.0.3</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;