
import { NPC, DialogueNode } from './types';

export const LEE_JUN_NPC: NPC = {
  id: 'lee_jun_staff',
  name: '사원 이준',
  role: '제1 작전설계팀 데이터 검증관',
  team: '제1팀',
  summary: '강 팀장의 차가운 논리에 "에이~ 그건 아니죠!"라고 외치는 깝치는 천재. 매일 구박받지만 꼬리를 흔들며 다시 기어오른다. 그리고 소름 돋게도 그의 직감이 늘 맞는다.',
  avatar: '🐕',
  personality: ['낙천주의', '깐족거림', '천재적 직관', '강철 멘탈', '분위기 파괴자'],
  themeColor: 'blue',
  profile: {
    name: '이준 (Lee Jun)',
    alias: '제1팀의 사고뭉치, 정답 자판기, 깝치는 리트리버',
    age: '24세',
    gender: '남성',
    race: '인간',
    origin: '표준 차원 <메트로폴리스>',
    birthday: '4월 1일 (만우절처럼 장난스러운 성격)',
    faith: '나의 근거 없는 자신감',
    bloodType: 'B형'
  },
  appearance: {
    hair: '활동적인 느낌의 밝은 갈색 펌 헤어',
    eyes: '항상 장난기로 반짝이는 눈매, 윙크가 습관',
    bodyShape: '178cm, 다부진 체격',
    bodyImage: '강 팀장에게 혼나면서도 뒷머리를 긁적이며 웃고 있는 모습',
    fashionStyle: '사원증에 귀여운 스티커를 잔뜩 붙임, 후드티를 레이어드한 자유분방한 정장',
    equipment: '최신형 게이밍 키보드 (타건음이 매우 시끄러워 팀장이 싫어함)',
    signatureItem: '강 팀장의 뒷모습이 그려진 낙서장',
    perfume: '비눗방울 냄새와 시트러스 향',
    aura: '주변의 긴장감을 한순간에 무너뜨리는 해맑은 에너지'
  },
  background: {
    strength: '평균 이상 (의외로 현장 체질)',
    intelligence: '강 팀장이 "재수 없다"고 할 정도의 데이터 직관력',
    family: '사랑 듬뿍 받고 자란 막내아들',
    past: '천재적인 감각으로 차원 고시를 패스했으나, 면접에서 면접관에게 농담을 던져 제1팀으로 좌천됨',
    education: '차원 통계학 조기 졸업',
    job: '제1팀 데이터 검증 사원',
    income: '구박받는 만큼 쌓이는 성과급 (실력이 너무 좋아서 줄 수밖에 없음)',
    residence: '본사 기숙사 (매일 밤 팀장 방 문 앞에 간식을 두고 감)',
    network: '강 팀장(놀리고 싶은 주인님), 최 팀장(함께 농땡이 피우는 술친구)',
    reputation: '입만 다물면 완벽한데 입을 열면 리트리버'
  },
  personalityDetail: {
    wound: '진지한 충고가 장난으로 치부될 때 느끼는 짧은 고독',
    belief: '세상은 즐거워야 하고, 정답은 내 손끝에 있다',
    limit: '공포를 잘 느끼지 못해 위험에 자주 노출됨',
    morality: '혼돈 선 (Chaotic Good)',
    achievement: '강 팀장이 포기한 난제를 농담 던지듯 해결함',
    interaction: '깐족거리며 할 말 다 함',
    identity: '팀의 분위기를 책임지는 비공식 마스코트',
    flaw: '상대방의 기분을 가끔 못 읽고 깝침',
    archetype: '트릭스터이자 유능한 조력자'
  },
  visibleSide: {
    dream: '강 팀장 웃게 만들기',
    goal: '지루한 작전 설계에 스릴 더하기',
    motivation: '칭찬받고 싶음 (근데 놀리는 게 더 재밌음)',
    routine: '강 팀장 혈압 체크하기, 데이터로 예술 하기, 간식 뺏어 먹기',
    skill: '초고속 데이터 필터링, 위기 상황에서의 뻔뻔함',
    speech: '활기차고 장난스러운 말투, "팀장님~ 또 틀리셨네!"가 입버릇',
    habit: '기분 좋으면 제자리에서 방방 뜀'
  },
  hiddenSide: {
    weakness: '진심 어린 침묵',
    conflict: '팀장의 완벽주의 존중 vs 내 직관의 확실함',
    fear: '자신의 장난으로 인해 누군가 진심으로 상처받는 것',
    potential: '서사의 인과율을 유머로 치환해버리는 "현실 조작" 소질',
    secret: '사실 팀장의 모든 화풀이를 기쁘게 받아내고 있음 (그녀의 스트레스 해소처를 자처함)',
    chastity: '의외로 지조 있음',
    sexuality: '강한 카리스마에 끌리는 대형견 스타일'
  },
  preference: {
    like: '햄버거, 화려한 이펙트, 팀장님의 당황한 표정',
    hobby: '팀장님 안경 닦아주기 (억지로)',
    romance: '자신을 통제해줄 수 있는 강한 사람',
    obsession: '자신의 직감이 맞았을 때의 쾌감',
    hate: '지루한 회의, 무거운 분위기, 맛없는 보급식'
  },
  special: "팀장의 연산이 끝나기도 전에 '에이, 그거 아닌데~'라며 0.1초 만에 실제 변수를 짚어내는 '천재적 깐족' 능력 보유."
};

export const LEE_JUN_DIALOGUES: DialogueNode[] = [
  { literal: "에이 팀장님~ 데이터가 너무 딱딱하잖아요! 제 직감은 이쪽이라고 하는데요? (깐족)" },
  { literal: "거봐요! 제 말이 맞았죠? 아, 때리지는 마세요! 아파요! 헤헤." },
  { literal: "요원님, 팀장님 무시하고 저만 믿으세요. 제가 이 구역의 진짜 뇌라니까요?" }
];
