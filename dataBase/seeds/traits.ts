import { MBTI } from "../../types";

export const INITIAL_MBTI_TRAITS: Record<MBTI, { adjective: string; verb: string; style: string }> = {
  ISTJ: { adjective: "철저한", verb: "기록합니다", style: "철저하게" },
  ISFJ: { adjective: "헌신적인", verb: "복구합니다", style: "조심스럽게" },
  INFJ: { adjective: "통찰력 있는", verb: "조율합니다", style: "직관적으로" },
  INTJ: { adjective: "전략적인", verb: "재구조화합니다", style: "효율적으로" },
  ISTP: { adjective: "전술적인", verb: "수정합니다", style: "실용적으로" },
  ISFP: { adjective: "예술적인", verb: "덧칠합니다", style: "감각적으로" },
  INFP: { adjective: "이상적인", verb: "치유합니다", style: "공감하며" },
  INTP: { adjective: "분석적인", verb: "디버깅합니다", style: "논리적으로" },
  ESTP: { adjective: "대담한", verb: "박살냅니다", style: "거칠게" },
  ESFP: { adjective: "드라마틱한", verb: "연출합니다", style: "화려하게" },
  ENFP: { adjective: "상상력 넘치는", verb: "재창조합니다", style: "창의적으로" },
  ENTP: { adjective: "혁신적인", verb: "이용합니다", style: "교묘하게" },
  ESTJ: { adjective: "조직적인", verb: "집행합니다", style: "권위적으로" },
  ESFJ: { adjective: "사교적인", verb: "조정합니다", style: "헌신적으로" },
  ENFJ: { adjective: "카리스마 있는", verb: "고무합니다", style: "열정적으로" },
  ENTJ: { adjective: "지배적인", verb: "통제합니다", style: "무자비하게" },
};

export const INITIAL_MENTAL_STATES = [
  "평온", "집중", "스트레스", "광기", "우울", "히스테리", "해리성", "결의"
];
