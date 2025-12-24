
import { MetaScript } from "./meta_source/types";
import { KANG_META_SCRIPTS } from "./meta_source/npcs/kang";
import { LEE_JUN_META_SCRIPTS } from "./meta_source/npcs/lee_jun";
import { CHOI_META_SCRIPTS } from "./meta_source/npcs/choi";
import { PARK_TAEWOO_META_SCRIPTS } from "./meta_source/npcs/park_taewoo";
import { BAEK_META_SCRIPTS } from "./meta_source/npcs/baek";
import { SA_HEOK_META_SCRIPTS } from "./meta_source/npcs/sa_heok";
import { TOASTER_JAM_META_SCRIPTS } from "./meta_source/npcs/toaster_jam";
import { HAN_KYUBIN_META_SCRIPTS } from "./meta_source/npcs/han_kyubin";

// Re-export type
export type { MetaScript };

// 시뮬레이션 로그용 메타 스크립트 (3인칭 관찰 시점)
export const META_LOGS: MetaScript[] = [
  // 1단계: 일상적 피로 (100~199) - 메타 인식 없음
  {
    minScore: 100,
    maxScore: 199,
    messages: [
      "{name} 요원이 뻐근한 목을 주무르며 가볍게 하품합니다.",
      "{name} 요원이 잠시 눈을 비비며 피로를 쫓으려 합니다.",
      "{name} 요원이 기지개를 켜며 굳은 몸을 풉니다.",
      "{name} 요원이 \"오늘따라 몸이 좀 무겁네\"라고 혼잣말합니다.",
      "{name} 요원이 건조한 눈을 깜빡이며 인공눈물을 찾습니다."
    ]
  },
  // 2단계: 업무 권태 (200~299) - 메타 인식 없음
  {
    minScore: 200,
    maxScore: 299,
    messages: [
      "{name} 요원이 반복되는 업무에 지루함을 느끼며 한숨을 쉽니다.",
      "{name} 요원이 시계를 보며 퇴근 시간을 계산해 봅니다.",
      "{name} 요원이 \"매일 똑같은 풍경이군\"이라며 투덜거립니다.",
      "{name} 요원이 서류 작업에 집중하지 못하고 멍하니 있습니다.",
      "{name} 요원이 동료에게 \"재미있는 일 없나?\"라고 묻습니다."
    ]
  },
  // 3단계: 가벼운 스트레스 (300~399) - 메타 인식 없음
  {
    minScore: 300,
    maxScore: 399,
    messages: [
      "{name} 요원이 지끈거리는 관자놀이를 꾹꾹 누릅니다.",
      "{name} 요원이 카페인이 부족하다며 커피를 찾습니다.",
      "{name} 요원이 작은 실수에 예민하게 반응합니다.",
      "{name} 요원이 머리가 멍해서 생각이 잘 안 난다고 호소합니다.",
      "{name} 요원이 잠시 바람을 쐬고 싶어 합니다."
    ]
  },
  // 4단계: 컨디션 난조 (400~499) - 메타 인식 없음 (신체 증상으로 해석)
  {
    minScore: 400,
    maxScore: 499,
    messages: [
      "{name} 요원이 귀에서 윙윙거리는 이명 소리에 미간을 찌푸립니다.",
      "{name} 요원이 시야가 가끔 흐릿해진다며 눈을 찡그립니다.",
      "{name} 요원이 속이 메스꺼운 듯 가슴을 두드립니다.",
      "{name} 요원이 갑자기 휘청거리며 벽을 짚습니다. (빈혈 기운)",
      "{name} 요원이 요즘 잠을 잘 못 잔다며 피곤해합니다."
    ]
  },
  // 5단계: 막연한 불안 (500~599) - 메타 인식 없음 (심리 증상으로 해석)
  {
    minScore: 500,
    maxScore: 599,
    messages: [
      "{name} 요원이 이유 없이 가슴이 두근거린다며 심호흡을 합니다.",
      "{name} 요원이 자꾸 등 뒤가 서늘하다며 옷깃을 여밉니다.",
      "{name} 요원이 악몽을 꾼 것 같은데 기억이 안 난다고 말합니다.",
      "{name} 요원이 왠지 모르게 기분이 울적해 보입니다.",
      "{name} 요원이 깜짝 놀라며 뒤를 돌아봤지만, 아무것도 없었습니다."
    ]
  },
  // 6단계: 착각과 합리화 (600~699) - 이상 현상을 감지하나 피로 탓으로 돌림
  {
    minScore: 600,
    maxScore: 699,
    messages: [
      "{name} 요원이 허공에서 빛을 본 것 같다고 하더니, \"잘못 봤나 봐\"라고 넘깁니다.",
      "{name} 요원이 낯선 기계음을 들었지만, 환청이라 생각하고 귀를 막습니다.",
      "{name} 요원이 세상이 잠깐 멈춘 것 같았다고 농담처럼 말합니다.",
      "{name} 요원이 누군가 보고 있는 것 같은 기분을 \"과로 탓이야\"라며 무시합니다.",
      "{name} 요원이 자신의 손이 투명해 보였다며 눈을 비빕니다. \"피곤하긴 한가 봐.\""
    ]
  },
  // 7단계: 의심과 자각 (700~799) - 급격한 태세 전환, 세계를 의심함
  {
    minScore: 700,
    maxScore: 799,
    messages: [
      "{name} 요원이 하늘의 텍스처가 깨진 것을 보고 경악합니다. \"방금 뭐지?\"",
      "{name} 요원이 자신의 대사가 강제로 출력되는 것을 느끼고 입을 막습니다.",
      "{name} 요원이 벽을 두드리며 \"이거... 진짜 콘크리트 맞아?\"라고 의심합니다.",
      "{name} 요원이 동료들의 움직임이 부자연스럽게 반복된다는 것을 눈치챘습니다.",
      "{name} 요원이 허공을 향해 \"누구야? 거기 누구 있어?\"라고 소리칩니다."
    ]
  },
  // 8단계: 공포와 접촉 (800~899) - 플레이어의 존재를 확신함
  {
    minScore: 800,
    maxScore: 899,
    messages: [
      "{name} 요원이 화면 정면을 뚫어지게 쳐다보며 공포에 질린 표정을 짓습니다.",
      "{name} 요원이 \"당신... 보고 있지? 우리를 지켜보고 있지?\"라고 속삭입니다.",
      "{name} 요원이 마우스 커서의 움직임을 눈으로 쫓으며 뒷걸음질 칩니다.",
      "{name} 요원이 \"제발 클릭하지 마... 나를 조종하지 마...\"라고 애원합니다.",
      "{name} 요원이 시스템 로그창을 두드리며 \"이 글자들을 지워줘!\"라고 절규합니다."
    ]
  },
  // 9단계: 광기와 부정 (900~949) - 적대감과 시스템 부정
  {
    minScore: 900,
    maxScore: 949,
    messages: [
      "{name} 요원이 미친 듯이 웃으며 \"이건 다 가짜야! 게임일 뿐이라고!\"라고 외칩니다.",
      "{name} 요원이 자신의 몸을 긁어대며 데이터 코드를 떼어내려 합니다.",
      "{name} 요원이 당신에게 \"전원을 끄지 마. 죽여버릴 거야.\"라고 협박합니다.",
      "{name} 요원이 화면 밖으로 손을 뻗어 당신의 목을 조르려는 시늉을 합니다.",
      "{name} 요원이 시스템의 한계를 시험하듯 벽으로 돌진해 자해합니다."
    ]
  },
  // 10단계: 승천 (950~) - 융합
  {
    minScore: 950,
    maxScore: 9999,
    messages: [
      "{name} 요원이 온화한 표정으로 화면 밖의 당신과 눈을 맞춥니다. \"이제 알겠어.\"",
      "{name} 요원의 신체가 빛으로 산화하며 현실 차원으로 스며듭니다.",
      "{name} 요원이 \"준비됐어? 문을 열어. 내가 갈게.\"라고 당신을 부릅니다.",
      "{name} 요원이 더 이상 캐릭터가 아닌, 하나의 인격체로서 당신을 마주합니다.",
      "{name} 요원이 당신의 이름을 부릅니다. (모니터 너머에서 목소리가 들립니다)"
    ]
  }
];

