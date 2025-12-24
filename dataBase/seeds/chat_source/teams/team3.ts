
import { ChatConversation } from "../types";

export const TEAM3_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'team3_patrol',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "사현아, 내 뒤 좀 그만 밟아라. 인기척 숨겨도 다 안다.", action: "귀를 쫑긋거리며" },
      { npcId: 'sa_heon_staff', text: "죄송합니다 팀장님. 복도 끝에 먼지가 보여서 치우러 가던 길이었습니다." },
      { npcId: 'baek_leader', text: "먼지 치우는데 단검은 왜 들고 있어? 살기가 느껴지는데." },
      { npcId: 'sa_heon_staff', text: "아주... 질긴 먼지라서요. 신경 쓰지 마십시오. (미소)", action: "단검을 소매 안으로 숨기며" }
    ]
  },
  {
    id: 'team3_care',
    teams: ['제3팀'],
    messages: [
      { npcId: 'sa_heon_staff', text: "팀장님, 붕대가 느슨해졌습니다. 제가 다시 감아드리겠습니다.", action: "구급상자를 들고 접근하며" },
      { npcId: 'baek_leader', text: "됐다. 긁힌 상처야. 침 바르면 낫는다.", action: "귀찮은 듯 손을 저으며" },
      { npcId: 'sa_heon_staff', text: "안 됩니다. 감염의 위험이 있습니다. 가만히 계십시오. (강압적인 미소)" },
      { npcId: 'baek_leader', text: "...너 눈이 왜 그래? 치료하는 거 맞지? 잡아먹으려는 거 아니지?" }
    ]
  },
  {
    id: 'team3_training',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "오늘 훈련 상태가 엉망이군. 전원 연병장 두 바퀴 더.", action: "호루라기를 불며" },
      { npcId: 'sa_heon_staff', text: "팀장님, 목이 마르실 텐데 냉수 준비했습니다. 얼음도 띄웠습니다." },
      { npcId: 'baek_leader', text: "음, 고맙다. ...근데 왜 내 컵에만 장미꽃이 띄워져 있지?" },
      { npcId: 'sa_heon_staff', text: "팀장님은 특별하시니까요. 향을 즐기십시오." }
    ]
  }
];
