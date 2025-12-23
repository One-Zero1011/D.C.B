
export const GROWTH_LOGS = {
  hp: [
    "[한계 돌파] {name}, 극한의 상황에서 육체적 잠재력을 개방했습니다. (최대 체력 +{amount})",
    "[신체 재구성] {name}의 근육 섬유가 차원압을 견디며 더 단단하게 재구축됩니다. (최대 체력 +{amount})",
    "[생명력 폭주] {name}, 죽음의 문턱에서 끈질긴 생명력을 증명했습니다. (최대 체력 +{amount})",
    "[전투 적응] {name}, 반복되는 고통 속에서 육체의 한계를 갱신합니다. (최대 체력 +{amount})",
    "[바이오 피드백] {name}의 세포가 손상된 조직을 초고속으로 복구하며 진화합니다. (최대 체력 +{amount})"
  ],
  sanity: [
    "[깨달음] {name}, 차원의 이치를 일부 이해하며 정신적 그릇을 넓혔습니다. (최대 정신력 +{amount})",
    "[정신적 승화] {name}, 광기를 마주하고도 자아를 유지하는 법을 터득했습니다. (최대 정신력 +{amount})",
    "[심연의 응시] {name}, 심연을 들여다보았으나 삼켜지지 않았습니다. 정신적 내성 증가. (최대 정신력 +{amount})",
    "[초월적 사고] {name}, 인간의 사고 방식을 넘어선 관점을 획득했습니다. (최대 정신력 +{amount})",
    "[내면의 평화] {name}, 혼돈 속에서 질서를 찾아내며 정신적 여유를 확보합니다. (최대 정신력 +{amount})"
  ]
};

export const ANOMALY_LOGS = {
  success: [
    "{name} 요원, \"{anomaly}\" 현상을 {trait_style} {trait_verb}. {npc_name}이(가) 흡족해합니다.",
    "{name}, \"{anomaly}\" 발생 지점을 {trait_style} 포착하여 제압했습니다. {npc_name}의 긍정적 평가.",
    "\"{anomaly}\" 처리 완료. {name}의 {trait_style} 대처가 빛을 발했습니다. ({npc_name} 기록)",
    "{name} 요원, {trait_style} 판단으로 \"{anomaly}\"을(를) 완벽히 차단했습니다.",
    "시스템 안정화. {name} 요원이 \"{anomaly}\" 오류를 {trait_style} 수정했습니다."
  ],
  failure: [
    "{name} 요원, \"{anomaly}\" 격리 실패. 시스템 역류 발생.",
    "경고: {name} 요원이 \"{anomaly}\" 제어에 실패했습니다. 국지적 현실 붕괴 감지.",
    "{name}, \"{anomaly}\"의 변칙성에 휘말려 튕겨져 나갔습니다. 임무 실패.",
    "\"{anomaly}\" 확산 저지 실패. {name} 요원이 피해를 입고 후퇴합니다.",
    "치명적 오류! {name} 요원이 \"{anomaly}\" 앞에서 무력화되었습니다."
  ]
};

export const IDLE_LOGS = [
  "{name} 요원, 현장을 {trait_style} 감시 중.",
  "{name} 요원, {trait_style} 자세로 주변의 차원 파동을 관측하고 있습니다.",
  "특이사항 없음. {name} 요원이 {trait_style} 대기하며 다음 명령을 기다립니다.",
  "{name} 요원, 잠시 숨을 고르며 장비를 {trait_style} 점검합니다.",
  "{name} 요원, {trait_style} 시선으로 주위를 경계합니다."
];