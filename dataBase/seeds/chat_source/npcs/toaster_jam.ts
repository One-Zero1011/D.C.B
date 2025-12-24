
import { ChatScript } from "../types";

export const TOASTER_JAM_SCRIPTS: ChatScript[] = [
  {
    npcId: 'toaster_leader',
    minAffinity: -100, maxAffinity: 29,
    messages: [
      "🖥️ [SYSTEM: 서버 점검 중...]",
      "🍞 잼: 형이 지금 바쁘대. 말 걸지 마. 저리 가.",
      "🖥️ [⚠️ ERROR: 404 Not Found]",
      "🍞 잼: 야, 비켜. 데이터 지나가잖아. 길 막지 마!",
      "🖥️ [🚫 ACCESS DENIED]",
      "🍞 잼: 형이 너 싫대. 냄새난대. (거짓말임)"
    ]
  },
  {
    npcId: 'toaster_leader',
    minAffinity: 30, maxAffinity: 69,
    messages: [
      "🖥️ [💾 SAVE COMPLETE]",
      "🍞 잼: 형이 너 맘에 든대. 스티커 하나 줄까? 내가 아끼는 건데.",
      "🖥️ [⚡ BATTERY LOW]",
      "🍞 잼: 아 배고파! 누가 전기 좀 줘봐! 사탕도 좋아!",
      "🖥️ [🎵 PLAYING: CityPop.mp3]",
      "🍞 잼: 둠칫 둠칫! 형이 기분 좋대. 춤출까?"
    ]
  },
  {
    npcId: 'toaster_leader',
    minAffinity: 70, maxAffinity: 100,
    messages: [
      "🖥️ [❤️ USER DETECTED: PROTECT MODE ON]",
      "🍞 잼: 야! 형이 너 건드리는 놈은 다 포맷해버린대! 쩔지? 넌 내 거야!",
      "🖥️ [✨ 당신의 로그를 영구 보존합니다.]",
      "🍞 잼: 솔직히 말해서... 나도 너 좀 좋아해. 아주 조금! 착각하진 마!",
      "🖥️ [👍 APPROVED]",
      "🍞 잼: 형이 너는 프리패스래. 언제든지 놀러 와!"
    ]
  }
];
