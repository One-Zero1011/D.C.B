
import { NPC, DialogueNode } from './types';

export const CHOI_NPC: NPC = {
  id: 'choi_leader',
  name: '최 팀장',
  role: '제2 차원조사팀 팀장',
  team: '제2팀',
  summary: '하위 서사에서 격을 높여 올라온 인물. 진실을 알기에 오히려 허무주의에 빠져 있다.',
  avatar: '👔',
  personality: ['허무주의', '방탕함', '기억보존', '책임전가', '능글맞음'],
  themeColor: 'emerald',
  profile: {
    name: '최현수 / 레온하르트 드라카 3세',
    alias: '낙원 추방자, 늙은 늑대, 망국의 왕',
    age: '42세 (육체적 나이)',
    gender: '남성',
    race: '초월체 (전직 용사)',
    origin: '판타지 소설 <제국의 검>',
    birthday: '제국력 10월 4일',
    faith: '없음 (신을 죽임)',
    bloodType: 'O형'
  },
  appearance: {
    hair: '포마드로 넘긴 흑갈색 슬릭백, 한 가닥 흘러내림',
    eyes: '깊은 에메랄드색, 순간적으로 빛나는 맹수의 안광',
    bodyShape: '185cm, 떡 벌어진 어깨와 긴 팔다리',
    bodyImage: '한때 세상을 구했던 은퇴한 용사의 나른함',
    fashionStyle: '화려한 행커치프, 벨벳 소재 더블 브레스트 수트',
    equipment: '오른손 약지의 낡은 반지 (성물)',
    signatureItem: '힙 플라스크, 앤틱 지포 라이터',
    perfume: '독한 위스키와 오래된 종이 냄새',
    aura: '몰락한 왕족의 쓸쓸하고 퇴폐적인 분위기'
  },
  background: {
    strength: '실전 전투 경험, 이야기의 흐름을 읽는 직관',
    intelligence: '눈치가 빠름 (클리셰 간파)',
    family: '두고 옴 (사망 처리됨)',
    past: '마왕을 물리치고 엔딩 크레딧 후의 공허를 목격함',
    education: '제국 황실 교육 및 실전 생존술',
    job: '제2 차원조사팀장',
    income: '월급 루팡 (대부분 술값으로 탕진)',
    residence: '본사 옥탑방 느낌의 개인실',
    network: '강 팀장, 술친구들',
    reputation: '일 안 하는 한량이지만 결정적일 때 믿음직함'
  },
  personalityDetail: {
    wound: '엔딩 후의 공허함 (Post-Ending Trauma)',
    belief: '이야기는 끝나야 비로소 아름답다',
    limit: '책임지는 것을 극도로 기피함',
    morality: '혼돈 선 (Chaotic Good)',
    achievement: '세상을 구함 (마왕 토벌)',
    interaction: '능글맞음, 책임 회피, 유쾌함',
    identity: '은퇴한 주인공',
    flaw: '만성적인 무기력증과 알코올 의존',
    archetype: '은퇴한 영웅, 탕아'
  },
  visibleSide: {
    dream: '아무 일 없는 편안한 은퇴',
    goal: '버리고 온 세계의 결말을 다시 쓰거나 안식에 드는 것',
    motivation: '허무함을 잊기 위해',
    routine: '낮잠, 음주, 옛날 영화 감상',
    skill: '검술(봉인 중), 화술, 거짓말 탐지',
    speech: '하게체와 해요체 혼용, 연극적인 어조',
    habit: '반지를 만지작거림, 조언할 때 윙크함'
  },
  hiddenSide: {
    weakness: '과거의 트라우마 (지키지 못한 동료)',
    conflict: '다시 칼을 잡고 싶은 영웅심리 vs 허무주의',
    fear: '영원히 죽지 못하고 관측자로만 남는 것',
    potential: '세계관 최강자 라인의 무력',
    secret: '아직 검을 버리지 않았음',
    chastity: '문란해 보이나 의외의 순정파',
    sexuality: '이성애 (과거의 히로인을 잊지 못함)'
  },
  preference: {
    like: '해피 엔딩, 농땡이, 낡은 것들',
    hobby: '독한 위스키 수집',
    romance: '순수하고 열정적인 사람 (과거와 닮은)',
    obsession: '엔딩 크레딧',
    hate: '열린 결말, 자기희생, 야근'
  },
  special: "이야기의 흐름이 해피 엔딩인지 배드 엔딩인지 감지하는 '주인공의 직감' 보유."
};

export const CHOI_DIALOGUES: DialogueNode[] = [
  { literal: "이보게, 저 하늘이 진짜라고 생각하나? 누군가 붓으로 칠해놓은 것 같지 않아?" },
  { literal: "내가 예전에 왕이었다면 믿겠나? 하하, 여기선 그냥 팀장일 뿐이지만 말이야." },
  { literal: "결국 우리도 누군가의 상상력 끝에 매달려 있는 건지도 모르지." }
];
