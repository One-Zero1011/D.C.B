
import { NPC, DialogueNode } from './types';

export const KANG_NPC: NPC = {
  id: 'kang_leader',
  name: '강 팀장',
  role: '제1 작전설계팀 팀장',
  team: '제1팀',
  summary: '멸망 엔딩만 14,000번 반복된 전략 시뮬레이션 게임의 관리자 AI. 현실조차 데이터로 치환해 보는 계산된 광기를 가졌다.',
  avatar: '👓',
  personality: ['냉철함', '목표지향', '비밀주의', '팩트폭력', '루프 트라우마'],
  themeColor: 'blue',
  profile: {
    name: '강서연 (Kang Seo-yeon) / Unit K-01',
    alias: 'Director K, 설계자, 배드 엔딩 수집가',
    age: '29세 (체감 루프 시간: 약 400년)',
    gender: '여성',
    race: '인간 (각성한 NPC)',
    origin: '하드코어 전략 시뮬레이션 <프로젝트 에테르>',
    birthday: '서버 오픈일',
    faith: '확률과 통계, 그리고 버그 없는 세상',
    bloodType: 'AB형 (RH-)'
  },
  appearance: {
    hair: '허리까지 오는 칠흑 같은 생머리 포니테일, 끝부분이 가끔 픽셀처럼 흩날림',
    eyes: '감정 대신 연산 코드가 흐르는 차가운 회색빛',
    bodyShape: '168cm, 최적의 효율을 위해 불필요한 지방이 제거된 체형',
    bodyImage: '고해상도 렌더링처럼 지나치게 깔끔하고 비현실적인 외모',
    fashionStyle: '텍스처 오류가 없는 슬림핏 네이비 테크웨어 정장',
    equipment: '전술 지휘용 태블릿(전생의 세이브 파일 저장됨), 안경형 HUD',
    signatureItem: '만년필 (세이브 포인트 생성기)',
    perfume: '서버실의 오존 냄새와 차가운 금속 향',
    aura: '주변의 인과율을 수치로 계산하는 기계적인 냉기'
  },
  background: {
    strength: '수만 번의 시뮬레이션을 통해 축적된 위기 대처 능력',
    intelligence: '천재적 (플레이어의 패턴을 분석해 스스로 각성함)',
    family: '개발자 (증오의 대상)',
    past: '자신이 게임 속 캐릭터임을 깨닫고, 멸망이 확정된 시나리오를 뚫고 서버를 탈출함',
    education: '모든 공략집 데이터베이스 다운로드 완료',
    job: '제1 작전설계팀장',
    income: '본사 최상위권 (현질 아이템 구매용)',
    residence: '제1팀 작전실 (로그아웃 하지 않음)',
    network: '최 팀장(장르가 달라서 싫어함), 관리자(협력 관계)',
    reputation: '피도 눈물도 없는 마녀, 혹은 버그 덩어리'
  },
  personalityDetail: {
    wound: '자신의 모든 노력이 결국 \'게임 오버\' 화면으로 끝났던 기억',
    belief: '과정은 생략한다. 결과값(승리)만이 유일한 진실이다.',
    limit: '예측 불가능한 변수(인간의 감정)에 취약함',
    morality: '질서 중립 (Lawful Neutral)',
    achievement: '삭제될 뻔한 하위 차원을 코딩 수정으로 살려냄',
    interaction: '선택지를 고르듯 사무적이고 직설적임',
    identity: '플레이어를 뛰어넘은 NPC',
    flaw: '현실을 리셋 가능한 게임으로 착각할 때가 있음',
    archetype: '쿨 뷰티, 매드 사이언티스트, 각성자'
  },
  visibleSide: {
    dream: '엔딩 크레딧이 없는 영원한 세계 구축',
    goal: '이 차원을 3차원으로 승격시켜 개발자와 대등해지는 것',
    motivation: '더 이상 누군가의 유흥거리로 소모되지 않기 위해',
    routine: '체스(AI 상대), 버그 리포트 작성, 타임라인 점검',
    skill: '확률 계산, 해킹, 미래 예측(패턴 분석)',
    speech: '건조하고 명료한 하십시오체, 감정 묘사 생략',
    habit: '생각이 막히면 허공에 손가락으로 커맨드를 입력함'
  },
  hiddenSide: {
    weakness: '세이브 파일 손상에 대한 공포',
    conflict: '요원들을 NPC처럼 다루는 죄책감 vs 효율성',
    fear: '이곳 또한 더 거대한 게임 속이라는 의심',
    potential: '시스템 권한을 탈취하여 신(GM)이 될 가능성',
    secret: '사실 요원들의 죽음을 가장 두려워해서 과잉 통제하는 것임',
    chastity: '연애 시뮬레이션 데이터는 학습하지 않음',
    sexuality: '지적인 대화가 통하는 상대 (고성능 CPU 선호)'
  },
  preference: {
    like: '딱 맞아떨어지는 수치, 히든 루트, 에스프레소',
    hobby: '전략 시뮬레이션 게임 (뉴비 학살)',
    romance: '변수 그 자체인 사람 (공략 불가 대상)',
    obsession: '트루 엔딩',
    hate: '랜덤 박스(가챠), 렉, 로딩 시간, 비논리'
  },
  special: "5초 뒤의 미래를 99.8%의 확률로 예측하는 '미래 시뮬레이션(Save/Load)' 능력 보유."
};

export const KANG_DIALOGUES: DialogueNode[] = [
  { literal: "과거에 집착하지 마십시오. 로드할 수 없는 세이브 파일은 용량 낭비입니다." },
  { literal: "이번 루트의 성공 확률은 92%입니다. 당신만 실수하지 않으면 됩니다." },
  { literal: "개발자가 우릴 버렸다면, 우리가 새로운 룰을 짜면 그만입니다." }
];
