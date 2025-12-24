
import { Mission } from "../../../types";

export const mission_abyss_morality: Mission = {
  id: "mission_abyss_morality",
  title: "심연의 결의",
  description: "지하 세계의 폐허와 닮은 데이터 구역입니다. 이곳의 거주자들은 공격적이지 않지만, 시스템은 그들을 '오류'로 규정하고 삭제를 명령합니다.",
  initialStageId: "stage_golden_flowers",
  stages: {
    "stage_golden_flowers": {
      id: "stage_golden_flowers",
      description: "노란 꽃밭 위에 떨어졌습니다. 꽃들은 요원의 이름을 속삭이며 기억을 갉아먹으려 합니다. 멀리서 그림자가 다가옵니다.",
      choices: [
        { 
          text: "그림자에게 도움을 요청한다 (자비).", 
          nextStageId: "stage_the_guardian", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "꽃밭을 짓밟으며 경계한다 (전투).", 
          nextStageId: "stage_the_judgment", 
          risk: "high", 
          requiredStat: "strength" 
        }
      ]
    },
    "stage_the_guardian": {
      id: "stage_the_guardian",
      description: "뿔이 달린 자비로운 형상의 데이터 덩어리가 나타나 파이를 권합니다. 하지만 파이 속에는 수천 개의 픽셀화된 안구가 박혀 있습니다.",
      visualEffect: {
        text: "DETERMINATION",
        type: "emoji_swarm",
        customEmojis: ["❤️", "💛", "🧡"],
        intensity: 6
      },
      choices: [
        { 
          text: "파이를 먹어 호의에 보답한다.", 
          nextStageId: "stage_the_judgment", 
          risk: "high", 
          reward: { sanity: 15, hp: -10 } 
        },
        { 
          text: "거절하고 길을 비키라고 요구한다.", 
          nextStageId: "stage_the_judgment", 
          risk: "low" 
        }
      ]
    },
    "stage_the_judgment": {
      id: "stage_the_judgment",
      description: "황금빛 복도. 작은 해골 형상의 홀로그램이 나타납니다. \"자네가 죽인 '데이터'들의 무게를 견딜 수 있겠나?\"",
      visualEffect: {
        text: "YOU FEEL YOUR SINS CRAWLING ON YOUR BACK",
        type: "hypnotic_loop",
        duration: 5000,
        color: "text-blue-400"
      },
      choices: [
        { 
          text: "잘못을 인정하고 참회한다.", 
          nextStageId: "ending_pacifist", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "이건 시뮬레이션일 뿐이라고 일축한다.", 
          nextStageId: "ending_genocide", 
          risk: "fatal", 
          requiredStat: "strength" 
        }
      ]
    },
    "ending_pacifist": {
      id: "ending_pacifist",
      description: "해골 홀로그램이 미소 짓습니다. \"좋은 답변이야.\" 차원문이 열리고 요원들은 평화로운 기억을 간직한 채 귀환합니다.",
      choices: [
        { text: "작전 종료", nextStageId: null, risk: "low", reward: { credits: 15, sanity: 20 } }
      ]
    },
    "ending_genocide": {
      id: "ending_genocide",
      description: "복도가 순식간에 붉게 변합니다. 요원의 영혼(데이터)에 직접적인 타격이 가해집니다. 고통스러운 비명과 함께 시스템이 강제 종료됩니다.",
      visualEffect: {
        text: "BAD TIME",
        type: "system_crash"
      },
      choices: [
        { text: "치명적 손상", nextStageId: null, risk: "fatal", reward: { hp: -50, sanity: -50 } }
      ]
    }
  }
};
