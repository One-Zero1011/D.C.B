
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
  }
];
