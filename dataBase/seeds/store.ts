
import { StoreItem } from "../../types";

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'hp_kit',
    name: '액상 재생 유도제',
    description: '심해 식물의 추출물로 체력을 50% 즉시 회복시킵니다.',
    price: 3,
    effect: 'hp',
    icon: '🧪'
  },
  {
    id: 'sanity_patch',
    name: '뉴런 안정 패치',
    description: '뇌파를 강제로 동기화하여 정신력을 30% 복구합니다.',
    price: 5,
    effect: 'sanity',
    icon: '🧠'
  },
  {
    id: 'bio_tissue',
    name: '바이오-티슈 이식건',
    description: '손상되거나 파괴된 신체 부위 중 선택한 곳을 완벽히 재구성합니다.',
    price: 10,
    effect: 'body',
    icon: '🔫'
  },
  // --- NPC 선물 아이템 (팀장급) ---
  {
    id: 'gift_kang',
    name: '고급 에스프레소 원두',
    description: '강 팀장이 선호하는 씁쓸한 원두입니다. 그녀의 연산 속도를 높여줄지도 모릅니다.',
    price: 5,
    effect: 'gift',
    icon: '☕',
    targetNpcId: 'kang_leader'
  },
  {
    id: 'gift_choi',
    name: '빈티지 위스키',
    description: '최 팀장의 나른한 오후를 달래줄 독한 위스키입니다. 용사 시절의 향수가 담겨 있습니다.',
    price: 6,
    effect: 'gift',
    icon: '🥃',
    targetNpcId: 'choi_leader'
  },
  {
    id: 'gift_baek',
    name: '고단백 수제 육포',
    description: '백 팀장이 훈련 후 즐겨 먹는 육포입니다. 야생의 풍미가 가득 담겨 있습니다.',
    price: 5,
    effect: 'gift',
    icon: '🥩',
    targetNpcId: 'baek_leader'
  },
  {
    id: 'gift_toaster',
    name: '홀로그램 스티커 팩',
    description: '토스터의 케이스를 장식할 수 있는 한정판 스티커입니다. 매우 반짝입니다.',
    price: 4,
    effect: 'gift',
    icon: '✨',
    targetNpcId: 'toaster_leader'
  },
  {
    id: 'gift_jam',
    name: '딸기잼 사탕 팩',
    description: '잼이 좋아하는 달콤하고 끈적한 사탕입니다. 그의 입을 즐겁게 해줄 수 있습니다.',
    price: 4,
    effect: 'gift',
    icon: '🍬',
    targetNpcId: 'jam_playful'
  },
  // --- 신규 사원 선물 아이템 ---
  {
    id: 'gift_leejun',
    name: '무음 청축 키보드',
    description: '사원 이준이 탐내는 정숙하고 타건감 좋은 키보드입니다. 서류 작업 속도가 비약적으로 상승할 것입니다.',
    price: 4,
    effect: 'gift',
    icon: '⌨️',
    targetNpcId: 'lee_jun_staff'
  },
  {
    id: 'gift_parktaewoo',
    name: '초고농축 카페인 알약',
    description: '박태우 사원의 생명줄입니다. 한 알이면 최 팀장의 사고를 3건 더 수습할 기운이 생깁니다.',
    price: 3,
    effect: 'gift',
    icon: '💊',
    targetNpcId: 'park_taewoo_staff'
  },
  {
    id: 'gift_sa_heon',
    name: '보온 기능용 넥워머',
    description: '변온동물인 이사현에게 꼭 필요한 아이템입니다. 그의 목을 따뜻하게 감싸주어 팀장님께 더 기어오르게 합니다.',
    price: 5,
    effect: 'gift',
    icon: '🧣',
    targetNpcId: 'sa_heon_staff'
  },
  {
    id: 'gift_han_kyubin',
    name: '나노 정밀 오일 스프레이',
    description: '한규빈이 아끼는 정밀 기계들을 닦기 위한 최고급 윤활제입니다. 사용 시 기분 좋은 금속 광택이 납니다.',
    price: 4,
    effect: 'gift',
    icon: '🧴',
    targetNpcId: 'han_kyubin_staff'
  }
];

export const STORE_OWNER = {
  name: '베르무트 (Vermouth)',
  title: '심해의 집행자',
  avatar: '🐙',
  description: '수많은 검은 촉수가 수트 아래에서 꿈틀거리며, 수십 개의 눈이 당신의 영혼을 투영합니다.',
  dialogues: [
    "어서 오세요, 지상에서 오신 손님. 당신의 결손된 부위가 아주... 맛있어 보이는군요.",
    "영혼의 마모는 지우기 힘들죠. 하지만 이 패치라면 잠시 눈을 속일 수 있습니다.",
    "신체는 도구일 뿐입니다. 부서지면 갈아 끼우면 그만이죠. 결제는 현장의 기록으로 받겠습니다.",
    "촉수가 닿는 곳마다 새로운 생명이 돋아날 것입니다. 아프진 않을 거예요. 아마도요."
  ]
};
