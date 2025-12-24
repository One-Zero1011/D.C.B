
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
      { npcId: 'toaster_leader', text: "🖥️ [🍺 👌]" }
    ]
  },
  {
    id: 'leaders_meeting',
    teams: ['general'],
    messages: [
      { npcId: 'kang_leader', text: "금일 전체 회의 안건 공유합니다. '사내 식당 메뉴 개선' 건입니다.", action: "차트를 띄우며" },
      { npcId: 'baek_leader', text: "고기 양을 늘려야 해. 풀떼기만 먹고 힘을 어떻게 쓰나." },
      { npcId: 'choi_leader', text: "해장국 메뉴 추가 좀 해줘. 제발." },
      { npcId: 'toaster_leader', text: "🖥️ [🔋 ⚡]" },
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
      { npcId: 'sa_heok_staff', text: "시끄럽군요. 팀장님 주무시는데 방해됩니다. (칼을 꺼내며)" },
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
  },
  
  // --- 신규 추가: 사원들의 반란(?) ---
  {
    id: 'staff_strike',
    teams: ['general'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "여러분, 우리도 휴가권 보장 시위라도 해야 하는 거 아닙니까? 저 3년째 휴가 못 갔습니다." },
      { npcId: 'lee_jun_staff', text: "찬성! 저도 4박 5일로 호캉스 가고 싶어요! 파업합시다 파업!" },
      { npcId: 'sa_heok_staff', text: "저는 팀장님 곁에 있는 게 휴가라서... 빠지겠습니다." },
      { npcId: 'han_kyubin_staff', text: "저도 기계실이 편합니다. 인간들이 줄어들면 좋겠군요." },
      { npcId: 'park_taewoo_staff', text: "하... 뭉치질 않네. 그냥 제가 사직서 내겠습니다. (안 냄)" }
    ]
  },
  {
    id: 'general_lunch',
    teams: ['general'],
    messages: [
      { npcId: 'lee_jun_staff', text: "오늘 점심 메뉴 투표받습니다! 1. 짜장면 2. 짬뽕 3. 탕수육 (팀장님 카드)" },
      { npcId: 'jam_playful', text: "4번! 딸기 케이크! 형이 케이크 먹고 싶대!", action: "거짓말하며" },
      { npcId: 'baek_leader', text: "고기 덮밥 없나? 든든한 걸로 먹지." },
      { npcId: 'choi_leader', text: "난 짬뽕. 국물이 필요해... 해장이 시급하다." },
      { npcId: 'kang_leader', text: "법인카드 사용은 기각입니다. 각자 해결하세요.", action: "단호하게" },
      { npcId: 'lee_jun_staff', text: "치사해! 팀장님 미워!" }
    ]
  },
  {
    id: 'general_ghost_story',
    teams: ['general'],
    messages: [
      { npcId: 'lee_jun_staff', text: "여러분, 그거 아세요? 야근할 때 엘리베이터 혼자 타면 거울에 다른 얼굴이 비친대요..." },
      { npcId: 'park_taewoo_staff', text: "야근을 안 하면 되겠네요. 칼퇴가 답입니다." },
      { npcId: 'sa_heok_staff', text: "그런 잡귀가 있다면 제가 처리했습니다. 걱정 마십시오." },
      { npcId: 'choi_leader', text: "귀신? 술 한잔 주면 좋아할걸? 같이 마시지 뭐." },
      { npcId: 'kang_leader', text: "괴담 유포 금지입니다. 업무 집중도 떨어집니다. 이준 사원, 야근 확정." }
    ]
  },
  {
    id: 'general_fashion',
    teams: ['general'],
    messages: [
      { npcId: 'jam_playful', text: "오늘의 패션왕 투표! 1번 토스터 형! 수트빨 작살남! 2번은 누구?" },
      { npcId: 'lee_jun_staff', text: "저요! 저요! 오늘 후드티 신상 샀어요! 힙하죠?" },
      { npcId: 'baek_leader', text: "옷은 튼튼하면 그만이다. 겉멋 든 놈들 같으니." },
      { npcId: 'sa_heok_staff', text: "백 팀장님의 가죽 코트가 가장 완벽합니다. 이견은 받지 않습니다." },
      { npcId: 'han_kyubin_staff', text: "토스터 팀장님이 1등입니다. 반박 시 차단.", action: "단호하게" }
    ]
  },
  {
    id: 'general_weather',
    teams: ['general'],
    messages: [
      { npcId: 'choi_leader', text: "비가 오려나... 무릎이 쑤시는군. 비 오는 날엔 파전에 막걸리인데." },
      { npcId: 'kang_leader', text: "기상청 데이터에 따르면 오늘 강수확률 0%입니다. 엄살 피우지 마십시오." },
      { npcId: 'baek_leader', text: "아니, 냄새가 난다. 비 냄새야. 최 팀장 말이 맞을 거다.", action: "코를 킁킁거리며" },
      { npcId: 'lee_jun_staff', text: "오! 백 팀장님 예보 적중률 100%라던데! 우산 챙겨야지~" },
      { npcId: 'kang_leader', text: "...우산 챙기겠습니다." }
    ]
  },
  {
    id: 'general_cleanup',
    teams: ['general'],
    messages: [
      { npcId: 'kang_leader', text: "공용 냉장고 청소 날입니다. 이름 없는 음식은 전량 폐기합니다." },
      { npcId: 'lee_jun_staff', text: "악! 안 돼! 내 푸딩! 이름 쓰는 거 깜빡했다! 지금 달려갈게요!" },
      { npcId: 'jam_playful', text: "이미 늦었어! 내가 먹어버렸지롱! 냠냠!", action: "거짓말임" },
      { npcId: 'park_taewoo_staff', text: "제 한약 드신 분... 그거 유통기한 3년 지난 겁니다. 배탈 나실 텐데." },
      { npcId: 'choi_leader', text: "어쩐지... 배가 아프더라니... 박 대리, 자네 나 암살하려 했나?" }
    ]
  },
  {
    id: 'general_karaoke',
    teams: ['general'],
    messages: [
      { npcId: 'jam_playful', text: "퇴근하고 노래방 갈 사람! 형이 노래 한 곡 뽑고 싶대!" },
      { npcId: 'baek_leader', text: "시끄러운 곳은 딱 질색이야. 안 가." },
      { npcId: 'lee_jun_staff', text: "저요 저요! 저 랩 잘해요! 쇼미더머니 나갈 뻔했음!" },
      { npcId: 'sa_heok_staff', text: "팀장님이 안 가시면 저도 안 갑니다. 재미없군요." },
      { npcId: 'park_taewoo_staff', text: "가서 탬버린만 쳐도 되나요? 노래할 힘이 없어서..." }
    ]
  },
  {
    id: 'general_lost_found',
    teams: ['general'],
    messages: [
      { npcId: 'han_kyubin_staff', text: "복도에서 나사 하나 주웠습니다. M3 규격. 잃어버리신 분?" },
      { npcId: 'toaster_leader', text: "🖥️ [✋ 🔩]" },
      { npcId: 'han_kyubin_staff', text: "아, 팀장님 거였군요. 지금 가서 조여드리겠습니다. 잼, 너 형 관리 안 하냐?", action: "한숨 쉬며" },
      { npcId: 'jam_playful', text: "어? 언제 빠졌지? 형 미안! 내가 너무 흔들었나 봐! 헤헤." }
    ]
  },
  {
    id: 'general_encouragement',
    teams: ['general'],
    messages: [
      { npcId: 'lee_jun_staff', text: "다들 힘들죠? 제가 응원의 춤을 춰드리겠습니다! 둠칫 둠칫!" },
      { npcId: 'kang_leader', text: "정신 사납습니다. 자리에 앉으세요.", action: "안경을 고쳐 쓰며" },
      { npcId: 'park_taewoo_staff', text: "하하... 덕분에 웃었네요. 고마워요 이준 씨. (영혼 조금 있음)" },
      { npcId: 'choi_leader', text: "젊음이 좋구만. 에너지가 넘쳐. 나도 한때는 저랬지." }
    ]
  },
  {
    id: 'general_secret',
    teams: ['general'],
    messages: [
      { npcId: 'jam_playful', text: "나 비밀 하나 알아냈다! 강 팀장님 책상 밑에 귀여운 슬리퍼 있음! 곰돌이 모양!", action: "속닥거리며" },
      { npcId: 'kang_leader', text: "잼. 전원 끄겠습니다. 당장.", action: "당황하며 얼굴이 붉어짐" },
      { npcId: 'lee_jun_staff', text: "대박! 팀장님 취향이 곰돌이였어? 귀여우셔라! 사진 찍으러 갑니다!" },
      { npcId: 'baek_leader', text: "취향 참... 독특하군. 안 어울려." }
    ]
  }
];
