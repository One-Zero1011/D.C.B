
import React, { useState, useMemo } from 'react';
import { db } from '../dataBase/manager';
import { generateInteractionResponse } from '../dataBase/interactionService';
import { Character, StoreItem } from '../types';
import { 
  Cpu, Angry, Smile, MessageSquare, ClipboardCheck, Gift, 
  UserCircle, ChevronDown, ChevronRight, Sparkles, FileText, X, Package,
  Lock, Unlock, EyeOff, ShieldAlert, Terminal, Users2, Info, MessageCircle
} from 'lucide-react';
import { NPC } from '../dataBase/seeds/npcs';
import GroupChatWidget from './GroupChatWidget';

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
  
  // 채팅 채널 상태 관리 ('general' 또는 팀 이름)
  const [activeChatChannel, setActiveChatChannel] = useState<string>('general');

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
      <div className={`mb-4 p-4 rounded-sm border transition-all duration-500 relative overflow-hidden ${isUnlocked ? 'bg-white/5 border-white/10' : 'bg-black/40 border-white/5 grayscale opacity-50'}`}>
        <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
          <h4 className={`text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 ${isUnlocked ? styles.text : 'text-neutral-600'}`}>
            {isUnlocked ? <Unlock size={12} /> : <Lock size={12} />}
            {title}
          </h4>
          {!isUnlocked && (
            <span className="text-[9px] font-mono text-red-900 animate-pulse bg-red-950/30 px-1.5 py-0.5 rounded">REQ: LV.{threshold}</span>
          )}
        </div>

        {isUnlocked ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[9px] text-neutral-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-[12px] text-neutral-300 font-light leading-snug break-words">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center justify-center space-y-1">
             <div className="text-[10px] text-neutral-800 font-mono select-none break-all opacity-50 blur-[1px]">
               {Math.random().toString(36).substring(2, 15).repeat(5)}
             </div>
             <p className="text-[10px] text-red-900/60 uppercase tracking-tighter italic">Data Encrypted. Access Denied.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-neutral-900/60 border border-amber-900/30 rounded-lg overflow-hidden font-mono shadow-2xl relative">
      {/* Sidebar: Group Chat & NPC List */}
      <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-amber-900/20 bg-black/40 flex flex-col shrink-0 overflow-hidden">
        {/* Group Chat Widget at Top */}
        <GroupChatWidget 
          selectedChar={selectedChar} 
          allNpcs={allNpcs} 
          activeChannel={activeChatChannel} 
          onSwitchChannel={setActiveChatChannel}
        />

        <div className="p-2 border-b border-amber-900/20 shrink-0 bg-neutral-900/30 mt-1">
          <h3 className="text-[10px] text-amber-500/60 uppercase tracking-widest font-bold flex items-center gap-2 px-2">
            <Users2 size={12} /> 부서별 지휘관 목록
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
          {Object.entries(npcsByTeam).map(([teamName, npcs]) => (
            <div key={teamName} className="space-y-1">
              <div className="w-full flex items-center justify-between p-2 text-[10px] font-bold uppercase tracking-wider text-amber-500/40 hover:bg-white/5 transition-all rounded group/header">
                <button 
                  onClick={() => toggleTeam(teamName)}
                  className="flex items-center gap-2 flex-1 hover:text-amber-500 transition-colors text-left"
                >
                  {expandedTeams.has(teamName) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  {teamName}
                </button>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveChatChannel(teamName);
                    }}
                    className={`p-1 rounded transition-all flex items-center justify-center 
                      ${activeChatChannel === teamName 
                        ? 'text-amber-500 bg-amber-500/20 shadow-[0_0_5px_rgba(245,158,11,0.5)]' 
                        : 'text-neutral-600 hover:text-amber-400 hover:bg-neutral-800'}`}
                    title={`${teamName} 채팅 채널 입장`}
                  >
                    <MessageCircle size={12} fill={activeChatChannel === teamName ? "currentColor" : "none"} />
                  </button>
                  <span className="bg-amber-900/20 px-1.5 py-0.5 rounded text-[9px] text-neutral-500 min-w-[20px] text-center">{npcs.length}</span>
                </div>
              </div>
              
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
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Header: Agent Selector */}
        <div className="p-4 border-b border-amber-900/20 bg-black/40 flex flex-col md:flex-row items-start md:items-center justify-between shrink-0 gap-3 md:gap-0 z-10 relative">
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

        {/* Content View */}
        <div className="flex-1 relative overflow-hidden">
           {showProfile ? (
             <div className="absolute inset-0 bg-neutral-900/98 flex flex-col animate-in fade-in zoom-in-95 duration-300 z-10">
                {/* Profile Header */}
                <div className="flex justify-between items-center p-4 border-b border-amber-900/30 bg-black/40 shrink-0">
                   <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border ${styles.border} flex items-center justify-center bg-neutral-800 text-2xl`}>
                        {selectedNpc.avatar}
                      </div>
                      <div>
                         <h3 className={`text-sm md:text-base font-serif ${styles.text} uppercase tracking-wider`}>{selectedNpc.name}</h3>
                         <span className="text-[9px] text-neutral-500 font-mono flex items-center gap-1">
                           <Terminal size={10} /> PERSONNEL DATA // SECURE ARCHIVE
                         </span>
                      </div>
                   </div>
                   <button onClick={() => setShowProfile(false)} className="text-neutral-500 hover:text-amber-500 transition-colors p-2"><X size={20} /></button>
                </div>

                {/* Scrollable Data Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                   <div className="max-w-3xl mx-auto space-y-6 pb-12">
                     <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded flex items-start gap-3">
                        <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <p className="text-[11px] text-neutral-300 leading-tight">
                            본 데이터는 <span className="text-amber-500 font-bold">보안 등급(호감도)</span>에 따라 자동 복호화됩니다.
                          </p>
                          <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-amber-500/50 transition-all duration-1000" style={{ width: `${Math.min(100, Math.max(0, currentAffinity))}%` }} />
                          </div>
                        </div>
                     </div>

                     <ProfileSection title="Physical Appearance" data={selectedNpc.appearance as any} threshold={THRESHOLDS.appearance} />
                     <ProfileSection title="Basic Profile" data={selectedNpc.profile as any} threshold={THRESHOLDS.profile} />
                     <ProfileSection title="Background & History" data={selectedNpc.background as any} threshold={THRESHOLDS.background} />
                     <ProfileSection title="Personality & Archetype" data={selectedNpc.personalityDetail as any} threshold={THRESHOLDS.personality} />
                     <ProfileSection title="Operational Routine" data={selectedNpc.visibleSide as any} threshold={THRESHOLDS.visibleSide} />
                     <ProfileSection title="Classified: Hidden Side" data={selectedNpc.hiddenSide as any} threshold={THRESHOLDS.hiddenSide} />
                     <ProfileSection title="Preferences & Obsessions" data={selectedNpc.preference as any} threshold={THRESHOLDS.preference} />
                     
                     <div className={`mt-6 p-6 border transition-all duration-500 rounded-sm relative overflow-hidden ${currentAffinity >= THRESHOLDS.special ? 'bg-amber-500/10 border-amber-500/40' : 'bg-black/40 border-white/5 opacity-60 grayscale'}`}>
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          {currentAffinity >= THRESHOLDS.special ? <Sparkles size={14} /> : <Lock size={14} />}
                          Special Ability (Level 100)
                        </h4>
                        {currentAffinity >= THRESHOLDS.special ? (
                          <div className="relative z-10">
                            <p className="text-sm text-amber-100 font-serif leading-relaxed italic border-l-2 border-amber-500 pl-4 py-1">
                              "{selectedNpc.special}"
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center py-4">
                             <Lock className="text-neutral-700 mb-2" size={24} />
                             <p className="text-[10px] text-neutral-600 uppercase font-mono tracking-widest">Top Secret Clearance Required</p>
                          </div>
                        )}
                        {/* Background Effect for Special */}
                        {currentAffinity >= THRESHOLDS.special && (
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                        )}
                     </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-xl flex flex-col items-center space-y-8">
                  {/* NPC Hero Section */}
                  <div className="flex flex-col items-center text-center">
                      <div className={`relative group cursor-pointer`} onClick={() => setShowProfile(true)}>
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 ${styles.border} flex items-center justify-center text-6xl md:text-7xl bg-neutral-800 mb-4 transition-transform duration-300 ${isAnimating ? 'scale-110' : 'group-hover:scale-105'} shadow-2xl`}>
                          {selectedNpc.avatar}
                        </div>
                        <div className="absolute bottom-4 right-0 bg-neutral-900 border border-neutral-700 rounded-full p-1.5 text-neutral-400 group-hover:text-amber-500 transition-colors shadow-lg">
                          <FileText size={14} />
                        </div>
                      </div>
                      
                      <h2 className={`text-2xl md:text-3xl font-serif ${styles.text} tracking-widest uppercase mb-1`}>{selectedNpc.name}</h2>
                      <p className="text-[11px] text-neutral-500 italic px-4 mb-4">{selectedNpc.role}</p>
                      
                      <button 
                        onClick={() => setShowProfile(true)}
                        className="flex items-center gap-2 px-4 py-1.5 text-[10px] uppercase tracking-wider border border-neutral-700 rounded-full hover:bg-neutral-800 hover:border-amber-500/50 text-neutral-400 hover:text-amber-100 transition-all"
                      >
                        <Terminal size={12} /> 데이터 복호화 현황 보기
                      </button>
                  </div>

                  {/* Terminal Log */}
                  <div className="w-full">
                      <div className="bg-black/60 border border-amber-900/30 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center relative shadow-inner">
                        <div className="absolute -top-3 left-4 bg-neutral-900 px-2 text-[9px] text-amber-500/50 uppercase tracking-widest border border-amber-900/30">Terminal Feed</div>
                        <div className="space-y-2 max-h-[100px] overflow-y-auto custom-scrollbar">
                            {interactionLog.length > 0 ? (
                              interactionLog.map((log, i) => (
                                <div key={i} className={`text-xs md:text-sm ${i === 0 ? 'text-amber-100 font-bold' : 'text-neutral-500 opacity-60 text-[10px] md:text-xs'} transition-all`}>
                                  {log}
                                </div>
                              ))
                            ) : (
                              <div className="text-neutral-600 italic text-center text-xs md:text-sm py-4">
                                요원을 선택하고 상호작용을 시작하십시오.
                              </div>
                            )}
                        </div>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
                      <button 
                        onClick={() => handleAction('talk')}
                        className="flex flex-col items-center gap-2 p-4 bg-neutral-800/40 border border-neutral-700 hover:border-amber-500/50 hover:bg-neutral-800 transition-all rounded-lg group"
                      >
                        <MessageSquare className="text-amber-500 group-hover:scale-110 transition-transform w-6 h-6" />
                        <span className="text-[10px] uppercase font-bold text-neutral-400 group-hover:text-amber-500">대화 시도</span>
                      </button>
                      <button 
                        onClick={() => handleAction('report')}
                        className="flex flex-col items-center gap-2 p-4 bg-neutral-800/40 border border-neutral-700 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all rounded-lg group"
                      >
                        <ClipboardCheck className="text-emerald-500 group-hover:scale-110 transition-transform w-6 h-6" />
                        <span className="text-[10px] uppercase font-bold text-neutral-400 group-hover:text-emerald-500">보고서 제출</span>
                      </button>
                      <button 
                        onClick={() => handleAction('gift')}
                        className="flex flex-col items-center gap-2 p-4 bg-neutral-800/40 border border-neutral-700 hover:border-rose-500/50 hover:bg-neutral-800 transition-all rounded-lg group relative"
                      >
                        {giftCount > 0 && (
                          <div className="absolute top-2 right-2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-lg">x{giftCount}</div>
                        )}
                        <Gift className="text-rose-500 group-hover:scale-110 transition-transform w-6 h-6" />
                        <span className="text-[10px] uppercase font-bold text-neutral-400 group-hover:text-rose-500">선물하기</span>
                      </button>
                  </div>
                </div>
             </div>
           )}
        </div>

        {/* Footer Status */}
        <div className="absolute bottom-4 right-4 text-[8px] md:text-[9px] text-neutral-700 uppercase tracking-tighter pointer-events-none hidden md:block z-0">
          SECURE CONNECTION ESTABLISHED // ID: {selectedCharId.slice(0, 8)}
        </div>
      </div>
    </div>
  );
};

export default NPCInteraction;
