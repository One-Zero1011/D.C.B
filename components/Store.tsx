
import React, { useState } from 'react';
import { db } from '../dataBase/manager';
import { Character, StoreItem, Body } from '../types';
import { ShoppingBag, User, Coins, X, Activity, AlertTriangle, XCircle } from 'lucide-react';

interface Props {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
}

const Store: React.FC<Props> = ({ characters, setCharacters, credits, setCredits }) => {
  const items = db.getStoreItems();
  const owner = db.getStoreOwner();
  const [selectedCharId, setSelectedCharId] = useState<string>(characters.length > 0 ? characters[0].id : '');
  const [dialogueIdx, setDialogueIdx] = useState(0);
  
  // 부위 선택 모달 관련 상태
  const [showBodySelector, setShowBodySelector] = useState(false);
  const [pendingItem, setPendingItem] = useState<StoreItem | null>(null);

  const selectedChar = characters.find(c => c.id === selectedCharId);

  const handleBuyClick = (item: StoreItem) => {
    if (!selectedCharId) {
      alert("치료할 요원을 선택하십시오.");
      return;
    }
    if (credits < item.price) {
      alert("공용 자금(Credits)이 부족합니다.");
      return;
    }

    if (item.effect === 'body') {
      setPendingItem(item);
      setShowBodySelector(true);
    } else {
      processTransaction(item);
    }
  };

  const processTransaction = (item: StoreItem, partKey?: keyof Body) => {
    setCredits(prev => prev - item.price);
    setCharacters(prev => prev.map(c => {
      if (c.id !== selectedCharId) return c;
      return db.applyStoreItem(c, item, partKey);
    }));

    setDialogueIdx((prev) => (prev + 1) % owner.dialogues.length);
    closeBodySelector();
  };

  const closeBodySelector = () => {
    setShowBodySelector(false);
    setPendingItem(null);
  };

  const bodyPartKeys: (keyof Body)[] = [
    'head', 'neck', 'torso',
    'leftArm', 'rightArm', 'leftLeg', 'rightLeg',
    'leftEye', 'rightEye', 'leftEar', 'rightEar'
  ];

  return (
    <div className="flex flex-col md:flex-row h-full bg-indigo-950/20 border border-purple-900/30 rounded-lg overflow-hidden font-mono shadow-2xl relative">
      {/* Sidebar (Desktop) / Topbar (Mobile): Character List */}
      <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-purple-900/30 bg-black/40 flex flex-col shrink-0">
        <div className="p-3 md:p-4 border-b border-purple-900/30 flex justify-between items-center">
          <h3 className="text-[11px] md:text-[13px] text-purple-400 uppercase tracking-[0.2em] font-bold flex items-center gap-2"><User size={16} /> 대기 자산</h3>
          <span className="text-xs font-bold text-amber-500 flex items-center gap-1 md:hidden"><Coins size={14}/> {credits}</span>
        </div>
        
        {/* Responsive List: Row on mobile (scroll), Col on desktop */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto p-2 space-x-2 md:space-x-0 md:space-y-2 no-scrollbar">
          {characters.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCharId(c.id)}
              className={`flex-shrink-0 w-40 md:w-full p-3 rounded-lg border transition-all text-left flex flex-col gap-1 ${selectedCharId === c.id ? 'bg-purple-900/20 border-purple-500/50' : 'bg-black/20 border-transparent hover:border-purple-900/40'}`}
            >
              <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                <span className={`truncate mr-2 ${c.status === '사망' ? 'text-red-500' : 'text-neutral-200'}`}>{c.name}</span>
                <span className="text-[10px] text-neutral-500">{c.species}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop Total Credits Footer */}
        <div className="hidden md:flex p-4 bg-black/60 border-t border-purple-900/30 justify-between mt-auto">
           <span className="text-[11px] text-neutral-500 uppercase">보유 예산 (CREDITS)</span>
           <span className="text-lg font-bold text-amber-500 flex items-center gap-1"><Coins size={16}/> {credits}</span>
        </div>
      </div>

      {/* Store Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-950/40 overflow-hidden relative">
        {/* Owner Banner */}
        <div className="shrink-0 border-b border-purple-900/20 flex flex-col md:flex-row p-4 md:p-8 gap-4 md:gap-8 items-center bg-gradient-to-b from-indigo-950/30 to-transparent">
           <div className="w-24 h-24 md:w-40 md:h-40 bg-black rounded-full border-2 border-purple-500/30 flex items-center justify-center text-5xl md:text-7xl shrink-0">{owner.avatar}</div>
           <div className="space-y-2 text-center md:text-left w-full">
              <h2 className="text-lg md:text-2xl font-serif text-purple-400 tracking-widest uppercase">{owner.name}</h2>
              <div className="bg-black/60 p-3 md:p-4 border-l-4 border-purple-600 rounded-r-lg italic text-xs md:text-sm text-purple-200/80">"{owner.dialogues[dialogueIdx]}"</div>
           </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
           <h3 className="text-[11px] md:text-[13px] text-purple-400 uppercase tracking-widest font-bold mb-4 md:mb-6 flex items-center gap-2"><ShoppingBag size={16} /> 심해 카탈로그</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20 md:pb-0">
              {items.map(item => (
                <div key={item.id} className="bg-neutral-900/60 border border-purple-900/30 p-4 md:p-6 rounded-xl flex flex-col justify-between hover:border-purple-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl md:text-4xl">{item.icon}</span>
                    <span className="bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded text-amber-500 text-xs font-bold">{item.price} CR</span>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-neutral-200 mb-2">{item.name}</h4>
                  <p className="text-xs md:text-[13px] text-neutral-500 mb-4 md:mb-6 leading-relaxed">{item.description}</p>
                  <button onClick={() => handleBuyClick(item)} className="w-full py-2.5 bg-neutral-800 hover:bg-purple-600 text-neutral-400 hover:text-white border border-purple-900/50 text-xs font-bold uppercase rounded-lg transition-all active:scale-95">수술 개시</button>
                </div>
              ))}
           </div>
        </div>

        {/* Body Part Selector Modal */}
        {showBodySelector && selectedChar && pendingItem && (
          <div className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-neutral-900 border border-purple-500/50 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.2)] max-w-md w-full max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-purple-900/30">
                <h3 className="text-purple-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Activity size={18} /> 생체 재구성 부위 선택
                </h3>
                <button onClick={closeBodySelector} className="text-neutral-500 hover:text-purple-400"><X size={20}/></button>
              </div>
              
              <div className="p-4 bg-purple-900/10 border-b border-purple-900/30">
                <p className="text-xs text-neutral-300">
                  <span className="font-bold text-purple-300">{selectedChar.name}</span>의 어느 부위를 복구하시겠습니까?<br/>
                  <span className="text-[10px] text-neutral-500">* 완전히 파괴된 부위도 재구성이 가능합니다.</span>
                </p>
              </div>

              <div className="overflow-y-auto p-2 custom-scrollbar grid grid-cols-2 gap-2">
                {bodyPartKeys.map(key => {
                  const part = selectedChar.body[key];
                  const isFull = part.current === part.max;
                  const isDestroyed = part.current <= 0;
                  
                  return (
                    <button
                      key={key}
                      disabled={isFull}
                      onClick={() => processTransaction(pendingItem, key)}
                      className={`p-3 rounded border text-left flex flex-col gap-1 transition-all relative overflow-hidden
                        ${isFull 
                          ? 'bg-neutral-950 border-neutral-800 text-neutral-600 cursor-not-allowed opacity-50' 
                          : isDestroyed 
                            ? 'bg-red-950/20 border-red-500/50 hover:bg-red-900/30 text-red-400' 
                            : 'bg-neutral-800/50 border-neutral-700 hover:border-purple-500 hover:bg-purple-900/20 text-neutral-200'}
                      `}
                    >
                      <div className="flex justify-between items-center z-10 relative">
                        <span className="text-xs font-bold uppercase">{part.name}</span>
                        {isDestroyed ? <XCircle size={14} /> : isFull ? <Activity size={14} /> : <AlertTriangle size={14} />}
                      </div>
                      <div className="flex justify-between items-end z-10 relative">
                        <span className="text-[10px] font-mono">{part.current} / {part.max}</span>
                        <span className="text-[9px] uppercase font-bold">
                          {isDestroyed ? 'CRITICAL' : isFull ? 'STABLE' : 'DAMAGED'}
                        </span>
                      </div>
                      {/* Progress Bar Background */}
                      {!isFull && !isDestroyed && (
                        <div className="absolute bottom-0 left-0 h-1 bg-amber-500/30" style={{ width: `${(part.current / part.max) * 100}%` }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-3 border-t border-purple-900/30 bg-black/20 text-center">
                <button onClick={closeBodySelector} className="text-xs text-neutral-500 hover:text-neutral-300 uppercase tracking-widest">취소</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
