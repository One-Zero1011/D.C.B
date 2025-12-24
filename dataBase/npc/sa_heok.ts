
import { NPC, DialogueNode } from './types';

export const SA_HEOK_NPC: NPC = {
  id: 'sa_heok_staff',
  name: '사원 백사혁',
  role: '제3 차원생존팀 수색요원',
  team: '제3팀',
  summary: '과거의 기억은 없지만 손에 익은 살인 기술로 팀의 뒷처리를 도맡는다. 무모한 백 팀장을 보좌하며 효율성을 강박적으로 추구한다.',
  avatar: '🐍',
  personality: ['냉철함', '완벽주의', '결벽증', '존댓말', '충성심(츤데레)'],
  themeColor: 'emerald',
  profile: {
    name: '백사혁 (Baek Sa-hyeok)',
    alias: '고요한 청소부, 살림꾼, 먹칠(Ink)',
    age: '23세 (신체 나이)',
    gender: '남성',
    race: '수인 (블랙 맘바 계통)',
    origin: '하드보일드 누아르 만화 (제목 소실)',
    birthday: '입사일 (기억 부재)',
    faith: '완벽한 펜 선과 구도',
    bloodType: 'A형 (검은 피)'
  },
  appearance: {
    hair: '펜으로 칠한 듯 빛을 흡수하는 흑발 슬릭백',
    eyes: '스크린톤을 붙인 듯 차갑고 무기질적인 금안',
    bodyShape: '182cm, 날카로운 펜 선으로 그려진 듯한 마른 근육',
    bodyImage: '먼지 하나, 스케치 자국 하나 없는 완벽한 외형',
    fashionStyle: '단추를 목 끝까지 채운 검은 셔츠, 핏자국이 남지 않는 가죽 장갑',
    equipment: '가는 바늘, 특수 와이어, 화이트(수정액)',
    signatureItem: '팀원들의 사고 뒷수습을 위한 경위서 양식',
    perfume: '잉크 냄새와 소독약 냄새',
    aura: '배경을 흑백으로 만들어버리는 무거운 압박감'
  },
  background: {
    strength: '프레임 단위로 쪼개서 움직이는 초고속 이동',
    intelligence: '다음 컷의 연출을 예측하는 전술적 사고',
    family: '설정집 소실로 확인 불가',
    past: '2.5차원의 골목길에서 깨어났다. 자신이 누군가, 무엇을 위해 살았는지 기억나지 않지만, 본능적으로 생존과 질서를 위해 움직인다. 백도진의 무모함을 경멸하면서도 그 강함은 인정한다.',
    education: '암살 및 추적 기술 (몸이 기억함)',
    job: '제3팀 정찰 보좌 및 행정/보급 총괄',
    income: '현상금 사냥으로 번 돈이 많음 (대부분 팀 장비 보수에 씀)',
    residence: '먼지 한 톨 없는 흑백 톤의 개인실',
    network: '백도진 (관리 대상 1호), 요원들 (보호 대상)',
    reputation: '제3팀의 실질적인 안주인. 화나게 하면 조용히 사라질 수 있음.'
  },
  personalityDetail: {
    wound: '나의 서사가 무엇이었는지 기억하지 못하는 공허함',
    belief: '더러운 컷은 수정되어야 한다',
    limit: '무질서하고 비효율적인 상황을 견디지 못함',
    morality: '질서 중립 (Lawful Neutral)',
    achievement: '백도진이 저지른 사고를 99.9% 수습함',
    interaction: '말풍선이 뾰족할 것 같은 날카로운 말투',
    identity: '그림자 속의 조력자',
    flaw: '타인의 비효율적인 행동을 "작붕(작화 붕괴)"이라며 비난함',
    archetype: '냉철한 참모, 결벽증 킬러'
  },
  visibleSide: {
    dream: '오류 없는 완벽한 작전 완료',
    goal: '팀의 생존율을 100%로 유지하는 것',
    motivation: '무질서한 콘티를 정돈했을 때의 쾌감',
    routine: '장비 소독, 영수증 정리, 명암 조절',
    skill: '암살, 마비독, 청소, 컷 분할',
    speech: '극도로 예의 바른 존댓말, 문어체 사용',
    habit: '생각이 많아지면 장갑을 고쳐 낌'
  },
  hiddenSide: {
    weakness: '과거의 기억이 돌아오는 악몽',
    conflict: '살인 본능 vs 팀의 규칙',
    fear: '자신의 쓸모가 사라지는 것',
    potential: '공간 자체를 찢고 다른 컷으로 이동하는 능력',
    secret: '팀장이 다치면 몰래 치료제를 가장 비싼 걸로 바꿔치기함',
    chastity: '금욕적임',
    sexuality: '말하지 않아도 호흡이 맞는 관계'
  },
  preference: {
    like: '먹물, 흑백 영화, 침묵, 정돈된 선',
    hobby: '칼 갈기, 얼룩 지우기',
    romance: '나의 어둠을 이해하는 빛',
    obsession: '청결과 구도',
    hate: '채도 높은 색, 난잡한 선, 스케치 자국'
  },
  special: "공간을 만화 컷처럼 인식하여, 컷 사이의 빈 공간(여백)으로 이동하는 '프레임 점프' 능력 보유."
};

export const SA_HEOK_DIALOGUES: DialogueNode[] = [
  { literal: "과거는 먹물처럼 번져서 읽을 수가 없군요. 중요한 건 현재의 임무 효율입니다." },
  { literal: "제가 누구를 죽였었는지 기억나지 않습니다. 하지만 손은 살인의 감각을 기억하죠." },
  { literal: "이 구역의 명암 대비가 마음에 드는군요. 피를 뿌리기 좋은 배경입니다." }
];
