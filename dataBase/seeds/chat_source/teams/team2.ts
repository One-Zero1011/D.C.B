
import { ChatConversation } from "../types";

export const TEAM2_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'team2_drink',
    teams: ['제2팀'],
    messages: [
      { npcId: 'choi_leader', text: "어이 박 대리, 내 서랍에 있던 '생명수' 못 봤나? 분명 여기 뒀는데.", action: "책상을 뒤적이며" },
      { npcId: 'park_taewoo_staff', text: "팀장님, 근무 중에 음주 좀 그만하십시오. 제가 압수해서 버렸습니다.", action: "깊은 한숨을 쉬며" },
      { npcId: 'choi_leader', text: "자네 정말 매정하구만! 그게 없으면 내 손이 떨린단 말일세! 수전증 몰라?" },
      { npcId: 'park_taewoo_staff', text: "손 떨리시면 서류 결재나 빨리 해주세요. 저 퇴근 좀 하게." }
    ]
  },
  {
    id: 'team2_work',
    teams: ['제2팀'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "팀장님, 본사에서 독촉장 왔습니다. 저번 달 파손 경위서요." },
      { npcId: 'choi_leader', text: "아 몰라, 배 째라 그래. 내가 구한 세계가 몇 갠데 고작 벽 하나 부순 걸로.", action: "소파에 드러누우며" },
      { npcId: 'park_taewoo_staff', text: "벽 하나가 아니라 건물 기둥이었습니다. 제 월급에서 까인다고요. 일어나세요.", action: "팀장을 흔들어 깨우며" },
      { npcId: 'choi_leader', text: "박 대리... 자네가 대신 써주면 안 되나? 내 필력 알잖아. 악필인 거." },
      { npcId: 'park_taewoo_staff', text: "(타자 치는 소리) 이미 쓰고 있습니다. 이번이 501번째네요. 하..." }
    ]
  },
  {
    id: 'team2_missing',
    teams: ['제2팀'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "팀장님 어디십니까. 회의 시작 5분 전입니다." },
      { npcId: 'choi_leader', text: "나? 지금... 차원의 틈새를 조사 중일세. 아주 중요한 임무지.", action: "술잔을 기울이며" },
      { npcId: 'park_taewoo_staff', text: "거기 배경음악 소리 들립니다. 재즈바 가셨죠? 좌표 찍습니다.", action: "GPS 추적기를 가동하며" },
      { npcId: 'choi_leader', text: "아니, 이 친구가? 귀신이네 귀신이야. 금방 갈게!" }
    ]
  },
  {
    id: 'team2_card',
    teams: ['제2팀'],
    messages: [
      { npcId: 'choi_leader', text: "박 대리, 법인카드가 안 긁히는데? 한도 초과라고 뜨네?" },
      { npcId: 'park_taewoo_staff', text: "강 팀장님이 정지시키셨습니다. 이번 달 술값만 300만 원이에요." },
      { npcId: 'choi_leader', text: "거참, 야박하네. 자네 카드 좀 빌려주게. 월급날 갚음세." },
      { npcId: 'park_taewoo_staff', text: "제 카드는 교통카드 기능밖에 없습니다. 걸어오세요." }
    ]
  },
  {
    id: 'team2_sleep',
    teams: ['제2팀'],
    messages: [
      { npcId: 'choi_leader', text: "박 대리, 자네 다크서클이 턱까지 내려왔군. 좀 쉬게.", action: "걱정스러운 눈빛" },
      { npcId: 'park_taewoo_staff', text: "누구 때문인데요... 팀장님이 결재만 해주시면 집 가서 잘 수 있습니다." },
      { npcId: 'choi_leader', text: "서류가 너무 많아. 읽다 보면 잠이 온단 말이지. 베개로 쓰기 딱 좋아.", action: "하품하며" },
      { npcId: 'park_taewoo_staff', text: "팀장님 머리에 잉크 묻었습니다. 제발 일어나세요." }
    ]
  },
  {
    id: 'team2_hero',
    teams: ['제2팀'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "팀장님, 옛날에 용사셨다면서요? 몬스터 때려잡던 썰 좀 풀어주세요." },
      { npcId: 'choi_leader', text: "다 지난 일이야. 지금은 그냥 배 나온 아저씨지.", action: "먼 산을 보며 씁쓸하게" },
      { npcId: 'park_taewoo_staff', text: "배는 나오셨지만... 그래도 가끔 멋있을 때 있습니다. 아주 가끔요." },
      { npcId: 'choi_leader', text: "짜식, 칭찬할 거면 술이나 한 병 사와. 맨입으로 되나." }
    ]
  },
  {
    id: 'team2_lotto',
    teams: ['제2팀'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "아... 이번 주도 꽝이네요. 로또 1등의 꿈은 멀어지고..." },
      { npcId: 'choi_leader', text: "운에 기대지 말게. 인생은 한 방... 이 아니라 꾸준함이지.", action: "복권 긁으며" },
      { npcId: 'park_taewoo_staff', text: "팀장님 손에 들린 거 즉석복권 아닙니까? 저 주십시오." },
      { npcId: 'choi_leader', text: "이건... 내 노후 자금일세. 500원 당첨됐군. 자네 가지게." }
    ]
  },
  {
    id: 'team2_fight',
    teams: ['제2팀'],
    messages: [
      { npcId: 'choi_leader', text: "어이쿠, 손이 미끄러져서 결재 서류에 커피를 쏟았네. 미안.", action: "난감한 표정" },
      { npcId: 'park_taewoo_staff', text: "...", action: "정색하며 타자기를 멈춤" },
      { npcId: 'choi_leader', text: "박 대리? 왜 말이 없나? 화났나? 내가 다시 써줄까?" },
      { npcId: 'park_taewoo_staff', text: "팀장님. 오늘 저 건드리지 마십시오. 사직서 품고 있습니다." }
    ]
  },
  {
    id: 'team2_snack_steal',
    teams: ['제2팀'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "제 서랍에 있던 홍삼 엑기스 드셨습니까? 그거 제 생명줄인데." },
      { npcId: 'choi_leader', text: "아, 그게 홍삼이었나? 쓴맛이 나길래 상한 줄 알았지.", action: "입가를 닦으며" },
      { npcId: 'park_taewoo_staff', text: "하... 그거 비싼 건데... 팀장님 월급에서 까겠습니다." },
      { npcId: 'choi_leader', text: "그러지 말고 나랑 고기 먹으러 가자. 내가 쏠게. 응?" }
    ]
  },
  {
    id: 'team2_retirement',
    teams: ['제2팀'],
    messages: [
      { npcId: 'choi_leader', text: "나중에 은퇴하면 낚시터나 할까 해. 박 대리, 자네가 총무 하게." },
      { npcId: 'park_taewoo_staff', text: "싫습니다. 은퇴하면 팀장님 안 보고 살 겁니다. 멀리 떠날 거예요." },
      { npcId: 'choi_leader', text: "섭섭하구만. 자네 없으면 심심해서 어쩌나.", action: "어깨를 툭 치며" },
      { npcId: 'park_taewoo_staff', text: "심심하면 혼자 노세요. 전 자유를 찾을 겁니다. (근데 낚시터 위치는 어딥니까?)" }
    ]
  },
  {
    id: 'team2_danger',
    teams: ['제2팀'],
    messages: [
      { npcId: 'park_taewoo_staff', text: "팀장님! 전방에 적입니다! 위험해요!", action: "다급하게 외치며" },
      { npcId: 'choi_leader', text: "뒤로 물러나 있어. 서류쟁이가 다치면 골치 아파.", action: "순식간에 눈빛이 변하며" },
      { npcId: 'park_taewoo_staff', text: "오... 방금 좀 팀장님 같았습니다. 다치지만 마십시오." },
      { npcId: 'choi_leader', text: "끝나고 청구서나 준비해 둬. 기물 파손 좀 할 것 같으니까." }
    ]
  },
  {
    id: 'team2_thanks',
    teams: ['제2팀'],
    messages: [
      { npcId: 'choi_leader', text: "박 대리, 항상 고맙네. 자네 덕분에 팀이 굴러가.", action: "진지하게" },
      { npcId: 'park_taewoo_staff', text: "갑자기 왜 그러십니까? 무섭게. 또 사고 치셨어요?" },
      { npcId: 'choi_leader', text: "아니, 그냥... 맨정신일 때 말해두고 싶어서. 오래 보자고." },
      { npcId: 'park_taewoo_staff', text: "취하셨네. 들어가서 주무세요. (피식 웃음)" }
    ]
  }
];
