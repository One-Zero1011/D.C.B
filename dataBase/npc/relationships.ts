
/**
 * 디멘션 코퍼레이션 NPC 공식 관계도 데이터베이스
 */

export interface RelationshipInfo {
  subjectId: string;
  targetId: string;
  relationType: string;
  description: string;
}

export const NPC_RELATIONSHIPS: RelationshipInfo[] = [
  // --- 제1팀: 설계와 직관 ---
  {
    subjectId: 'kang_leader',
    targetId: 'lee_jun_staff',
    relationType: '통제 불가능한 변수',
    description: "논리로는 설명 안 되는 이준의 깐족거림과 정답률에 스트레스를 받지만, 가끔 그의 직감이 자신의 연산을 앞지를 때 묘한 전율을 느낀다. 자꾸 시야에 두려 한다."
  },
  {
    subjectId: 'lee_jun_staff',
    targetId: 'kang_leader',
    relationType: '무너뜨리고 싶은 철옹성',
    description: "차갑고 완벽한 팀장님이 당황해서 얼굴을 붉힐 때까지 깐족거리는 것이 삶의 목표. 하지만 그녀가 진짜 위기에 처하면 가장 먼저 꼬리를 세우고 달려간다."
  },

  // --- 제3팀: 우두머리와 그림자 ---
  {
    subjectId: 'baek_leader',
    targetId: 'sa_heon_staff',
    relationType: '길들여지지 않는 시선',
    description: "이사현의 유능함은 인정하나, 자신의 등 뒤에서 느껴지는 지나치게 길고 정적인 시선에 종종 뒷목이 서늘해진다. 본능적으로 그가 위험하다는 걸 알면서도 유일하게 등을 맡긴다."
  },
  {
    subjectId: 'sa_heon_staff',
    targetId: 'baek_leader',
    relationType: '나의 유일한 좌표 / 그림자',
    description: "백도진의 야성을 사랑한다. 그가 자신을 거칠게 다룰 때마다 안도감을 느끼며, 언젠가 그가 완전히 지쳤을 때 자신의 똬리 안에서만 숨 쉬게 만들 날을 고대한다."
  },

  // --- 제4팀: 완벽한 정비와 노이즈 (한규빈 중심) ---
  {
    subjectId: 'han_kyubin_staff',
    targetId: 'toaster_leader',
    relationType: '마스터피스 / 유일한 대화 상대',
    description: "토스터의 구형 아키텍처에서 신성함을 느낀다. 한규빈이 유일하게 속마음을 털어놓는 대상이며, 토스터의 화면에 뜨는 이모지 하나하나를 기록하고 보존한다."
  },
  {
    subjectId: 'han_kyubin_staff',
    targetId: 'jam_playful',
    relationType: '제거 불가능한 노이즈 / 말썽꾸러기 동생',
    description: "잼의 시끄러운 소음과 낙서를 질색하지만, 잼의 배터리가 떨어지면 누구보다 빠르게 충전기를 들고 달려간다. 겉으로는 버그라 부르지만 실상은 가장 신경 쓰는 존재."
  },
  {
    subjectId: 'jam_playful',
    targetId: 'han_kyubin_staff',
    relationType: '안경 샌님 / 만만한 정비사',
    description: "한규빈이 정돈해둔 공구함을 뒤섞거나 그의 옷에 스티커를 붙이는 것이 삶의 낙. 한규빈이 진짜로 화난 척하면 토스터 뒤로 숨어 그의 눈치를 보며 낄낄거린다."
  },

  // --- 팀장 간 관계 ---
  {
    subjectId: 'kang_leader',
    targetId: 'choi_leader',
    relationType: 'SF vs 판타지의 불협화음',
    description: "현실적인 수치를 믿는 강 팀장과 '운명'과 '기적'을 믿는 최 팀장은 사사건건 부딪힌다. 하지만 서로가 가진 '원본의 상실감'을 이해하는 유일한 이해자이기도 하다."
  },
  {
    subjectId: 'baek_leader',
    targetId: 'choi_leader',
    relationType: '늙은 늑대들의 술자리',
    description: "전장에서 뼈가 굵은 두 남자의 묵직한 유대감. 많은 말을 하지 않아도 서로의 흉터가 어떤 서사에서 왔는지 본능적으로 알아챈다."
  },
  {
    subjectId: 'sa_heon_staff',
    targetId: 'lee_jun_staff',
    relationType: '천적 (뱀 vs 강아지)',
    description: "이준이 멍멍거리며 백 팀장에게 달려들 때마다 사현의 눈동자가 가늘어진다. 이준은 본능적으로 사현 옆에선 꼬리를 내리지만, 곧 다시 깝치며 그의 인내심을 테스트한다."
  }
];
