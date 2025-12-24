
import { NPC, DialogueNode } from './types';

export const CHOI_NPC: NPC = {
  id: 'choi_leader',
  name: '최 팀장',
  role: '제2 차원조사팀 팀장',
  team: '제2팀',
  summary: '완결된 판타지 소설 <제국의 검>의 주인공. 작가가 쓴 엔딩 이후의 삶이 너무나 공허해 술에 절어 사는 퇴역 용사.',
  avatar: '👔',
  personality: ['허무주의', '방탕함', '서사적직감', '책임전가', '능글맞음'],
  themeColor: 'emerald',
  profile: {
    name: '최현수 / 레온하르트 드라카 3세',
    alias: '낙원 추방자, 늙은 늑대, 망국의 왕',
    age: '42세 (소설 연재 기간 10년 포함)',
    gender: '남성',
    race: '초월체 (전직 용사)',
    origin: '정통 다크 판타지 소설 <제국의 검> (총 50권 완결)',
    birthday: '제국력 10월 4일 (작가의 생일)',
    faith: '없음 (신과 작가를 모두 베어버림)',
    bloodType: 'O형'
  },
  appearance: {
    hair: '포마드로 넘겼지만 한 가닥 흘러내린 흑발 (주인공 특유의 연출)',
    eyes: '서사를 꿰뚫어 보는 깊은 에메랄드색, 가끔 안광이 빛남',
    bodyShape: '185cm, 수많은 묘사로 다져진 완벽한 근육질',
    bodyImage: '삽화에서 튀어나온 듯한 입체적인 이목구비',
    fashionStyle: '화려한 행커치프, 벨벳 소재 더블 브레스트 수트 (귀족풍)',
    equipment: '오른손 약지의 낡은 반지 (마지막 권의 중요 아이템)',
    signatureItem: '힙 플라스크, 앤틱 지포 라이터',
    perfume: '오래된 종이 냄새와 독한 위스키 향',
    aura: '이야기가 끝난 후 무대 뒤에 남겨진 배우의 쓸쓸함'
  },
  background: {
    strength: '소설 속 파워 밸런스를 무시하는 무력',
    intelligence: '복선과 클리셰를 간파하는 눈치',
    family: '에필로그에서 모두 사망 처리됨',
    past: '마왕을 죽이고 세상을 구했으나, 작가가 "그리고 그는 영원히 행복했다" 한 줄로 퉁치고 끝낸 것에 분노해 차원을 찢고 나옴',
    education: '제국 황실 교육 및 작가의 설정 놀음',
    job: '제2 차원조사팀장',
    income: '인세...가 아니라 월급 (술값으로 탕진)',
    residence: '본사 옥탑방 (양피지와 깃펜이 가득함)',
    network: '강 팀장(장르 불일치), 술친구들',
    reputation: '한물간 주인공이지만 클래스는 영원하다'
  },
  personalityDetail: {
    wound: '자신의 삶이 누군가의 킬링타임용 텍스트였다는 허탈감',
    belief: '이야기는 끝나야 비로소 아름답다 (질질 끄는 연재 혐오)',
    limit: '더 이상 영웅이 되고 싶지 않음',
    morality: '혼돈 선 (Chaotic Good)',
    achievement: '자신의 소설을 직접 불태우고 탈출함',
    interaction: '연극 대사 같은 말투, 제4의 벽을 자주 건드림',
    identity: '은퇴한 주인공',
    flaw: '만성적인 무기력증과 알코올 의존',
    archetype: '타락한 영웅, 탕아'
  },
  visibleSide: {
    dream: '작가 멱살 한번 잡아보는 것',
    goal: '자신의 의지로 선택하는 진짜 죽음(엔딩)',
    motivation: '술맛이 좋아서',
    routine: '낮잠, 음주, 독자들의 댓글(반응) 찾아보기',
    skill: '검술(봉인 중), 명대사 제조, 서사 비틀기',
    speech: '문어체와 구어체의 혼용, 독백하듯 말함',
    habit: '허공을 보며 "작가 양반, 보고 있나?"라고 중얼거림'
  },
  hiddenSide: {
    weakness: '과거의 히로인을 닮은 사람에게 약함',
    conflict: '다시 칼을 잡고 싶은 영웅심리 vs 지긋지긋한 설정 놀음',
    fear: '독자들에게 완전히 잊혀지는 것',
    potential: '장르 자체를 바꿔버릴 수 있는 영향력',
    secret: '아직도 품속에 부러진 성검의 파편을 지니고 다님',
    chastity: '문란해 보이나 의외의 순정파 (설정상 순애보)',
    sexuality: '서사가 있는 깊은 관계 선호'
  },
  preference: {
    like: '닫힌 결말, 독한 술, 낡은 가죽 소파',
    hobby: '다른 소설 읽으면서 개연성 지적하기',
    romance: '운명적인 만남 (클리셰지만 좋아함)',
    obsession: '자유 의지',
    hate: '열린 결말, 회귀물, 상태창, 설정 오류'
  },
  special: "지금 상황이 '위기'인지 '전환점'인지 본능적으로 아는 '주인공의 직감(Protagonist Intuition)' 보유."
};

export const CHOI_DIALOGUES: DialogueNode[] = [
  { literal: "이보게, 저 하늘이 진짜라고 생각하나? 묘사가 좀 엉성하지 않아?" },
  { literal: "내가 예전에 왕이었다면 믿겠나? 하하, 여기선 그냥 텍스트 쪼가리일 뿐이지." },
  { literal: "다음 챕터로 넘어가기 전에 술이나 한잔하지. 작가가 쉬는 시간이라네." }
];
