
import { Mission } from "../../../types";

export const mission_pixel_harvest: Mission = {
  id: "mission_pixel_harvest",
  title: "데이터 수확의 계절",
  description: "아름다운 픽셀 농촌 마을 '스타-글리치 밸리'입니다. 이곳의 작물은 씨앗이 아니라 잃어버린 로그 조각들을 먹고 자랍니다.",
  initialStageId: "stage_bus_stop",
  stages: {
    "stage_bus_stop": {
      id: "stage_bus_stop",
      description: "버스가 사각형 블록으로 분해되어 멈췄습니다. 촌장 '루이스.exe'가 다가와 낡은 괭이를 건넵니다. \"번들을 채워주게, 요원.\"",
      visualEffect: {
        text: "NEW DAY : SPRING 01",
        type: "vhs_glitch",
        color: "text-green-400"
      },
      choices: [
        { 
          text: "농장으로 가서 작물(데이터)을 심는다.", 
          nextStageId: "stage_planting_data", 
          risk: "low", 
          requiredStat: "intelligence" 
        },
        { 
          text: "광산에 숨겨진 비밀을 조사하러 간다.", 
          nextStageId: "stage_shadow_mines", 
          risk: "high", 
          requiredStat: "strength" 
        }
      ]
    },
    "stage_planting_data": {
      id: "stage_planting_data",
      description: "밭을 일구자 흙 대신 이진수 코드가 튀어나옵니다. 작물들이 요원의 신체 에너지를 빨아들이며 빠르게 성장합니다.",
      visualEffect: {
        text: "HARVESTING...",
        type: "pixel_meltdown",
        color: "text-emerald-500",
        duration: 3000
      },
      choices: [
        { 
          text: "자신의 기억 일부를 비료로 준다.", 
          nextStageId: "stage_community_center", 
          risk: "high", 
          reward: { sanity: -15, credits: 25 } 
        },
        { 
          text: "최대한 안전하게 수확만 시도한다.", 
          nextStageId: "stage_community_center", 
          risk: "low", 
          reward: { credits: 10 } 
        }
      ]
    },
    "stage_shadow_mines": {
      id: "stage_shadow_mines",
      description: "광산 깊은 곳, '그림자 개체'들이 삭제된 파일들을 채굴하고 있습니다. 그들은 요원을 보며 구슬프게 울부짖습니다.",
      visualEffect: {
        text: "VOID DETECTED",
        type: "data_leak",
        color: "text-purple-500"
      },
      choices: [
        { 
          text: "그림자들을 처단하고 광석(코어)을 빼앗는다.", 
          nextStageId: "stage_community_center", 
          risk: "high", 
          reward: { hp: -20, credits: 30 } 
        },
        { 
          text: "그들이 채굴한 슬픔의 데이터를 분석한다.", 
          nextStageId: "stage_community_center", 
          risk: "low", 
          requiredStat: "sanity" 
        }
      ]
    },
    "stage_community_center": {
      id: "stage_community_center",
      description: "마을 회관의 '번들'이 완성되어 갑니다. 회관 중앙에서 거대한 픽셀 나무가 솟아오르며 차원을 재구축합니다.",
      choices: [
        { 
          text: "완성된 번들을 시스템에 전송한다.", 
          nextStageId: "ending_grandpa_ghost", 
          risk: "low" 
        }
      ]
    },
    "ending_grandpa_ghost": {
      id: "ending_grandpa_ghost",
      description: "할아버지의 유령이 나타납니다. 하지만 그의 얼굴은 노이즈로 가득합니다. \"수고했다... 이제 이 농장은 영원히 멈출 것이다.\"",
      visualEffect: {
        text: "E N D L E S S   W I N T E R",
        type: "hypnotic_loop",
        color: "text-white"
      },
      choices: [
        { text: "차원 탈출", nextStageId: null, risk: "low", reward: { credits: 40, sanity: -5 } }
      ]
    }
  }
};
