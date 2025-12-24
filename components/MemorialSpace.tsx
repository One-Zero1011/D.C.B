
import React, { useState, useMemo } from 'react';
import { Character } from '../types';
import { Flower, Ghost, History, Award, Quote, MessageSquareQuote } from 'lucide-react';
import { generateMemorialScript } from '../dataBase/memorialService';

interface Props {
  characters: Character[];
}

const MemorialSpace: React.FC<Props> = ({ characters }) => {
  const deadCharacters = characters.filter(c => c.status === '사망');
  const [respectedIds, setRespectedIds] = useState<Set<string>>(new Set());

  const toggleRespect = (id: string) => {
    setRespectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 사망 캐릭터별 추모 스크립트 메모이제이션
  const memorialScripts = useMemo(() => {
    const scripts: Record<string, string> = {};
    deadCharacters.forEach(char => {
      scripts[char.id] = generateMemorialScript(char, characters);
    });
    return scripts;
  }, [deadCharacters.length, characters.length]);

  return (
    <div className="h-full flex flex-col bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden relative shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/30 rounded-full blur-[120px]" />
      </div>

      <header className="p-6 md:p-8 border-b border-zinc-900 bg-black/40 flex flex-col items-center shrink-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <History className="text-zinc-500" size={24} />
          <h2 className="text-2xl md:text-3xl font-serif text-zinc-300 tracking-[0.3em] uppercase text-center">기억의 전당</h2>
        </div>
        <p className="text-[10px] md:text-xs text-zinc-600 uppercase tracking-widest font-mono text-center">Hall of Eternal Remembrance // Dimension Corp Archive</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar z-10">
        {deadCharacters.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
            <Ghost size={64} className="text-zinc-800" />
            <div className="text-center px-4">
              <p className="text-zinc-500 font-serif text-base md:text-lg">아직 희생된 요원이 없습니다.</p>
              <p className="text-zinc-700 text-[10px] md:text-xs font-mono uppercase tracking-tighter mt-1">No assets have been de-manifested yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20 md:pb-12">
            {deadCharacters.map((char) => (
              <div 
                key={char.id} 
                className="group relative bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-500/30 transition-all p-6 flex flex-col items-center space-y-4 rounded-sm shadow-lg hover:shadow-zinc-500/5"
              >
                <div className="absolute top-2 right-2 text-[9px] text-zinc-700 font-mono">
                  ARCHIVE-ID: {char.id.slice(0, 8)}
                </div>

                <div className="w-20 h-20 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                   <Ghost className="text-zinc-600 group-hover:text-zinc-400" size={32} />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-lg md:text-xl font-serif text-zinc-400 tracking-wider group-hover:text-zinc-200 transition-colors">{char.name}</h3>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{char.species} • {char.mbti} • {char.age}세</p>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 py-4 border-y border-zinc-800/50">
                  <div className="flex flex-col items-center">
                    <Award size={14} className="text-zinc-500 mb-1" />
                    <span className="text-[9px] text-zinc-600 uppercase">오류 수정</span>
                    <span className="text-xs font-bold text-zinc-400">{char.anomaliesFixed}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Quote size={14} className="text-zinc-500 mb-1" />
                    <span className="text-[9px] text-zinc-600 uppercase">제거 기록</span>
                    <span className="text-xs font-bold text-zinc-400">{char.kills}</span>
                  </div>
                </div>

                <div className="text-center pt-2 w-full bg-zinc-950/30 p-3 rounded-sm border border-zinc-800/30 relative">
                  <MessageSquareQuote size={12} className="absolute -top-1.5 -left-1.5 text-zinc-700" />
                  <p className="text-[11px] text-zinc-400 italic leading-relaxed break-words font-serif">
                    {memorialScripts[char.id]}
                  </p>
                </div>

                <button 
                  onClick={() => toggleRespect(char.id)}
                  className={`mt-4 w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all rounded-sm
                    ${respectedIds.has(char.id) 
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100' 
                      : 'bg-transparent border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'}`}
                >
                  <Flower size={14} className={respectedIds.has(char.id) ? 'text-amber-500' : ''} />
                  {respectedIds.has(char.id) ? '헌화함' : '추모하기'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="p-4 border-t border-zinc-900 bg-black/60 flex justify-center z-10 mb-[60px] md:mb-0">
        <div className="text-[9px] md:text-[10px] text-zinc-700 uppercase tracking-[0.2em] font-mono text-center">
          "Dead assets are not gone, they are simply integrated into the timeline."
        </div>
      </footer>
    </div>
  );
};

export default MemorialSpace;
