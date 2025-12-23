
import React, { useState, useEffect } from 'react';
import { db } from '../dataBase/manager';
import { generateInteractionResponse } from '../dataBase/interactionService';
import { Character } from '../types';
import { Cpu, Angry, Smile, MessageSquare, ClipboardCheck, Gift, UserCircle, ChevronDown, Sparkles, FileText, X } from 'lucide-react';
import { NPC } from '../dataBase/seeds/npcs';

interface Props {
  characters: Character[];
  onUpdateCharacter?: (updated: Character) => void;
}

const NPCInteraction: React.FC<Props> = ({ characters, onUpdateCharacter }) => {
  const allNpcs = db.getNpcs();
  const selectableNpcs = allNpcs; 
  const [selectedNpcId, setSelectedNpcId] = useState(selectableNpcs[0].id);
  const [selectedCharId, setSelectedCharId] = useState(characters.length > 0 ? characters[0].id : '');
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const selectedNpc = selectableNpcs.find(n => n.id === selectedNpcId)!;
  const selectedChar = characters.find(c => c.id === selectedCharId);
  const currentAffinity = selectedChar ? (selectedChar.npcAffinities[selectedNpcId] || 0) : 0;

  const handleAction = (type: 'talk' | 'report' | 'gift') => {
    if (!selectedChar) {
      alert("상호작용할 요원을 선택하십시오.");
      return;
    }
    if (selectedChar.status === '사망') {
      alert("사망한 요원과는 상호작용할 수 없습니다.");
      return;
    }

    const { message, affinityChange } = generateInteractionResponse(selectedChar, selectedNpc, type);
    
    const updatedChar = db.adjustNpcAffinity(selectedChar, selectedNpcId, affinityChange);
    
    setInteractionLog(prev => [message, ...prev].slice(0, 5));
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

  const ProfileSection = ({ title, data }: { title: string, data: Record<string, string> }) => (
    <div className="mb-6">
      <h4 className={`text-xs font-bold uppercase tracking-widest ${styles.text} mb-3 border-b border-white/10 pb-1`}>{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col mb-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-sm text-neutral-300 font-light leading-snug">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-full bg-neutral-900/60 border border-amber-900/30 rounded-lg overflow-hidden font-mono shadow-2xl relative">
      {/* Sidebar (Desktop) / Topbar (Mobile): NPC List */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-amber-900/20 bg-black/40 flex flex-row md:flex-col shrink-0 overflow-x-auto md:overflow-y-auto no-scrollbar">
        <div className="p-3 md:p-4 md:border-b border-amber-900/20 shrink-0 flex items-center md:block">
          <h3 className="text-[11px] text-amber-500/60 uppercase tracking-widest font-bold whitespace-nowrap">지휘관 목록</h3>
        </div>
        <div className="flex flex-row md:flex-col p-2 space-x-2 md:space-x-0 md:space-y-1">
          {selectableNpcs.map(npc => {
            const isSelected = selectedNpcId === npc.id;
            const npcStyle = getColorStyles(npc.themeColor);
            return (
              <button key={npc.id} onClick={() => { setSelectedNpcId(npc.id); setShowProfile(false); }} className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded transition-all text-left ${isSelected ? `${npcStyle.bgLight} ${npcStyle.border}` : 'hover:bg-white/5 border border-transparent'}`}>
                <span className="text-xl md:text-2xl">{npc.avatar}</span>
                <div className="hidden md:block flex-1 overflow-hidden">
                  <div className={`text-[10px] uppercase ${isSelected ? npcStyle.text : 'text-neutral-500'}`}>{npc.team}</div>
                  <div className="text-[13px] text-neutral-300 truncate">{npc.name}</div>
                </div>
                {/* Mobile Name (Compact) */}
                 <div className="md:hidden text-[12px] text-neutral-300">{npc.name}</div>
              </button>
            );
          })}
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
             <div className="absolute inset-0 md:inset-4 bg-neutral-900/95 border border-amber-900/50 rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300 z-10">
                <div className="flex justify-between items-center p-4 border-b border-amber-900/30 bg-black/40 shrink-0">
                   <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedNpc.avatar}</span>
                      <div>
                         <h3 className={`text-base md:text-lg font-serif ${styles.text} uppercase tracking-wider`}>{selectedNpc.name}</h3>
                         <span className="text-[9px] md:text-[10px] text-neutral-500 font-mono">CLASSIFIED // LEVEL 5</span>
                      </div>
                   </div>
                   <button onClick={() => setShowProfile(false)} className="text-neutral-500 hover:text-amber-500 transition-colors"><X /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                   <div className="max-w-4xl mx-auto space-y-2">
                     <ProfileSection title="Profile" data={selectedNpc.profile as any} />
                     <ProfileSection title="Appearance" data={selectedNpc.appearance as any} />
                     <ProfileSection title="Background" data={selectedNpc.background as any} />
                     <ProfileSection title="Personality" data={selectedNpc.personalityDetail as any} />
                     <ProfileSection title="Visible Side" data={selectedNpc.visibleSide as any} />
                     <ProfileSection title="Hidden Side" data={selectedNpc.hiddenSide as any} />
                     <ProfileSection title="Preference" data={selectedNpc.preference as any} />
                     
                     <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded">
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Special Ability</h4>
                        <p className="text-sm text-neutral-300">{selectedNpc.special}</p>
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
                      <FileText size={12} /> 상세 프로필
                    </button>
                </div>

                {/* Dialogue Display */}
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

                {/* Action Buttons */}
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
                      className="flex flex-col items-center gap-2 p-3 md:p-4 bg-neutral-800/40 border border-neutral-700 hover:border-rose-500/50 hover:bg-neutral-800 transition-all rounded-lg group"
                    >
                      <Gift className="text-rose-500 group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-[9px] md:text-[10px] uppercase font-bold text-neutral-400">선물</span>
                    </button>
                </div>
             </div>
           )}
        </div>

        {/* Decoration */}
        <div className="absolute bottom-4 right-4 text-[8px] md:text-[9px] text-neutral-700 uppercase tracking-tighter pointer-events-none hidden md:block">
          SECURE CONNECTION ESTABLISHED // ID: {selectedCharId.slice(0, 8)}
        </div>
      </div>
    </div>
  );
};

export default NPCInteraction;
