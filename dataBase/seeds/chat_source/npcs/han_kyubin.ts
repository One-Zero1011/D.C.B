
import { ChatScript } from "../types";

export const HAN_KYUBIN_SCRIPTS: ChatScript[] = [
  {
    npcId: 'han_kyubin_staff',
    minAffinity: -100, maxAffinity: 29,
    messages: [
      "[System Log] hardware_check.exe running... 방해하지 마십시오.",
      "[System Log] null pointer exception ignored. 버그가 너무 많습니다.",
      "[System Log] cooling_fan_speed: 1200rpm. 과열 주의.",
      "...",
      "저를 보지 마십시오. 저는 기록에 없는 사람입니다."
    ]
  },
  {
    npcId: 'han_kyubin_staff',
    minAffinity: 30, maxAffinity: 69,
    messages: [
      "토스터 팀장님... 선 정리 좀 제발... 제가 정리 강박이 있어서...",
      "잼, 시끄러워. 볼륨 낮춰. 데시벨이 기준치 초과야.",
      "...누가 날 보고 있나? 기분 탓이겠지. 숨어야겠어.",
      "부품이 부족해... 창고 좀 털어야겠어. 비밀입니다.",
      "당신의 장비... 관리가 엉망이군요. 나중에 가져오세요. 손봐드리죠."
    ]
  },
  {
    npcId: 'han_kyubin_staff',
    minAffinity: 70, maxAffinity: 100,
    messages: [
      "당신... 제가 보입니까? 신기하군요. 저를 인식하다니.",
      "이 메시지는 당신에게만 보이는 겁니다. 비밀 채널이죠. 보안 등급 A.",
      "당신의 데이터는... 꽤 아름다운 구조를 가지고 있군요. 보존하고 싶습니다.",
      "제가 그림자 속에 숨어있어도, 당신만은 저를 찾아내는군요. 나쁘지 않네요.",
      "토스터 팀장님 다음으로... 당신이 편합니다."
    ]
  }
];
