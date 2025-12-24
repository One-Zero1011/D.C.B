
import React, { useState, useMemo } from 'react';
import { db } from '../dataBase/manager';
import { generateInteractionResponse } from '../dataBase/interactionService';
import { Character, StoreItem } from '../types';
import { 
  Cpu, Angry, Smile, MessageSquare, ClipboardCheck, Gift, 
  UserCircle, ChevronDown, ChevronRight, Sparkles, FileText, X, Package,
  Lock, Unlock, EyeOff, ShieldAlert, Terminal, Users2
} from 'lucide-react';
import { NPC } from '../dataBase/seeds/npcs';

interface Props {
  characters: Character[];
  inventory: Record<string, number>;
  setInventory: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onUpdateCharacter?: (updated: Character) => void;
}

const NPCInteraction: React.FC<Props> = ({ characters, inventory, setInventory, onUpdateCharacter }) => {
  const allNpcs = db.getNpcs();
  const allItems = db.getStoreItems();
  const selectableNpcs = allNpcs; 
  const [selectedNpcId, setSelectedNpcId] = useState(selectableNpcs[0].id);
  const [selectedCharId, setSelectedCharId] = useState(characters.length > 0 ? characters[0].id : '');
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // 팀별 그룹화 및 접힘 상태 관리
  const npcsByTeam = useMemo(() => {
    const groups: Record<string, NPC[]> = {
      '제1팀': [],
      '제2팀': [],
      '제3팀': [],
      '제4팀': []
    };
    selectableNpcs.forEach(npc => {
      if (groups[npc.team]) {
        groups[npc.team].push(npc);
      } else {
        groups[npc.team] = [npc];
      }
    });
    return groups;
  }, [selectableNpcs]);

  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set(['제1팀', '제2팀', '제3팀', '제4팀']));

  const toggleTeam = (team: string) => {
    setExpandedTeams(prev => {
      const next = new Set(prev);
      if (next.has(team)) next.delete(team);
      else next.add(team);
      return next;
    });
  };

  const selectedNpc = selectableNpcs.find(n => n.id === selectedNpcId)!;
  const selectedChar = characters.find(c => c.id === selectedCharId);
  const currentAffinity = selectedChar ? (selectedChar.npcAffinities[selectedNpcId] || 0) : 0;

  const giftItem = allItems.find(item => item.effect === 'gift' && item.targetNpcId === selectedNpcId);
  const giftCount = giftItem ? (inventory[giftItem.id] || 0) : 0;

  const THRESHOLDS = {
    appearance: 0,
    profile: 20,
    background: 40,
    personality: 60,
    visibleSide: 70,
    hiddenSide: 85,
    preference: 90,
    special: 100
  };

  const handleAction = (type: 'talk' | 'report' | 'gift') => {
    if (!selectedChar) {
      alert("상호작용할 요원을 선택하십시오.");
      return;
    }
    if (selectedChar.status === '사망') {
      alert("사망한 요원과는 상호작용할 수 없습니다.");
      return;
    }

    if (type === 'gift') {
        if (!giftItem) {
            setInteractionLog(prev => [`시스템: ${selectedNpc.name}에게 줄 수 있는 아이템이 데이터베이스에 없습니다.`, ...prev].slice(0, 5));
            return;
        }
        if (giftCount <= 0) {
            setInteractionLog(prev => [`시스템: 줄 선물이 없습니다. [${giftItem.name}] 아이템을 상점에서 구매하십시오.`, ...prev].slice(0, 5));
            return;
        }
        setInventory(prev => ({
            ...prev,
            [giftItem.id]: prev[giftItem.id] - 1
        }));
    }

    const { message, affinityChange } = generateInteractionResponse(selectedChar, selectedNpc, type);
    const finalAffinityChange = type === 'gift' ? affinityChange + 5 : affinityChange;
    const updatedChar = db.adjustNpcAffinity(selectedChar, selectedNpcId, finalAffinityChange);
    
    const displayMessage = type === 'gift' 
        ? `[아이템 소모: ${giftItem?.name}] ${message}` 
        : message;

    setInteractionLog(prev => [displayMessage, ...prev].slice(0, 5));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);

    if (onUpdateCharacter) {
      onUpdateCharacter(updatedChar);
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'blue': return { text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500/30', bgLight: 'bg-blue-500/10' };
      case 'rose': return { text: 'text-rose-500', bg: 'bg-rose-500', border: 'border-rose-500/30', bgLight: 'bg-rose-500/10' };
      case 'emerald': return { text: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500/30', bgLight: 'bg-emerald-500/10' };
      default: return { text: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500/30', bgLight: 'bg-amber-500/10' };
    }
  };

  const styles = getColorStyles(selectedNpc.themeColor);

  const ProfileSection = ({ title, data, threshold }: { title: string, data: Record<string, string>, threshold: number }) => {
    const isUnlocked = currentAffinity >= threshold;

    return (
      <div className={`mb-8 p-4 rounded-sm border transition-all duration-500 relative overflow-hidden ${isUnlocked ? 'bg-white/5 border-white/10' : 'bg-black/40 border-white/5 grayscale opacity-50'}`}>
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
          <h4 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${isUnlocked ? styles.text : 'text-neutral-600'}`}>
            {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
            {title}
          </h4>
          {!isUnlocked && (
            <span className="text-[10px] font-mono text-red-900 animate-pulse">REQ: TRUST LEVEL {threshold}+</span>
          )}
        </div>

        {isUnlocked ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[9px] text-neutral-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-[13px] text-neutral-300 font-light leading-snug">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center justify-center space-y-2">
             <div className="text-[10px] text-neutral-700 font-mono select-none break-all opacity-30">
               {Math.random().toString(36).substring(2, 15).repeat(5)}
             </div>
             <p className="text-[11px] text-neutral-600 uppercase tracking-tighter italic">Data encrypted. Deepen trust to decrypt.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-neutral-900/60 border border-amber-900/30 rounded-lg overflow-hidden font-mono shadow-2xl relative">
      {/* Sidebar: Grouped NPC List */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-amber-900/20 bg-black/40 flex flex-col shrink-0 overflow-hidden">
        <div className="p-3 md:p-4 border-b border-amber-900/20 shrink-0 bg-black/20">
          <h3 className="text-[11px] text-amber-500/60 uppercase tracking-widest font-bold flex items-center gap-2">
            <Users2 size={14} /> 부서별 지휘관
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
          {Object.entries(npcsByTeam).map(([teamName, npcs]) => (
            <div key={teamName} className="space-y-1">
              <button 
                onClick={() => toggleTeam(teamName)}
                className="w-full flex items-center justify-between p-2 text-[10px] font-bold uppercase tracking-wider text-amber-500/40 hover:text-amber-500 hover:bg-white/5 transition-all rounded"
              >
                <span className="flex items-center gap-2">
                  {expandedTeams.has(teamName) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  {teamName}
                </span>
                <span className="bg-amber-900/20 px-1.5 py-0.5 rounded text-[9px]">{npcs.length}</span>
              </button>
              
              {expandedTeams.has(teamName) && (
                <div className="space-y-1 pl-1 animate-in slide-in-from-top-1 duration-200">
                  {npcs.map(npc => {
                    const isSelected = selectedNpcId === npc.id;
                    const npcStyle = getColorStyles(npc.themeColor);
                    return (
                      <button 
                        key={npc.id} 
                        onClick={() => { setSelectedNpcId(npc.id); setShowProfile(false); }} 
                        className={`w-full flex items-center gap-3 p-2 rounded transition-all text-left group ${isSelected ? `${npcStyle.bgLight} ${npcStyle.border}` : 'hover:bg-white/5 border border-transparent'}`}
                      >
                        <span className={`text-xl transition-transform group-hover:scale-110 ${isSelected ? 'scale-110' : ''}`}>{npc.avatar}</span>
                        <div className="flex-1 overflow-hidden">
                          <div className={`text-[12px] ${isSelected ? 'text-white font-bold' : 'text-neutral-400 group-hover:text-neutral-200'}`}>{npc.name}</div>
                          <div className={`text-[8px] uppercase truncate ${isSelected ? npcStyle.text : 'text-neutral-600'}`}>{npc.role}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
        {/* Header: Agent Selector */}
        <div className="p-4 border-b border-amber-900/20 bg-black/40 flex flex-col md:flex-row items-start md:items-center justify-between shrink-0 gap-3 md:gap-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <UserCircle size={18} className="text-amber-500" />
            <div className="relative flex-1 md:flex-none">
              <select 
                value={selectedCharId} 
                onChange={(e) => setSelectedCharId(e.target.value)}
                className="w-full md:w-auto bg-neutral-800 border border-amber-900/30 text-amber-100 text-xs px-3 py-1.5 rounded outline-none appearance-none pr-8 cursor-pointer hover:border-amber-500/50 transition-colors"
              >
                <option value="" disabled>요원 선택...</option>
                {characters.map(c => <option key={c.id} value={c.id}>{c.name} ({c.species})</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
             <div className="text-[10px] text-neutral-500 uppercase tracking-tighter">Trust Level</div>
             <div className="flex items-center gap-2">
                <div className="w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                    <div 
                    className={`h-full transition-all duration-1000 ${currentAffinity >= 0 ? 'bg-blue-500' : 'bg-red-500'}`} 
                    style={{ width: `${Math.abs(currentAffinity)}%` }}
                    />
                </div>
                <span className={`text-xs font-bold ${currentAffinity >= 0 ? 'text-blue-400' : 'text-red-400'}`}>{currentAffinity}</span>
             </div>
          </div>
        </div>

        {/* Interaction View */}
        <div className="flex-1 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto custom-scrollbar relative">
           {showProfile ? (
             <div className="absolute inset-0 md:inset-4 bg-neutral-900/98 border border-amber-900/50 rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300 z-10">
                <div className="flex justify-between items-center p-4 border-b border-amber-900/30 bg-black/40 shrink-0">
                   <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedNpc.avatar}</span>
                      <div>
                         <h3 className={`text-base md:text-lg font-serif ${styles.text} uppercase tracking-wider`}>{selectedNpc.name}</h3>
                         <span className="text-[9px] md:text-[10px] text-neutral-500 font-mono">PERSONNEL DATA // DECRYPTION IN PROGRESS</span>
                      </div>
                   </div>
                   <button onClick={() => setShowProfile(false)} className="text-neutral-500 hover:text-amber-500 transition-colors"><X /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                   <div className="max-w-4xl mx-auto">
                     <div className="mb-6 bg-amber-500/5 border border-amber-500/20 p-4 rounded flex items-center gap-4">
                        <Terminal size={20} className="text-amber-500 shrink-0" />
                        <p className="text-[11px] text-neutral-400 leading-tight uppercase font-mono">지휘관의 데이터는 요원과의 <span className="text-amber-500 font-bold">신뢰도(Affinity)</span>에 따라 단계적으로 복호화됩니다. 현재 신뢰도: <span className={currentAffinity >= 0 ? 'text-blue-400' : 'text-red-400'}>{currentAffinity}</span></p>
                     </div>

                     <ProfileSection title="Physical Appearance" data={selectedNpc.appearance as any} threshold={THRESHOLDS.appearance} />
                     <ProfileSection title="Basic Profile" data={selectedNpc.profile as any} threshold={THRESHOLDS.profile} />
                     
                     <ProfileSection title="Background & History" data={selectedNpc.background as any} threshold={THRESHOLDS.background} />
                     <ProfileSection title="Personality & Archetype" data={selectedNpc.personalityDetail as any} threshold={THRESHOLDS.personality} />
                     <ProfileSection title="Operational Routine" data={selectedNpc.visibleSide as any} threshold={THRESHOLDS.visibleSide} />
                     <ProfileSection title="Classified: Hidden Side" data={selectedNpc.hiddenSide as any} threshold={THRESHOLDS.hiddenSide} />
                     <ProfileSection title="Preferences & Obsessions" data={selectedNpc.preference as any} threshold={THRESHOLDS.preference} />
                     
                     <div className={`mt-4 p-6 border transition-all duration-500 ${currentAffinity >= THRESHOLDS.special ? 'bg-amber-500/10 border-amber-500/40' : 'bg-black/40 border-white/5 opacity-40 grayscale'}`}>
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          {currentAffinity >= THRESHOLDS.special ? <Sparkles size={14} /> : <Lock size={14} />}
                          Special Ability
                        </h4>
                        {currentAffinity >= THRESHOLDS.special ? (
                          <p className="text-sm text-neutral-200 font-serif leading-relaxed italic">"{selectedNpc.special}"</p>
                        ) : (
                          <div className="flex flex-col items-center py-2">
                             <div className="h-1.5 w-full bg-neutral-800 rounded-full mb-3">
                               <div className="h-full bg-amber-500/50" style={{ width: `${currentAffinity}%` }} />
                             </div>
                             <p className="text-[10px] text-neutral-600 uppercase font-mono tracking-widest">Locked: Required Trust Level 100</p>
                          </div>
                        )}
                     </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center max-w-4xl w-full space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 md:pt-0">
                <div className="flex flex-col items-center">
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${styles.border} flex items-center justify-center text-5xl md:text-7xl bg-neutral-800 mb-4 transition-transform duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                      {selectedNpc.avatar}
                    </div>
                    <h2 className={`text-xl md:text-2xl font-serif ${styles.text} tracking-widest uppercase text-center`}>{selectedNpc.name}</h2>
                    <p className="text-[10px] md:text-[11px] text-neutral-500 italic mt-1 text-center px-4">{selectedNpc.role}</p>
                    <button 
                      onClick={() => setShowProfile(true)}
                      className="mt-4 flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wider border border-neutral-700 rounded-full hover:bg-neutral-800 hover:border-amber-500/50 text-neutral-400 hover:text-amber-100 transition-all"
                    >
                      <Terminal size={12} /> 데이터 복호화 현황
                    </button>
                </div>

                <div className="w-full max-w-xl">
                    <div className="bg-black/60 border border-amber-900/30 p-4 md:p-6 rounded-lg min-h-[100px] md:min-h-[120px] flex flex-col justify-center relative shadow-inner">
                      <div className="absolute -top-3 left-4 md:left-6 bg-neutral-900 px-2 text-[9px] md:text-[10px] text-amber-500/50 uppercase tracking-widest border border-amber-900/30">Terminal Feed</div>
                      <div className="space-y-3">
                          {interactionLog.length > 0 ? (
                            interactionLog.map((log, i) => (
                              <div key={i} className={`text-xs md:text-sm ${i === 0 ? 'text-amber-100 font-bold' : 'text-neutral-500 opacity-60 text-[10px] md:text-xs'} transition-all`}>
                                {log}
                              </div>
                            ))
                          ) : (
                            <div className="text-neutral-600 italic text-center text-xs md:text-sm">요원을 선택하고 상호작용을 시작하십시오.</div>
                          )}
                      </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-xl">
                    <button 
                      onClick={() => handleAction('talk')}
                      className="flex flex-col items-center gap-2 p-3 md:p-4 bg-neutral-800/40 border border-neutral-700 hover:border-amber-500/50 hover:bg-neutral-800 transition-all rounded-lg group"
                    >
                      <MessageSquare className="text-amber-500 group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-[9px] md:text-[10px] uppercase font-bold text-neutral-400">대화</span>
                    </button>
                    <button 
                      onClick={() => handleAction('report')}
                      className="flex flex-col items-center gap-2 p-3 md:p-4 bg-neutral-800/40 border border-neutral-700 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all rounded-lg group"
                    >
                      <ClipboardCheck className="text-emerald-500 group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-[9px] md:text-[10px] uppercase font-bold text-neutral-400">보고</span>
                    </button>
                    <button 
                      onClick={() => handleAction('gift')}
                      className="flex flex-col items-center gap-2 p-3 md:p-4 bg-neutral-800/40 border border-neutral-700 hover:border-rose-500/50 hover:bg-neutral-800 transition-all rounded-lg group relative"
                    >
                      <div className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-lg">x{giftCount}</div>
                      <Gift className="text-rose-500 group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-[9px] md:text-[10px] uppercase font-bold text-neutral-400">선물</span>
                    </button>
                </div>
             </div>
           )}
        </div>

        <div className="absolute bottom-4 right-4 text-[8px] md:text-[9px] text-neutral-700 uppercase tracking-tighter pointer-events-none hidden md:block">
          SECURE CONNECTION ESTABLISHED // ID: {selectedCharId.slice(0, 8)}
        </div>
      </div>
    </div>
  );
};

export default NPCInteraction;
