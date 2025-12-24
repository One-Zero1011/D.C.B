
import { Mission } from "../../../types";

export const mission_void_signal: Mission = {
  id: "mission_void_signal",
  title: "심연의 주파수 &@^%(@",
  description: "통신 장비에서 기괴한 노이즈가 흐릅니다. 0과 1이 아닌, 비명 섞인 &@^%(@ 조각들이 화면을 채웁니다.",
  initialStageId: "stage_tuning",
  stages: {
    "stage_tuning": {
      id: "stage_tuning",
      description: "주파수를 맞추자 미래의 당신이 보낸 것으로 추정되는 메시지가 출력됩니다. \"&@^%(@ 야, 제발 ■■■■ 만은 하지 마.\"",
      visualEffect: {
        text: "HELP ME {name}",
        type: "data_leak",
        color: "text-green-500"
      },
      choices: [
        { 
          text: "메시지를 끝까지 경청한다.", 
          nextStageId: "stage_the_voice", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "강제로 통신을 차단한다.", 
          nextStageId: "stage_static_storm", 
          risk: "high", 
          requiredStat: "intelligence" 
        }
      ]
    },
    "stage_the_voice": {
      id: "stage_the_voice",
      description: "목소리가 속삭입니다. \"너의 뒤에 있는 요원, 그의 눈 속을 봐. ■■■■ 가 살고 있어.\"",
      visualEffect: {
        text: "LOOK AT THE EYES",
        type: "emojiPopUp",
        customEmojis: ["👁️", "👁️‍🗨️", "🧿"],
        intensity: 10,
        duration: 4000
      },
      choices: [
        { 
          text: "뒤를 돌아 동료의 눈을 확인한다.", 
          nextStageId: "stage_eye_contact", 
          risk: "fatal", 
          requiredStat: "sanity" 
        },
        { 
          text: "거짓말이라고 생각하고 무시한다.", 
          nextStageId: "stage_static_storm", 
          risk: "low" 
        }
      ]
    },
    "stage_eye_contact": {
      id: "stage_eye_contact",
      description: "동료의 동공 속에서 당신 자신의 장례식을 보았습니다. 그곳에서 당신은 웃고 있었습니다.",
      choices: [
        { 
          text: "현실을 거부하며 소리친다.", 
          nextStageId: "ending_erased", 
          risk: "fatal", 
          reward: { sanity: -60 } 
        }
      ]
    },
    "stage_static_storm": {
      id: "stage_static_storm",
      description: "방 안의 모든 전자기기가 폭발하며 백색 소음이 물리적인 압력이 되어 요원들을 짓누릅니다. &@^%(@ 의 그림자가 보입니다.",
      visualEffect: {
        text: "ERROR_NO_VOICE",
        type: "system_crash"
      },
      choices: [
        { 
          text: "소음 속에 몸을 던져 그림자를 타격한다.", 
          nextStageId: "ending_signal_lost", 
          risk: "high", 
          requiredStat: "strength" 
        },
        { 
          text: "데이터 보호막을 펼쳐 버틴다.", 
          nextStageId: "ending_signal_lost", 
          risk: "low", 
          requiredStat: "intelligence" 
        }
      ]
    },
    "ending_erased": {
      id: "ending_erased",
      description: "당신에 대한 모든 기록이 주파수 속으로 흡수되었습니다. 이제 당신은 존재한 적 없는 요원입니다.",
      choices: [{ text: "로그 삭제", nextStageId: null, risk: "fatal" }]
    },
    "ending_signal_lost": {
      id: "ending_signal_lost",
      description: "정적이 찾아왔습니다. 통신기는 타버렸고, 당신은 자신의 이름이 무엇인지 잠시 기억해내지 못했습니다.",
      choices: [{ text: "귀환 승인", nextStageId: null, risk: "low", reward: { credits: 10, hp: -10 } }]
    }
  }
};
