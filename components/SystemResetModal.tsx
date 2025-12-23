
import React, { useState } from 'react';
import { X, AlertTriangle, RotateCcw, ShieldAlert, Power } from 'lucide-react';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const SystemResetModal: React.FC<Props> = ({ onConfirm, onClose }) => {
  const [confirmText, setConfirmText] = useState('');
  const TARGET_TEXT = "시스템 초기화";

  const handleConfirm = () => {
    if (confirmText === TARGET_TEXT) {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-neutral-900 border-2 border-red-900/50 p-6 md:p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-sm flex flex-col relative overflow-hidden">
        
        {/* Background Decors */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
        <div className="absolute -right-10 -top-10 text-red-900/10 rotate-12 pointer-events-none">
          <AlertTriangle size={200} />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-serif text-red-500 tracking-widest uppercase flex items-center gap-3">
              <RotateCcw size={32} /> 시스템 리부트
            </h2>
            <span className="text-xs text-red-800 uppercase tracking-[0.3em] font-mono mt-2">
              Factory Reset Protocol // Level 0 Access
            </span>
          </div>
          <button onClick={onClose} className="text-red-900 hover:text-red-500 transition-colors">
            <X size={32} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 relative z-10 mb-8">
          <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-sm">
            <p className="text-red-200 font-bold mb-4 flex items-center gap-2 text-lg">
              <ShieldAlert /> 경고: 데이터 영구 소실
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-400 space-y-2 font-mono leading-relaxed">
              <li>현재 진행 중인 모든 시뮬레이션 데이터가 삭제됩니다.</li>
              <li>생성된 요원, 로그, 자금, 관계도 등 모든 기록이 소멸합니다.</li>
              <li>이 작업은 <span className="text-red-500 underline decoration-red-900 underline-offset-4">되돌릴 수 없습니다.</span></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">
              확인을 위해 아래 입력창에 <span className="text-red-500 font-bold">"{TARGET_TEXT}"</span>를 입력하십시오.
            </label>
            <input 
              type="text" 
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="시스템 초기화"
              className="bg-black border border-red-900/50 text-red-100 p-4 text-center font-bold tracking-widest outline-none focus:border-red-500 transition-colors uppercase placeholder:text-red-900/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <button 
            onClick={onClose}
            className="py-4 border border-neutral-800 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 font-bold uppercase tracking-widest transition-all"
          >
            취소 (Cancel)
          </button>
          <button 
            onClick={handleConfirm}
            disabled={confirmText !== TARGET_TEXT}
            className={`py-4 border font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
              ${confirmText === TARGET_TEXT 
                ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-500' 
                : 'bg-red-950/20 border-red-900/30 text-red-900 cursor-not-allowed'}`}
          >
            <Power size={18} /> 초기화 실행
          </button>
        </div>

      </div>
    </div>
  );
};

export default SystemResetModal;
