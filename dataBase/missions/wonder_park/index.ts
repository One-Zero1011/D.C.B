
import { Mission } from "../../../types";

export const mission_wonder_park: Mission = {
  id: "mission_wonder_park",
  title: "원더-글리치 랜드",
  description: "행복을 시뮬레이션하는 게임인 '원더 월드' 시스템이 오염되었습니다. 마스코트들은 관람객을 데이터로 분해하여 어트랙션에 이식하고 있습니다.",
  initialStageId: "stage_wonder_gate",
  stages: {
    "stage_wonder_gate": {
      id: "stage_wonder_gate",
      description: "환영의 문이 일그러진 채 요원들을 맞이합니다. 거대한 솜사탕 구름이 정전기를 내뿜으며 하늘을 덮고 있습니다.",
      visualEffect: {
        text: "WELCOME TO HELL-P!",
        type: "neon_flicker",
        color: "text-pink-500",
        duration: 3500,
        intensity: 8
      },
      choices: [
        { 
          text: "가장 화려해 보이는 '회전목마' 구역으로 진입한다.", 
          nextStageId: "stage_merry_go_round", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "비명소리가 들리는 '롤러코스터' 선로를 따라간다.", 
          nextStageId: "stage_roller_coaster", 
          risk: "high", 
          requiredStat: "strength" 
        }
      ]
    },
    "stage_merry_go_round": {
      id: "stage_merry_go_round",
      description: "목마들이 살점과 코드로 뒤섞여 괴기하게 비틀거립니다. 목마를 탄 관람객들의 얼굴이 데이터 노이즈로 지워져 있습니다.",
      visualEffect: {
        text: "🎶 DON'T STOP THE RIDE 🎶",
        type: "hypnotic_loop",
        duration: 4000,
        color: "text-red-500",
        fontSize: "text-4xl"
      },
      choices: [
        { 
          text: "목마들의 전원 플러그를 강제로 뽑는다.", 
          nextStageId: "stage_mascot_hell", 
          risk: "high", 
          requiredStat: "strength" 
        },
        { 
          text: "이 리듬에 맞춰 춤을 추며 코어에 접근한다.", 
          nextStageId: "ending_ride_forever", 
          risk: "fatal", 
          requiredStat: "sanity" 
        }
      ]
    },
    "stage_roller_coaster": {
      id: "stage_roller_coaster",
      description: "선로가 허공에서 끊어져 픽셀 단위로 흩어집니다. 중력이 역전되어 요원들의 몸이 하늘로 솟구치려 합니다.",
      visualEffect: {
        text: "PHYSICS_MELTDOWN",
        type: "pixel_meltdown",
        color: "text-blue-400",
        duration: 3000
      },
      choices: [
        { 
          text: "끊어진 선로를 코드로 재구축하며 전진한다.", 
          nextStageId: "stage_mascot_hell", 
          risk: "low", 
          requiredStat: "sanity" 
        },
        { 
          text: "중력 엔진 자체를 파괴하여 추락한다.", 
          nextStageId: "ending_system_purge", 
          risk: "fatal", 
          reward: { hp: -30 } 
        }
      ]
    },
    "stage_mascot_hell": {
      id: "stage_mascot_hell",
      description: "공원의 주인 '삐에로 픽셀'이 나타납니다. 그의 몸은 거대한 에러 메시지 덩어리입니다. \"퇴장은 유료입니다, 요원님!\"",
      visualEffect: {
        text: "HAHAHAHAHAHAHAHA",
        type: "flood",
        intensity: 9,
        speed: 40
      },
      choices: [
        { 
          text: "삐에로의 코어에 안티-바이러스를 주입한다.", 
          nextStageId: "ending_successful_debug", 
          risk: "high", 
          requiredStat: "strength" 
        },
        { 
          text: "그의 유머에 맞춰 억지로 웃어준다.", 
          nextStageId: "ending_data_corruption", 
          risk: "fatal", 
          reward: { sanity: -40 } 
        }
      ]
    },
    "ending_successful_debug": {
      id: "ending_successful_debug",
      description: "놀이공원의 텍스처가 정상으로 돌아옵니다. 요원들은 '무료 이용권' 데이터를 획득하고 안전하게 귀환합니다.",
      choices: [
        { text: "작전 종료 보고", nextStageId: null, risk: "low", reward: { credits: 20, sanity: 10 } }
      ]
    },
    "ending_ride_forever": {
      id: "ending_ride_forever",
      description: "요원은 이제 회전목마의 가장 아름다운 말(Horse)이 되었습니다. 영원히 멈추지 않는 즐거움 속에서 로그가 중단됩니다.",
      visualEffect: { text: "INTEGRATION_COMPLETE", type: "pixel_meltdown", color: "text-white" },
      choices: [
        { text: "데이터 귀속 수락", nextStageId: null, risk: "fatal", reward: { hp: -999, sanity: -999 } }
      ]
    },
    "ending_system_purge": {
      id: "ending_system_purge",
      description: "공원 전체가 '휴지통'으로 전송되었습니다. 아무것도 남지 않은 공허 속에서 요원은 구사일생으로 구조됩니다.",
      choices: [
        { text: "빈손으로 복귀", nextStageId: null, risk: "high", reward: { credits: 0, sanity: -20 } }
      ]
    },
    "ending_data_corruption": {
      id: "ending_data_corruption",
      description: "웃음이 멈추지 않습니다. 요원의 정신 데이터는 이제 삐에로의 일부가 되어 다른 요원을 사냥할 것입니다.",
      visualEffect: { text: "YOU_ARE_THE_JOKE", type: "neon_flicker", color: "text-yellow-400" },
      choices: [
        { text: "자아 상실", nextStageId: null, risk: "fatal", reward: { sanity: -100, hp: -50 } }
      ]
    }
  }
};
