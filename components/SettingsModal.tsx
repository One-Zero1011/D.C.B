
import React, { useState } from 'react';
import { X, FileDown, FileUp, Users, Download, RotateCcw, Save, ShieldAlert, Database, HardDrive, Terminal, Play, CheckCircle2, ChevronRight, ChevronDown, CornerDownRight } from 'lucide-react';
import { db } from '../dataBase/manager';

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
  onForceMission
}) => {
  const missions = db.getMissions();
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);

  const toggleMission = (id: string) => {
    setExpandedMissionId(prev => prev === id ? null : id);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm p-0 md:p-4">
      <div className="bg-neutral-900 border-none md:border md:border-amber-500/50 p-4 md:p-6 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-none md:rounded-sm overflow-y-auto custom-scrollbar text-[15px] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Style matched with CharacterForm */}
        <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-4 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-serif text-amber-500 tracking-widest uppercase flex items-center gap-2">
              <Save size={24} /> 시스템 환경 설정
            </h2>
            <span className="text-[10px] text-amber-500/40 font-mono">SYSTEM CONFIGURATION // DATA MANAGEMENT</span>
          </div>
          <button onClick={onClose} className="p-2 text-amber-700 hover:text-amber-400 transition-colors"><X size={28} /></button>
        </div>

        {/* Content Body */}
        <div className="space-y-8 flex-1 overflow-y-auto p-1">
          
          {/* Section 1: Full Simulation Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500/80 border-l-4 border-amber-500 pl-3">
              <HardDrive size={20} />
              <h3 className="text-sm font-bold uppercase tracking-wider">전체 시뮬레이션 백업</h3>
            </div>
            <div className="bg-black/30 p-4 border border-amber-900/20 rounded-sm">
              <p className="text-[12px] text-neutral-400 mb-4 leading-relaxed">
                현재 진행 중인 시뮬레이션의 <span className="text-amber-500">모든 상태(요원, 자금, 로그, 시간, 관계도 등)</span>를 단일 파일로 저장하거나 복원합니다.
                <br/>다른 기기로 데이터를 이동하거나, 중요한 분기점 전에 백업할 때 사용하십시오.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={onSaveSim}
                  className="flex items-center justify-center gap-3 p-4 bg-neutral-800 border border-neutral-700 hover:border-amber-500 hover:bg-neutral-750 text-amber-100 rounded-sm transition-all group shadow-lg"
                >
                  <div className="bg-neutral-900 p-2 rounded-full group-hover:bg-amber-500/20 transition-colors">
                    <FileDown size={20} className="text-amber-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold uppercase">파일로 저장</span>
                    <span className="text-[10px] text-neutral-500">Save to Local (.json)</span>
                  </div>
                </button>
                <button 
                  onClick={onLoadSim}
                  className="flex items-center justify-center gap-3 p-4 bg-neutral-800 border border-neutral-700 hover:border-amber-500 hover:bg-neutral-750 text-amber-100 rounded-sm transition-all group shadow-lg"
                >
                  <div className="bg-neutral-900 p-2 rounded-full group-hover:bg-amber-500/20 transition-colors">
                    <FileUp size={20} className="text-amber-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold uppercase">파일 불러오기</span>
                    <span className="text-[10px] text-neutral-500">Load from Local (.json)</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Agent Roster Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-500/80 border-l-4 border-blue-500 pl-3">
              <Database size={20} />
              <h3 className="text-sm font-bold uppercase tracking-wider">인력 데이터베이스 관리</h3>
            </div>
            <div className="bg-black/30 p-4 border border-blue-900/20 rounded-sm">
              <p className="text-[12px] text-neutral-400 mb-4 leading-relaxed">
                현재 보유 중인 <span className="text-blue-400">요원들의 명단(스탯, 장비 상태)</span>만 추출하거나, 외부 명단을 현재 부대에 합류시킵니다.
                <br/>다른 시뮬레이션에서 육성한 요원을 데려오고 싶을 때 유용합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={onExportAgents}
                  className="flex items-center justify-center gap-3 p-4 bg-neutral-800 border border-neutral-700 hover:border-blue-500 hover:bg-neutral-750 text-blue-100 rounded-sm transition-all group shadow-lg"
                >
                  <div className="bg-neutral-900 p-2 rounded-full group-hover:bg-blue-500/20 transition-colors">
                    <Users size={20} className="text-blue-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold uppercase">명단 내보내기</span>
                    <span className="text-[10px] text-neutral-500">Export Agents (.json)</span>
                  </div>
                </button>
                <button 
                  onClick={onImportAgents}
                  className="flex items-center justify-center gap-3 p-4 bg-neutral-800 border border-neutral-700 hover:border-blue-500 hover:bg-neutral-750 text-blue-100 rounded-sm transition-all group shadow-lg"
                >
                  <div className="bg-neutral-900 p-2 rounded-full group-hover:bg-blue-500/20 transition-colors">
                    <Download size={20} className="text-blue-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold uppercase">명단 가져오기</span>
                    <span className="text-[10px] text-neutral-500">Import Agents (.json)</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Developer Tools */}
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
                        <span className="text-[10px] text-neutral-500">
                           미션 강제 진입 및 디버깅 기능을 활성화합니다.
                        </span>
                     </div>
                     <button 
                        onClick={onToggleDevMode}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDevMode ? 'bg-green-600' : 'bg-neutral-700'}`}
                     >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-md ${isDevMode ? 'left-7' : 'left-1'}`} />
                     </button>
                  </div>

                  {isDevMode && onForceMission && (
                     <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-4 border-t border-green-900/30 pt-4">
                        <h4 className="text-[11px] text-green-500/70 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                           <Play size={10} /> Mission Force Start
                        </h4>
                        <div className="flex flex-col gap-2">
                           {missions.map(mission => (
                              <div key={mission.id} className="bg-black/40 border border-green-500/20 rounded-sm overflow-hidden">
                                 <div className="flex items-center justify-between p-2 hover:bg-green-500/10 transition-colors">
                                    <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleMission(mission.id)}>
                                       <button className="text-neutral-500 hover:text-green-400">
                                          {expandedMissionId === mission.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                       </button>
                                       <div className="flex flex-col">
                                          <span className="text-xs font-bold text-neutral-300">{mission.title}</span>
                                          <span className="text-[9px] text-neutral-600 font-mono">{mission.id}</span>
                                       </div>
                                    </div>
                                    <button 
                                       onClick={() => onForceMission(mission.id)}
                                       className="p-1.5 bg-green-900/20 hover:bg-green-600 hover:text-white text-green-500 rounded text-[10px] font-bold uppercase tracking-wider border border-green-900/30"
                                    >
                                       Start Default
                                    </button>
                                 </div>

                                 {expandedMissionId === mission.id && (
                                    <div className="bg-black/20 border-t border-green-500/10 p-2 pl-8 space-y-1 animate-in slide-in-from-top-1 duration-200">
                                       {Object.values(mission.stages).map(stage => (
                                          <div key={stage.id} className="flex items-center justify-between group p-1.5 hover:bg-green-500/5 rounded-sm">
                                             <div className="flex items-center gap-2 text-neutral-400">
                                                <CornerDownRight size={10} className="text-neutral-600" />
                                                <div className="flex flex-col">
                                                   <span className="text-[11px] font-mono group-hover:text-green-400 transition-colors">{stage.id}</span>
                                                   <span className="text-[9px] text-neutral-600 truncate max-w-[200px]">{stage.description.slice(0, 30)}...</span>
                                                </div>
                                             </div>
                                             <button 
                                                onClick={() => onForceMission(mission.id, stage.id)}
                                                className="text-[9px] text-neutral-500 hover:text-green-400 border border-transparent hover:border-green-500/30 px-2 py-0.5 rounded transition-all"
                                             >
                                                Jump
                                             </button>
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           ))}
                           {missions.length === 0 && (
                              <div className="text-[11px] text-neutral-600 italic p-2">등록된 미션이 없습니다.</div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
             </div>
          )}

          {/* Section 4: Danger Zone */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-red-500/80 border-l-4 border-red-500 pl-3">
              <ShieldAlert size={20} />
              <h3 className="text-sm font-bold uppercase tracking-wider">긴급 초기화 프로토콜</h3>
            </div>
            <div className="bg-red-950/10 p-4 border border-red-900/30 rounded-sm flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <p className="text-[12px] text-neutral-400 leading-relaxed">
                  <strong className="text-red-500 block mb-1">경고: 데이터 영구 소실 위험</strong>
                  시스템을 강제로 초기화합니다. 현재 진행 중인 모든 시뮬레이션 데이터가 삭제되며, 복구할 수 없습니다.
                </p>
              </div>
              <button 
                onClick={onReset}
                className="w-full md:w-auto shrink-0 flex items-center justify-center gap-3 px-6 py-4 bg-red-950/30 border border-red-900/50 hover:bg-red-900 hover:border-red-500 text-red-500 hover:text-white rounded-sm transition-all group shadow-lg"
              >
                <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-700" />
                <span className="text-xs font-bold uppercase tracking-widest">시스템 전체 초기화</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-amber-900/20 text-center md:text-right">
          <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            Dimension Corp System v4.0.3 // Authorized Personnel Only
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
