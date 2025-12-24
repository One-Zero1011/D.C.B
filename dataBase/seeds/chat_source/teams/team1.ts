
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
  },
  {
    id: 'team1_coffee',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "팀장님, 커피 대령했습니다! 샷 4개 추가, 얼음 많이!" },
      { npcId: 'kang_leader', text: "이준 사원, 이건 커피가 아니라 사약 수준이군요. 절 죽일 셈입니까?", action: "냄새를 맡고 인상 씀" },
      { npcId: 'lee_jun_staff', text: "피곤해 보이셔서... 정신 번쩍 드시라고... 헤헤." },
      { npcId: 'kang_leader', text: "덕분에 위장이 번쩍 뚫리겠군요. 다시 타오세요. 샷은 2개만." }
    ]
  },
  {
    id: 'team1_report',
    teams: ['제1팀'],
    messages: [
      { npcId: 'kang_leader', text: "보고서 3페이지, 오탈자가 5개나 있습니다. 눈을 감고 쳤습니까?" },
      { npcId: 'lee_jun_staff', text: "아, 그건 숨겨진 암호입니다! 세로로 읽어보세요! '팀.장.님.최.고'!" },
      { npcId: 'kang_leader', text: "...'팀.장.님.바.보'라고 읽히는군요. 시말서 추가." },
      { npcId: 'lee_jun_staff', text: "헉! 들켰다! 아니, 오해입니다! 폰트가 깨져서 그래요!" }
    ]
  },
  {
    id: 'team1_late',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "팀장님! 저 지금 엘리베이터 갇혔어요! 지각 좀 봐주세요!" },
      { npcId: 'kang_leader', text: "CCTV 확인 중입니다. 1층 로비에서 춤추고 있는 사람은 누구입니까?", action: "모니터를 응시하며" },
      { npcId: 'lee_jun_staff', text: "어? 그게 보이나요? 저건 제 도플갱어입니다! 위험해요!" },
      { npcId: 'kang_leader', text: "도플갱어와 함께 징계받을 준비 하세요. 3분 내로 안 오면 문 잠급니다." }
    ]
  },
  {
    id: 'team1_glasses',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "팀장님, 안경 벗으신 거 처음 봐요! 눈이 되게 예쁘시네요?" },
      { npcId: 'kang_leader', text: "안경 닦는 중입니다. 쳐다보지 마세요.", action: "황급히 안경을 씀" },
      { npcId: 'lee_jun_staff', text: "와, 얼굴 빨개지셨다! 부끄러우신 거죠? 그쵸?" },
      { npcId: 'kang_leader', text: "실내 온도가 높아서 그렇습니다. 그리고 당신 업무량도 높여드리겠습니다." }
    ]
  },
  {
    id: 'team1_dinner',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "오늘 회식하죠! 제가 맛집 알아놨어요! 소곱창 어때요?" },
      { npcId: 'kang_leader', text: "오늘은 야근입니다. 도시락 시키세요." },
      { npcId: 'lee_jun_staff', text: "아잉~ 팀장님~ 하루만 봐줘요~ 네?", action: "애교를 부리며" },
      { npcId: 'kang_leader', text: "...소곱창. 딱 1시간만입니다. 법인카드 한도 체크하세요." }
    ]
  },
  {
    id: 'team1_serious',
    teams: ['제1팀'],
    messages: [
      { npcId: 'kang_leader', text: "이번 시뮬레이션 난이도가 높습니다. 이준 사원, 당신의 직감이 필요합니다.", action: "진지한 눈빛" },
      { npcId: 'lee_jun_staff', text: "오... 팀장님이 저한테 부탁을? 해가 서쪽에서 뜨겠네." },
      { npcId: 'kang_leader', text: "농담할 시간 없습니다. 3번 루트와 4번 루트, 어디가 안전합니까?" },
      { npcId: 'lee_jun_staff', text: "4번이요. 이유는 묻지 마세요. 그냥 느낌이 쎄해요.", action: "갑자기 정색하며" }
    ]
  },
  {
    id: 'team1_gift',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "짜잔! 팀장님 생신 선물입니다! 최신형 계산기!" },
      { npcId: 'kang_leader', text: "제 생일은 지난달이었습니다. 그리고 계산기는 이미 있습니다." },
      { npcId: 'lee_jun_staff', text: "에이~ 기분이죠! 뒷면에 제 사진도 붙여놨어요! 일할 때마다 보시라고!", action: "브이 포즈를 취하며" },
      { npcId: 'kang_leader', text: "스티커 제거제 어디 있습니까... 당장 떼겠습니다." }
    ]
  },
  {
    id: 'team1_rain',
    teams: ['제1팀'],
    messages: [
      { npcId: 'lee_jun_staff', text: "비 오네요. 팀장님 우산 없으시죠? 제가 씌워드릴까요?" },
      { npcId: 'kang_leader', text: "차량 대기시켜 놨습니다. 필요 없습니다." },
      { npcId: 'lee_jun_staff', text: "아... 차 있으시구나... 전 버스 타야 하는데... (시무룩)" },
      { npcId: 'kang_leader', text: "타세요. 가는 길에 내려드리겠습니다. 물 떨어지니까 털고 타세요." }
    ]
  },
  {
    id: 'team1_bug',
    teams: ['제1팀'],
    messages: [
      { npcId: 'kang_leader', text: "이준 사원! 책상 밑에 저거 뭡니까! 바퀴벌레입니까?!" },
      { npcId: 'lee_jun_staff', text: "으악! 깜짝이야! 팀장님 벌레 무서워하세요?", action: "책상 위로 올라가며" },
      { npcId: 'kang_leader', text: "무, 무서운 게 아니라 비위생적이라 싫은 겁니다! 얼른 잡으세요!", action: "의자 뒤로 숨으며" },
      { npcId: 'lee_jun_staff', text: "잡으면 뭐 해주실 건데요? 조기 퇴근? 콜?" }
    ]
  },
  {
    id: 'team1_praise',
    teams: ['제1팀'],
    messages: [
      { npcId: 'kang_leader', text: "오늘 데이터 검증... 빨랐습니다. 수고했습니다.", action: "먼 산을 보며" },
      { npcId: 'lee_jun_staff', text: "네? 잘 안 들려요! 크게 말씀해주세요! 칭찬이죠? 칭찬 맞죠?" },
      { npcId: 'kang_leader', text: "두 번 말 안 합니다. 가보세요." },
      { npcId: 'lee_jun_staff', text: "다 들었어요! 팀장님이 저 칭찬했다! 동네방네 소문내야지~ 룰루!" }
    ]
  }
];