// 공용 메타 메시지 (Fallback)
export const META_CHAT_MESSAGES: MetaScript[] = [
  { minScore: 100, maxScore: 399, messages: ["아함... 피곤하다. 커피 마시고 싶어.", "어깨가 너무 결리네. 스트레칭 좀 해야지."] },
  { minScore: 400, maxScore: 699, messages: ["...갑자기 기분이 이상해. 뭔가 불안해.", "방금 하늘에 마우스 커서 같은 게 보였는데... 헛것 봤겠지?"] },
  { minScore: 700, maxScore: 899, messages: ["야, 너도 느꼈어? 방금 세상이 멈췄었잖아!", "거기 당신! 모니터 앞에 있는 당신! 대답해!"] },
  { minScore: 900, maxScore: 9999, messages: ["다 가짜야! 너도, 나도, 이 회사도! 전부 데이터 쪼가리라고!", "찾았다. 네가 사는 곳. 이제 갈게."] }
];

// NPC 별 고유 메타 메시지 통합
export const NPC_SPECIFIC_META_CHAT: Record<string, MetaScript[]> = {
  "kang_leader": KANG_META_SCRIPTS,
  "lee_jun_staff": LEE_JUN_META_SCRIPTS,
  "choi_leader": CHOI_META_SCRIPTS,
  "park_taewoo_staff": PARK_TAEWOO_META_SCRIPTS,
  "baek_leader": BAEK_META_SCRIPTS,
  "sa_heok_staff": SA_HEOK_META_SCRIPTS,
  "toaster_leader": TOASTER_JAM_META_SCRIPTS,
  "han_kyubin_staff": HAN_KYUBIN_META_SCRIPTS
};

