
import { ChatConversation } from "../types";

export const GENERAL_CONVERSATIONS: ChatConversation[] = [
  // --- 팀장들 잡담 ---
  {
    id: 'leaders_drink',
    teams: ['general'],
    messages: [
      { npcId: 'choi_leader', text: "강 팀장, 오늘따라 안색이 창백하구만. 일 좀 그만하고 한잔 하러 갈텐가?", action: "술병을 흔들며" },
      { npcId: 'kang_leader', text: "업무 시간입니다. 그리고 당신 술 냄새 여기까지 납니다. 환기 좀 하시죠." },
      { npcId: 'baek_leader', text: "최 팀장, 술 좀 적당히 마셔라. 나중에 현장에서 구르다 토한다.", action: "혀를 차며" },
      { npcId: 'choi_leader', text: "이런, 다들 너무 빡빡하군. 낭만이 없어, 낭만이. 토스터 자네는 갈 거지?" },
      { npcId: 'toaster_leader', text: "🖥️ [🍺 OK]" }
    ]
  },
  {
    id: 'leaders_meeting',
    teams: ['general'],
    messages: [
      { npcId: 'kang_leader', text: "금일 전체 회의 안건 공유합니다. '사내 식당 메뉴 개선' 건입니다.", action: "차트를 띄우며" },
      { npcId: 'baek_leader', text: "고기 양을 늘려야 해. 풀떼기만 먹고 힘을 어떻게 쓰나." },
      { npcId: 'choi_leader', text: "해장국 메뉴 추가 좀 해줘. 제발." },
      { npcId: 'toaster_leader', text: "🖥️ [🔋⚡]" },
      { npcId: 'kang_leader', text: "...전기 충전소는 예산 부족으로 기각입니다. 의견 감사합니다." }
    ]
  },
  
  // --- 개판 5분 전 (혼돈) ---
  {
    id: 'chaos_gossip',
    teams: ['general'],
    messages: [
      { npcId: 'jam_playful', text: "속보! 이준 형이 강 팀장님 몰래 춤추고 있음! 영상 팝니다! 10크레딧!", action: "확성기로 떠들며" },
      { npcId: 'lee_jun_staff', text: "야!! 잼! 너 그거 지워! 당장 지워! 그거 스트레칭이야!", action: "다급하게 타자를 치며" },
      { npcId: 'park_taewoo_staff', text: "저기요... 알림 울리니까 조용히 좀... 저 자고 싶어요..." },
      { npcId: 'sa_heon_staff', text: "시끄럽군요. 팀장님 주무시는데 방해됩니다. (칼을 꺼내며)" },
      { npcId: 'kang_leader', text: "...이준 사원. 제 방으로 오세요. 영상 원본 가지고.", action: "안경을 고쳐 쓰며" },
      { npcId: 'jam_playful', text: "ㅋㅋㅋ 잘 가 형. 명복을 빌게. 영상은 내가 백업해둠!" }
    ]
  },
  {
    id: 'chaos_bug',
    teams: ['general'],
    messages: [
      { npcId: 'han_kyubin_staff', text: "경고. 메인 서버 온도 상승. 누군가 비트코인 채굴 돌리고 있습니까?" },
      { npcId: 'choi_leader', text: "어익후... 들켰나? 요즘 월급이 짜서 말이야.", action: "황급히 모니터를 끄며" },
      { npcId: 'baek_leader', text: "한심하군. 그 전력으로 난방이나 더 때지." },
      { npcId: 'lee_jun_staff', text: "팀장님! 제 컴퓨터가 느려진 게 그것 때문이었어요? 와 실망..." },
      { npcId: 'kang_leader', text: "최 팀장. 시말서가 아니라 사직서를 쓰게 될 겁니다. 당장 끄세요." }
    ]
  }
];
