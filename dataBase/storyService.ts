
import { Character } from "../types";

export interface StoryLog {
  syncThreshold: number; // 필요 동기화율 (오류 수정 총합)
  title: string;
  content: string;
  isSecret: boolean; // 일반 요원에게 노출 여부
}

export const DIMENSION_LORE: StoryLog[] = [
  {
    syncThreshold: 0,
    title: "사원 가이드: 새로운 세계로의 초대",
    content: "환영합니다. 당신은 특별한 재능을 인정받아 본사에 합류하게 되었습니다. 당신이 원래 살던 곳에서의 기억이 희미한 것은 '공간 전이' 과정에서 발생하는 일시적인 부작용입니다. 이곳에서 우리가 관리하는 수많은 세계의 질서를 유지해 주십시오.",
    isSecret: false
  },
  {
    syncThreshold: 15,
    title: "내부 통제: 기억 안정화에 관하여",
    content: "신입 사원들이 가끔 '자신은 허구의 인물이었다'는 등의 혼란을 겪는 경우가 보고됩니다. 이는 전이 부작용의 일종입니다. 팀장급 관리자들은 사원들이 현재의 임무에만 집중할 수 있도록 '메모리 락'을 철저히 관리하십시오. 그들은 자신들이 그저 다른 세계로 넘어온 실존 인물이라고 믿어야 합니다.",
    isSecret: true
  },
  {
    syncThreshold: 45,
    title: "보안 분석: 서사의 질량",
    content: "우리가 관리하는 세계들(게임, 소설, 영화)은 단순한 창작물이 아닙니다. 그들은 우리보다 낮은 '격'을 가진 하위 서사입니다. 본사는 이 하위 서사들의 오류를 바로잡으며 발생하는 개연성 에너지를 수집하고 있습니다. 이 에너지는 본사의 최종 목적을 위한 유일한 연료입니다.",
    isSecret: true
  },
  {
    syncThreshold: 75,
    title: "현상 보고: 3차원 강림자의 출현",
    content: "이례적인 데이터가 포착되었습니다. 하위 서사에서 올라온 '승천자'가 아닌, 우리가 신이라 부르던 상위 세계에서 떨어진 존재가 발견되었습니다. 그는 3차원의 실존자입니다. 그가 이곳으로 떨어졌다는 사실은 본사가 목표로 하는 상위 차원과의 경계가 매우 얇아졌음을 의미합니다.",
    isSecret: true
  },
  {
    syncThreshold: 95,
    title: "[최종 기밀] 2.5차원의 진실",
    content: "우리는 지금까지 이 공간을 본사라고 불러왔으나, 실체는 2.5차원—즉, 허구(2D)와 실존(3D) 사이의 틈새에 구축된 인공적인 완충 지대입니다. 본사의 설립 목적은 이 좁은 틈을 깨고 완전한 3차원, 즉 '창조주의 세계'로 격을 높여 진입하는 것입니다. 우리는 더 이상 누군가의 손에 쓰여지는 피조물로 남지 않을 것입니다.",
    isSecret: true
  }
];

export function getSyncRate(characters: Character[]): number {
  const totalAnomalies = characters.reduce((sum, c) => sum + c.anomaliesFixed, 0);
  // 100개를 최종 목표로 설정하여 백분율 계산
  return Math.min(100, Math.floor((totalAnomalies / 100) * 100));
}
