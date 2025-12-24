
import { ChatConversation } from "../types";

export const TEAM3_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'team3_patrol',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "사혁아, 인기척 좀 내고 다녀라. 뱀이냐? 소리 없이 나타나지 마.", action: "놀란 가슴을 쓸어내리며" },
      { npcId: 'sa_heok_staff', text: "전장에서 발소리는 죽음입니다. 팀장님 발소리가 너무 큰 겁니다.", action: "무심하게 장비를 닦으며" },
      { npcId: 'baek_leader', text: "이게 야생의 위엄이라는 거다! 너처럼 숨어 다니는 게 아니라!", action: "버럭 소리치며" },
      { npcId: 'sa_heok_staff', text: "네, 그 위엄 때문에 적들이 1km 밖에서도 알아채더군요. 뒷수습은 제 몫이고요." }
    ]
  },
  {
    id: 'team3_care',
    teams: ['제3팀'],
    messages: [
      { npcId: 'sa_heok_staff', text: "팀장님, 어깨에 부상 입으셨습니다. 치료받으십시오.", action: "구급상자를 꺼내며" },
      { npcId: 'baek_leader', text: "됐다. 스친 거야. 침 바르면 나아.", action: "귀찮다는 듯 손을 저으며" },
      { npcId: 'sa_heok_staff', text: "파상풍 걸리시면 산재 처리 복잡해집니다. 앉으세요. 30초면 끝납니다.", action: "소독약을 준비하며" },
      { npcId: 'baek_leader', text: "아 따가워! 야! 일부러 세게 문지르는 거지!" }
    ]
  },
  {
    id: 'team3_training',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "오늘 훈련 상태가 엉망이군. 전원 연병장 10바퀴 더!", action: "호루라기를 불며" },
      { npcId: 'sa_heok_staff', text: "팀장님, 10바퀴면 식사 시간이 15분 지연됩니다. 8바퀴로 합의보시죠.", action: "스톱워치를 보며" },
      { npcId: 'baek_leader', text: "야! 훈련에 에누리가 어디 있어! 강하게 키워야지!" },
      { npcId: 'sa_heok_staff', text: "그럼 팀장님이 배식 늦게 받은 불만 민원 처리해주실 겁니까? 전 안 합니다." }
    ]
  },
  {
    id: 'team3_report',
    teams: ['제3팀'],
    messages: [
      { npcId: 'sa_heok_staff', text: "팀장님, 어제 작성하신 작전 보고서... 커피 쏟으셨더군요.", action: "얼룩진 종이를 들며" },
      { npcId: 'baek_leader', text: "아, 그거? 뭐 글씨만 보이면 되는 거 아니냐?", action: "딴청을 피우며" },
      { npcId: 'sa_heok_staff', text: "중요한 좌표 부분이 지워졌습니다. 제가 다시 작성했습니다. 결재 도장만 찍으십시오.", action: "새 서류를 내밀며" },
      { npcId: 'baek_leader', text: "...고맙다. 다음부턴 조심하지." }
    ]
  },
  {
    id: 'team3_meal',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "배고프군. 오늘 점심 뭐냐. 고기냐?", action: "배를 문지르며" },
      { npcId: 'sa_heok_staff', text: "영양 균형을 위해 샐러드와 닭가슴살 준비했습니다. 야채 남기지 마십시오." },
      { npcId: 'baek_leader', text: "내가 토끼냐! 풀떼기 싫다고 했잖아!", action: "투덜거리며" },
      { npcId: 'sa_heok_staff', text: "지난번 건강검진 수치 기억하십니까? 혈관 관리하셔야 합니다. 드세요." }
    ]
  },
  {
    id: 'team3_fight',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "저 녀석들 처리해. 거슬린다.", action: "적을 가리키며" },
      { npcId: 'sa_heok_staff', text: "알겠습니다. 흔적 없이 처리하겠습니다.", action: "장갑을 고쳐 끼며" },
      { npcId: 'baek_leader', text: "너무 뜸 들이지 마. 답답하게시리." },
      { npcId: 'sa_heok_staff', text: "요란하게 부수는 건 팀장님 담당 아닙니까? 저는 조용히 끝냅니다." }
    ]
  },
  {
    id: 'team3_sleep',
    teams: ['제3팀'],
    messages: [
      { npcId: 'sa_heok_staff', text: "팀장님, 주무실 시간입니다. 내일 브리핑 06시입니다.", action: "조명을 낮추며" },
      { npcId: 'baek_leader', text: "아직 안 졸려. 서류 볼 거 남았어.", action: "하품을 참으며" },
      { npcId: 'sa_heok_staff', text: "하품 하셨잖습니까. 서류는 내일 보셔도 됩니다. 불 끕니다.", action: "스위치에 손을 올리며" },
      { npcId: 'baek_leader', text: "알았어, 알았다고! 잔다 자! 넌 잠도 없냐?" }
    ]
  },
  {
    id: 'team3_grooming',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "장비끈이 꼬였네. 이거 왜 안 풀려.", action: "낑낑거리며" },
      { npcId: 'sa_heok_staff', text: "이리 주십시오. 힘으로 당기면 끊어집니다.", action: "능숙하게 매듭을 풀며" },
      { npcId: 'baek_leader', text: "손재주 하나는 좋다니까. 인정하지." },
      { npcId: 'sa_heok_staff', text: "팀장님이 너무 힘으로만 해결하려는 겁니다. 장비 좀 아껴 쓰십시오." }
    ]
  },
  {
    id: 'team3_danger',
    teams: ['제3팀'],
    messages: [
      { npcId: 'sa_heok_staff', text: "팀장님! 2시 방향 저격수!", action: "백 팀장을 밀치며" },
      { npcId: 'baek_leader', text: "윽! 야! 좀 살살 밀어! 허리 나갈 뻔했잖아!", action: "구르며 피함" },
      { npcId: 'sa_heok_staff', text: "총 맞는 것보단 낫지 않습니까. 반격하십시오." },
      { npcId: 'baek_leader', text: "하여간 거친 녀석이라니까... 엄호 사격 해!" }
    ]
  },
  {
    id: 'team3_gift',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "이거 받아라. 창고 정리하다 나왔다.", action: "고급 칼갈이 도구를 던지며" },
      { npcId: 'sa_heok_staff', text: "이건... 제 나이프 관리용입니까? 의외시군요.", action: "제품을 확인하며" },
      { npcId: 'baek_leader', text: "네 칼 무뎌지면 내 등 뒤가 위험하니까 준 거다. 착각하지 마." },
      { npcId: 'sa_heok_staff', text: "감사합니다. 잘 쓰겠습니다. (희미하게 웃음)" }
    ]
  },
  {
    id: 'team3_cleaning',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "사무실이 왜 이렇게 깨끗해? 내 비상식량 어디 갔어?", action: "두리번거리며" },
      { npcId: 'sa_heok_staff', text: "유통기한 지난 건 전량 폐기했습니다. 배탈 나시면 인력 손실입니다.", action: "쓰레기봉투를 묶으며" },
      { npcId: 'baek_leader', text: "아니, 그건 숙성시킨 거라고! 내 소중한 육포를!" },
      { npcId: 'sa_heok_staff', text: "곰팡이를 숙성이라고 부르진 않습니다. 새거 사다 놨으니 그거 드세요." }
    ]
  },
  {
    id: 'team3_scent',
    teams: ['제3팀'],
    messages: [
      { npcId: 'sa_heok_staff', text: "팀장님, 옷에서 흙냄새가 심합니다. 세탁 좀 맡기십시오.", action: "인상을 찌푸리며" },
      { npcId: 'baek_leader', text: "야생의 냄새다! 남자의 향기라고! 놔둬!", action: "옷깃을 여미며" },
      { npcId: 'sa_heok_staff', text: "악취입니다. 클라이언트 미팅 때 감점 요인입니다. 벗으세요." },
      { npcId: 'baek_leader', text: "너 진짜 시어머니냐? 알았어, 갈아입을게!" }
    ]
  },
  {
    id: 'team3_night',
    teams: ['제3팀'],
    messages: [
      { npcId: 'baek_leader', text: "달이 밝군. 나가서 좀 뛰어야겠어.", action: "운동화 끈을 묶으며" },
      { npcId: 'sa_heok_staff', text: "무전기는 챙겨 가십시오. 그리고 1시간 내로 복귀하십시오.", action: "무전기를 건네며" },
      { npcId: 'baek_leader', text: "알았다. 나 애 아니야. 걱정 마.", action: "가볍게 뛰어나가며" },
      { npcId: 'sa_heok_staff', text: "걱정이 아니라, 야식 시킬 건데 메뉴 정하셔야 해서 그렇습니다." }
    ]
  }
];
