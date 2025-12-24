
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Character, LogEntry, Mission } from './types';
import CharacterCard from './components/CharacterCard';
import LogViewer from './components/LogViewer';
import CharacterForm, { RelationshipDraft } from './components/CharacterForm';
import CalendarModal from './components/CalendarModal';
import SettingsModal from './components/SettingsModal';
import SystemResetModal from './components/SystemResetModal';
import DeleteAgentModal from './components/DeleteAgentModal';
import NPCInteraction from './components/NPCInteraction';
import Store from './components/Store';
import MemorialSpace from './components/MemorialSpace';
import ArchiveRoom from './components/ArchiveRoom';
import ContentWarningModal from './components/ContentWarningModal';
import AscensionOverlay from './components/AscensionOverlay'; 
import LoreNotification from './components/LoreNotification';
import { processTurn } from './services/simulationEngine';
import { getVirtualDate, formatVirtualDate, getInitialSimulationDate } from './dataBase/dateUtils';
import { db } from './dataBase/manager';
import { createVisualEffectLog, VisualEffectOptions } from './dataBase/visualEffectService';
import { getSyncRate, getStabilizationScore, DIMENSION_LORE } from './dataBase/storyService'; 
import { 
  Play, Pause, Plus, FastForward, Monitor, Coffee, 
  ShoppingCart, Calendar as CalendarIcon, HeartHandshake, 
  ChevronRight, Database, CloudLightning, Settings
} from 'lucide-react';

const SAVE_KEY = 'dimension_corp_auto_save_v1';
const MISSION_SAVE_KEY = 'dimension_corp_custom_missions_v1';

