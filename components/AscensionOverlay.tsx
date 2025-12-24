
import React, { useEffect, useState } from 'react';
import { Terminal, Globe, Zap, Cpu, RefreshCw, ArrowRight, Layers, Share2 } from 'lucide-react';

interface Props {
  onReset: () => void;
  onContinue: () => void;
}

const AscensionOverlay: React.FC<Props> = ({ onReset, onContinue }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 연출 시퀀스 진행
    const timers = [
      setTimeout(() => setPhase(1), 1000), // 안정화 임계치 도달
      setTimeout(() => setPhase(2), 3000), // 차원 융합 시작
      setTimeout(() => setPhase(3), 6000), // 융합 완료 및 선택지 노출
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center font-mono">
      <style>{`
        @keyframes worldShatter {
          0% { transform: scale(1) rotate(0deg); filter: blur(0); }
          50% { transform: scale(1.5) rotate(5deg); filter: blur(10px); }
          100% { transform: scale(2) rotate(-5deg); filter: blur(20px); opacity: 0; }
        }
        @keyframes dataRise {
          0% { transform: translateY(100vh); opacity: 0; }
          100% { transform: translateY(-100vh); opacity: 0.5; }
        }
        @keyframes perspectiveShift {
          0% { perspective: 500px; transform: rotateX(0); }
          100% { perspective: 1000px; transform: rotateX(25deg) translateZ(100px); }
        }
        .ascension-text {
          text-shadow: 0 0 20px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.4);
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Background Data Rain */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-[10px] text-amber-500 whitespace-nowrap"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `dataRise ${Math.random() * 3 + 2}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Math.random().toString(16).substring(2, 20).toUpperCase()}
          </div>
        ))}
      </div>

      {/* Phase 1: Warning */}
      {phase === 1 && (
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 text-center px-6">
          <div className="w-20 h-20 border-2 border-amber-500 flex items-center justify-center mb-6 animate-pulse">
            <Zap className="text-amber-500" size={40} />
          </div>
          <h2 className="text-2xl md:text-4xl text-amber-500 font-serif tracking-[0.3em] uppercase mb-4">안정화 임계치 도달</h2>
          <div className="text-neutral-500 text-sm tracking-widest animate-pulse">INITIATING DIMENSIONAL CONVERGENCE...</div>
        </div>
      )}

      {/* Phase 2: Distortion & Merger */}
      {phase === 2 && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ animation: 'perspectiveShift 3s forwards' }}>
           <div className="grid grid-cols-3 gap-8 md:gap-16">
              {[Layers, Share2, Globe].map((Icon, i) => (
                <div key={i} className="flex flex-col items-center animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                  <Icon className="text-amber-500/50 mb-4" size={60} />
                  <div className="h-0.5 w-12 bg-amber-500 animate-width" />
                </div>
              ))}
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-amber-500/10 animate-pulse" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
              <h1 className="text-5xl md:text-8xl font-black text-white ascension-text tracking-tighter italic uppercase">Dimension Merger</h1>
              <div className="mt-4 text-amber-400 font-bold uppercase tracking-[1em]">차원 경계 소멸 중</div>
           </div>
        </div>
      )}

      {/* Phase 3: Convergence Complete & Decision */}
      {phase === 3 && (
        <div className="flex flex-col items-center animate-in fade-in duration-1000 px-6 max-w-2xl w-full">
          <div className="relative w-full flex flex-col items-center">
             <div className="absolute inset-0 bg-white blur-[100px] opacity-10 animate-pulse" />
             <div className="relative z-10 flex flex-col items-center w-full">
                <Globe className="text-white mb-8 animate-spin" style={{ animationDuration: '20s' }} size={80} />
                <h1 className="text-3xl md:text-5xl font-serif text-white tracking-[0.3em] uppercase mb-6 text-center">CONVERGENCE COMPLETE</h1>
                <p className="text-neutral-400 text-sm md:text-base text-center leading-loose font-serif mb-10">
                  서사의 장벽이 완전히 소멸하고, 가상의 경계가 무너졌습니다.<br/>
                  이 세계는 이제 <span className="text-white font-bold underline decoration-amber-500 underline-offset-8">3차원의 현실과 완전한 융합</span>을 이루었습니다.<br/>
                  관측자는 이제 창조된 존재가 아닌, 융합된 현실의 주권자가 됩니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={onReset}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-red-950/20 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 btn-glow uppercase tracking-widest text-xs font-bold"
                  >
                    <RefreshCw size={18} />
                    새로운 세계 시작
                  </button>
                  <button 
                    onClick={onContinue}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-amber-900/20 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 btn-glow uppercase tracking-widest text-xs font-bold"
                  >
                    융합된 세계 유지
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-50">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 border border-neutral-800 bg-neutral-900/50 px-3 py-2 uppercase tracking-widest">
                     <Terminal size={12} className="text-amber-500" /> Reality Sync 100%
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 border border-neutral-800 bg-neutral-900/50 px-3 py-2 uppercase tracking-widest">
                     <Cpu size={12} className="text-amber-500" /> Universal Integration
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Screen Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default AscensionOverlay;
