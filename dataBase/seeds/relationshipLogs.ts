
export const RELATIONSHIP_LOGS: Record<string, string[]> = {
  // --- 우호/협력 ---
  "친구": [
    "{actor}가 {target}의 어깨를 치며 농담을 주고받습니다.",
    "{actor}가 {target}에게 숨겨둔 간식을 나눠줍니다.",
    "{actor}가 {target}의 뒷담화를 들어주며 맞장구를 칩니다.",
    "{actor}와 {target}가 작전 중 눈빛만으로 의사를 교환합니다.",
    "{actor}가 {target}가 실수한 것을 몰래 덮어줍니다."
  ],
  "베프": [
    "{actor}가 {target}와(과) 완벽한 호흡으로 하이파이브를 합니다.",
    "{actor}가 {target}의 표정만 보고도 무슨 생각을 하는지 알아챕니다.",
    "{actor}가 {target}를 위해 기꺼이 위험을 감수하려 합니다.",
    "{actor}와 {target}가 서로의 흑역사를 들추며 낄낄거립니다.",
    "{actor}가 {target}에게 '우린 끝까지 함께야'라고 속삭입니다."
  ],
  "동료": [
    "{actor}가 {target}에게 업무 관련 데이터를 전송합니다.",
    "{actor}가 {target}의 장비 결함을 지적해줍니다.",
    "{actor}가 {target}와(과) 효율적인 동선을 논의합니다.",
    "{actor}가 {target}에게 커피 한 잔을 건네며 노고를 치하합니다.",
    "{actor}가 {target}의 제안에 고개를 끄덕이며 동의합니다."
  ],
  "파트너": [
    "{actor}가 {target}의 사각지대를 완벽하게 엄호합니다.",
    "{actor}가 {target}와(과) 등을 맞대고 주변을 경계합니다.",
    "{actor}가 {target}의 신호를 기다리며 호흡을 가다듬습니다.",
    "{actor}가 {target}에게 탄창을 던져주며 윙크합니다.",
    "{actor}가 {target}의 부족한 점을 자신의 능력으로 보완합니다."
  ],
  "협력": [
    "{actor}가 {target}와(과) 일시적인 작전 회의를 가집니다.",
    "{actor}가 {target}의 목표 달성을 위해 지원 사격을 합니다.",
    "{actor}가 {target}에게 유용한 정보를 공유합니다.",
    "{actor}가 {target}와(과) 손발을 맞추며 임무를 수행합니다.",
    "{actor}가 {target}의 능력에 신뢰를 보냅니다."
  ],
  "신뢰": [
    "{actor}가 {target}에게 자신의 등을 온전히 맡깁니다.",
    "{actor}가 {target}의 판단을 의심하지 않고 따릅니다.",
    "{actor}가 {target}에게 중요한 비밀번호를 공유합니다.",
    "{actor}가 위험한 상황에서도 {target}가 올 것이라 믿고 버팁니다.",
    "{actor}가 {target}의 정직함을 칭찬합니다."
  ],
  "호감": [
    "{actor}가 {target}를 힐끗 쳐다보며 미소 짓습니다.",
    "{actor}가 {target}의 사소한 행동에도 관심을 가집니다.",
    "{actor}가 {target}에게 잘 보이기 위해 옷매무새를 다듬습니다.",
    "{actor}가 {target}의 의견에 적극적으로 찬성합니다.",
    "{actor}가 {target}가 있는 쪽으로 자연스럽게 이동합니다."
  ],
  "소꿉친구": [
    "{actor}가 {target}의 어릴 적 별명을 부르며 놀립니다.",
    "{actor}가 {target}에게 '너 옛날이랑 똑같네'라고 말합니다.",
    "{actor}가 {target}의 습관을 누구보다 잘 알고 챙겨줍니다.",
    "{actor}가 {target}와(과) 옛 추억을 이야기하며 긴장을 풉니다.",
    "{actor}가 {target}가 위험해지자 평소보다 과민하게 반응합니다."
  ],

  // --- 적대/경계 ---
  "라이벌": [
    "{actor}가 {target}보다 더 많은 성과를 내기 위해 속도를 높입니다.",
    "{actor}가 {target}에게 '이번엔 내가 이겼어'라고 도발합니다.",
    "{actor}가 {target}의 실력을 인정하면서도 질투를 느낍니다.",
    "{actor}가 {target}가 하는 방식과 정반대의 방법을 택합니다.",
    "{actor}가 {target}를 의식하며 화려한 기술을 선보입니다."
  ],
  "앙숙": [
    "{actor}가 {target}와(과) 마주치자마자 으르렁거립니다.",
    "{actor}가 {target}의 말꼬리를 잡고 늘어집니다.",
    "{actor}가 {target}가 실패하기를 은근히 바랍니다.",
    "{actor}가 {target}와(과) 사소한 문제로 또 언성을 높입니다.",
    "{actor}가 {target}의 발을 일부러 걸어 넘어뜨리려 합니다."
  ],
  "적": [
    "{actor}가 {target}에게 살의를 담은 눈빛을 보냅니다.",
    "{actor}가 {target}의 약점을 집요하게 파고듭니다.",
    "{actor}가 기회만 있으면 {target}를 제거할 계획을 세웁니다.",
    "{actor}가 {target}와(과) 거리를 벌리며 무기에 손을 올립니다.",
    "{actor}가 {target}의 존재 자체를 부정합니다."
  ],
  "혐오": [
    "{actor}가 {target}를 보고 더러운 것을 본 듯 인상을 찌푸립니다.",
    "{actor}가 {target}가 만진 물건을 소독하려 듭니다.",
    "{actor}가 {target}의 목소리가 들리자 귀를 막습니다.",
    "{actor}가 {target}에게 모욕적인 언사를 내뱉습니다.",
    "{actor}가 {target}와(과) 같은 공간에 있는 것조차 역겨워합니다."
  ],
  "경계": [
    "{actor}가 {target}의 일거수일투족을 감시합니다.",
    "{actor}가 {target}에게 정보를 숨기며 거리를 둡니다.",
    "{actor}가 {target}의 접근을 허용하지 않습니다.",
    "{actor}가 {target}가 배신할 가능성을 염두에 둡니다.",
    "{actor}가 {target}의 질문에 단답형으로 대답합니다."
  ],
  "불신": [
    "{actor}가 {target}의 보고 내용을 재차 확인합니다.",
    "{actor}가 {target}에게 '너를 믿지 않아'라고 직설적으로 말합니다.",
    "{actor}가 {target}의 뒤를 캐보려 합니다.",
    "{actor}가 {target}가 건넨 물건을 의심스럽게 쳐다봅니다.",
    "{actor}가 중요 작전에서 {target}를 배제하려 합니다."
  ],
  "무시": [
    "{actor}가 {target}가 말을 걸어도 못 들은 척합니다.",
    "{actor}가 {target}를 투명 인간 취급하며 지나갑니다.",
    "{actor}가 {target}의 의견을 가볍게 묵살합니다.",
    "{actor}가 {target}에게는 시선조차 주지 않습니다.",
    "{actor}가 {target}의 존재감이 희미하다고 생각합니다."
  ],

  // --- 수직/계약 ---
  "상사": [
    "{actor}가 {target}에게 업무 지시를 내립니다.",
    "{actor}가 {target}의 성과를 평가하고 기록합니다.",
    "{actor}가 {target}에게 격려와 압박을 동시에 줍니다.",
    "{actor}가 {target}의 실수를 엄격하게 질책합니다.",
    "{actor}가 {target}에게 커피 심부름을 시킵니다."
  ],
  "부하": [
    "{actor}가 {target}에게 '알겠습니다'라고 복창합니다.",
    "{actor}가 {target}의 눈치를 보며 보고서를 제출합니다.",
    "{actor}가 {target}의 지시를 수행하기 위해 분주히 움직입니다.",
    "{actor}가 {target}에게 조심스럽게 건의 사항을 말합니다.",
    "{actor}가 {target}의 기분을 살피며 아부를 떱니다."
  ],
  "스승": [
    "{actor}가 {target}에게 새로운 기술의 원리를 설명해줍니다.",
    "{actor}가 {target}의 자세를 교정해줍니다.",
    "{actor}가 {target}의 성장을 보며 흐뭇해합니다.",
    "{actor}가 {target}에게 뼈있는 조언을 건넸습니다.",
    "{actor}가 {target}를 보호하기 위해 앞장섭니다."
  ],
  "제자": [
    "{actor}가 {target}의 행동을 하나하나 따라 하려 합니다.",
    "{actor}가 {target}에게 가르침을 구하며 존경을 표합니다.",
    "{actor}가 {target}에게 인정받기 위해 과도하게 노력합니다.",
    "{actor}가 {target}의 뒤를 졸졸 쫓아다닙니다.",
    "{actor}가 {target}의 무용담을 경청합니다."
  ],
  "선배": [
    "{actor}가 {target}에게 라떼는 말이야 시전하며 훈수를 둡니다.",
    "{actor}가 {target}에게 노하우를 전수해 줍니다.",
    "{actor}가 {target}의 실수를 수습해 주며 생색을 냅니다.",
    "{actor}가 {target}에게 밥을 사주며 위로합니다.",
    "{actor}가 {target}를 데리고 농땡이 칠 곳을 알려줍니다."
  ],
  "후배": [
    "{actor}가 {target}에게 깍듯이 인사합니다.",
    "{actor}가 {target}의 무용담에 리액션을 해줍니다.",
    "{actor}가 {target}에게 의지하며 질문을 쏟아냅니다.",
    "{actor}가 {target}를 롤모델로 삼고 관찰합니다.",
    "{actor}가 {target}의 잡무를 도맡아 처리합니다."
  ],
  "주종": [
    "{actor}가 {target}의 명령에 절대복종합니다.",
    "{actor}가 {target}의 안위를 자신의 목숨보다 우선시합니다.",
    "{actor}가 {target}의 앞길을 막는 장애물을 제거합니다.",
    "{actor}가 {target} 앞에서 무릎을 꿇고 대기합니다.",
    "{actor}가 {target}를 '주인님'이라고 부를 뻔했습니다."
  ],
  "계약": [
    "{actor}가 {target}에게 계약 조건을 상기시킵니다.",
    "{actor}가 {target}와(과) 이해타산을 따지며 협상합니다.",
    "{actor}가 {target}에게 대가를 요구합니다.",
    "{actor}가 {target}와(과)의 거래가 유효함을 확인합니다.",
    "{actor}가 {target}가 약속을 어길 시의 위약금을 계산합니다."
  ],
  "비즈니스": [
    "{actor}가 {target}에게 사무적인 미소를 짓습니다.",
    "{actor}가 {target}와(과) 감정을 배제하고 일만 처리합니다.",
    "{actor}가 {target}에게 명함을 건네듯 정중하게 대합니다.",
    "{actor}가 {target}와(과) 딱 필요한 만큼만 대화합니다.",
    "{actor}가 {target}에게 '수고하셨습니다'라고 짧게 인사합니다."
  ],

  // --- 애정/가족 ---
  "연인": [
    "{actor}가 {target}의 손을 몰래 잡습니다.",
    "{actor}가 {target}를 사랑스러운 눈빛으로 바라봅니다.",
    "{actor}가 {target}가 다치지 않게 과잉보호합니다.",
    "{actor}가 {target}에게 '사랑해'라고 속삭입니다.",
    "{actor}가 {target}와(과) 잠시 둘만의 시간을 가집니다."
  ],
  "짝사랑": [
    "{actor}가 {target}를 훔쳐보다가 눈이 마주치자 화들짝 놀랍니다.",
    "{actor}가 {target}의 주변을 맴돌며 말을 걸 기회를 엿봅니다.",
    "{actor}가 {target}가 다른 사람과 웃자 질투를 느낍니다.",
    "{actor}가 {target}를 위해 몰래 선물을 준비합니다.",
    "{actor}가 {target}의 한마디에 하루 기분이 좌우됩니다."
  ],
  "썸": [
    "{actor}가 {target}와(과) 묘한 기류를 형성하며 대화합니다.",
    "{actor}가 {target}에게 은근슬쩍 스킨십을 시도합니다.",
    "{actor}가 {target}의 반응을 떠봅니다.",
    "{actor}가 {target}에게 '주말에 뭐해?'라고 묻습니다.",
    "{actor}가 {target}와(과) 눈이 마주치고 웃음을 터뜨립니다."
  ],
  "전애인": [
    "{actor}가 {target}와(과) 어색한 침묵을 공유합니다.",
    "{actor}가 {target}를 보며 복잡한 표정을 짓습니다.",
    "{actor}가 {target}에게 '잘 지냈어?'라고 묻습니다.",
    "{actor}가 {target}와의 과거를 떠올리며 씁쓸해합니다.",
    "{actor}가 {target}를 애써 무시하려 노력합니다."
  ],
  "부부": [
    "{actor}가 {target}의 옷매무새를 자연스럽게 챙겨줍니다.",
    "{actor}가 {target}와(과) 눈빛만으로 집안일을 분담합니다.",
    "{actor}가 {target}에게 '오늘 저녁은 뭐야?'라고 묻습니다.",
    "{actor}가 {target}의 곁에서 가장 편안한 표정을 짓습니다.",
    "{actor}가 {target}의 잔소리를 한 귀로 듣고 한 귀로 흘립니다."
  ],
  "약혼": [
    "{actor}가 {target}와(과) 미래에 대한 계획을 이야기합니다.",
    "{actor}가 {target}의 손에 끼워진 반지를 만지작거립니다.",
    "{actor}가 {target}를 평생의 반려자로 대우합니다.",
    "{actor}가 {target}에게 헌신적인 태도를 보입니다.",
    "{actor}가 {target}와(과) 함께 돌아갈 곳을 이야기합니다."
  ],
  "가족": [
    "{actor}가 {target}를 끔찍하게 아낍니다.",
    "{actor}가 {target}에게 '밥은 먹었냐'고 투박하게 묻습니다.",
    "{actor}가 {target}가 위험해지자 이성을 잃고 분노합니다.",
    "{actor}가 {target}와(과) 닮은 점을 부정하려 합니다.",
    "{actor}가 {target}에게 집안 소식을 전합니다."
  ],
  "남매/형제/자매": [
    "{actor}가 {target}의 등짝을 스매싱합니다.",
    "{actor}가 {target}의 물건을 허락 없이 사용합니다.",
    "{actor}가 {target}와(과) 투닥거리면서도 챙길 건 다 챙겨줍니다.",
    "{actor}가 {target}가 남에게 당하는 꼴은 못 봅니다.",
    "{actor}가 {target}에게 심부름을 시킵니다."
  ],
  "부모": [
    "{actor}가 {target}를 걱정스러운 눈빛으로 바라봅니다.",
    "{actor}가 {target}에게 잔소리를 늘어놓습니다.",
    "{actor}가 {target}의 성장을 대견해합니다.",
    "{actor}가 {target}를 위해 기꺼이 희생할 준비가 되어 있습니다.",
    "{actor}가 {target}에게 따뜻한 조언을 해줍니다."
  ],
  "자식": [
    "{actor}가 {target}에게 투정을 부립니다.",
    "{actor}가 {target}의 기대에 부응하려 노력합니다.",
    "{actor}가 {target}에게 의지하고 싶어 합니다.",
    "{actor}가 {target}에게 반항적인 태도를 보입니다.",
    "{actor}가 {target}의 그늘에서 벗어나려 합니다."
  ],

  // --- 특수/심리 ---
  "감시": [
    "{actor}가 {target}의 행동 패턴을 기록 수첩에 적습니다.",
    "{actor}가 {target}가 허튼짓을 하지 못하게 밀착 마크합니다.",
    "{actor}가 {target}의 통신 내역을 몰래 확인합니다.",
    "{actor}가 {target}에게 '지켜보고 있다'는 신호를 보냅니다.",
    "{actor}가 {target}의 거짓말을 간파해 냅니다."
  ],
  "구원": [
    "{actor}가 {target}를 절망의 구렁텅이에서 끌어올려 줍니다.",
    "{actor}가 {target}에게 삶의 의미를 부여합니다.",
    "{actor}가 {target}의 멘탈이 무너지지 않도록 지탱해 줍니다.",
    "{actor}가 {target}에게 희망적인 미래를 보여줍니다.",
    "{actor}가 {target}를 위해 기도합니다."
  ],
  "집착": [
    "{actor}가 {target}의 곁에서 한시도 떨어지려 하지 않습니다.",
    "{actor}가 {target}가 다른 사람과 대화하는 것을 방해합니다.",
    "{actor}가 {target}의 모든 것을 알고 싶어 합니다.",
    "{actor}가 {target}에게 섬뜩할 정도의 관심을 보입니다.",
    "{actor}가 {target}의 물건을 몰래 수집합니다."
  ],
  "애증": [
    "{actor}가 {target}를 죽도록 미워하면서도 놓지 못합니다.",
    "{actor}가 {target}에게 상처를 주고 바로 후회합니다.",
    "{actor}가 {target}가 망가지길 바라면서도 남이 망가뜨리는 건 싫어합니다.",
    "{actor}가 {target}와(과) 피 튀기는 싸움 끝에 묘한 유대감을 느낍니다.",
    "{actor}가 {target}를 보며 복잡한 한숨을 내쉽니다."
  ],
  "공범": [
    "{actor}가 {target}와(과) 은밀한 눈빛을 교환합니다.",
    "{actor}가 {target}와(과) 함께 증거를 인멸합니다.",
    "{actor}가 {target}에게 '우린 한배를 탔어'라고 상기시킵니다.",
    "{actor}가 {target}와(과) 알리바이를 맞춥니다.",
    "{actor}가 {target}의 비밀을 무덤까지 가져가기로 합니다."
  ],
  "운명": [
    "{actor}가 {target}를 보며 데자뷔를 느낍니다.",
    "{actor}가 {target}와(과) 우연히 동선이 계속 겹칩니다.",
    "{actor}가 {target}에게 알 수 없는 이끌림을 느낍니다.",
    "{actor}가 {target}와(과) 말이 통하지 않아도 마음이 통합니다.",
    "{actor}가 {target}와의 만남이 필연적이었다고 생각합니다."
  ],
  "이용": [
    "{actor}가 {target}를 장기말처럼 부립니다.",
    "{actor}가 {target}에게 거짓된 호의를 베풉니다.",
    "{actor}가 {target}의 능력을 착취합니다.",
    "{actor}가 {target}를 방패막이로 세웁니다.",
    "{actor}가 {target}가 쓸모없어지면 버릴 생각을 합니다."
  ],
  "동경": [
    "{actor}가 {target}를 반짝이는 눈으로 바라봅니다.",
    "{actor}가 {target}처럼 되고 싶어 흉내를 냅니다.",
    "{actor}가 {target}의 업적을 줄줄 외웁니다.",
    "{actor}가 {target}에게 사인... 아니, 결재를 요청합니다.",
    "{actor}가 {target}의 칭찬 한마디에 세상을 다 가진 듯 기뻐합니다."
  ],
  "실험체/연구원": [
    "{actor}가 {target}의 바이탈 사인을 체크합니다.",
    "{actor}가 {target}에게 새로운 약물을 투여하려 합니다.",
    "{actor}가 {target}를 관찰하며 데이터를 기록합니다.",
    "{actor}가 {target}에게 '검사 시간이야'라고 차갑게 말합니다.",
    "{actor}가 {target}의 반응을 흥미롭게 지켜봅니다."
  ]
};
