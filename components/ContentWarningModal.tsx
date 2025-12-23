
import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface Props {
  onConfirm: () => void;
}

const ContentWarningModal: React.FC<Props> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-neutral-900 border-2 border-red-900/60 p-1 shadow-[0_0_50px_rgba(220,38,38,0.15)] rounded-sm relative animate-in fade-in duration-1000">
        {/* Inner Border Decoration */}
        <div className="border border-red-500/20 p-8 flex flex-col items-center text-center h-full relative overflow-hidden">
          
          {/* Background Pulse Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600/50 animate-pulse" />
          
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 animate-pulse"></div>
            <ShieldAlert size={64} className="text-red-600 relative z-10" />
          </div>

          <h1 className="text-3xl font-serif text-red-600 font-bold tracking-widest mb-2 uppercase drop-shadow-md">
            ⚠️ 콘텐츠 워닝
          </h1>
          <span className="text-[10px] text-red-800 uppercase tracking-[0.6em] mb-8 font-mono border-b border-red-900/30 pb-4 w-full">
            Restricted Access // Sensitive Content
          </span>

          <div className="space-y-6 text-neutral-300 text-sm leading-relaxed mb-10 w-full px-4">
            <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-sm">
              <p className="font-bold text-red-500 mb-2 flex items-center justify-center gap-2">
                <AlertTriangle size={14} /> 주의: 민감한 내용 포함
              </p>
              <p className="text-neutral-400 text-xs">
                이 콘텐츠에는 일부 민감한 주제<br/>
                <span className="text-red-400 font-bold">(예: 고어, 혐오, 폭력, 자해, 고문 등)</span>가<br/>
                포함되어 있습니다.
              </p>
            </div>
            
            <p className="text-xs text-neutral-500 font-mono tracking-tight leading-loose">
              해당 콘텐츠는 민감하고 충격적인 내용을 포함하고 있을 수 있습니다.<br/>
              사용자의 정서적 안정을 위해<br/> 
              <span className="underline decoration-red-900 underline-offset-4">주의 깊게 접근해 주시기 바랍니다.</span>
            </p>
          </div>

          <button 
            onClick={onConfirm}
            className="w-full group relative overflow-hidden bg-red-950/30 hover:bg-red-900/50 border border-red-800 text-red-500 hover:text-red-100 py-4 transition-all duration-300"
          >
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all">
              시스템 접속 승인
            </span>
            <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentWarningModal;
