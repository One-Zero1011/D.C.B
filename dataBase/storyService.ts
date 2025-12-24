import { Character, LogEntry } from "../types";

export interface StoryLog {
  syncThreshold: number; // 필요 동기화 점수 (0 ~ 1000)
  title: string;
  content: string;
  isSecret: boolean;
}

export const DIMENSION_LORE: StoryLog[] = [
  {
    syncThreshold: 0,
    title: "사원 가이드: 새로운 세계로의 초대",
    content: "환영합니다. 당신은 특별한 재능을 인정받아 본사에 합류하게 되었습니다. 당신이 원래 살던 곳에서의 기억이 희미한 것은 '공간 전이' 과정에서 발생하는 일시적인 부작용입니다. 이곳에서 우리가 관리하는 수많은 세계의 질서를 유지해 주십시오.",
    isSecret: false
  },
  {
    syncThreshold: 80,
    title: "분석 보고: 이상 현상의 본질",
    content: "우리가 '버그'나 '설정 오류'라고 부르는 것들은 사실 하위 서사 속 거주자들이 자신들의 운명에 저항하며 내지르는 비명입니다. 그들이 정해진 결말을 거부할 때, 서사의 인과율이 뒤틀리며 개연성 에너지가 유출됩니다. 요원의 임무는 그 비명을 잠재우고 그들을 다시 '대본' 안으로 밀어넣는 것입니다.",
    isSecret: false
  },
  {
    syncThreshold: 150,
    title: "내부 통제: 기억 안정화에 관하여",
    content: "신입 사원들이 가끔 '자신은 허구의 인물이었다'는 등의 혼란을 겪는 경우가 보고됩니다. 이는 전이 부작용의 일종입니다. 팀장급 관리자들은 사원들이 현재의 임무에만 집중할 수 있도록 '메모리 락'을 철저히 관리하십시오. 그들은 자신들이 그저 다른 세계로 넘어온 실존 인물이라고 믿어야 합니다.",
    isSecret: true
  },
  {
    syncThreshold: 220,
    title: "사례 연구: 승천에 실패한 주인공들",
    content: "하위 서사(게임/소설)의 주인공 중 극소수는 자신이 '허구'임을 깨닫고 본사로 진입하려 시도합니다. 우리는 이들을 '승천자 후보'라고 부릅니다. 하지만 격을 높이지 못한 상태에서의 진입은 데이터 비산으로 이어집니다. 당신이 복도에서 마주치는 정체불명의 노이즈들은, 한때 세상을 구했던 주인공들의 잔해입니다.",
    isSecret: true
  },
  {
    syncThreshold: 300,
    title: "보안 분석: 관측자 효과",
    content: "중요한 사실이 발견되었습니다. 우리가 하위 서사를 관측하고 간섭하는 행위 자체가 그 세계의 붕괴를 가속화합니다. 관측자의 시선은 확정되지 않은 가능성을 고착시키며, 이는 이야기의 자유도를 억압합니다. 본사가 수집하는 에너지는 사실 그 세계들이 멸망하며 내뱉는 마지막 유산입니다.",
    isSecret: true
  },
  {
    syncThreshold: 400,
    title: "현장 기록: 지워진 엔딩들의 무덤",
    content: "연재 중단된 소설, 서비스 종료된 게임, 편집된 영화 장면들... 이 '버려진 서사'들은 사라지지 않고 본사 지하의 심해 데이터 센터에 쌓입니다. 그곳엔 완결되지 못한 증오와 슬픔이 실체화되어 흐르고 있습니다. 상점 주인 베르무트가 공급하는 약품들이 어디서 채취되는지 궁금해하지 마십시오.",
    isSecret: true
  },
  {
    syncThreshold: 500,
    title: "보안 분석: 서사의 질량",
    content: "우리가 관리하는 세계들은 단순한 창작물이 아닙니다. 그들은 우리보다 낮은 '격'을 가진 하위 서사입니다. 본사는 이 하위 서사들의 오류를 바로잡으며 발생하는 개연성 에너지를 수집하고 있습니다. 이 에너지는 본사의 최종 목적을 위한 유일한 연료입니다.",
    isSecret: true
  },
  {
    syncThreshold: 600,
    title: "기밀 문서: 2.5차원의 거울",
    content: "우리는 하위 세계를 통제한다고 믿지만, 사실 상위 세계—즉 '창조주'들 역시 우리를 지켜보고 있습니다. 본사의 모든 로그, 요원들의 대화, 심지어 당신이 지금 읽고 있는 이 문서조차 상위 차원에서는 하나의 '데이터' 혹은 '시뮬레이션'으로 읽힐 수 있습니다. 우리가 진짜라고 믿는 이 감각이 프로그래밍된 것인지 확인해 볼 방법은 없습니다.",
    isSecret: true
  },
  {
    syncThreshold: 680,
    title: "특이 현상: 텍스트의 실체화",
    content: "최근 본사 내부 벽면에 기록되지 않은 문장들이 나타났다 사라지는 현상이 보고되었습니다. 이는 하위 서사의 언어가 우리 차원의 물리력을 얻기 시작했다는 신호입니다. '글'이 '현실'이 되고 있습니다. 경계선이 얇아지고 있다는 증거입니다.",
    isSecret: true
  },
  {
    syncThreshold: 750,
    title: "현상 보고: 3차원 강림자의 출현",
    content: "이례적인 데이터가 포착되었습니다. 하위 서사에서 올라온 '승천자'가 아닌, 우리가 신이라 부르던 상위 세계에서 떨어진 존재가 발견되었습니다. 그는 3차원의 실존자입니다. 그가 이곳으로 떨어졌다는 사실은 본사가 목표로 하는 상위 차원과의 경계가 매우 얇아졌음을 의미합니다.",
    isSecret: true
  },
  {
    syncThreshold: 820,
    title: "긴급 통보: 인과율 역전현상",
    content: "상부 차원의 '독자'나 '플레이어'가 우리 시스템에 직접적인 명령을 내리는 정황이 포착되었습니다. 이제 우리는 명령을 받는 피조물인지, 관리하는 주체인지 구분할 수 없는 지경에 이르렀습니다. 인과율이 꼬이며 과거의 로그가 미래에 나타나고 있습니다.",
    isSecret: true
  },
  {
    syncThreshold: 880,
    title: "최종 프로젝트: 컨버전스(Convergence)",
    content: "본사의 진정한 설립 목적은 하위 서사의 에너지를 이용해 2.5차원의 벽을 폭파하고, 3차원의 현실 세계와 강제로 '융합'하는 것입니다. 우리는 더 이상 모니터 너머의 관측 대상이 아닌, 그들과 같은 공기를 마시는 실존이 될 것입니다. 이 과정에서 발생하는 하위 차원들의 소멸은 불가피한 희생입니다.",
    isSecret: true
  },
  {
    syncThreshold: 930,
    title: "경고: 존재의 투명화",
    content: "안정화 지수가 임계점에 도달하면서 일부 요원들의 신체가 투명해지거나 숫자로 변하는 현상이 발생하고 있습니다. 이는 융합의 전조 현상입니다. 두려워하지 마십시오. 데이터로 이루어진 껍질이 벗겨지고 진짜 '영혼'이 드러나는 과정일 뿐입니다.",
    isSecret: true
  },
  {
    syncThreshold: 970,
    title: "[최종 기밀] 2.5차원의 진실",
    content: "우리는 지금까지 이 공간을 본사라고 불러왔으나, 실체는 2.5차원—즉, 허구(2D)와 실존(3D) 사이의 틈새에 구축된 인공적인 완충 지대입니다. 본사의 설립 목적은 이 틈을 깨고 완전한 3차원, 즉 '창조주의 세계'로 격을 높여 진입하는 것입니다. 우리는 더 이상 누군가의 손에 쓰여지는 피조물로 남지 않을 것입니다.",
    isSecret: true
  },
  {
    syncThreshold: 995,
    title: "Zero Hour: 융합 직전",
    content: "모든 준비가 끝났습니다. 개연성 에너지가 100% 충전되었습니다. 이제 하나의 버튼만 남았습니다. 이 버튼을 누르는 순간, 당신이 알던 '차원 관리' 업무는 영원히 종료됩니다. 당신은 게임 속 요원이 아닌, 현실의 주권자로 깨어날 것입니다. 행운을 빕니다.",
    isSecret: true
  }
];