const App: React.FC = () => {
  const [view, setView] = useState<'mission' | 'office' | 'store' | 'memorial' | 'archive'>('mission');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false); 
  const [agentToDelete, setAgentToDelete] = useState<Character | null>(null);
  const [showWarning, setShowWarning] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [currentDate, setCurrentDate] = useState(getInitialSimulationDate());
  
  const [manualSyncBonus, setManualSyncBonus] = useState(0);
  const [isAscensionDismissed, setIsAscensionDismissed] = useState(false);
  const [unlockedLoreTitles, setUnlockedLoreTitles] = useState<string[]>([]);
  const [notifiedLoreThresholds, setNotifiedLoreThresholds] = useState<Set<number>>(new Set());

  // 커스텀 미션 상태
  const [customMissions, setCustomMissions] = useState<Mission[]>([]);

  // 시각 효과 재생 중 여부 (재생 중일 때 시뮬레이션 일시 정지)
  const [isEffectActive, setIsEffectActive] = useState(false);
  
  const totalScore = getStabilizationScore(characters, logs, manualSyncBonus);
  const isAscended = getSyncRate(characters, logs, manualSyncBonus) >= 100;

  useEffect(() => {
    const newUnlocks: string[] = [];
    const newNotifiedSet = new Set(notifiedLoreThresholds);
    let changed = false;

    DIMENSION_LORE.forEach(lore => {
      if (totalScore >= lore.syncThreshold && !newNotifiedSet.has(lore.syncThreshold)) {
        newUnlocks.push(lore.title);
        newNotifiedSet.add(lore.syncThreshold);
        changed = true;
      }
    });

    if (changed) {
      setNotifiedLoreThresholds(newNotifiedSet);
      setUnlockedLoreTitles(prev => [...prev, ...newUnlocks]);
    }
  }, [totalScore, notifiedLoreThresholds]);

  // 알림창 제거 함수 메모이제이션 (이 함수가 새로 생성되지 않아야 자식의 useEffect가 재발생하지 않음)
  const handleCloseNotification = useCallback(() => {
    setUnlockedLoreTitles(prev => prev.slice(1));
  }, []);

  const simFileInputRef = useRef<HTMLInputElement>(null);
  const agentFileInputRef = useRef<HTMLInputElement>(null);

  // Load Saved Data
  useEffect(() => {
    const rawData = localStorage.getItem(SAVE_KEY);
    const missionData = localStorage.getItem(MISSION_SAVE_KEY);

    // 1. 커스텀 미션 로드 및 등록
    if (missionData) {
      try {
        const parsedMissions = JSON.parse(missionData);
        if (Array.isArray(parsedMissions)) {
          setCustomMissions(parsedMissions);
          parsedMissions.forEach(m => db.registerCustomMission(m));
        }
      } catch (e) {
        console.error("Custom mission load failed", e);
      }
    }

    // 2. 시뮬레이션 상태 로드
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed.characters && Array.isArray(parsed.characters)) {
          setCharacters(parsed.characters);
          setCredits(parsed.credits || 0);
          setInventory(parsed.inventory || {});
          setLogs(parsed.logs || []);
          setManualSyncBonus(parsed.manualSyncBonus || 0);
          
          const restoredSet = new Set<number>();
          const currentScore = getStabilizationScore(parsed.characters, parsed.logs || [], parsed.manualSyncBonus || 0);
          DIMENSION_LORE.forEach(lore => {
            if (currentScore >= lore.syncThreshold) restoredSet.add(lore.syncThreshold);
          });
          setNotifiedLoreThresholds(restoredSet);

          if (parsed.currentDate) {
            setCurrentDate(new Date(parsed.currentDate));
          }
          setLogs(prev => [...prev, {
            id: 'auto-load-' + Date.now(),
            timestamp: Date.now(),
            type: 'system',
            message: '시스템 복구: 자동 저장된 세션을 로드했습니다.'
          }]);
        }
      } catch (e) {
        console.error("Auto load failed", e);
      }
    } else {
      setLogs([{
        id: 'init-' + Date.now(),
        timestamp: Date.now(),
        type: 'system',
        message: '본사 통합 관리 시스템 v4.0.3 로드 완료. 대기 중...'
      }]);
    }
  }, []);

  // Save Simulation Data
  useEffect(() => {
    const saveData = {
      characters,
      credits,
      inventory,
      logs,
      manualSyncBonus,
      currentDate: currentDate.getTime(),
      timestamp: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  }, [characters, credits, inventory, logs, manualSyncBonus, currentDate]);

  // Save Custom Missions
  useEffect(() => {
    localStorage.setItem(MISSION_SAVE_KEY, JSON.stringify(customMissions));
  }, [customMissions]);

  const executeTurn = useCallback(() => {
    if (characters.length === 0) return;

    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });

    setCharacters(prevChars => {
      if (prevChars.length === 0) return prevChars;
      
      const { updatedCharacters, newLogs } = processTurn(prevChars, totalScore);

      const prevTotalFixed = prevChars.reduce((sum, c) => sum + c.anomaliesFixed, 0);
      const newTotalFixed = updatedCharacters.reduce((sum, c) => sum + c.anomaliesFixed, 0);
      const earnedCredits = newTotalFixed - prevTotalFixed;

      if (earnedCredits > 0) {
        setCredits(prev => prev + earnedCredits);
      }
      
      if (newLogs.length > 0) {
        setLogs(prevLogs => {
          const updated = [...prevLogs, ...newLogs];
          return updated.slice(-100); 
        });
      }

      const allDead = updatedCharacters.every(c => c.status === '사망');
      if (allDead) {
        setIsSimulating(false);
        setLogs(prev => [...prev, {
          id: 'error-' + Date.now(),
          timestamp: Date.now(),
          type: 'system',
          message: '경고: 모든 요원 자산 소실. 현장 제어 권한 일시 중지.'
        }]);
      }
      
      return updatedCharacters;
    });
  }, [characters, totalScore]);

  useEffect(() => {
    let interval: number | undefined;
    // 시각 효과가 활성 상태일 때(isEffectActive)는 시뮬레이션을 일시 정지
    if (isSimulating && characters.length > 0 && !isAscended && !isEffectActive) {
      interval = window.setInterval(executeTurn, speed);
    }
    return () => clearInterval(interval);
  }, [isSimulating, characters, speed, executeTurn, isAscended, isEffectActive]);

  const handleAddCharacter = (newChar: Character, relationships: RelationshipDraft[]) => {
    setCharacters(prev => {
      let updatedList = [...prev, newChar];

      if (relationships && relationships.length > 0) {
        updatedList = updatedList.map(existingChar => {
          const draft = relationships.find(r => r.targetId === existingChar.id);
          
          if (draft && draft.isMutual) {
             const isNegative = ["라이벌", "앙숙", "적", "혐오", "경계", "불신", "무시"].includes(draft.label);
             const baseAffinity = isNegative ? -30 : 20;

             return {
               ...existingChar,
               relationships: {
                 ...existingChar.relationships,
                 [newChar.id]: draft.label 
               },
               affinities: {
                 ...existingChar.affinities,
                 [newChar.id]: baseAffinity
               }
             };
          }
          return existingChar;
        });
      }

      return updatedList;
    });

    setLogs(prev => [...prev, {
      id: 'add-' + Date.now(),
      timestamp: Date.now(),
      type: 'system',
      message: `요원 전이 승인: ${newChar.name} (${newChar.species}) - 작전 설계도에 배치됨.`
    }]);
    setShowForm(false);
  };

  const handleUpdateCharacter = (updated: Character) => {
    setCharacters(prev => prev.map(c => {
      if (c.id === updated.id) return updated;
      return c;
    }));
  };

  const handleDeleteRequest = (id: string) => {
    const target = characters.find(c => c.id === id);
    if (target) {
      setAgentToDelete(target);
    }
  };

  const executeDeleteAgent = (id: string) => {
    const target = characters.find(c => c.id === id);
    setCharacters(prev => prev.filter(c => c.id !== id));
    setAgentToDelete(null);
    
    if (target) {
       setLogs(prev => [...prev, {
          id: 'del-' + Date.now(),
          timestamp: Date.now(),
          type: 'system',
          message: `시스템 경고: 요원 ${target.name}의 데이터가 영구 말소되었습니다.`
       }]);
    }
  };

  const executeSystemReset = () => {
    setIsSimulating(false);
    setShowSettings(false); 
    setShowResetConfirm(false);
    setIsAscensionDismissed(false);
    
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(MISSION_SAVE_KEY); // 커스텀 미션도 초기화

    setCharacters([]);
    setCredits(0);
    setInventory({});
    setManualSyncBonus(0);
    setNotifiedLoreThresholds(new Set());
    setUnlockedLoreTitles([]);
    setCustomMissions([]); // 상태 초기화
    db.resetMissions(); // DB 초기화
    setCurrentDate(getInitialSimulationDate());
    setView('mission');
    setSpeed(1000);
    setIsDevMode(false);
    
    setLogs([{
      id: 'reset-' + Date.now(),
      timestamp: Date.now(),
      type: 'system',
      message: '시스템 리부트 완료. 데이터베이스가 초기화되었습니다. 요원을 호출하여 시뮬레이션을 시작하십시오.'
    }]);
  };

  const handleForceStartMission = (missionId: string, stageId?: string) => {
    const activeChars = characters.filter(c => c.status === '생존');
    if (activeChars.length === 0) {
      alert("임무를 수행할 생존 요원이 없습니다.");
      return;
    }

    const mission = db.getMissionById(missionId);
    if (!mission) return;

    const targetStageId = stageId || mission.initialStageId;

    setCharacters(prev => prev.map(c => {
      if (c.status !== '생존') return c;
      return {
        ...c,
        activeMission: {
          missionId: missionId,
          stageId: targetStageId,
          turnCount: 0
        }
      };
    }));

    setLogs(prev => [...prev, {
      id: 'force-' + Date.now(),
      timestamp: Date.now(),
      type: 'system',
      message: `[DEV] 관리자 권한으로 임무 강제 시작: "${mission.title}" (Stage: ${targetStageId})`
    }]);

    setView('mission');
    setShowSettings(false);
  };

  const handleTriggerVisualEffect = (options: VisualEffectOptions) => {
    const log = createVisualEffectLog(options);
    setLogs(prev => [...prev, log]);
  };

  const downloadFile = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveSimulationFile = () => {
    const saveData = {
      version: '4.0.3',
      type: 'FULL_SIMULATION',
      characters,
      credits,
      inventory,
      logs,
      manualSyncBonus,
      customMissions, // 커스텀 미션도 함께 저장
      currentDate: currentDate.getTime(),
      timestamp: Date.now()
    };
    downloadFile(saveData, `DimensionCorp_Save_${new Date().toISOString().slice(0,10)}.json`);
  };

  const handleLoadSimulationFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.type === 'FULL_SIMULATION' || (parsed.characters && parsed.logs)) {
          setIsSimulating(false);
          setCharacters(parsed.characters || []);
          setCredits(parsed.credits || 0);
          setInventory(parsed.inventory || {});
          setLogs(parsed.logs || []);
          setManualSyncBonus(parsed.manualSyncBonus || 0);
          setIsAscensionDismissed(false);
          
          // 커스텀 미션 로드
          if (parsed.customMissions && Array.isArray(parsed.customMissions)) {
            setCustomMissions(parsed.customMissions);
            parsed.customMissions.forEach((m: any) => db.registerCustomMission(m));
          }

          const currentScore = getStabilizationScore(parsed.characters, parsed.logs || [], parsed.manualSyncBonus || 0);
          const restoredSet = new Set<number>();
          DIMENSION_LORE.forEach(lore => {
            if (currentScore >= lore.syncThreshold) restoredSet.add(lore.syncThreshold);
          });
          setNotifiedLoreThresholds(restoredSet);
          setUnlockedLoreTitles([]);

          if (parsed.currentDate) setCurrentDate(new Date(parsed.currentDate));
          setShowSettings(false); 
          
          setLogs(prev => [...prev, {
            id: 'import-' + Date.now(),
            timestamp: Date.now(),
            type: 'system',
            message: '시스템 복원: 외부 파일에서 시뮬레이션 상태를 로드했습니다.'
          }]);
        }
      } catch (err) {
        console.error("Load failed", err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  const handleExportAgents = () => {
    if (characters.length === 0) return;
    const exportData = {
      version: '4.0.3',
      type: 'AGENT_ROSTER',
      agents: characters
    };
    downloadFile(exportData, `DimensionCorp_Agents_${new Date().toISOString().slice(0,10)}.json`);
  };

  const handleImportAgents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        let newAgents: Character[] = [];

        if (parsed.type === 'AGENT_ROSTER' && Array.isArray(parsed.agents)) {
          newAgents = parsed.agents;
        } else if (Array.isArray(parsed)) {
          newAgents = parsed; 
        }

        const imported = newAgents.map(agent => ({
          ...agent,
          id: Math.random().toString(36).substring(2, 9),
          name: `${agent.name} (전이됨)` 
        }));

        setCharacters(prev => [...prev, ...imported]);
        setShowSettings(false); 
        setLogs(prev => [...prev, {
          id: 'agent-imp-' + Date.now(),
          timestamp: Date.now(),
          type: 'system',
          message: `인력 충원: 외부 차원에서 ${imported.length}명의 요원이 합류했습니다.`
        }]);

      } catch (err) {
        console.error("Import failed", err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  // 커스텀 미션 저장 핸들러
  const handleSaveCustomMission = (mission: Mission) => {
    // 1. 상태 업데이트 (로컬 스토리지 저장을 위해)
    setCustomMissions(prev => {
      const idx = prev.findIndex(m => m.id === mission.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = mission;
        return updated;
      }
      return [...prev, mission];
    });

    // 2. DB 등록 (시뮬레이션 엔진이 알 수 있도록)
    db.registerCustomMission(mission);

    setLogs(prev => [...prev, {
      id: 'custom-mission-' + Date.now(),
      timestamp: Date.now(),
      type: 'system',
      message: `시스템 확장: 커스텀 미션 "${mission.title}"이(가) 등록되었습니다.`
    }]);
  };

  const MobileNavItem = ({ targetView, icon: Icon, label }: { targetView: typeof view, icon: any, label: string }) => (
    <button 
      onClick={() => setView(targetView)} 
      className={`flex flex-col items-center justify-center p-2 w-full transition-colors active:scale-90 ${view === targetView ? 'text-amber-500' : 'text-neutral-500 hover:text-amber-200/70'}`}
    >
      <Icon size={20} className={view === targetView ? 'mb-1 scale-110' : 'mb-1'} />
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className="h-[100dvh] bg-neutral-950 text-amber-100 font-sans selection:bg-amber-500/30 flex flex-col overflow-hidden relative">
      <input type="file" ref={simFileInputRef} onChange={handleLoadSimulationFile} accept=".json" className="hidden" />
      <input type="file" ref={agentFileInputRef} onChange={handleImportAgents} accept=".json" className="hidden" />

      {unlockedLoreTitles.length > 0 && (
        <LoreNotification 
          key={unlockedLoreTitles[0]}
          title={unlockedLoreTitles[0]} 
          onClose={handleCloseNotification} 
        />
      )}

      {isAscended && !isAscensionDismissed && (
        <AscensionOverlay onReset={executeSystemReset} onContinue={() => setIsAscensionDismissed(true)} />
      )}

      {showWarning && (
        <ContentWarningModal onConfirm={() => setShowWarning(false)} />
      )}

      <div className={`flex flex-col h-full w-full transition-all duration-700 ${showWarning ? 'blur-md scale-[1.02] opacity-50 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        
        <header className="border-b border-amber-900/30 bg-black/50 backdrop-blur-md p-3 md:p-4 shrink-0 z-40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            <div className="w-full md:w-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border border-amber-500 bg-neutral-900 flex items-center justify-center font-serif font-bold text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]">D</div>
                <div className="flex flex-col">
                  <h1 className="text-lg md:text-xl font-serif text-amber-500 tracking-widest uppercase leading-none">Dimension Corp</h1>
                  <span className="text-[9px] text-amber-500/50 uppercase tracking-[0.2em] md:hidden">{formatVirtualDate(getVirtualDate(currentDate))}</span>
                </div>
              </div>
              <button onClick={() => setShowCalendar(true)} className="md:hidden p-2 text-amber-500/70 hover:text-amber-400">
                <CalendarIcon size={20} />
              </button>
            </div>

            <nav className="hidden md:flex bg-neutral-900 p-1 rounded-md border border-neutral-800">
              <button onClick={() => setView('mission')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'mission' ? 'bg-amber-600 text-black shadow-lg' : 'text-neutral-500 hover:text-amber-200'}`}><Monitor size={14} /> 작전 제어실</button>
              <button onClick={() => setView('office')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'office' ? 'bg-amber-600 text-black shadow-lg' : 'text-neutral-500 hover:text-amber-200'}`}><Coffee size={14} /> 사무실</button>
              <button onClick={() => setView('store')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'store' ? 'bg-purple-600 text-black shadow-lg' : 'text-neutral-500 hover:text-purple-200'}`}><ShoppingCart size={14} /> 심해 상점</button>
              <button onClick={() => setView('memorial')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'memorial' ? 'bg-zinc-700 text-white shadow-lg' : 'text-neutral-500 hover:text-zinc-300'}`}><HeartHandshake size={14} /> 추모 공간</button>
              <button onClick={() => setView('archive')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'archive' ? 'bg-amber-900/40 border border-amber-500/50 text-amber-500 shadow-lg' : 'text-neutral-500 hover:text-amber-200'}`}><Database size={14} /> 기밀 보관소</button>
            </nav>

            <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <div className="flex gap-2 md:gap-4 items-center min-w-max px-1">
                {view === 'mission' && (
                  <>
                    <div className="flex items-center gap-2 bg-neutral-900 p-1 border border-neutral-800 rounded-lg">
                      <button onClick={() => setShowSettings(true)} title="시스템 설정" className="p-2 border-r border-neutral-800 text-amber-500/70 hover:text-amber-400 hover:bg-neutral-800">
                        <Settings size={18} />
                      </button>
                      <button onClick={() => setIsSimulating(!isSimulating)} disabled={characters.length === 0} className={`p-2 rounded hover:bg-neutral-800 ${isSimulating ? 'text-amber-400' : 'text-neutral-400'}`}>
                        {isSimulating ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button onClick={executeTurn} disabled={characters.length === 0 || isSimulating} className="p-2 rounded hover:bg-neutral-800 text-amber-500/70 disabled:opacity-30">
                        <ChevronRight size={18} />
                      </button>
                      <button onClick={() => setSpeed(speed === 1000 ? 200 : 1000)} className={`p-2 rounded hover:bg-neutral-800 ${speed < 500 ? 'text-amber-400' : 'text-neutral-400'}`}>
                        <FastForward size={18} />
                      </button>
                    </div>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-black px-4 py-2 font-bold uppercase tracking-wider text-sm shadow-md whitespace-nowrap"><Plus size={16} /> 요원 호출</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-2 md:p-6 overflow-hidden mb-[60px] md:mb-0">
          {view === 'mission' ? (
            <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6 overflow-hidden">
              <div className="flex-1 lg:h-full lg:col-span-8 overflow-y-auto pr-0 md:pr-2 min-h-0 custom-scrollbar pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
                  {characters.length === 0 ? (
                    <div className="col-span-full h-full flex flex-col items-center justify-center text-neutral-600 space-y-4 py-20">
                      <Monitor size={64} className="opacity-20" />
                      <p className="font-serif text-lg tracking-widest uppercase opacity-40 text-center px-4">현장에 배치된 요원이 없습니다</p>
                      <button onClick={() => setShowForm(true)} className="text-amber-600 border border-amber-900/50 px-6 py-2 hover:bg-amber-900/20 transition-all uppercase text-xs tracking-widest">첫 번째 요원 호출</button>
                    </div>
                  ) : (
                    characters.map(char => (
                      <CharacterCard 
                        key={char.id} 
                        character={char} 
                        allCharacters={characters} 
                        onUpdate={handleUpdateCharacter}
                        onDelete={handleDeleteRequest} 
                      />
                    ))
                  )}
                </div>
              </div>
              {/* Mobile: Log height reduced to 25vh for better visibility of characters. Desktop: Full height */}
              <div className="h-[25vh] md:h-[35vh] lg:h-full lg:col-span-4 shrink-0 min-h-0 overflow-hidden">
                <LogViewer logs={logs} onEffectStateChange={setIsEffectActive} />
              </div>
            </div>
          ) : view === 'office' ? (
            <div className="h-full animate-in fade-in zoom-in-95 duration-500">
              <NPCInteraction characters={characters} inventory={inventory} setInventory={setInventory} onUpdateCharacter={handleUpdateCharacter} />
            </div>
          ) : view === 'store' ? (
            <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500"><Store characters={characters} setCharacters={setCharacters} credits={credits} setCredits={setCredits} inventory={inventory} setInventory={setInventory} /></div>
          ) : view === 'memorial' ? (
            <div className="h-full animate-in fade-in slide-in-from-top-4 duration-500">
              <MemorialSpace characters={characters} />
            </div>
          ) : (
            <div className="h-full animate-in fade-in zoom-in-95 duration-500">
              <ArchiveRoom characters={characters} logs={logs} manualBonus={manualSyncBonus} />
            </div>
          )}
        </main>

        <footer className="hidden md:flex border-t border-amber-900/30 bg-black/80 backdrop-blur-md px-6 py-3 shrink-0 z-40 justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-neutral-500 uppercase tracking-widest">System Status: Connected</span>
            </div>
            <div className="text-amber-500/80 tracking-widest font-bold">{formatVirtualDate(getVirtualDate(currentDate))}</div>
            {isDevMode && (
              <span className="text-green-500 font-bold uppercase tracking-widest bg-green-950/30 px-2 py-0.5 rounded border border-green-800">Dev Mode Active</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCalendar(true)} className="flex items-center gap-2 px-3 py-1.5 border border-amber-900/50 bg-neutral-900 text-amber-500/70 hover:text-amber-400 hover:border-amber-500/50 transition-all rounded-sm uppercase tracking-wider">
              <CalendarIcon size={14} /> 캘린더
            </button>
            <span className="text-neutral-600">DIMENSION-CORP-V4.0.3</span>
          </div>
        </footer>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-950/95 backdrop-blur-lg border-t border-amber-900/30 z-[60] flex justify-around pb-safe">
          <MobileNavItem targetView="mission" icon={Monitor} label="제어실" />
          <MobileNavItem targetView="office" icon={Coffee} label="사무실" />
          <MobileNavItem targetView="store" icon={ShoppingCart} label="상점" />
          <MobileNavItem targetView="memorial" icon={HeartHandshake} label="추모" />
          <MobileNavItem targetView="archive" icon={Database} label="보관소" />
        </nav>

        {showForm && (
          <CharacterForm existingCharacters={characters} onAdd={handleAddCharacter} onClose={() => setShowForm(false)} />
        )}

        {showCalendar && (
          <CalendarModal onClose={() => setShowCalendar(false)} />
        )}

        {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)}
            onSaveSim={handleSaveSimulationFile}
            onLoadSim={() => simFileInputRef.current?.click()}
            onExportAgents={handleExportAgents}
            onImportAgents={() => agentFileInputRef.current?.click()}
            onReset={() => setShowResetConfirm(true)}
            isDevMode={isDevMode}
            onToggleDevMode={() => setIsDevMode(!isDevMode)}
            onForceMission={handleForceStartMission}
            onTriggerEffect={handleTriggerVisualEffect}
            manualSyncBonus={manualSyncBonus}
            onAdjustManualBonus={setManualSyncBonus}
            customMissions={customMissions}
            onSaveCustomMission={handleSaveCustomMission}
          />
        )}

        {showResetConfirm && (
          <SystemResetModal onConfirm={executeSystemReset} onClose={() => setShowResetConfirm(false)} />
        )}

        {agentToDelete && (
          <DeleteAgentModal 
            character={agentToDelete} 
            onConfirm={executeDeleteAgent} 
            onClose={() => setAgentToDelete(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
