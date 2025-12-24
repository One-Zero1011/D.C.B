import { Mission } from "../../../types";

export const mission_vhs_tape: Mission = {
  id: "mission_vhs_tape",
  title: "1999년의 교육용 비디오",
  description: "화질이 손상된 교육용 비디오 속에 갇혔습니다. 진행자는 웃고 있지만 눈을 깜빡이지 않습니다. '올바른 인간'이 되는 법을 가르치려 합니다.",
  initialStageId: "stage_intro",
  stages: {
    "stage_intro": { 
      id: "stage_intro",
      description: "치직거리는 화면. 진행자 '미스터 스마일'이 묻습니다. \"친구들! 밤에 달을 보면 안 되는 이유를 알고 있나요?\"",
      visualEffect : {
        text: "친구들! 밤에 달을 보면 안 되는 이유를 알고 있나요?",
        type: "vhs_glitch",
        fontSize: "text-2xl"
      },
      choices: [
        { 
          text: "모른다고 대답한다.", 
          nextStageId: "stage_lecture", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "TV 전원을 끄려고 시도한다.", 
          nextStageId: "stage_resistance", 
          risk: "high", 
          requiredStat: "strength" 
        }
      ]
    },
    "stage_lecture": {
      id: "stage_lecture",
      description: "미스터 스마일의 입이 귀까지 찢어집니다. \"달은 눈이거든요! 우리를 감시하는 눈! 자, 따라 해보세요.\"",
      visualEffect: {
        text: "OBEY OBEY OBEY",
        type: "error",
        duration: 2000,
        intensity: 5,
        color: "text-neutral-50",
        fontSize: "text-4xl"
      },
      choices: [
        { 
          text: "\"나는 고기가 아니다\"라고 따라 한다.", 
          nextStageId: "stage_compliance", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "침묵을 유지한다.", 
          nextStageId: "stage_silence", 
          risk: "high", 
          reward: { sanity: -10 } 
        }
      ]
    },
    "stage_resistance": {
      id: "stage_resistance",
      description: "전원 버튼이 손가락을 물어뜯으려 합니다. 화면 속에서 검은 액체가 흘러나옵니다.",
      choices: [
        { 
          text: "액체를 피해 도망친다.", 
          nextStageId: null, 
          risk: "low", 
          reward: { credits: 2 } 
        },
        { 
          text: "비디오 테이프를 강제로 꺼낸다.", 
          nextStageId: null, 
          risk: "high", 
          reward: { hp: -15, credits: 10 } 
        }
      ]
    },
    "stage_compliance": {
      id: "stage_compliance",
      description: "화면이 정상으로 돌아옵니다. \"참 잘했어요! 다음 시간에 만나요.\" 화면이 꺼집니다. 당신의 손등에 '합격' 도장이 찍혀있습니다.",
      choices: [
        { 
          text: "불쾌하지만 복귀한다.", 
          nextStageId: null, 
          risk: "low", 
          reward: { sanity: -5, credits: 7 } 
        }
      ]
    },
    "stage_silence": {
      id: "stage_silence",
      description: "진행자의 얼굴이 클로즈업됩니다. 노이즈가 시야를 가립니다. \"나쁜 아이는 교정이 필요해요.\" 정신이 아득해집니다.",
      visualEffect: {
        text: "FATAL ERROR",
        type: "system_crash",
        duration: 4000,
        intensity: 10,
        color: "text-red-500",
        fontSize: "text-6xl"
      },
      choices: [
        { 
          text: "정신을 잃는다.", 
          nextStageId: null, 
          risk: "fatal", 
          reward: { sanity: -30, hp: -20, credits: 0 } 
        }
      ]
    }
  }
};