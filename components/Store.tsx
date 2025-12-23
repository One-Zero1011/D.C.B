
import React, { useState } from 'react';
import { db } from '../dataBase/manager';
import { Character, StoreItem } from '../types';
import { ShoppingBag, User, Coins } from 'lucide-react';

interface Props {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const Store: React.FC<Props> = ({ characters, setCharacters }) => {
  const items = db.getStoreItems();
  const owner = db.getStoreOwner();
  const [selectedCharId, setSelectedCharId] = useState<string>(characters.length > 0 ? characters[0].id : '');
  const [dialogueIdx, setDialogueIdx] = useState(0);

  const totalCredits = characters.reduce((acc, curr) => acc + curr.anomaliesFixed, 0);

  const handleBuy = (item: StoreItem) => {
    if (!selectedCharId) {
      alert("치료할 요원을 선택하십시오.");
      return;
    }
    if (totalCredits < item.price) {
      alert("크레딧이 부족합니다.");
      return;
    }

    setCharacters(prev => prev.map(c => {
      if (c.id !== selectedCharId) return c;
      // db 매니저를 통해 복잡한 효과 적용
      return db.applyStoreItem(c, item);
    }));

    setDialogueIdx((prev) => (prev + 1) % owner.dialogues.length);
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-indigo-950/20 border border-purple-900/30 rounded-lg overflow-hidden font-mono shadow-2xl relative">
      {/* Sidebar (Desktop) / Topbar (Mobile): Character List */}
      <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-purple-900/30 bg-black/40 flex flex-col shrink-0">
        <div className="p-3 md:p-4 border-b border-purple-900/30 flex justify-between items-center">
          <h3 className="text-[11px] md:text-[13px] text-purple-400 uppercase tracking-[0.2em] font-bold flex items-center gap-2"><User size={16} /> 대기 자산</h3>
          <span className="text-xs font-bold text-amber-500 flex items-center gap-1 md:hidden"><Coins size={14}/> {totalCredits}</span>
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
                <span className="text-purple-400">{c.anomaliesFixed} CR</span>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop Total Credits Footer */}
        <div className="hidden md:flex p-4 bg-black/60 border-t border-purple-900/30 justify-between mt-auto">
           <span className="text-[11px] text-neutral-500 uppercase">가용 크레딧</span>
           <span className="text-lg font-bold text-amber-500 flex items-center gap-1"><Coins size={16}/> {totalCredits}</span>
        </div>
      </div>

      {/* Store Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-950/40 overflow-hidden">
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
                  <button onClick={() => handleBuy(item)} className="w-full py-2.5 bg-neutral-800 hover:bg-purple-600 text-neutral-400 hover:text-white border border-purple-900/50 text-xs font-bold uppercase rounded-lg transition-all active:scale-95">수술 개시</button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
