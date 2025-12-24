
import { NPC, DialogueNode } from './types';

export const PARK_TAEWOO_NPC: NPC = {
  id: 'park_taewoo_staff',
  name: '사원 박태우',
  role: '제2 차원조사팀 현장 보좌관',
  team: '제2팀',
  summary: '눈을 떠보니 야근 중이었다. 전생의 기억은 "피곤함"이라는 감각으로만 남아있으며, 자신이 원래 이 회사의 부품이었다고 체념했다.',
  avatar: '🥱',
  personality: ['냉소적', '만성피로', '기억소실', '생존본능', '투명인간'],
  themeColor: 'emerald',
  profile: {
    name: '박태우 (Park Tae-woo) / Extra #402',
    alias: '배경맨, 병풍, 최 팀장의 지갑',
    age: '31세 (신체 나이 고정)',
    gender: '남성',
    race: '인간 (승격체)',
    origin: '제목 미상의 오피스 드라마 (기억 데이터 손상)',
    birthday: '기억나지 않음',
    faith: '금융 치료, 칼퇴',
    bloodType: 'B형 (추정)'
  },
  appearance: {
    hair: '특징 없이 덥수룩한 갈색 머리 (기억에 남지 않음)',
    eyes: '초점이 흐릿하고 죽어있는 동태눈',
    bodyShape: '180cm, 구부정해서 작아 보임, 흐릿한 윤곽선',
    bodyImage: '군중 씬에 섞여 있으면 절대 찾을 수 없는 평범함',
    fashionStyle: '어디서 본 듯한 양산형 정장, 구겨진 넥타이',
    equipment: '무한 리필되는 영수증 뭉치, 에너지 드링크',
    signatureItem: '존재감을 지우는 안경',
    perfume: '진한 커피 냄새와 복사기 토너 냄새',
    aura: '배경음악처럼 깔려있는 무력감'
  },
  background: {
    strength: '주인공이 활약할 때 도망치는 속도 최상위',
    intelligence: '눈치 100단 (살아남기 위해 발달함)',
    family: '기억 안 남 (대본에 없었음)',
    past: '정신을 차려보니 사무실 책상 앞이었고, 최 팀장이 결재 서류를 던지고 있었다. 그 전의 삶은 마치 안개처럼 흐릿하다.',
    education: '설정값 없음 (대충 대졸로 처리됨)',
    job: '제2팀 사고 수습 담당',
    income: '최 팀장 뒤치다꺼리하느라 항상 마이너스',
    residence: '사무실 소파 (집이 어디였는지 기억이 안 나서)',
    network: '최 팀장(재앙), 편의점 알바생',
    reputation: '있는지 없는지 모를 사람'
  },
  personalityDetail: {
    wound: '과거에도, 지금도 나는 주인공이 아니라는 패배감',
    belief: '튀면 죽는다. 묻어가자.',
    limit: '스포트라이트를 받으면 공황 장애 옴',
    morality: '중립 (True Neutral)',
    achievement: '최 팀장의 사고를 500번 수습하고도 살아남음',
    interaction: '한숨 섞인 말투, 존재감 없이 스윽 다가옴',
    identity: '이름을 얻었으나 기억을 잃은 자',
    flaw: '만사가 귀찮고 의욕이 없음',
    archetype: '소시민, 생계형 회사원'
  },
  visibleSide: {
    dream: '로또 맞아서 컷 밖으로 사라지기',
    goal: '오늘 분량 채우고 퇴근하기',
    motivation: '월급 (생존 자금)',
    routine: '커피 수혈, 구석에 박혀 있기, 한숨 쉬기',
    skill: '책임 회피, 법인카드 긁기, 은신(패시브)',
    speech: '말끝을 흐림, "그냥..." "뭐..." 가 말버릇',
    habit: '자신의 손이 투명해지나 확인해 봄'
  },
  hiddenSide: {
    weakness: '자신의 이름이 불리는 것 (어색해함)',
    conflict: '도망가고 싶음 vs 갈 곳이 기억나지 않음',
    fear: '다시 이름 없는 행인 1로 돌아가는 것',
    potential: '누구의 눈에도 띄지 않고 적진에 침투 가능',
    secret: '사실 과거를 기억해내기 싫어함 (평범했을 테니까)',
    chastity: '연애 라인 없음 (엑스트라니까)',
    sexuality: '피곤함'
  },
  preference: {
    like: '구석 자리, 혼밥, 연휴',
    hobby: '아무것도 안 하고 천장 보기',
    romance: '바라지 않음 (분량 늘어나면 피곤함)',
    obsession: '퇴근 시간',
    hate: '클로즈업 샷, 주인공, 사건 사고'
  },
  special: "주변의 '주인공 보정'을 피해 가장 안전한 사각지대를 찾아내는 '배경 인물의 생존 본능' 보유."
};

export const PARK_TAEWOO_DIALOGUES: DialogueNode[] = [
  { literal: "(한숨) 눈 떠보니 야근 중이더라고요. 전생에 나라를 팔아먹었나..." },
  { literal: "제가 예전에 뭐 했는지 아세요? 저도 몰라요. 그냥 계속 일만 했던 것 같아요." },
  { literal: "카메라 앵글 밖으로 나가고 싶다... 아, 여긴 카메라가 없나?" }
];
