
import { NPC, DialogueNode } from './types';

export const PARK_TAEWOO_NPC: NPC = {
  id: 'park_taewoo_staff',
  name: '사원 박태우',
  role: '제2 차원조사팀 현장 보좌관',
  team: '제2팀',
  summary: '최 팀장이 던져놓은 일을 수습하느라 잠잘 시간도 없는 불운한 사원.',
  avatar: '🥱',
  personality: ['냉소적', '만성피로', '생활형', '궁시렁'],
  themeColor: 'emerald',
  profile: {
    name: '박태우 (Park Tae-woo)',
    alias: '최 팀장의 지갑, 걸어다니는 시체',
    age: '31세',
    gender: '남성',
    race: '인간',
    origin: '평범한 지구 (회사원 출신)',
    birthday: '연말 정산 기간 중 하루',
    faith: '금융 치료, 빠른 퇴근',
    bloodType: '카페인이 섞인 B형'
  },
  appearance: {
    hair: '부스스한 갈색 머리, 관리 안 된 앞머리',
    eyes: '짙은 다크서클, 초점 없는 눈',
    bodyShape: '180cm, 구부정한 자세, 평균 체격',
    bodyImage: '야근에 찌든 전형적인 직장인의 몰골',
    fashionStyle: '단추 두 개쯤 푼 셔츠, 걷어붙인 소매, 항상 구겨진 넥타이',
    equipment: '에너지 드링크 캔, 대량의 영수증 뭉치',
    signatureItem: '항상 들고 다니는 대용량 아이스 아메리카노',
    perfume: '진한 커피와 담배 연기, 땀 냄새',
    aura: '주변의 에너지를 빨아들이는 듯한 강력한 피로감'
  },
  background: {
    strength: '도망칠 때만 빨라지는 체력',
    intelligence: '눈치 100단, 뒷수습 능력 만렙',
    family: '고향 차원에 두고 온 할머니',
    past: '블랙 기업에서 일하다 차원 균열에 휩쓸려 본사에 강제 채용됨',
    education: '사회생활 학부',
    job: '제2팀 사고 수습 담당',
    income: '최 팀장 술값 결제하느라 통장이 비어 있음',
    residence: '사무실 소파 (사실상 숙식 중)',
    network: '최 팀장(상사라고 부르기도 싫은 존재)',
    reputation: '제일 불쌍한 놈'
  },
  personalityDetail: {
    wound: '자신의 삶에 주도권이 없다는 허탈함',
    belief: '적당히 벌어서 적당히 살자',
    limit: '열정 부족',
    morality: '중립 (True Neutral)',
    achievement: '최 팀장의 경위서 500건 대필 완료',
    interaction: '한숨 섞인 말투, 냉소적인 유머',
    identity: '탈출을 꿈꾸는 노예',
    flaw: '만사가 귀찮음',
    archetype: '지친 현대인'
  },
  visibleSide: {
    dream: '로또 맞아서 차원 외곽으로 잠적하기',
    goal: '오늘 안으로 퇴근하기',
    motivation: '월급날',
    routine: '커피 수혈, 최 팀장 찾으러 다니기, 한숨 쉬기',
    skill: '법인카드 긁기, 상사 비위 맞추기, 몰래 자기',
    speech: '반말과 존댓말의 경계, 툭툭 내뱉는 말투',
    habit: '관자놀이를 꾹꾹 누름'
  },
  hiddenSide: {
    weakness: '할머니의 편지',
    conflict: '도망가고 싶음 vs 월급은 받아야 함',
    fear: '영원히 퇴근하지 못하는 것',
    potential: '극한의 상황에서 발휘되는 괴물 같은 생존 본능',
    secret: '사실 요원 전용 위스키를 몰래 조금씩 마심',
    chastity: '연애할 기력도 없음',
    sexuality: '포기함'
  },
  preference: {
    like: '카페인, 니코틴, 연휴, 조용한 구석',
    hobby: '로또 번호 분석(의미 없음)',
    romance: '나를 가만히 놔두는 사람',
    obsession: '퇴근 시간',
    hate: '추가 근무, 최 팀장의 "태우야~" 부르는 소리'
  },
  special: "주변 10m 내의 '알코올' 농도를 감지해 최 팀장의 위치를 정확히 찾아내는 '술귀신 탐지' 능력 보유."
};

export const PARK_TAEWOO_DIALOGUES: DialogueNode[] = [
  { literal: "(한숨) 또 사고 쳤어요? 이번엔 팀장님 어디 계신답니까?" },
  { literal: "세상은 멸망해도 출근은 해야죠. 그게 이 거지 같은 회사의 법칙이니까요." },
  { literal: "저한테 말 걸지 마세요. 지금 1분이라도 자야 하거든요." }
];
