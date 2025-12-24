
import React, { useEffect, useState } from 'react';
import { Database, Unlock, Sparkles, Terminal } from 'lucide-react';

interface LoreNotificationProps {
  title: string;
  onClose: () => void;
}

const LoreNotification: React.FC<LoreNotificationProps> = ({ title, onClose }) => {
  const [decryptedTitle, setDecryptedTitle] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    // 텍스트 복호화 연출
    let iteration = 0;
    const interval = setInterval(() => {
      setDecryptedTitle(
        title
          .split('')
          .map((char, index) => {
            if (index < iteration) return title[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= title.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    const timer = setTimeout(onClose, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [title, onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-black/90 border border-amber-500/50 px-6 py-3 rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center gap-4 backdrop-blur-md">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500 blur-md opacity-20 animate-pulse" />
          <div className="w-10 h-10 border border-amber-500 bg-neutral-900 flex items-center justify-center relative z-10">
            <Unlock className="text-amber-500" size={20} />
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-amber-500/60 font-mono uppercase tracking-[0.3em] flex items-center gap-1">
              <Terminal size={10} /> Secret Data Decrypted
            </span>
            <Sparkles size={10} className="text-amber-400 animate-bounce" />
          </div>
          <h4 className="text-amber-100 font-serif text-sm md:text-base tracking-widest uppercase mt-0.5">
            {decryptedTitle}
          </h4>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500" />
      </div>
    </div>
  );
};

export default LoreNotification;
