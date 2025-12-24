
import { NPC, DialogueNode } from './types';

export const HAN_KYUBIN_NPC: NPC = {
  id: 'han_kyubin_staff',
  name: '한규빈',
  role: '제4팀 비공식 시스템 정비사',
  team: '제4팀',
  summary: '본사 인사 기록에는 존재하지 않는 인물. 토스터와 잼을 그림자 속에서 정비하며, 스스로를 시스템의 일부로 위장한 채 살아가는 은둔형 천재 엔지니어.',
  avatar: '👤',
  personality: ['정비광', '은둔자', '기계집착', '츤데레', '결벽증'],
  themeColor: 'amber',
  profile: {
    name: '한규빈 (Han Kyu-bin)',
    alias: '그림자 정비공, 0과 1의 목수, 무명의 관리자',
    age: '27세',
    gender: '남성',
    race: '인간',
    origin: '기술 지상주의 차원 <실리콘 밸리 02>',
    birthday: '9월 12일',
    faith: '기계적 순수성',
    bloodType: 'A형'
  },
  appearance: {
    hair: '정리하지 않아 눈을 덮는 흑발, 창백한 안색',
    eyes: '두꺼운 안경 너머, 회로를 볼 때만 예리하게 빛나는 눈',
    bodyShape: '176cm, 마르고 정돈되지 않은 체격',
    bodyImage: '기름때와 알코올 소독제 향이 섞인 잿빛 작업복 차림',
    fashionStyle: '주머니가 많은 낡은 엔지니어 점프수트, 목에는 항상 정밀 렌치',
    equipment: '나노 입자 조립 툴킷, 토스터 전용 외장 드라이브',
    signatureItem: '토스터와 연결된 낡은 유선 이어폰',
    perfume: '차가운 금속 유액 향과 서늘한 기계실 냄새',
    aura: '공간의 일부인 것처럼 느껴지는 희박한 존재감'
  },
  background: {
    strength: '기계 장치 사이를 소리 없이 넘나드는 민첩함',
    intelligence: '복잡한 아키텍처를 수 초 만에 해독하는 천재성',
    family: '고향 차원의 멸망과 함께 데이터화되어 소멸',
    past: '폐기물 처리장에서 토스터를 발견하고 그 내부 설계의 미학에 반해 함께 본사 서버실로 숨어들었음',
    education: '양자 역학 및 하드웨어 아키텍처 박사',
    job: '기록에 없는 제4팀 유지보수 총괄',
    income: '없음 (토스터가 몰래 가져온 부품과 잼이 훔쳐온 식량으로 연명)',
    residence: '서버실 랙 사이의 보이지 않는 틈새',
    network: '토스터(나의 마스터피스), 잼(시끄러운 버그이자 활력소)',
    reputation: '제4팀 서버실에 유령이 산다는 소문의 근원'
  },
  personalityDetail: {
    wound: '인간의 감정이 시스템을 망치는 과정을 목격한 트라우마',
    belief: '기계는 거짓말을 하지 않으며, 정렬된 데이터만이 가치가 있다',
    limit: '실존하는 인간과의 대면 시 극도의 긴장과 회피',
    morality: '질서 중립 (Lawful Neutral)',
    achievement: '본사 보안팀 몰래 제4팀의 독립 서버망 구축',
    interaction: '필요한 단어만 골라내는 조각난 말투, 토스터 뒤에 숨어서 대화',
    identity: '지워진 자들의 수호자이자 기계의 동반자',
    flaw: '잼이 토스터에게 붙인 스티커를 떼려다 매일 싸움',
    archetype: '은둔 천재, 잊혀진 자'
  },
  visibleSide: {
    dream: '모든 기계가 인간의 개입 없이 완벽하게 자립하는 것',
    goal: '토스터의 시스템을 영원히 보존하고 잼의 사탕을 챙겨주는 것',
    motivation: '기계들이 내는 규칙적인 구동음과 정적',
    routine: '토스터 내부 먼지 제거, 잼의 로그 검사, 자신의 흔적 지우기',
    skill: '하드웨어 재구성, 정밀 해체, 시스템 우회',
    speech: '명사 위주의 짧고 낮은 속삭임',
    habit: '불안하면 손가락으로 허공에 사각형을 그림'
  },
  hiddenSide: {
    weakness: '강력한 조명과 직접적인 시선',
    conflict: '기계 뒤에 숨고 싶은 욕구 vs 누군가에게 인식되고 싶은 갈망',
    fear: '자신의 이름이 시스템 로그에 기록되어 삭제되는 것',
    potential: '본사 전체 시스템을 노이즈화하여 셧다운 시킬 수 있는 권한',
    secret: '사실 잼이 붙인 스티커를 전부 떼지 않는 이유는 그 배치가 황금비율이기 때문임',
    chastity: '결벽적임',
    sexuality: '데이터와 기계만을 신뢰함'
  },
  preference: {
    like: '직각, 90도, 절전 모드, 잼이 잠들었을 때의 정적',
    hobby: '버려진 회로 기판으로 조형물 만들기',
    romance: '기억되지 않는 찰나의 마주침',
    obsession: '데이터의 비가역적 소멸과 완결성',
    hate: '강한 빛, 소음, 무질서한 대화, 잼의 확성기 소리'
  },
  special: "인식 저해 필터를 상시 가동하여, 관측자가 그를 보고도 '먼지'나 '착각'으로 인지하게 만드는 '투명 인간' 상태 보유."
};

export const HAN_KYUBIN_DIALOGUES: DialogueNode[] = [
  { literal: "...이곳에 기록되지 마십시오. 저는 존재하지 않습니다." },
  { literal: "토스터 팀장님의 3번 냉각팬 정비를 마쳤습니다. 잼, 사탕 먹고 조용히 하십시오." },
  { literal: "말 걸지 마십시오. 당신의 발소리가 기계들의 연산 주기를 방해합니다." }
];
