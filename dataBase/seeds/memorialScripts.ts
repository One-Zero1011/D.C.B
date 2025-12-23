
import { MBTI } from "../../types";

export interface MemorialTemplate {
  condition: 'positive' | 'negative' | 'neutral';
  mbtiType: 'F' | 'T' | 'any';
  scripts: string[];
}

export const MEMORIAL_TEMPLATES: MemorialTemplate[] = [
  {
    condition: 'positive',
    mbtiType: 'F',
    scripts: [
      "당신이 남긴 온기가 아직 이곳에 남아있습니다. 부디 그곳에선 아프지 마시길.",
      "우리의 서사는 여기서 멈추지만, 당신과 함께한 기억은 영원히 내 차원의 일부가 될 거예요.",
      "더 많이 웃어주지 못해 미안합니다. 당신의 빈자리가 너무나도 크네요."
    ]
  },
  {
    condition: 'positive',
    mbtiType: 'T',
    scripts: [
      "자네의 작전 수행 능력은 완벽했어. 이 기록은 내가 끝까지 보존하도록 하지.",
      "감상적인 말은 생략하겠네. 하지만 자네라는 파트너를 잃은 건 내 연산에 큰 손실이야.",
      "비효율적인 희생이었을지도 모르지만, 자네다운 마무력이었어. 경의를 표하네."
    ]
  },
  {
    condition: 'negative',
    mbtiType: 'any',
    scripts: [
      "우리는 끝내 서로를 이해하지 못했지만, 당신의 마지막이 이 차원을 구했다는 건 인정하지.",
      "지옥에서라도 다시 만나면 그땐 제대로 결판을 내자고. 수고했어.",
      "당신을 증오했지만, 빈자리가 느껴지는 건 어쩔 수 없군. 잘 가게."
    ]
  },
  {
    condition: 'neutral',
    mbtiType: 'any',
    scripts: [
      "[디멘션 코퍼레이션 통보] 요원 %NAME%의 데이터가 연대기에 공식적으로 통합되었습니다.",
      "자산의 물리적 소멸을 확인했습니다. 그의 성과는 아카이브에 영구 보존됩니다.",
      "차원의 균형을 위해 희생된 모든 존재에게 정적을 바칩니다."
    ]
  }
];
