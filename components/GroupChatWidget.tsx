
import React, { useState, useEffect, useRef } from 'react';
import { Character } from '../types';
import { NPC } from '../dataBase/npc/types';
import { CHAT_SCRIPTS, CHAT_CONVERSATIONS, ChatConversation } from '../dataBase/seeds/chatScripts';
import { MessageSquare, User, Hash, ArrowLeft } from 'lucide-react';

interface Props {
  selectedChar: Character | undefined;
  allNpcs: NPC[];
  activeChannel: string; // 'general' or Team Name
  onSwitchChannel: (channel: string) => void;
}

interface ChatMessage {
  id: string;
  npcId: string;
  npcName: string;
  npcAvatar: string;
  text: string;
  action?: string;
  timestamp: string;
  affinityLevel: 1 | 2 | 3;
  themeColor: string;
}

const GroupChatWidget: React.FC<Props> = ({ selectedChar, allNpcs, activeChannel, onSwitchChannel }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isChannelChanging, setIsChannelChanging] = useState(false);
  
  // 대화 진행 상태 관리
  const [isPlayingConversation, setIsPlayingConversation] = useState(false);
  const [typingInfo, setTypingInfo] = useState<{ name: string; avatar: string } | null>(null);
  
  // 현재 활성 채널을 Ref로 추적하여 비동기 루프 내에서 상태 확인
  const activeChannelRef = useRef(activeChannel);

  // 채널 변경 감지 및 초기화
  useEffect(() => {
    activeChannelRef.current = activeChannel;
    setIsChannelChanging(true);
    setMessages([]); 
    setIsPlayingConversation(false);
    setTypingInfo(null);

    const timer = setTimeout(() => {
      setIsChannelChanging(false);
      triggerRandomEvent(true); 
    }, 500);

    return () => clearTimeout(timer);
  }, [activeChannel, selectedChar]);

  // 주기적 메시지 생성 루프
  useEffect(() => {
    const interval = setInterval(() => {
      // 채널 변경 중이 아니고, 대화 중이 아니고, 타이핑 중이 아닐 때만 트리거
      if (!isChannelChanging && !isPlayingConversation && !typingInfo && Math.random() > 0.3) { 
        triggerRandomEvent();
      }
    }, 3500); 

    return () => clearInterval(interval);
  }, [selectedChar, activeChannel, isChannelChanging, isPlayingConversation, typingInfo]);

  // 스크롤 자동 이동 (메시지 추가되거나 타이핑 상태 변할 때)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingInfo]);

  // 이벤트 트리거 (단일 메시지 vs 대화 세트)
  const triggerRandomEvent = (isInitial = false) => {
    if (!isInitial && Math.random() < 0.4) {
      startConversation();
    } else {
      addSingleRandomMessage();
    }
  };

  // 단일 메시지 추가
  const addSingleRandomMessage = async () => {
    if (!selectedChar) return;

    let targetNpcs = allNpcs;
    if (activeChannel !== 'general') {
      targetNpcs = allNpcs.filter(npc => npc.team === activeChannel);
    }
    if (targetNpcs.length === 0) return;

    const randomNpc = targetNpcs[Math.floor(Math.random() * targetNpcs.length)];
    const affinity = selectedChar.npcAffinities[randomNpc.id] || 0;

    const availableScripts = CHAT_SCRIPTS.filter(script => 
      script.npcId === randomNpc.id && 
      affinity >= script.minAffinity && 
      affinity <= script.maxAffinity
    );

    if (availableScripts.length === 0) return;

    // 단일 메시지도 짧은 입력 딜레이 연출
    setTypingInfo({ name: randomNpc.name, avatar: randomNpc.avatar });
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    setTypingInfo(null);

    // 채널이 바뀌었으면 메시지 추가 안 함
    if (activeChannelRef.current !== activeChannel) return;

    const selectedScriptBlock = availableScripts[0];
    const randomText = selectedScriptBlock.messages[Math.floor(Math.random() * selectedScriptBlock.messages.length)];

    let level: 1 | 2 | 3 = 1;
    if (affinity >= 70) level = 3;
    else if (affinity >= 30) level = 2;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      npcId: randomNpc.id,
      npcName: randomNpc.name,
      npcAvatar: randomNpc.avatar,
      text: randomText,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      affinityLevel: level,
      themeColor: randomNpc.themeColor
    };

    setMessages(prev => [...prev, newMessage].slice(-30));
  };

  // 대화 세트 시작
  const startConversation = () => {
    const validConvos = CHAT_CONVERSATIONS.filter(convo => {
      const isChannelMatch = activeChannel === 'general' || convo.teams.includes(activeChannel);
      return isChannelMatch;
    });

    if (validConvos.length === 0) {
      addSingleRandomMessage();
      return;
    }

    const randomConvo = validConvos[Math.floor(Math.random() * validConvos.length)];
    setIsPlayingConversation(true);
    playConversationSequence(randomConvo);
  };

  const playConversationSequence = async (convo: ChatConversation) => {
    // 대화 시작 전 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 800));

    for (let i = 0; i < convo.messages.length; i++) {
      // 채널이 변경되었는지 확인
      if (activeChannelRef.current !== activeChannel) break;

      const msgData = convo.messages[i];
      const npc = allNpcs.find(n => n.id === msgData.npcId);
      if (!npc) continue;

      // 1. 입력 중 상태 표시
      setTypingInfo({ name: npc.name, avatar: npc.avatar });

      // 2. 입력 딜레이 (1~2초)
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));

      // 딜레이 도중 채널 변경 체크
      if (activeChannelRef.current !== activeChannel) {
        setTypingInfo(null);
        break;
      }

      // 3. 입력 상태 해제 및 메시지 추가
      setTypingInfo(null);

      const affinity = selectedChar ? (selectedChar.npcAffinities[npc.id] || 0) : 0;
      let level: 1 | 2 | 3 = 1;
      if (affinity >= 70) level = 3;
      else if (affinity >= 30) level = 2;

      const newMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        npcId: npc.id,
        npcName: npc.name,
        npcAvatar: npc.avatar,
        text: msgData.text,
        action: msgData.action,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        affinityLevel: level,
        themeColor: npc.themeColor
      };

      setMessages(prev => [...prev, newMessage].slice(-30));
      
      // 4. 다음 메시지가 있다면 아주 짧은 텀(숨 고르기) 후 반복
      if (i < convo.messages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 400));
      }
    }
    
    setTypingInfo(null);
    setIsPlayingConversation(false);
  };

  const getMessageStyle = (level: number, color: string) => {
    if (level === 3) return `border-l-2 border-${color}-500 bg-${color}-500/10 text-${color}-200 font-medium`;
    else if (level === 2) return `text-neutral-300`;
    return `text-neutral-500 opacity-80`;
  };

  const onlineCount = activeChannel === 'general' 
    ? allNpcs.length 
    : allNpcs.filter(n => n.team === activeChannel).length;

  return (
    <div className="flex flex-col bg-black/60 border-b border-amber-900/30 h-64 shrink-0 overflow-hidden relative group transition-all">
      {/* Header */}
      <div className={`flex items-center justify-between px-3 py-2 border-b backdrop-blur-sm z-10 transition-colors duration-500
        ${activeChannel === 'general' ? 'bg-neutral-900/80 border-white/5' : 'bg-amber-900/20 border-amber-500/20'}`}>
        
        <div className="flex items-center gap-2 overflow-hidden">
          {activeChannel !== 'general' ? (
            <button 
              onClick={() => onSwitchChannel('general')}
              className="text-neutral-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
              title="전체 채널로 복귀"
            >
              <ArrowLeft size={12} />
            </button>
          ) : (
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          )}
          
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-widest truncate flex items-center gap-1
              ${activeChannel === 'general' ? 'text-neutral-400' : 'text-amber-500'}`}>
              <Hash size={10} /> {activeChannel === 'general' ? 'GENERAL' : activeChannel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-600 shrink-0">
          <User size={12} />
          <span className="text-[9px] font-mono">{onlineCount} On</span>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar scroll-smooth relative"
      >
        {isChannelChanging ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black/80 z-20">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"/>
            <span className="text-[9px] text-amber-500/50 font-mono animate-pulse">CONNECTING...</span>
          </div>
        ) : messages.length === 0 && !typingInfo ? (
          <div className="text-center text-[10px] text-neutral-700 mt-10 animate-pulse">
            Waiting for encrypted signal...
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 items-start animate-in slide-in-from-left-2 duration-300 ${msg.affinityLevel === 3 ? 'pl-2' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800 text-xs shrink-0 border border-neutral-700 select-none`}>
                  {msg.npcAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className={`text-[10px] font-bold truncate ${msg.affinityLevel === 3 ? 'text-amber-500' : 'text-neutral-400'}`}>
                      {msg.npcName}
                    </span>
                    <span className="text-[8px] text-neutral-700 font-mono">{msg.timestamp}</span>
                  </div>
                  <div className={`text-[11px] leading-tight break-words flex flex-col ${getMessageStyle(msg.affinityLevel, msg.themeColor)}`}>
                    {msg.action && (
                      <span className="text-[10px] italic opacity-70 mb-0.5 block text-neutral-500">
                        * {msg.action} *
                      </span>
                    )}
                    <span>{msg.text}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {typingInfo && (
              <div className="flex gap-2 items-end animate-in fade-in slide-in-from-left-1 duration-200 pl-1">
                <div className="w-4 h-4 rounded-full flex items-center justify-center bg-neutral-800/50 text-[10px] shrink-0 border border-neutral-700/50 opacity-70 grayscale">
                  {typingInfo.avatar}
                </div>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-tl-lg rounded-tr-lg rounded-br-lg px-2 py-1 flex items-center gap-1">
                  <span className="text-[9px] text-neutral-500 font-mono">{typingInfo.name} 입력 중</span>
                  <div className="flex gap-0.5 pt-1">
                    <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area Mockup */}
      <div className="p-2 bg-neutral-900/50 border-t border-white/5 flex items-center gap-2 pointer-events-none">
        <div className="w-4 h-4 rounded bg-neutral-800 flex items-center justify-center text-neutral-500 text-[8px]">+</div>
        <div className="flex-1 h-5 bg-neutral-950 rounded border border-neutral-800 flex items-center px-2">
          <span className="text-[9px] text-neutral-700 truncate">
            {isPlayingConversation || typingInfo
              ? 'Incoming transmission...' 
              : activeChannel === 'general' ? 'Read-only channel...' : `Chatting in #${activeChannel}...`}
          </span>
        </div>
      </div>
      
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default GroupChatWidget;
