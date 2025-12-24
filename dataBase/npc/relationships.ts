
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

  // --- 제3팀: 야수와 조련사 ---
  {
    subjectId: 'baek_leader',
    targetId: 'sa_heok_staff',
    relationType: '잔소리꾼 부관',
    description: "백사혁의 유능함은 인정하나, 시도 때도 없이 따라다니며 영수증 처리와 위생 상태를 지적하는 통에 골치가 아프다. 하지만 그가 없으면 팀이 멈춘다는 것을 안다."
  },
  {
    subjectId: 'sa_heok_staff',
    targetId: 'baek_leader',
    relationType: '관리해야 할 맹수',
    description: "백도진의 압도적인 무력은 존경하지만, 그의 행정 처리 능력과 위생 관념은 경멸한다. 자신이 완벽하게 보좌하여 그를 최고의 리더로 완성시키고자 한다."
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
    subjectId: 'sa_heok_staff',
    targetId: 'lee_jun_staff',
    relationType: '소음 공해 (질서 vs 혼돈)',
    description: "이준의 시끄러운 언행과 돌발 행동을 극도로 혐오한다. 이준을 볼 때마다 '어떻게 저런 비효율적인 존재가 살아있지?'라고 생각하며 무시하려 든다."
  }
];
