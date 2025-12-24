
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
      { npcId: 'toaster_leader', text: "🖥️ [🔇 🛑]" },
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
      { npcId: 'toaster_leader', text: "🖥️ [👀 🔍 ❓]" },
      { npcId: 'han_kyubin_staff', text: "팀장님까지... 하지 마십시오. 저 퇴근하겠습니다." }
    ]
  },
  {
    id: 'team4_repair',
    teams: ['제4팀'],
    messages: [
      { npcId: 'han_kyubin_staff', text: "토스터 팀장님, 메인보드 먼지 제거하겠습니다. 잠시 전원 끄겠습니다.", action: "에어 스프레이를 들며" },
      { npcId: 'jam_playful', text: "안 돼! 형 자면 나 심심하단 말야! 나랑 놀아줘!", action: "한규빈 팔에 매달리며" },
      { npcId: 'han_kyubin_staff', text: "비켜. 정비 안 하면 형 아파. 너 때문에 과열된 거야.", action: "잼을 떼어내며" },
      { npcId: 'jam_playful', text: "히잉... 그럼 빨리 끝내! 1분 안에 끝내! 카운트한다!" }
    ]
  },
  {
    id: 'team4_candy',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "규빈아~ 나 사탕 사줘! 딸기맛으로!", action: "애교 부리며" },
      { npcId: 'han_kyubin_staff', text: "넌 입도 없잖아. 사탕 먹지도 못하면서 왜 사달래.", action: "무시하며 작업 중" },
      { npcId: 'jam_playful', text: "관상용이야! 예쁜 거 보고 있으면 기분이 좋단 말야! 사줘 사줘!", action: "바닥을 구르며 떼쓰기" },
      { npcId: 'toaster_leader', text: "🖥️ [🍬 💸 👌]" },
      { npcId: 'han_kyubin_staff', text: "...팀장님이 사주라고 하시니 사옵니다. 다음부턴 없습니다." }
    ]
  },
  {
    id: 'team4_ghost',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "으악! 서버실 구석에 귀신 있어! 봤어! 하얀 소복 입은 귀신!", action: "토스터 뒤로 숨으며" },
      { npcId: 'han_kyubin_staff', text: "그거 내가 널어놓은 작업복이다. 호들갑 떨지 마.", action: "한숨 쉬며" },
      { npcId: 'jam_playful', text: "아 뭐야~ 규빈이 너 옷 좀 빨아 입어! 귀신인 줄 알았잖아!", action: "안도하며 다시 나옴" },
      { npcId: 'toaster_leader', text: "🖥️ [👻 ❗]" },
      { npcId: 'jam_playful', text: "꺄악! 형까지 놀리지 마! 나 진짜 무서웠다고!" }
    ]
  },
  {
    id: 'team4_prank',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "규빈아, 내가 네 공구함 정리해줬어! 잘했지?", action: "뿌듯한 표정" },
      { npcId: 'han_kyubin_staff', text: "...드라이버랑 펜치를 섞어놨군. 이게 정리냐, 테러지.", action: "뒷목을 잡으며" },
      { npcId: 'jam_playful', text: "색깔별로 모은 거야! 예쁘잖아! 예술 점수 100점!", action: "도망갈 준비" },
      { npcId: 'han_kyubin_staff', text: "거기 서. 오늘 너 분해해서 다시 조립한다." }
    ]
  },
  {
    id: 'team4_battery',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "형... 나 배고파... 배터리가 10% 남았어...", action: "화면이 깜빡거리며 힘없는 목소리" },
      { npcId: 'han_kyubin_staff', text: "그러게 아까 게임 작작 하라고 했지. 이리 와, 충전기 꼽아줄게.", action: "충전 케이블을 연결하며" },
      { npcId: 'jam_playful', text: "규빈이 너... 의외로 착하네... 고마워... zzz...", action: "충전되자마자 잠듦" },
      { npcId: 'toaster_leader', text: "🖥️ [❤️ 🙏]" },
      { npcId: 'han_kyubin_staff', text: "팀장님도 충전하셔야죠. 두 분 다 손이 많이 가는군요." }
    ]
  },
  {
    id: 'team4_virus',
    teams: ['제4팀'],
    messages: [
      { npcId: 'toaster_leader', text: "🖥️ [⚠️ 🦠 🚫]" },
      { npcId: 'han_kyubin_staff', text: "외부 침입입니다. 방화벽 올리고 네트워크 차단하겠습니다.", action: "빠르게 키보드를 두드리며" },
      { npcId: 'jam_playful', text: "어떤 놈이야! 감히 우리 형을 공격해? 내가 다 해킹해서 혼내줄 거야!", action: "화면이 붉게 변하며 전투 모드" },
      { npcId: 'han_kyubin_staff', text: "잼, 너는 가만히 있어. 트래픽만 늘어나. 내가 처리한다." },
      { npcId: 'jam_playful', text: "흥! 규빈이 너 믿어볼게! 지면 가만 안 둬!" }
    ]
  },
  {
    id: 'team4_upgrade',
    teams: ['제4팀'],
    messages: [
      { npcId: 'han_kyubin_staff', text: "팀장님, 그래픽 카드 업그레이드 부품 구했습니다. 장착하시겠습니까?", action: "새 부품을 보여주며" },
      { npcId: 'toaster_leader', text: "🖥️ [✨ 🤩]" },
      { npcId: 'jam_playful', text: "와! 형 이제 4K 화질 되는 거야? 나도 나도! 나도 업그레이드해줘!", action: "방방 뛰며" },
      { npcId: 'han_kyubin_staff', text: "네 부품은 없어. 넌 저해상도 픽셀이 매력이야. 그냥 살아." },
      { npcId: 'jam_playful', text: "뭐야! 차별이야! 나 삐질 거야! 흥!" }
    ]
  },
  {
    id: 'team4_music',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "오늘의 노동요는 데스메탈이다! 소리 질러!", action: "음악을 최대 볼륨으로 틈" },
      { npcId: 'han_kyubin_staff', text: "꺼. 집중 안 돼. 클래식으로 바꿔.", action: "미간을 찌푸리며" },
      { npcId: 'toaster_leader', text: "🖥️ [🎵 🎧 😌]" },
      { npcId: 'jam_playful', text: "아 뭐야~ 형 재미없게! 알았어, 형이 원하니까 바꿔준다." },
      { npcId: 'han_kyubin_staff', text: "(안도) 감사합니다 팀장님. 귀가 터질 뻔했습니다." }
    ]
  },
  {
    id: 'team4_existence',
    teams: ['제4팀'],
    messages: [
      { npcId: 'jam_playful', text: "야 규빈아, 너 진짜 유령 아니지? 왜 사람들 눈에 안 띄어?", action: "의심스러운 눈초리" },
      { npcId: 'han_kyubin_staff', text: "눈에 띄어봤자 귀찮은 일만 늘어나. 기계들이랑 있는 게 편해.", action: "담담하게" },
      { npcId: 'toaster_leader', text: "🖥️ [🤝 🏠]" },
      { npcId: 'jam_playful', text: "형이 우린 가족이래! 그래, 규빈이 너 우리 집 요정 해라!", action: "깔깔 웃으며" },
      { npcId: 'han_kyubin_staff', text: "...가족이라. 나쁘지 않군요. 요정은 빼고." }
    ]
  }
];
