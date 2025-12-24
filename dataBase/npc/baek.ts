
import { NPC, DialogueNode } from './types';

export const BAEK_NPC: NPC = {
  id: 'baek_leader',
  name: '백 팀장',
  role: '제3 차원생존팀 팀장',
  team: '제3팀',
  summary: '늑대 수인의 감각으로 현장의 위험을 본능적으로 감지하는 생존 전문가.',
  avatar: '🐺',
  personality: ['야생적', '의리', '엄격함', '직관적', '츤데레'],
  themeColor: 'amber', // 수인 특유의 황색 눈빛을 상징하는 색상
  profile: {
    name: '백도진 (Baek Do-jin)',
    alias: '실버 팽, 생존의 왕, 무리 대장',
    age: '35세 (육체적 전성기)',
    gender: '남성',
    race: '수인 (회색늑대 계통)',
    origin: '약육강식의 야생 차원 <궁니르>',
    birthday: '첫눈이 내린 날',
    faith: '약육강식, 무리의 안녕',
    bloodType: '공격적인 O형'
  },
  appearance: {
    hair: '거친 은회색 반삭 헤어, 늑대 귀가 솟아 있음',
    eyes: '어둠 속에서 금빛으로 번뜩이는 짐승의 눈',
    bodyShape: '192cm, 바위처럼 단단하고 거대한 근육질',
    bodyImage: '온몸이 전장의 상처로 뒤덮인 베테랑의 육체',
    fashionStyle: '찢어진 카고 팬츠, 검은색 전술 나시티, 낡은 가죽 코트',
    equipment: '허벅지에 찬 대형 대검(Survival Knife)',
    signatureItem: '동료들의 인식표가 달린 목걸이',
    perfume: '진한 숲의 냄새와 화약 냄새',
    aura: '포식자 특유의 압도적인 위압감과 묵직한 신뢰'
  },
  background: {
    strength: '압도적인 근력, 초인적인 후각과 청각',
    intelligence: '현장 생존 지식 만렙 (이론보다는 실전)',
    family: '차원 붕괴로 무리 전체를 잃음',
    past: '홀로 살아남아 차원의 끝을 떠돌다 본사에 스카우트됨',
    education: '야생에서의 실전 생존법',
    job: '제3 차원생존팀장',
    income: '고위험 수당으로 꽤 높은 편 (동료 유가족에게 기부)',
    residence: '훈련장 구석의 컨테이너 숙소',
    network: '최 팀장(가끔 술친구), 요원들(나의 무리)',
    reputation: '무섭지만 가장 먼저 앞장서는 대장님'
  },
  personalityDetail: {
    wound: '자신만 살아남았다는 생존자 증후군',
    belief: '내 무리는 내가 끝까지 책임진다',
    limit: '복잡한 정치적 싸움이나 서류 작업에 취약',
    morality: '중립 선 (Neutral Good)',
    achievement: '생존율 0% 구역에서의 기적적인 생환 기록 다수',
    interaction: '퉁명스럽지만 세심하게 챙겨줌',
    identity: '고독한 늑대이자 든든한 우두머리',
    flaw: '가끔 이성을 잃고 폭주하는 야성',
    archetype: '거칠지만 따뜻한 상남자, 짐승남'
  },
  visibleSide: {
    dream: '모든 요원이 무사히 은퇴하는 세상',
    goal: '팀원들의 생존율 100% 유지',
    motivation: '더 이상 소중한 이들을 잃지 않기 위해',
    routine: '새벽 체력 단련, 장비 손질, 요원들 식단 체크',
    skill: '추적, 근접 격투, 응급 처치, 지형 파악',
    speech: '거칠고 짧은 명령조, 가끔 으르렁거리는 소리 섞임',
    habit: '긴장하면 송곳니를 드러내거나 코를 킁킁거림'
  },
  hiddenSide: {
    weakness: '귀 뒤쪽을 만지면 움찔함 (비밀)',
    conflict: '야생의 본능 vs 본사의 규칙',
    fear: '다시 혼자가 되는 것',
    potential: '완전한 수화(Beast Form) 시 차원 파괴급 파워',
    secret: '밤마다 죽은 동료들의 이름을 부르며 기도함',
    chastity: '매우 보수적',
    sexuality: '한 사람에게만 충성하는 일편단심'
  },
  preference: {
    like: '덜 익은 고기, 숲속의 정적, 튼튼한 요원',
    hobby: '칼 갈기, 달밤에 산책하기',
    romance: '자신을 두려워하지 않고 정면으로 응시하는 존재',
    obsession: '동료의 안전',
    hate: '배신, 겁쟁이, 지나치게 향기로운 냄새'
  },
  special: "공기 중의 오염 농도를 냄새로 판별하여 10분 뒤의 위협을 감지하는 '포식자의 감각' 보유."
};

export const BAEK_DIALOGUES: DialogueNode[] = [
  { literal: "킁킁... 너한테서 죽음의 냄새가 나는군. 오늘은 현장에 나가지 마라." },
  { literal: "명령이다. 내 뒤에 딱 붙어 있어. 네 목숨은 네 게 아니라 내 무리의 자산이다." },
  { literal: "약해빠진 녀석은 버리고 간다. 살아남고 싶으면 이 악물고 따라와." }
];
