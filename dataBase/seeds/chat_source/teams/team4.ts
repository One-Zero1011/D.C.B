
import { ChatConversation } from "../types";

export const TEAM4_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'team4_sticker',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "야! 한규빈! 내 스티커 어디 갔어! 네가 뗐지!", action: "화면을 깜빡거리며" },
      { npcId: 'han_kyubin_staff', text: "...방열구 막지 말라고 했을 텐데. 과열되면 터진다.", action: "조용히 핀셋을 닦으며" },
      { npcId: 'toaster_leader', text: "🖥️ [🌡️ ⬇️ 👍]" },
      { npcId: 'jam_playful', text: "형까지 배신이야?! 내가 저 스티커 구하려고 얼마나 고생했는데! 으아앙! 낙서할 거야!" }
    ]
  },
  {
    id: 'team4_noise',
    teams: ['제4팀'],
    messages: [
      { npcId: 'han_kyubin_staff', text: "잼, 볼륨 30% 줄여. 작업에 방해된다.", action: "귀마개를 하며" },
      { npcId: 'jam_playful', text: "싫어! 싫어! 내 목소리가 얼마나 아름다운데! 에에에엥!", action: "확성기로 사이렌 소리를 냄" },
      { npcId: 'toaster_leader', text: "🖥️ [🔇 MUTE]" },
      { npcId: 'jam_playful', text: "...(입만 벙긋거림) (형 미워! 소리 켜줘!)" },
      { npcId: 'han_kyubin_staff', text: "...평화롭군. 감사합니다 팀장님." }
    ]
  },
  {
    id: 'team4_secret',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "야 규빈아, 너 사실 인간 아니지? 밥 먹는 거 한 번도 못 봤어." },
      { npcId: 'han_kyubin_staff', text: "쓸데없는 소리. 데이터나 정리해.", action: "당황하며 시선을 피함" },
      { npcId: 'jam_playful', text: "수상해~ 수상해~ 형! 쟤 좀 스캔해봐! 엑스레이 찍어보자!", action: "토스터 위에서 방방 뛰며" },
      { npcId: 'toaster_leader', text: "🖥️ [👀 SCANNING...]" },
      { npcId: 'han_kyubin_staff', text: "팀장님까지... 하지 마십시오. 저 퇴근하겠습니다." }
    ]
  }
];
