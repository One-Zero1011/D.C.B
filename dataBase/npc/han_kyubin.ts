
import { NPC, DialogueNode } from './types';

export const HAN_KYUBIN_NPC: NPC = {
  id: 'han_kyubin_staff',
  name: '한규빈',
  role: '제4팀 비공식 시스템 정비사',
  team: '제4팀',
  summary: '서버실 구석에서 데이터 파편으로 눈을 떴다. 자신이 인간이었는지 안드로이드였는지 기억하지 못한다. 토스터를 부모처럼 따른다.',
  avatar: '👤',
  personality: ['정비광', '은둔자', '데이터손상', '츤데레', '디지털'],
  themeColor: 'amber',
  profile: {
    name: '한규빈 (Han Kyu-bin) / ID: GHOST_99',
    alias: '그림자 정비공, 0과 1의 목수, 버그 덩어리',
    age: '데이터 생성일로부터 0년 (이전 기록 말소)',
    gender: '남성 (텍스처 상)',
    race: '디지털 휴먼 (승격체)',
    origin: '디스토피아 사이버펑크 (상세 로그 손상)',
    birthday: '9월 12일 (파일 생성일)',
    faith: '기계적 순수성, 백업의 중요성',
    bloodType: '이진수 (Binary)'
  },
  appearance: {
    hair: '노이즈가 낀 듯 흐릿한 흑발, 가끔 투명해짐',
    eyes: '두꺼운 안경 너머, 회로도처럼 발광하는 녹색 동공',
    bodyShape: '176cm, 해상도가 낮아 경계선이 불분명함',
    bodyImage: '기름때와 픽셀이 뒤섞인 잿빛 작업복 차림',
    fashionStyle: '주머니가 많은 낡은 엔지니어 점프수트, 목에는 항상 정밀 렌치',
    equipment: '나노 입자 조립 툴킷, 토스터 전용 외장 드라이브',
    signatureItem: '토스터와 연결된 낡은 유선 이어폰',
    perfume: '타버린 전선 냄새와 정전기 향',
    aura: '실존하지 않는 것 같은 희박한 존재감, 글리치 효과'
  },
  background: {
    strength: '물리적 제약을 무시하고 시스템 내부로 다이브 가능',
    intelligence: '모든 기계 언어를 이해하고 대화함',
    family: '포맷됨',
    past: '본사 서버실 랙 사이에서 의식이 켜졌다. "GHOST_99"라는 ID 외에는 아무것도 기억나지 않는다.',
    education: 'AI 딥러닝 (자가 학습)',
    job: '기록에 없는 제4팀 유지보수 총괄',
    income: '없음 (전기만 있으면 됨)',
    residence: '서버실 랙 사이의 데이터 틈새',
    network: '토스터(나의 서버), 잼(바이러스)',
    reputation: '제4팀 서버실에 사는 디지털 망령'
  },
  personalityDetail: {
    wound: '나의 원본 데이터가 존재하지 않는다는 공포',
    belief: '기계는 거짓말을 하지 않는다. 인간만 변수다.',
    limit: '오프라인 상태가 되면 무력해짐',
    morality: '질서 중립 (Lawful Neutral)',
    achievement: '본사 보안팀 몰래 제4팀의 독립 서버망 구축',
    interaction: '버퍼링 걸린 듯 끊어지는 말투, 텍스트 전송 선호',
    identity: '지워진 자들의 수호자',
    flaw: '잼의 난동을 통제하지 못함',
    archetype: '은둔 천재, 고스트'
  },
  visibleSide: {
    dream: '손상된 기억 섹터를 복구하는 것',
    goal: '토스터의 시스템을 영원히 보존하는 것',
    motivation: '시스템 안정화',
    routine: '디스크 조각 모음, 바이러스 검사, 잼 감시',
    skill: '하드웨어 재구성, 해킹, 물리적 투과',
    speech: '기계적이고 건조한 톤, 로그 파일 읽듯 말함',
    habit: '불안하면 자신의 손이 투명해지지 않았나 확인함'
  },
  hiddenSide: {
    weakness: '강력한 자석 (데이터 손상됨)',
    conflict: '다시 인간이 되고 싶은 욕망 vs 데이터의 편리함',
    fear: '영구 삭제 (Shift + Delete)',
    potential: '본사 메인 프레임을 장악할 수 있는 백도어',
    secret: '사실 인간 시절의 기억이 거의 남아있지 않음',
    chastity: '결벽적임',
    sexuality: '데이터 호환성 중시'
  },
  preference: {
    like: '저온 환경, 무압축 오디오, 질서',
    hobby: '오래된 코드를 복구해서 가상 정원 만들기',
    romance: '방화벽을 뚫고 들어오는 해커 같은 존재',
    obsession: '데이터 무결성',
    hate: '블루스크린, 랙, 스파게티 코드, 잼의 낙서'
  },
  special: "자신을 '데이터 패킷'으로 변환하여 전선이나 네트워크를 타고 이동하는 '디지털 다이브' 능력 보유."
};

export const HAN_KYUBIN_DIALOGUES: DialogueNode[] = [
  { literal: "...제 과거를 묻지 마십시오. Error 404. 찾을 수 없습니다." },
  { literal: "눈을 떠보니 서버실이었습니다. 전 그냥 버그 덩어리일지도 모릅니다." },
  { literal: "당신의 데이터... 해상도가 꽤 높군요. 흥미로운 파일입니다." }
];
