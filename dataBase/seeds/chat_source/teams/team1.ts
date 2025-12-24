
import { ChatConversation } from "../types";

export const TEAM1_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'team1_snack',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "팀장님, 당 떨어지셨죠? 제가 초코바 하나 놔뒀습니다! 무려 72% 카카오!" },
      { npcId: 'kang_leader', text: "필요 없습니다. 가져가세요.", action: "미간을 찌푸리며 서류를 넘김" },
      { npcId: 'lee_jun_staff', text: "에이, 드세요~ 머리 쓸 땐 단 게 최고라니까요? (사실 유통기한 오늘까지임)" },
      { npcId: 'kang_leader', text: "이준 사원. 이거 반쯤 녹아있군요. 그리고 유통기한... 시말서 쓸 준비 하세요.", action: "안경을 고쳐 쓰며" }
    ]
  },
  {
    id: 'team1_error',
    teams: ['제1팀'],
    messages: [
      { npcId: 'kang_leader', text: "3구역 시뮬레이션 결과값 오차 범위 초과입니다. 누가 건드렸습니까?" },
      { npcId: 'lee_jun_staff', text: "저 아닌데요? (휘파람을 불며)" },
      { npcId: 'kang_leader', text: "로그 확인하겠습니다. 이준 사원, 3분 전 접속 기록이 있군요. 변명은?" },
      { npcId: 'lee_jun_staff', text: "아! 그게... 고양이가 눌렀나 봐요! 진짜로! 키보드 위로 냥냥펀치를!" },
      { npcId: 'kang_leader', text: "우리 사무실엔 고양이가 없습니다. 징계위원회 회부하겠습니다." }
    ]
  },
  {
    id: 'team1_intuition',
    teams: ['제1팀'],
    messages: [
      { npcId: 'kang_leader', text: "이번 작전의 성공 확률은 34.5%입니다. 철수하는 게 논리적입니다.", action: "태블릿을 두드리며" },
      { npcId: 'lee_jun_staff', text: "에이 팀장님~ 제 감으로는 무조건 성공인데요? 100% 장담합니다!" },
      { npcId: 'kang_leader', text: "근거 없는 낙관론은 사절입니다. 데이터를 가져오세요." },
      { npcId: 'lee_jun_staff', text: "제 잘생긴 얼굴이 데이터죠! 한번만 믿어봐요! 안 되면 제가 팀장님 소원 들어드림!" },
      { npcId: 'kang_leader', text: "...기록했습니다. 실패 시 소원은 '퇴사'입니다." }
    ]
  }
];
