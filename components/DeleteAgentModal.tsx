
import React from 'react';
import { X, Trash2, AlertTriangle, ShieldAlert, Power } from 'lucide-react';
import { Character } from '../types';

interface Props {
  character: Character;
  onConfirm: (id: string) => void;
  onClose: () => void;
}

const DeleteAgentModal: React.FC<Props> = ({ character, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-neutral-900 border-none md:border md:border-red-900/50 p-6 md:p-10 max-w-xl w-full shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-none md:rounded-sm flex flex-col relative overflow-hidden">
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
        <div className="absolute -right-16 -top-16 text-red-900/10 rotate-12 pointer-events-none">
          <Trash2 size={260} />
        </div>

        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-serif text-red-500 tracking-widest uppercase flex items-center gap-3">
              <ShieldAlert size={32} /> 요원 데이터 말소
            </h2>
            <span className="text-xs text-red-800 uppercase tracking-[0.3em] font-mono mt-2">
              AGENT DE-MANIFESTATION PROTOCOL // LEVEL 4
            </span>
          </div>
          <button onClick={onClose} className="text-red-900 hover:text-red-500 transition-colors">
            <X size={32} />
          </button>
        </div>

        <div className="bg-black/40 border border-red-900/30 p-6 rounded-sm mb-8 relative z-10">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-neutral-800 border border-red-900/50 flex items-center justify-center text-2xl">
               💀
             </div>
             <div>
               <div className="text-red-500 text-sm font-bold uppercase tracking-widest">{character.name}</div>
               <div className="text-neutral-500 text-[10px] font-mono uppercase">{character.species} // {character.mbti} // {character.id.slice(0,8)}</div>
             </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-neutral-300 text-sm leading-relaxed">
              선택한 요원의 모든 존재 데이터를 본사 서버에서 영구적으로 소멸시킵니다. 
              <span className="text-red-500 font-bold ml-1 italic">이 작업은 인과율적으로 되돌릴 수 없습니다.</span>
            </p>
            <div className="flex items-start gap-2 text-red-900/80 text-[11px] uppercase tracking-tighter italic">
              <AlertTriangle size={14} className="shrink-0" />
              <span>Warning: Character memories, relationships, and fixed anomalies records will be purged from the timeline.</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <button 
            onClick={onClose}
            className="py-4 border border-neutral-800 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 font-bold uppercase tracking-widest transition-all text-xs"
          >
            취소 (Abort)
          </button>
          <button 
            onClick={() => onConfirm(character.id)}
            className="py-4 bg-red-600 border border-red-500 text-white font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] text-xs"
          >
            <Power size={18} /> 영구 말소 승인
          </button>
        </div>

        {/* Glitch Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>
    </div>
  );
};

export default DeleteAgentModal;
