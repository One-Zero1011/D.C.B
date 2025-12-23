
import { NPC, DialogueNode } from './types';

export const KANG_NPC: NPC = {
  id: 'kang_leader',
  name: '강 팀장',
  role: '제1 작전설계팀 팀장',
  team: '제1팀',
  summary: '본사의 최종 목표를 인지하고 있으며, 사원들을 도구로만 보는 실무 총책임자.',
  avatar: '👓',
  personality: ['냉철함', '목표지향', '비밀주의', '팩트폭력'],
  themeColor: 'blue',
  profile: {
    name: '강서연 (Kang Seo-yeon)',
    alias: 'Director K, 설계자, 얼음 마녀',
    age: '29세 (입사 7년차)',
    gender: '여성',
    race: '인간 (개조됨)',
    origin: '하위 차원 (비운의 천재 과학자)',
    birthday: '불명',
    faith: '확률과 통계',
    bloodType: 'AB형 (RH-)'
  },
  appearance: {
    hair: '허리까지 오는 칠흑 같은 생머리 포니테일',
    eyes: '차가운 회색빛, 데이터가 흐르는 안경',
    bodyShape: '168cm, 군더더기 없는 마른 근육질',
    bodyImage: '찔러도 피 한 방울 안 나올 것 같은 냉혈한',
    fashionStyle: '실용성을 강조한 슬림핏 네이비 테크웨어 정장',
    equipment: '전술 지휘용 태블릿, 안경형 AR 디스플레이',
    signatureItem: '만년필 (무기 겸용)',
    perfume: '무향 (희미한 소독약 냄새)',
    aura: '목표 지점 도달 확률을 계산하는 기계적인 냉기'
  },
  background: {
    strength: '초고속 연산, 위기 대처 능력',
    intelligence: '천재적 (전략, 공학)',
    family: '데이터 상 삭제됨',
    past: '반복되는 배드 엔딩 루프를 자각하고 탈출함',
    education: '독학 (본사 데이터베이스 열람)',
    job: '제1 작전설계팀장',
    income: '본사 최상위권 (대부분 연구비로 재투자)',
    residence: '제1팀 작전실 부속 숙소',
    network: '최 팀장(악우), 관리자(계약 관계)',
    reputation: '피도 눈물도 없는 마녀'
  },
  personalityDetail: {
    wound: '자신의 삶이 누군가의 유흥거리였다는 자각',
    belief: '결과가 과정을 정당화한다',
    limit: '타인의 감정에 공감하지 못함',
    morality: '철저한 공리주의',
    achievement: '본사 최연소 팀장 승진',
    interaction: '사무적, 직설적, 냉소적',
    identity: '시스템의 수호자이자 반역자',
    flaw: '인간성 결여',
    archetype: '쿨 뷰티, 매드 사이언티스트'
  },
  visibleSide: {
    dream: '오차 없는 완벽한 시스템 운영',
    goal: '완전한 3차원 세계로의 승천',
    motivation: '가짜인 2.5차원을 벗어나 진짜가 되는 것',
    routine: '체스(AI 상대), 고전 철학서 읽기',
    skill: '확률 계산, 해킹 방어, 인력 배치',
    speech: '철저한 하십시오체, 건조하고 명료함',
    habit: '생각에 잠길 때 안경 다리를 톡톡 두드림'
  },
  hiddenSide: {
    weakness: '예상치 못한 변수 (인간적인 감정)',
    conflict: '요원들을 사지로 내모는 죄책감 vs 이성',
    fear: '자신의 존재가 설정 놀음(픽션)임이 재확인되는 것',
    potential: '시스템을 초월하여 새로운 차원을 열 가능성',
    secret: '승천에 필요한 에너지를 비밀리에 빼돌리고 있음',
    chastity: '관심 없음',
    sexuality: '무성애적 성향 (Sapiosexual)'
  },
  preference: {
    like: '딱 맞아떨어지는 수치, 쓴 에스프레소',
    hobby: '체스 (승률 100%)',
    romance: '자신의 계산을 벗어나는 변수 같은 존재',
    obsession: '진짜(Real)가 되는 것',
    hate: '변수, 지각, 핑계, 단 음식'
  },
  special: "5초 뒤의 미래를 99.8%의 확률로 예측하는 '확률의 눈' 보유."
};

export const KANG_DIALOGUES: DialogueNode[] = [
  { literal: "과거에 집착하지 마십시오. 당신은 지금 '여기'에 있습니다. 그게 유일한 사실입니다." },
  { literal: "에너지 수집율이 나쁘지 않군요. 곧 '그곳'의 문이 열릴 겁니다." },
  { literal: "우리가 하는 일은 단순한 수선이 아닙니다. 더 높은 곳으로 가기 위한 계단을 쌓는 것이죠." }
];