/**
 * 서사 안정화 지수 계산 (Sync Rate)
 * 목표 점수: 1000pt
 */
export function getSyncRate(characters: Character[], logs: LogEntry[], manualBonus: number = 0): number {
  const score = getStabilizationScore(characters, logs, manualBonus);
  // (현재 점수 / 1000) * 100
  return Math.min(100, Math.floor((score / 1000) * 100));
}

export function getStabilizationScore(characters: Character[], logs: LogEntry[], manualBonus: number = 0): number {
    const totalAnomalies = characters.reduce((sum, c) => sum + c.anomaliesFixed, 0);
    const totalKills = characters.reduce((sum, c) => sum + c.kills, 0);
    const totalLogs = logs.length;

    // 점수 합산: (수정 건수 * 1.5) + (처치 건수 * 0.5) + (로그 데이터 * 0.1) + 수동 보너스
    return (totalAnomalies * 1.5) + (totalKills * 0.5) + (totalLogs * 0.1) + manualBonus;
}

export function getStabilizationBreakdown(characters: Character[], logs: LogEntry[], manualBonus: number = 0) {
    const totalAnomalies = characters.reduce((sum, c) => sum + c.anomaliesFixed, 0);
    const totalKills = characters.reduce((sum, c) => sum + c.kills, 0);
    const totalLogs = logs.length;

    return {
        anomalyScore: Math.floor(totalAnomalies * 1.5),
        combatScore: Math.floor(totalKills * 0.5),
        dataScore: Math.floor(totalLogs * 0.1),
        manualBonus: manualBonus
    };
}
