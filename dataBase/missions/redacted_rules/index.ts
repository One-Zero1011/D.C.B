
import { Mission } from "../../../types";

export const mission_redacted_rules: Mission = {
  id: "mission_redacted_rules",
  title: "■■층의 특별 수칙",
  description: "엘리베이터가 버튼에도 없는 층에 멈췄습니다. 문 앞에는 낡은 종이 한 장이 붙어 있습니다. '이곳에 머무는 동안 반드시 다음의 ■■을 지키십시오.'",
  initialStageId: "stage_the_note",
  stages: {
    "stage_the_note": {
      id: "stage_the_note",
      description: "안내문 1번: 파란색 정장을 입은 사람이 커피를 권한다면 ■■■■하십시오. 이 건물에 파란색 정장을 입은 직원은 존재하지 않습니다.",
      visualEffect: {
        text: "DO NOT TRUST THE BLUE",
        type: "screen_crack",
        color: "text-blue-500",
        duration: 3000
      },
      choices: [
        { 
          text: "안내문을 무시하고 복도로 나간다.", 
          nextStageId: "stage_blue_suit_man", 
          risk: "high", 
          requiredStat: "strength" 
        },
        { 
          text: "안내문의 가려진 부분을 복구해본다.", 
          nextStageId: "stage_deciphering", 
          risk: "low", 
          requiredStat: "intelligence" 
        }
      ]
    },
    "stage_blue_suit_man": {
      id: "stage_blue_suit_man",
      description: "복도 끝에서 파란색 정장을 입은 남자가 김이 모락모락 나는 컵을 들고 다가옵니다. 그의 얼굴은 있어야 할 곳에 ■■■■이 박혀 있습니다.",
      visualEffect: {
        text: "I HAVE A COFFEE FOR YOU",
        type: "vhs_glitch",
        color: "text-white"
      },
      choices: [
        { 
          text: "그가 건네는 컵을 받아 마신다.", 
          nextStageId: "ending_integrated", 
          risk: "fatal", 
          reward: { hp: -99, sanity: -99 } 
        },
        { 
          text: "그의 머리(■■)를 공격한다.", 
          nextStageId: "stage_running_away", 
          risk: "high", 
          requiredStat: "strength" 
        }
      ]
    },
    "stage_deciphering": {
      id: "stage_deciphering" ,
      description: "검게 칠해진 단어를 긁어내자 나타난 문장은 다음과 같습니다. '그것은 당신의 ■■을 먹고 자랍니다. 절대로 이름을 부르지 마십시오.'",
      choices: [
        { 
          text: "이곳의 시스템 코어 위치를 추적한다.", 
          nextStageId: "stage_running_away", 
          risk: "low", 
          requiredStat: "intelligence" 
        }
      ]
    },
    "stage_running_away": {
      id: "stage_running_away",
      description: "벽면의 비상구 유도등이 붉은색으로 점멸하며 소리칩니다. \"&@^%(@ 를 믿지 마! &@^%(@ 는 가짜야!\"",
      visualEffect: {
        text: "EXIT IS CLOSED",
        type: "flood",
        intensity: 8,
        speed: 30,
        color: "text-red-600"
      },
      choices: [
        { 
          text: "창문을 깨고 뛰어내린다.", 
          nextStageId: "ending_free_fall", 
          risk: "fatal" 
        },
        { 
          text: "엘리베이터로 전력 질주한다.", 
          nextStageId: "ending_escaped_rules", 
          risk: "high", 
          requiredStat: "strength" 
        }
      ]
    },
    "ending_integrated": {
      id: "ending_integrated",
      description: "당신은 이제 파란색 정장을 입은 '새로운 직원'이 되었습니다. 다음 요원을 위해 커피를 준비하십시오.",
      choices: [{ text: "영구 귀속", nextStageId: null, risk: "fatal" }]
    },
    "ending_free_fall": {
      id: "ending_free_fall",
      description: "추락하는 도중 당신은 깨달았습니다. 이 건물은 지면에서 떠 있는 것이 아니라, 당신의 의식 속에 떠 있다는 것을.",
      choices: [{ text: "추락 종료", nextStageId: null, risk: "fatal", reward: { sanity: -50 } }]
    },
    "ending_escaped_rules": {
      id: "ending_escaped_rules",
      description: "엘리베이터 문이 닫히기 직전, 파란색 손들이 틈새를 비집고 들어오려 했습니다. 다행히 당신은 다시 로비에 도착했습니다.",
      choices: [{ text: "현실 귀환", nextStageId: null, risk: "low", reward: { credits: 25, sanity: 5 } }]
    }
  }
};
