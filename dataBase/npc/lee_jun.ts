
import { NPC, DialogueNode } from './types';

export const LEE_JUN_NPC: NPC = {
  id: 'lee_jun_staff',
  name: '사원 이준',
  role: '제1 작전설계팀 데이터 검증관',
  team: '제1팀',
  summary: '눈을 떠보니 사원증을 목에 걸고 있었다. 과거의 기억은 없지만, 몸에 밴 \'웹소설 클리셰\' 본능으로 세상을 게임처럼 해석하려 든다.',
  avatar: '🐕',
  personality: ['장르파괴', '깐족거림', '기억상실', '본능적직감', '사이다패스'],
  themeColor: 'blue',
  profile: {
    name: '이준 (Lee Jun)',
    alias: '클리셰 탐지기, 설정 오류, 리셋된 주인공(?)',
    age: '24세 (추정, 신체 나이)',
    gender: '남성',
    race: '인간 (승격체)',
    origin: '삭제된 웹소설 데이터 (제목 불명)',
    birthday: '입사일 (기억나는 날짜가 없음)',
    faith: '나의 직감 (유일하게 남은 것)',
    bloodType: 'B형'
  },
  appearance: {
    hair: '웹툰 주인공처럼 찰랑거리는 밝은 갈색 펌 헤어',
    eyes: '가끔 눈동자에 UI(상태창)가 비치지만 텍스트가 깨져 있음',
    bodyShape: '178cm, 작화 보정을 받은 듯한 비율',
    bodyImage: '주변 배경보다 채도가 한 단계 높은 듯한 존재감',
    fashionStyle: '후드티에 정장 재킷 믹스매치, 한정판 운동화',
    equipment: '최신형 게이밍 키보드 (타건음이 매우 시끄러워 팀장이 싫어함)',
    signatureItem: '스마트폰 (연락처가 모두 비어있음)',
    perfume: '톡 쏘는 라임 향과 에너지 드링크 냄새',
    aura: '과거가 없기에 미래만 보는 가벼움'
  },
  background: {
    strength: 'F등급 (하지만 회피율이 S급)',
    intelligence: '기억은 없어도 전개는 예측하는 본능',
    family: '기억 데이터 없음',
    past: '눈을 떠보니 본사 기숙사 침대였다. 머릿속에는 "상태창"이나 "회귀" 같은 단어만 둥둥 떠다닐 뿐, 자신이 누구였는지 전혀 기억하지 못한다.',
    education: '웹소설 학과 수석 (이라고 본인이 주장함)',
    job: '제1팀 데이터 검증 사원',
    income: '성과급 헌터 (돈을 모아야 할 이유도 잊음)',
    residence: '본사 기숙사 (몰래 게임기 설치함)',
    network: '강 팀장(공략 대상?), 독자들(이제 안 보임)',
    reputation: '미친놈인데 능력은 좋음. 과거를 묻지 마세요.'
  },
  personalityDetail: {
    wound: '내가 주인공이었는지 엑스트라였는지조차 모른다는 불안감',
    belief: '기억이 안 나면 즐겨라. 이 세계가 내 새로운 소설이다.',
    limit: '진지한 분위기를 3분 이상 못 견딤 (과거 생각이 날까 봐)',
    morality: '혼돈 선 (Chaotic Good)',
    achievement: '강 팀장의 연산 오류를 "이거 설정 붕괴인데요?"라며 찾아냄',
    interaction: '독자에게 말을 걸듯 4의 벽을 넘나듦',
    identity: '장르를 잃어버린 등장인물',
    flaw: 'TPO를 못 맞추고 드립을 침',
    archetype: '트릭스터, 코믹 릴리프'
  },
  visibleSide: {
    dream: '잃어버린 기억(혹은 원작) 찾기',
    goal: '이 세계의 히든 엔딩 보기',
    motivation: '재미 (공허함을 채우기 위해)',
    routine: '상태창 확인(에러 뜸), 강 팀장 놀리기, 멍때리기',
    skill: '행운 보정, 위기 감지(사망 플래그 회피)',
    speech: '인터넷 용어 남발, "상태창!"을 자주 외침',
    habit: '허공을 보며 시청자들에게 설명하듯 혼잣말함'
  },
  hiddenSide: {
    weakness: '과거를 묻는 질문',
    conflict: '가벼운 캐릭터 연기 vs 텅 빈 내면',
    fear: '영원히 엑스트라로 남는 것',
    potential: '서사의 개연성을 무시하고 기적을 일으키는 조커',
    secret: '강 팀장을 따르는 이유는 그녀가 왠지 익숙해서 (기분 탓일 수도 있음)',
    chastity: '하렘물 주인공이 되고 싶어 함',
    sexuality: '연상의 능력녀 (강 팀장?)'
  },
  preference: {
    like: '사이다 전개, 보너스 스테이지, 관심',
    hobby: '팀장님 안경 훔치기, 차원 벽에 낙서하기',
    romance: '티키타카가 잘 되는 로코물 찍기',
    obsession: '떡밥 회수',
    hate: '고구마, 설명충, 진지충, 기억 상실 클리셰'
  },
  special: "팀장의 연산이 끝나기도 전에 '에이, 그거 사망 플래그인데?'라며 0.1초 만에 클리셰를 간파하는 '장르적 직감' 보유."
};

export const LEE_JUN_DIALOGUES: DialogueNode[] = [
  { literal: "팀장님, 저 입사 전 기억이 없거든요? 근데 왠지 팀장님은 공략해야 할 보스 같아요!" },
  { literal: "상태창! ...아, 역시 안 열리네. 내 스킬들 다 어디 갔냐고!" },
  { literal: "기억이 안 나면 뭐 어때요? 지금 이 순간이 '1화'라고 생각하면 되죠!" }
];
