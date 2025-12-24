
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
 */
export function generateInteractionResponse(
  char: Character, 
  npc: NPC, 
  actionType: 'talk' | 'report' | 'gift'
): InteractionResult {
  const affinity = char.npcAffinities[npc.id] || 0;
  let baseChange = 0;
  let message = "";

  // --- 토스터 & 잼 로직 ---
  if (npc.id === 'toaster_leader' || npc.id === 'jam_playful') {
     if (npc.id === 'toaster_leader') {
        let emojiStr = ""; let jamTalk = ""; const mood = affinity > 30 ? 'positive' : affinity < -30 ? 'negative' : 'neutral';
        if (actionType === 'talk') { baseChange = Math.random() > 0.3 ? 2 : -1; const emojis = Array.from({length: 3}, () => getRandom(EMOJI_SETS[mood])).join(" "); emojiStr = `🖥️ [${emojis}]`; jamTalk = getRandom(EMOJI_SETS[`jam_${mood}`]); } 
        else if (actionType === 'report') { baseChange = char.anomaliesFixed > 0 ? 5 : 0; emojiStr = char.anomaliesFixed > 0 ? `🖥️ [💾 📈 ✨]` : `🖥️ [💤 📉 🗑️]`; jamTalk = char.anomaliesFixed > 0 ? "올~ 실적 좀 쌓았는데? 형이 데이터 안 지우고 남겨준대." : "야, 빈손으로 왔냐? 형이 너 용량 낭비래."; }
        else if (actionType === 'gift') { baseChange = 10; emojiStr = `🖥️ [🎁 ❤️ 🎀]`; jamTalk = "우와! 이거 나 주는 거야? 아니 형 주는 거라고? 흥, 어차피 관리는 내가 해!"; }
        return { message: `${emojiStr}\n🍞 잼(통역): "${jamTalk}"`, affinityChange: baseChange };
     }
  }

  // --- 1. 사원 이준 (T1) ---
  if (npc.id === 'lee_jun_staff') {
    if (actionType === 'talk') {
      baseChange = Math.random() > 0.4 ? 4 : -1;
      if (affinity > 50) {
        message = `${npc.name}: "아, 요원님! 방금 강 팀장님 표정 보셨어요? 제가 작전 오차 잡아내니까 입술을 파르르 떠시는데... 크으, 그게 제 삶의 낙이라니까요! 히히!"`;
      } else if (affinity < -10) {
        message = `${npc.name}: "에이, 요원님까지 왜 그러세요? 팀장님한테 혼난 걸로 충분하다고요. 근데 그거 아세요? 어차피 제 말이 맞을 거라는 거! 메롱!"`;
      } else {
        message = `${npc.name}: "어이쿠, 요원님! 마침 잘 오셨어요. 저 지금 팀장님 몰래 시스템에 제 이니셜 새기는 중인데, 비밀로 해주실 거죠? 윙크!"`;
      }
    } else if (actionType === 'report') {
      baseChange = char.anomaliesFixed > 2 ? 8 : 3;
      message = char.anomaliesFixed > 2 
        ? `${npc.name}: "오~ 요원님 실력 좋은데요? 근데 이 부분, 제 직감이 말하는데 아주 살짝 위험해요. 물론 팀장님은 '통계 밖'이라며 무시하시겠지만... 뭐, 제가 몰래 보강해둘게요! 저 멋있죠?"`
        : `${npc.name}: "보고서 잘 받았슴다! 팀장님께는 제가 깐족거리면서 잘 전달할게요. 한 대 맞을지도 모르지만, 뭐 어때요! 재밌잖아요!"`;
    } else if (actionType === 'gift') {
      baseChange = 15;
      message = `${npc.name}: "우와아아! 무음 키보드?! 요원님, 진짜 센스쟁이! 이제 팀장님 몰래 더 신나게 깝칠 수 있겠어요! 사랑합니다!"`;
    }
    return { message, affinityChange: baseChange };
  }

  // --- 2. 사원 박태우 (T2) ---
  if (npc.id === 'park_taewoo_staff') {
    if (actionType === 'talk') {
      baseChange = Math.random() > 0.5 ? 4 : -2;
      message = affinity > 30
        ? `${npc.name}: "아, 요원님. 오신 김에 이거 서류 사인 좀 대신... 아, 안 되나요? 최 팀장님이 도망가서 제가 다 죽게 생겼습니다. (절망)"`
        : `${npc.name}: "하... 또 무슨 일이길래 저를 부르십니까. 퇴근하고 싶다..."`;
    } else if (actionType === 'report') {
      baseChange = char.anomaliesFixed > 0 ? 4 : 0;
      message = `${npc.name}: "보고서 주셨네요. 어차피 최 팀장님이 안 읽으시겠지만 제가 잘 보관할게요. 분실되면 제 책임이니까요."`;
    } else if (actionType === 'gift') {
      baseChange = 15;
      message = `${npc.name}: "카페인 알약! 와, 요원님 진짜 제 구원자시네요. 이거 먹고 세 시간만 더 버텨볼게요. 팀장님이 술병 깨뜨린 거 치워야 하거든요."`;
    }
    return { message, affinityChange: baseChange };
  }

  // --- 3. 사원 이사현 (T3) ---
  if (npc.id === 'sa_heon_staff') {
    if (actionType === 'talk') {
      baseChange = Math.random() > 0.4 ? 5 : -1;
      if (affinity > 50) {
        message = `${npc.name}: "요원님, 백 팀장님이 오늘 아침에 드신 차가 평소보다 조금 연하더라고요. 마음이 어수선하신 걸까요? ...아, 제가 너무 유난인가요? 후후."`;
      } else if (affinity < -10) {
        message = `${npc.name}: "당신에게선... 팀장님의 향취가 묻어있네요. 너무 가깝게 서 계셨던 거 아녜요? 조심하세요. 냄새는 금방 썩으니까."`;
      } else {
        message = `${npc.name}: "아, 잠시만요. 팀장님 코트 깃에 실밥이... (정교하게 가위질을 하며) ...됐습니다. 이런 건 제가 해야 마음이 놓이거든요."`;
      }
    } else if (actionType === 'report') {
      baseChange = char.anomaliesFixed > 3 ? 9 : 2;
      message = char.anomaliesFixed > 3 
        ? `${npc.name}: "훌륭한 성과네요. 팀장님이 기뻐하시겠어요. 그분이 웃으시는 건... 저만 보고 싶지만, 이번만큼은 요원님께 양보해 드릴게요. (서늘한 미소)"`
        : `${npc.name}: "이런 실수는 곤란해요. 팀장님의 완벽한 작전에 흠집을 내는 건... 제가 용납할 수 없거든요. 다음엔 더 섬세하게 움직이세요."`;
    } else if (actionType === 'gift') {
      baseChange = 20;
      message = `${npc.name}: "🧣 넥워머... 따뜻하네요. 이걸 하고 팀장님께 다가가면 그분이 제 온기를 더 잘 느끼시겠죠? 당신, 꽤 '맛있는' 선물을 할 줄 아는군요? 낼름."`;
    }
    return { message, affinityChange: baseChange };
  }

  // --- 4. 한규빈 (T4) 케미스트리 반영 ---
  if (npc.id === 'han_kyubin_staff') {
    if (actionType === 'talk') {
      baseChange = Math.random() > 0.4 ? 3 : -1;
      if (affinity > 50) {
        message = `${npc.name}: "...당신은 데이터 노이즈가 적은 개체군요. 토스터 팀장님 곁에서 잠시 대기하는 것을 허가합니다. 잼이 붙인 스티커는 건드리지 마십시오."`;
      } else if (affinity < -10) {
        message = `${npc.name}: "대화 시도가 비효율적입니다. 잼의 확성기 소음보다 당신의 목소리가 더 불쾌한 주파수를 내고 있습니다. 제 시야에서 15도 이상 이탈하십시오."`;
      } else {
        message = `${npc.name}: "잠시만 기다리십시오. 토스터 팀장님의 메인보드 온도 체크 중입니다. ...됐습니다. 질문하십시오. 단, 답변의 길이는 32자 이내로 제한합니다."`;
      }
    } else if (actionType === 'report') {
      baseChange = char.anomaliesFixed > 0 ? 6 : 1;
      message = char.anomaliesFixed > 0 
        ? `${npc.name}: "보고서 수신. 잼이 낙서하기 전에 데이터 블록화 완료했습니다. 본부 전송 중. 깔끔한 성과군요. 긍정적으로 기록하겠습니다."`
        : `${npc.name}: "성과 미달. 잼의 장난보다 가치 없는 데이터입니다. 다시 현장으로 나가서 질서 있는 결과물을 가져오십시오."`;
    } else if (actionType === 'gift') {
      baseChange = 20;
      message = `${npc.name}: "(윤활제를 토스터의 경첩에 뿌리며) ...최고의 품질이군요. 팀장님의 구동음이 한층 매끄러워졌습니다. 당신이라는 개체의 유용성을 상향 조정하겠습니다. 감사합니다."`;
    }
    return { message, affinityChange: baseChange };
  }

  // --- 팀장급 ---
  if (npc.id === 'baek_leader') {
    if (actionType === 'talk') {
      baseChange = Math.random() > 0.4 ? 3 : -1;
      if (affinity > 50) message = `${npc.name}: "어이, ${char.name}. 사현이 녀석이 또 이상한 소리 안 하더냐? 녀석이 자꾸 뒤를 밟아서 털이 다 쭈뼛거리는군. 쯧."`;
      else if (affinity < -20) message = `${npc.name}: "가까이 오지 마라. 피 비린내가 역하군. 정신 똑바로 차려."`;
      else message = `${npc.name}: "무슨 일이지? 사현이 녀석이 또 사고 쳤나? 할 말이 없으면 훈련장으로 꺼져라."`;
    } else if (actionType === 'report') {
      baseChange = char.anomaliesFixed > 0 ? 6 : 0;
      message = char.anomaliesFixed > 0 ? `${npc.name}: "오... 이 정도면 무리에서 제 역할을 다했군. 이 기록은 잊지 않겠다. 잘했다."` : `${npc.name}: "이딴 게 보고서냐? 현장의 먼지라도 긁어오란 말이다. 다시 나가!"`;
    } else if (actionType === 'gift') {
      baseChange = 12;
      message = `${npc.name}: "육포라... (우득) 음, 간이 잘 됐군. 고맙다. (사현이가 보면 또 뺏으려 들겠군)"`;
    }
    return { message, affinityChange: baseChange };
  }

  // 공통 처리
  if (actionType === 'talk') {
    baseChange = Math.random() > 0.3 ? 2 : -1;
    if (affinity > 50) message = `${npc.name}: "아, ${char.name} 요원인가. 마침 자네 생각을 하고 있었지. 요즘 컨디션은 어떤가?"`;
    else if (affinity < -20) message = `${npc.name}: "업무 중엔 사적인 대화를 삼가게. 용건이 없으면 돌아가."`;
    else message = `${npc.name}: "무슨 일이지? 대화가 필요하다면 나중에 시간을 내도록 하지."`;
  } else if (actionType === 'report') {
    baseChange = char.anomaliesFixed > 0 ? 5 : 0;
    message = char.anomaliesFixed > 0 ? `${npc.name}: "훌륭한 성과군. 이 기록은 본부에 잘 보고하겠네."` : `${npc.name}: "보고할 내용이 없군. 현장으로 돌아가게."`;
  } else if (actionType === 'gift') {
    baseChange = 10;
    message = `${npc.name}: "이걸 나에게? ...고맙게 받겠네. 자네의 성의는 잊지 않지."`;
  }

  return { message, affinityChange: baseChange };
}
