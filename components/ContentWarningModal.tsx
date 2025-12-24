import React from 'react';
import { ShieldAlert, HeartPulse, Eye, Zap } from 'lucide-react';

interface Props {
  onConfirm: () => void;
}

const ContentWarningModal: React.FC<Props> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
      <div className="max-w-lg w-full max-h-[90vh] bg-neutral-900 border-2 border-red-900/60 p-1 shadow-[0_0_50px_rgba(220,38,38,0.15)] rounded-sm relative animate-in fade-in duration-1000 flex flex-col">
        
        {/* Inner Border Decoration & Scroll Container */}
        <div className="border border-red-500/20 flex flex-col h-full relative overflow-hidden">
          
          {/* Background Decor Effects (Pinned to top/bottom of the border) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50 animate-pulse z-20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600/50 animate-pulse z-20" />
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 flex flex-col items-center text-center">
            
            <div className="mb-6 relative shrink-0">
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 animate-pulse"></div>
              <ShieldAlert size={64} className="text-red-600 relative z-10" />
            </div>

            <h1 className="text-3xl font-serif text-red-600 font-bold tracking-widest mb-2 uppercase drop-shadow-md shrink-0">
              ⚠️ Content Warning
            </h1>
            <span className="text-[10px] text-red-800 uppercase tracking-[0.6em] mb-6 font-mono border-b border-red-900/30 pb-4 w-full shrink-0">
              Restricted Access // Security Protocol
            </span>

            <div className="space-y-4 w-full mb-8">
              
              {/* 1. 심신 취약자 경고 */}
              <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-sm transition-all hover:bg-red-950/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <HeartPulse size={16} className="text-red-500" />
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">심신 취약자 주의</span>
                </div>
                <p className="text-red-100 text-sm font-bold leading-relaxed">
                  심장 약한 분, 임산부, 노약자 및 어린이는<br/>
                  시청 및 플레이에 각별히 주의해 주십시오.
                </p>
              </div>

              {/* 2. 민감한 주제 경고 */}
              <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-sm transition-all hover:bg-red-950/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye size={16} className="text-red-600/70" />
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">민감한 주제 포함</span>
                </div>
                <p className="text-neutral-400 text-[12px] leading-relaxed">
                  본 시뮬레이션은 <span className="text-red-400 font-bold text-[13px]">고어, 혐오, 폭력, 자해, 고문</span> 등<br/>
                  정신적으로 큰 충격을 줄 수 있는 소재를 다루고 있습니다.
                </p>
              </div>

              {/* 3. 광과민성 경고 */}
              <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-sm transition-all hover:bg-red-950/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap size={16} className="text-amber-500/70" />
                  <span className="text-[11px] font-bold text-amber-500/70 uppercase tracking-widest">광과민성 경고</span>
                </div>
                <p className="text-neutral-400 text-[12px] leading-relaxed">
                  일부 사용자에게서 <span className="text-amber-400 font-bold">광과민성 발작</span>을 유발할 수 있는<br/>
                   <span className="text-amber-400 font-bold">깜박이는 빛, 빠른 화면 전환, 기하학적 패턴이 포함</span>되어 있습니다.
                </p>
              </div>

              <div className="w-full space-y-4 pt-4">
                <p className="text-[11px] text-neutral-600 font-mono tracking-tight leading-loose">
                  사용자의 정서적 안정을 위해<br/> 
                  <span className="text-red-400 underline decoration-red-900 underline-offset-4">위험 요소를 충분히 숙지한 후 이용하십시오.</span>
                </p>

                <button 
                  onClick={onConfirm}
                  className="w-full group relative overflow-hidden bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-500 hover:text-red-100 py-4 transition-all duration-300"
                >
                  <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all">
                    위 내용을 확인했으며 접속을 승인합니다
                  </span>
                  <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWarningModal;