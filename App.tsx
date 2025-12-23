
import React, { useState, useEffect, useCallback } from 'react';
import { Character, LogEntry } from './types';
import CharacterCard from './components/CharacterCard';
import LogViewer from './components/LogViewer';
import CharacterForm, { RelationshipDraft } from './components/CharacterForm';
import CalendarModal from './components/CalendarModal';
import NPCInteraction from './components/NPCInteraction';
import Store from './components/Store';
import MemorialSpace from './components/MemorialSpace';
import ArchiveRoom from './components/ArchiveRoom';
import ContentWarningModal from './components/ContentWarningModal';
import { processTurn } from './services/simulationEngine';
import { getVirtualDate, formatVirtualDate } from './dataBase/dateUtils';
import { 
  Play, Pause, Plus, FastForward, RotateCcw, Monitor, Coffee, 
  ShoppingCart, Calendar as CalendarIcon, HeartHandshake, 
  ChevronRight, Database, Save, FolderOpen, Menu
} from 'lucide-react';

const SAVE_KEY = 'dimension_corp_save_v1';

const App: React.FC = () => {
  const [view, setView] = useState<'mission' | 'office' | 'store' | 'memorial' | 'archive'>('mission');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [speed, setSpeed] = useState(1000);
  const [currentDate, setCurrentDate] = useState(new Date());

  const executeTurn = useCallback(() => {
    setCharacters(prevChars => {
      if (prevChars.length === 0) return prevChars;
      
      const { updatedCharacters, newLogs } = processTurn(prevChars);
      
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
          id: Math.random().toString(),
          timestamp: Date.now(),
          type: 'system',
          message: '경고: 모든 요원 자산 소실. 현장 제어 권한 일시 중지.'
        }]);
      }
      
      return updatedCharacters;
    });
  }, []);

  useEffect(() => {
    setLogs([{
      id: 'init',
      timestamp: Date.now(),
      type: 'system',
      message: '본사 통합 관리 시스템 v4.0.2 로드 완료. 대기 중...'
    }]);

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60); 

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (isSimulating && characters.length > 0) {
      interval = window.setInterval(executeTurn, speed);
    }
    return () => clearInterval(interval);
  }, [isSimulating, characters, speed, executeTurn]);

  const handleAddCharacter = (newChar: Character, relationships: RelationshipDraft[]) => {
    setCharacters(prev => [...prev, newChar]);
    setLogs(prev => [...prev, {
      id: Math.random().toString(),
      timestamp: Date.now(),
      type: 'system',
      message: `요원 전이 승인: ${newChar.name} (${newChar.species}) - 작전 설계도에 배치됨.`
    }]);
    setShowForm(false);
  };

  const handleUpdateCharacter = (updated: Character) => {
    setCharacters(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleReset = () => {
    if (!confirm('정말로 모든 시뮬레이션 데이터를 초기화하시겠습니까?')) return;
    setIsSimulating(false);
    setCharacters([]);
    setLogs([{
      id: Math.random().toString(),
      timestamp: Date.now(),
      type: 'system',
      message: '시스템 강제 콜드 리셋. 모든 현장 기록 초기화.'
    }]);
  };

  const handleSave = () => {
    const saveData = {
      characters,
      logs,
      timestamp: Date.now()
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      setLogs(prev => [...prev, {
        id: Math.random().toString(),
        timestamp: Date.now(),
        type: 'system',
        message: '시스템 데이터 백업 성공: 로컬 노드에 현재 상태를 보존했습니다.'
      }]);
    } catch (e) {
      alert('저장 실패: 브라우저 저장 용량이 부족할 수 있습니다.');
    }
  };

  const handleLoad = () => {
    const rawData = localStorage.getItem(SAVE_KEY);
    if (!rawData) {
      alert("불러올 백업 데이터가 존재하지 않습니다.");
      return;
    }
    try {
      const parsed = JSON.parse(rawData);
      if (parsed.characters && Array.isArray(parsed.characters)) {
        setIsSimulating(false);
        setCharacters(parsed.characters);
        setLogs(parsed.logs || []);
        setLogs(prev => [...prev, {
          id: Math.random().toString(),
          timestamp: Date.now(),
          type: 'system',
          message: '시스템 복원 성공: 보존된 이전 세션을 성공적으로 로드했습니다.'
        }]);
      }
    } catch (e) {
      alert("데이터 손상: 백업 파일을 읽는 도중 오류가 발생했습니다.");
    }
  };

  const MobileNavItem = ({ targetView, icon: Icon, label }: { targetView: typeof view, icon: any, label: string }) => (
    <button 
      onClick={() => setView(targetView)} 
      className={`flex flex-col items-center justify-center p-2 w-full transition-colors ${view === targetView ? 'text-amber-500' : 'text-neutral-500 hover:text-amber-200/70'}`}
    >
      <Icon size={20} className={view === targetView ? 'mb-1 scale-110' : 'mb-1'} />
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className="h-[100dvh] bg-neutral-950 text-amber-100 font-sans selection:bg-amber-500/30 flex flex-col overflow-hidden relative">
      
      {/* Content Warning Modal */}
      {showWarning && (
        <ContentWarningModal onConfirm={() => setShowWarning(false)} />
      )}

      {/* Main App Content */}
      <div className={`flex flex-col h-full w-full transition-all duration-700 ${showWarning ? 'blur-md scale-[1.02] opacity-50 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        
        {/* Header */}
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
              
              {/* Mobile Calendar Toggle */}
              <button 
                onClick={() => setShowCalendar(true)}
                className="md:hidden p-2 text-amber-500/70 hover:text-amber-400"
              >
                <CalendarIcon size={20} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex bg-neutral-900 p-1 rounded-md border border-neutral-800">
              <button onClick={() => setView('mission')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'mission' ? 'bg-amber-600 text-black shadow-lg' : 'text-neutral-500 hover:text-amber-200'}`}><Monitor size={14} /> 작전 제어실</button>
              <button onClick={() => setView('office')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'office' ? 'bg-amber-600 text-black shadow-lg' : 'text-neutral-500 hover:text-amber-200'}`}><Coffee size={14} /> 사무실</button>
              <button onClick={() => setView('store')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'store' ? 'bg-purple-600 text-black shadow-lg' : 'text-neutral-500 hover:text-purple-200'}`}><ShoppingCart size={14} /> 심해 상점</button>
              <button onClick={() => setView('memorial')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'memorial' ? 'bg-zinc-700 text-white shadow-lg' : 'text-neutral-500 hover:text-zinc-300'}`}><HeartHandshake size={14} /> 추모 공간</button>
              <button onClick={() => setView('archive')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all uppercase tracking-wider rounded ${view === 'archive' ? 'bg-amber-900/40 border border-amber-500/50 text-amber-500 shadow-lg' : 'text-neutral-500 hover:text-amber-200'}`}><Database size={14} /> 기밀 보관소</button>
            </nav>

            {/* Controls Toolbar - Horizontal Scroll on Mobile */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <div className="flex gap-2 md:gap-4 items-center min-w-max px-1">
                {view === 'mission' && (
                  <>
                    <div className="flex items-center gap-2 bg-neutral-900 p-1 border border-neutral-800 rounded-lg">
                      <div className="flex border-r border-neutral-800 pr-1 mr-1">
                        <button onClick={handleSave} className="p-2 rounded hover:bg-neutral-800 text-amber-500/50 hover:text-amber-400"><Save size={18} /></button>
                        <button onClick={handleLoad} className="p-2 rounded hover:bg-neutral-800 text-amber-500/50 hover:text-amber-400"><FolderOpen size={18} /></button>
                      </div>
                      <button onClick={() => setIsSimulating(!isSimulating)} disabled={characters.length === 0} className={`p-2 rounded hover:bg-neutral-800 ${isSimulating ? 'text-amber-400' : 'text-neutral-400'}`}>
                        {isSimulating ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button onClick={executeTurn} disabled={characters.length === 0 || isSimulating} className="p-2 rounded hover:bg-neutral-800 text-amber-500/70 disabled:opacity-30">
                        <ChevronRight size={18} />
                      </button>
                      <button onClick={() => setSpeed(speed === 1000 ? 200 : 1000)} className={`p-2 rounded hover:bg-neutral-800 ${speed < 500 ? 'text-amber-400' : 'text-neutral-400'}`}>
                        <FastForward size={18} />
                      </button>
                      <button onClick={handleReset} className="p-2 rounded hover:bg-neutral-800 text-red-900/70 hover:text-red-500">
                        <RotateCcw size={18} />
                      </button>
                    </div>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-black px-4 py-2 font-bold uppercase tracking-wider text-sm shadow-md whitespace-nowrap"><Plus size={16} /> 요원 호출</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-2 md:p-6 overflow-hidden mb-[60px] md:mb-0">
          {view === 'mission' ? (
            <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6 overflow-hidden">
              <div className="flex-1 lg:h-full lg:col-span-8 overflow-y-auto pr-0 md:pr-2 min-h-0 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
                  {characters.length === 0 ? (
                    <div className="col-span-full h-full flex flex-col items-center justify-center text-neutral-600 space-y-4 py-20">
                      <Monitor size={64} className="opacity-20" />
                      <p className="font-serif text-lg tracking-widest uppercase opacity-40 text-center px-4">현장에 배치된 요원이 없습니다</p>
                      <button onClick={() => setShowForm(true)} className="text-amber-600 border border-amber-900/50 px-6 py-2 hover:bg-amber-900/20 transition-all uppercase text-xs tracking-widest">첫 번째 요원 호출</button>
                    </div>
                  ) : (
                    characters.map(char => <CharacterCard key={char.id} character={char} allCharacters={characters} onUpdate={handleUpdateCharacter} />)
                  )}
                </div>
              </div>
              <div className="h-[30vh] md:h-[35vh] lg:h-full lg:col-span-4 shrink-0 min-h-0 overflow-hidden"><LogViewer logs={logs} /></div>
            </div>
          ) : view === 'office' ? (
            <div className="h-full animate-in fade-in zoom-in-95 duration-500">
              <NPCInteraction characters={characters} onUpdateCharacter={handleUpdateCharacter} />
            </div>
          ) : view === 'store' ? (
            <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500"><Store characters={characters} setCharacters={setCharacters} /></div>
          ) : view === 'memorial' ? (
            <div className="h-full animate-in fade-in slide-in-from-top-4 duration-500">
              <MemorialSpace characters={characters} />
            </div>
          ) : (
            <div className="h-full animate-in fade-in zoom-in-95 duration-500">
              <ArchiveRoom characters={characters} />
            </div>
          )}
        </main>

        {/* Desktop Footer (Hidden on Mobile) */}
        <footer className="hidden md:flex border-t border-amber-900/30 bg-black/80 backdrop-blur-md px-6 py-3 shrink-0 z-40 justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-neutral-500 uppercase tracking-widest">System Status: Connected</span>
            </div>
            <div className="text-amber-500/80 tracking-widest font-bold">
              {formatVirtualDate(getVirtualDate(currentDate))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCalendar(true)} className="flex items-center gap-2 px-3 py-1.5 border border-amber-900/50 bg-neutral-900 text-amber-500/70 hover:text-amber-400 hover:border-amber-500/50 transition-all rounded-sm uppercase tracking-wider">
              <CalendarIcon size={14} /> 캘린더
            </button>
            <span className="text-neutral-600">DIMENSION-CORP-V4.0.2</span>
          </div>
        </footer>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-950/95 backdrop-blur-lg border-t border-amber-900/30 z-50 flex justify-around pb-safe">
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
      </div>
    </div>
  );
};

export default App;
