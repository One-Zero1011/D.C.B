
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
    description: '파괴된 신체 부위를 생체 점토로 재구성하여 수선합니다.',
    price: 10,
    effect: 'body',
    icon: '🔫'
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
