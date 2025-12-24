
import { Mission } from "../../types";

/*
  [ 미션 설계 가이드 ]
  - Mission: 하나의 큰 테마 (예: 호텔, 비디오 테이프)
  - Stage: 테마 내의 구체적인 장소나 상황
  - Choice: 사용자가 고를 수 있는 선택지
    - nextStageId: 다음으로 이동할 Stage ID (null이면 미션 종료)
*/

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: "mission_hotel_glitch",
    title: "심해 호텔 404호",
    description: "오래된 연애 시뮬레이션 게임의 배경인 호텔. 404호실은 데이터에 존재하지 않아야 합니다. 하지만 문이 열려있습니다.",
    initialStageId: "stage_entry",
    /*
      [ Flow Chart: 심해 호텔 ]
      stage_entry (복도)
       ├─ [진입] ─> stage_room_404 (얼굴 없는 여자) ──> [임무 종료]
       └─ [조사] ─> stage_menu (메뉴판/손) 
                      ├─ [전투] ─> stage_corridor_chase (추격전) ──> [임무 종료]
                      └─ [대화] ─> stage_polite_exit (정중한 퇴장) ──> [임무 종료]
    */
    stages: {
      "stage_entry": {
        id: "stage_entry",
        description: "당신은 호텔 복도에 서 있습니다. 텍스처가 깨진 붉은 카펫이 끝없이 이어집니다. 404호 문틈으로 '치직거리는 소리'가 새어 나옵니다. 룸서비스 카트가 혼자 벽에 부딪히고 있습니다.",
        choices: [
          { 
            text: "무시하고 404호로 진입한다.", 
            nextStageId: "stage_room_404", // [이동] -> 404호 내부 (방 안의 여자)
            risk: "high", 
            requiredStat: "strength" 
          },
          { 
            text: "룸서비스 카트의 메뉴판을 확인한다.", 
            nextStageId: "stage_menu", // [이동] -> 메뉴판 확인 (기괴한 손 등장)
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
            nextStageId: "stage_corridor_chase", // [이동] -> 복도 추격전 (전투 상황)
            risk: "high", 
            requiredStat: "strength" 
          },
          { 
            text: "정중하게 '주문하지 않았습니다'라고 말한다.", 
            nextStageId: "stage_polite_exit", // [이동] -> 평화로운 퇴장 (로비로 귀환)
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
          intensity: 7,          // 증식 속도 증가
          duration: 2800,        // 2.8초간 지속
          color: "text-red-600",  // 붉은색 텍스트
          fontSize: 'text-[15px]'
        },
        choices: [
          { 
            text: "내 얼굴 데이터를 복사해서 준다.", 
            nextStageId: null, // [임무 종료] -> 정신적 피해가 큼, 보상 높음
            risk: "fatal", 
            reward: { sanity: -20, credits: 10 } 
          },
          { 
            text: "거울을 깨버린다.", 
            nextStageId: null, // [임무 종료] -> 물리적 위협 제거, 일반 보상
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
          customEmojis: ["👁️"], // 출력할 이모지 리스트
          intensity: 10,        // 나타날 개수 조절
          duration: 4000,
          minEmojiSize: 100,     // px 단위
          maxEmojiSize: 180     // px 단위
        },
        choices: [
          { 
            text: "뒤돌아보지 않고 달린다.", 
            nextStageId: null, // [임무 종료] -> 단순 탈출
            risk: "low", 
            reward: { credits: 3 } 
          },
          { 
            text: "맞서 싸운다.", 
            nextStageId: null, // [임무 종료] -> 부상 위험, 전투 보상
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
            nextStageId: null, // [임무 종료] -> 가장 안전한 클리어
            risk: "low", 
            reward: { sanity: 5, credits: 5 } 
          }
        ]
      }
    }
  },
  {
    id: "mission_vhs_tape",
    title: "1999년의 교육용 비디오",
    description: "화질이 손상된 교육용 비디오 속에 갇혔습니다. 진행자는 웃고 있지만 눈을 깜빡이지 않습니다. '올바른 인간'이 되는 법을 가르치려 합니다.",
    initialStageId: "stage_intro",
    /*
      [ Flow Chart: 교육용 비디오 ]
      stage_intro (TV 시작)
       ├─ [대답] ─> stage_lecture (세뇌 강의)
       │              ├─ [순종] ─> stage_compliance (강제 수료) ──> [임무 종료]
       │              └─ [침묵] ─> stage_silence (시스템 공격) ──> [임무 종료]
       └─ [거부] ─> stage_resistance (전원 차단 시도) ──> [임무 종료]
    */
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
            nextStageId: "stage_lecture", // [이동] -> 기괴한 강의 (세뇌 시작)
            risk: "low", 
            requiredStat: "sanity" 
          },
          { 
            text: "TV 전원을 끄려고 시도한다.", 
            nextStageId: "stage_resistance", // [이동] -> 물리적 저항 (TV와의 싸움)
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
            nextStageId: "stage_compliance", // [이동] -> 비정상적 클리어 (합격 도장)
            risk: "low", 
            requiredStat: "sanity" 
          },
          { 
            text: "침묵을 유지한다.", 
            nextStageId: "stage_silence", // [이동] -> 시스템의 분노 (강제 교정)
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
            nextStageId: null, // [임무 종료] -> 소액 보상
            risk: "low", 
            reward: { credits: 2 } 
          },
          { 
            text: "비디오 테이프를 강제로 꺼낸다.", 
            nextStageId: null, // [임무 종료] -> 큰 부상, 높은 보상
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
            nextStageId: null, // [임무 종료] -> 미션 성공
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
            nextStageId: null, // [임무 종료] -> 미션 실패에 가까운 결과
            risk: "fatal", 
            reward: { sanity: -30, hp: -20, credits: 0 } 
          }
        ]
      }
    }
  }
];
