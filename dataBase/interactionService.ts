
import { Character } from "../types";
import { NPC } from "./seeds/npcs";

export interface InteractionResult {
  message: string;
  affinityChange: number;
}

const EMOJI_SETS = {
  positive: ["✨", "💾", "👍", "❤️", "🩹", "💊", "🔋", "💡"],
  negative: ["🛑", "⚠️", "🔨", "💣", "💢", "🗑️", "☠️", "🧯"],
  neutral: ["⚙️", "👀", "📝", "🔒", "💿", "📺", "💤", "💬"],
  jam_positive: [
    "형이 너 맘에 든대! 스티커 하나 붙여줄까?",
    "오, 데이터 상태가 아주 훌륭해. 백업해두고 싶다!",
    "야, 너 꽤 튼튼하다? 형이 칭찬했어. (아마도?)",
    "치료가 필요해? 형, 쟤 좀 고쳐줘. 잼 바르듯이 부드럽게!"
  ],
  jam_negative: [
    "형이 너 쓰레기통에 처박고 싶대. 도망가.",
    "으... 너한테서 버그 냄새 나. 저리 가!",
    "형! 쟤 포맷해버려! 영구 삭제!",
    "야, 너 지금 선 넘었어. 형이 포맷 건 꺼낸다?"
  ],
  jam_neutral: [
    "형은 지금 절전 모드야. 나랑 놀자.",
    "너 오늘따라 해상도가 좀 떨어져 보인다?",
    "시스템 점검 중... 잡담 금지래. (흥)",
    "야, 스티커 남는 거 있어? 형이 갖고 싶대."
  ]
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * NPC와의 상호작용 결과를 생성합니다.
 * 요원의 상태와 NPC의 현재 호감도에 따라 다른 반응과 호감도 변화량을 반환합니다.
 */
export function generateInteractionResponse(
  char: Character, 
  npc: NPC, 
  actionType: 'talk' | 'report' | 'gift'
): InteractionResult {
  const affinity = char.npcAffinities[npc.id] || 0;
  let baseChange = 0;
  let message = "";

  // 토스터(id: toaster_leader) 전용 특수 로직 (토스터 + 잼 통역)
  if (npc.id === 'toaster_leader') {
    let emojiStr = "";
    let jamTalk = "";
    
    // 이모지 생성 (3개 랜덤 조합)
    const mood = affinity > 30 ? 'positive' : affinity < -30 ? 'negative' : 'neutral';
    
    if (actionType === 'talk') {
        baseChange = Math.random() > 0.3 ? 2 : -1;
        const emojis = Array.from({length: 3}, () => getRandom(EMOJI_SETS[mood])).join(" ");
        emojiStr = `🖥️ [${emojis}]`;
        jamTalk = getRandom(EMOJI_SETS[`jam_${mood}`]);
    } else if (actionType === 'report') {
        baseChange = char.anomaliesFixed > 0 ? 5 : 0;
        if (char.anomaliesFixed > 0) {
            emojiStr = `🖥️ [💾 📈 ✨]`;
            jamTalk = "올~ 실적 좀 쌓았는데? 형이 데이터 안 지우고 남겨준대.";
        } else {
            emojiStr = `🖥️ [💤 📉 🗑️]`;
            jamTalk = "야, 빈손으로 왔냐? 형이 너 용량 낭비래.";
        }
    } else if (actionType === 'gift') {
        baseChange = 10;
        emojiStr = `🖥️ [🎁 ❤️ 🎀]`;
        jamTalk = "우와! 이거 나 주는 거야? 아니 형 주는 거라고? 흥, 어차피 관리는 내가 해!";
    }

    // 최종 메시지 조합
    message = `${emojiStr}\n🍞 잼(통역): "${jamTalk}"`;
    return { message, affinityChange: baseChange };
  }

  // 잼(id: jam_playful) 단독 상호작용 로직
  if (npc.id === 'jam_playful') {
    if (actionType === 'talk') {
       baseChange = Math.random() > 0.4 ? 3 : -2;
       if (affinity > 30) {
          message = `${npc.name}: "있잖아, 강 팀장이 어제 커피 쏟는 거 봤어? 진짜 웃겼는데! 너한테만 말해주는 거야. 키킥."`;
       } else if (affinity < -20) {
          message = `${npc.name}: "아 왜 말 걸어? 나 바빠. 지뢰찾기 신기록 세워야 한다고."`;
       } else {
          message = `${npc.name}: "심심해... 재밌는 얘기 없어? 형은 너무 말이 없어서 재미없단 말이야."`;
       }
    } else if (actionType === 'report') {
       // 잼은 보고를 싫어함
       baseChange = -1;
       message = `${npc.name}: "으... 서류 냄새. 그런 건 형한테나 가져가. 난 글씨 읽는 거 딱 질색이야."`;
    } else if (actionType === 'gift') {
       baseChange = 15; // 선물을 매우 좋아함
       message = `${npc.name}: "헐 대박! 이거 내 거야? 진짜? 와, 너 센스 쩐다! 내가 형한테 잘 말해줄게!"`;
    }
    return { message, affinityChange: baseChange };
  }

  // 일반 NPC 로직
  if (actionType === 'talk') {
    baseChange = Math.random() > 0.3 ? 2 : -1;
    if (affinity > 50) {
      message = `${npc.name}: "아, ${char.name} 요원인가. 마침 자네 생각을 하고 있었지. 요즘 컨디션은 어떤가?"`;
    } else if (affinity < -20) {
      message = `${npc.name}: "업무 중엔 사적인 대화를 삼가게. 용건이 없으면 돌아가."`;
    } else {
      message = `${npc.name}: "무슨 일이지? 대화가 필요하다면 나중에 정식으로 시간을 내도록 하지."`;
    }
  } else if (actionType === 'report') {
    baseChange = char.anomaliesFixed > 0 ? 5 : 0;
    message = char.anomaliesFixed > 0 
      ? `${npc.name}: "훌륭한 성과군. 자네 같은 요원이 있어 다행이야. 이 기록은 본부에 잘 보고하겠네."`
      : `${npc.name}: "보고할 내용이 없군. 현장으로 돌아가서 실적을 쌓아오게."`;
  } else if (actionType === 'gift') {
    baseChange = 10;
    message = `${npc.name}: "이걸 나에게? ...흠, 뇌물은 아니겠지. 고맙게 받겠네. 자네의 성의는 잊지 않지."`;
  }

  return { message, affinityChange: baseChange };
}
