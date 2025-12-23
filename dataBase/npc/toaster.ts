
import { NPC, DialogueNode } from './types';

export const TOASTER_NPC: NPC = {
  id: 'toaster_leader',
  name: '토스터 & 잼',
  role: '제4 유지보수팀 팀장 & 통역관',
  team: '제4팀',
  summary: '스티커가 덕지덕지 붙은 올드 컴퓨터와 그의 어깨 위에 앉은 미니어처 파트너.',
  avatar: '🖥️🍞',
  personality: ['이모지소통', '기록광', '장난꾸러기(잼)', '시스템적(토스터)', '스티커수집'],
  themeColor: 'amber',
  profile: {
    name: '토스터 (본체) & 잼 (보조 유닛)',
    alias: '스티커 보드, 깡통 형제, 잼 바른 식빵',
    age: '420년 (토스터) / 3년 (잼)',
    gender: '무성',
    race: '오브젝트 헤드 (구형 컴퓨터)',
    origin: '본사 폐기물 처리장 출신 (재조립)',
    birthday: 'OS 업데이트 날',
    faith: '시스템 최적화',
    bloodType: '데이터 패킷'
  },
  appearance: {
    hair: '없음 (매끈한 플라스틱 케이스)',
    eyes: '화면에 출력되는 이모지 (토스터), 장난기 가득한 픽셀 눈 (잼)',
    bodyShape: '180cm의 건장한 수트핏 (토스터), 주먹만한 사이즈 (잼)',
    bodyImage: '단정한 정장에 어울리지 않는 키치한 스티커들이 덕지덕지 붙어있음',
    fashionStyle: '완벽하게 재단된 블랙 수트와 넥타이. 포인트로 어깨에 잼이 앉아있음',
    equipment: '대형 포맷 건, 스티커 앨범',
    signatureItem: '다양한 스티커 (스마일, 정지, 위험, 밴드)',
    perfume: '새 전자제품 냄새와 달콤한 딸기향',
    aura: '기묘한 침묵과 시끄러운 통역이 공존하는 분위기'
  },
  background: {
    strength: '토스터의 괴력, 잼의 초고속 연산',
    intelligence: '상호 보완적 (논리 + 창의)',
    family: '서로가 유일한 가족',
    past: '폐기될 뻔한 토스터를 잼이 고쳐내어 공생 관계가 됨',
    education: '딥러닝 & 인터넷 유머 습득',
    job: '제4 유지보수팀장',
    income: '부품 및 스티커로 지급',
    residence: '서버실 안쪽, 스티커로 장식된 랙',
    network: '모든 전자기기',
    reputation: '말은 안 통하지만 일처리는 확실한 콤비'
  },
  personalityDetail: {
    wound: '구형 모델이라는 컴플렉스 (잼이 위로해줌)',
    belief: '백업 없는 데이터는 존재하지 않는 것이다',
    limit: '토스터는 말을 못 하고, 잼은 거짓말을 섞음',
    morality: '질서 악 (토스터) / 혼돈 중립 (잼)',
    achievement: '서버실 먼지 제거율 99.9%',
    interaction: '이모지 출력 -> 잼의 제멋대로 통역',
    identity: '시스템의 수호자 듀오',
    flaw: '잼이 가끔 내용을 왜곡해서 전달함',
    archetype: '침묵하는 거인과 수다쟁이 요정'
  },
  visibleSide: {
    dream: '모든 요원에게 스티커 붙여주기',
    goal: '바이러스 없는 청정 구역 유지',
    motivation: '수집욕 (스티커)',
    routine: '서로의 모니터 닦아주기',
    skill: '하드웨어 물리 수리(때리기), 데이터 세탁',
    speech: '이모지(토스터) / 반말, 은어(잼)',
    habit: '토스터는 멍하니 있고 잼이 혼자 떠듦'
  },
  hiddenSide: {
    weakness: '강력한 자석, 정전기',
    conflict: '삭제하려는 토스터 vs 보관하려는 잼',
    fear: '분리수거 (서로 떨어지는 것)',
    potential: '본사 메인 프레임 해킹 가능',
    secret: '사실 토스터도 말할 수 있지만 귀찮아서 안 하는 것일 수도 있음',
    chastity: '해당 없음',
    sexuality: 'USB 포트 호환성 확인'
  },
  preference: {
    like: '반짝이는 스티커, 고용량 메모리',
    hobby: '스티커 수집, 지뢰찾기',
    romance: '전원 코드가 맞는 상대',
    obsession: '화면 보호기',
    hate: '블루스크린, 액체'
  },
  special: "토스터가 이모지를 띄우면 잼이(내키는 대로) 통역함. 잼은 귀엽지만 성격이 나쁨."
};

// Note: 실제 상호작용 로직은 interactionService에서 처리됨
export const TOASTER_DIALOGUES: DialogueNode[] = [
  { 
    emoji: "🛑 ⚠️ 🔨", 
    literal: "...", 
    jamInterpretation: "🍞 잼: \"형이 너 대가리... 아니, 머리를 포맷해버린대! 조심해!\"" 
  },
  { 
    emoji: "✨ 💾 👍", 
    literal: "...", 
    jamInterpretation: "🍞 잼: \"오~ 너 좀 쓸만한 데이터가 있는데? 내 컬렉션에 넣어줄게.\"" 
  }
];
