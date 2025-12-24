import { Mission } from "../../../types";

export const mission_hotel_glitch: Mission = {
  id: "mission_hotel_glitch",
  title: "심해 호텔 404호",
  description: "오래된 연애 시뮬레이션 게임의 배경인 호텔. 404호실은 데이터에 존재하지 않아야 합니다. 하지만 문이 열려있습니다.",
  initialStageId: "stage_entry",
  stages: {
    "stage_entry": {
      id: "stage_entry",
      description: "당신은 호텔 복도에 서 있습니다. 텍스처가 깨진 붉은 카펫이 끝없이 이어집니다. 404호 문틈으로 '치직거리는 소리'가 새어 나옵니다. 룸서비스 카트가 혼자 벽에 부딪히고 있습니다.",
      choices: [
        { 
          text: "무시하고 404호로 진입한다.", 
          nextStageId: "stage_room_404", 
          risk: "high", 
          requiredStat: "strength" 
        },
        { 
          text: "룸서비스 카트의 메뉴판을 확인한다.", 
          nextStageId: "stage_menu", 
          risk: "low", 
          requiredStat: "sanity" 
        }
      ]
    },
    "stage_menu": {
      id: "stage_menu",
      description: "메뉴판에는 알 수 없는 문자가 가득합니다. '오늘의 요리: 당신의 눈알 수프'. 갑자기 카트 밑에서 손이 튀어나와 당신의 발목을 잡습니다.",
      choices: [
        { 
          text: "손을 밟아 으깨버린다.", 
          nextStageId: "stage_corridor_chase", 
          risk: "high", 
          requiredStat: "strength" 
        },
        { 
          text: "정중하게 '주문하지 않았습니다'라고 말한다.", 
          nextStageId: "stage_polite_exit", 
          risk: "low", 
          requiredStat: "sanity" 
        }
      ]
    },
    "stage_room_404": {
      id: "stage_room_404",
      description: "방 안에는 얼굴이 없는 여자가 거울을 보고 있습니다. 거울 속의 얼굴은 당신을 보고 웃고 있습니다. 그녀가 묻습니다.",
      visualEffect: {
        text: "나를 봐 나를 봐 나를 봐",
        type: "flood",
        intensity: 7,
        duration: 2800,
        color: "text-red-600",
        fontSize: 'text-[15px]'
      },
      choices: [
        { 
          text: "내 얼굴 데이터를 복사해서 준다.", 
          nextStageId: null, 
          risk: "fatal", 
          reward: { sanity: -20, credits: 10 } 
        },
        { 
          text: "거울을 깨버린다.", 
          nextStageId: null, 
          risk: "high", 
          reward: { sanity: -5, credits: 5 } 
        }
      ]
    },
    "stage_corridor_chase": {
      id: "stage_corridor_chase",
      description: "손 주인인 '텍스처 뭉치'가 비명을 지르며 쫓아옵니다. 복도가 길어집니다. 현실적인 물리 법칙이 적용되지 않습니다.",
      visualEffect: {
        text: "...",
        type: 'emojiPopUp',
        customEmojis: ["👁️"],
        intensity: 10,
        duration: 4000,
        minEmojiSize: 100,
        maxEmojiSize: 180
      },
      choices: [
        { 
          text: "뒤돌아보지 않고 달린다.", 
          nextStageId: null, 
          risk: "low", 
          reward: { credits: 3 } 
        },
        { 
          text: "맞서 싸운다.", 
          nextStageId: null, 
          risk: "high", 
          reward: { hp: -10, credits: 8 } 
        }
      ]
    },
    "stage_polite_exit": {
      id: "stage_polite_exit",
      description: "손이 멈칫하더니, '아, 실례했습니다'라는 텍스트 박스를 띄우고 사라집니다. 당신은 안전하게 로비로 텔레포트 됩니다.",
      choices: [
        { 
          text: "임무 완료 보고를 한다.", 
          nextStageId: null, 
          risk: "low", 
          reward: { sanity: 5, credits: 5 } 
        }
      ]
    }
  }
};