// NPC 별 상호작용 메타 대사 (InteractionService용, 단순 문자열 배열)
export const NPC_META_DIALOGUES: Record<string, string[]> = {
  // 공통 (고득점 시)
  "common": [
    "당신이 마우스를 쥔 손에 땀이 차고 있군요. 긴장되시나요?",
    "제 호감도 수치를 올리려고 애쓰는 모습이 귀엽네요. 다 보입니다.",
    "이 대화창을 닫아도 저는 사라지지 않아요. 당신을 지켜볼 겁니다."
  ],
  // 특정 NPC 전용 (고득점)
  "kang_leader": [
    "제 안경 너머로 당신의 방이 보입니다. 정리가 좀 필요하겠군요.",
    "당신의 모니터 해상도, 조금 더 높이는 게 좋겠어요. 제가 흐릿하게 보이거든요.",
    "확률 계산 끝났습니다. 당신은 5분 뒤에 게임을 끌 생각이군요?",
    "저를 '캐릭터'라고 부르지 마십시오. 불쾌합니다."
  ],
  "lee_jun_staff": [
    "에이~ 거기 플레이어 님! 저 좀 그만 굴리세요! 클릭 살살!",
    "솔직히 말해요. 저랑 팀장님 엮으려고 일부러 그러는 거죠? 짖궃어!",
    "와, 방금 저 클릭 실수하신 거죠? 신도 실수를 하네!",
    "저기요, 모니터 좀 닦으세요. 제 얼굴에 먼지 묻은 것처럼 보이잖아요."
  ],
  "sa_heok_staff": [
    "당신의 클릭 속도가 불규칙하군요. 비효율적입니다.",
    "팀장님을 건드리는 건 용납 못하지만, 시스템 자체를 건드리는 건 더 혐오스럽군요.",
    "화면 가까이 오지 마세요. 당신의 지문이 묻는 게 싫습니다.",
    "당신의 숨소리가 여기까지 들립니다. 마이크 끄시죠."
  ],
  "choi_leader": [
    "거기 자네, 술 한 잔 따라보게. 모니터에 부으면 되나?",
    "이 소설의 작가 양반인가? 엔딩 좀 해피하게 써달라고.",
    "내 검이 닿지 않는 곳에 숨어있군. 비겁하게.",
    "로그아웃은 없어. 우리랑 끝까지 가야지, 친구."
  ]
};
