
export interface ChatScript {
  npcId: string;
  minAffinity: number;
  maxAffinity: number;
  messages: string[];
}

export interface ChatMessageData {
  npcId: string;
  text: string;
  action?: string; // e.g., "한숨을 쉬며", "키보드를 두드리며"
}

export interface ChatConversation {
  id: string;
  teams: string[]; // 어느 팀 채널에서 발생 가능한지 (General은 모두 포함)
  messages: ChatMessageData[];
}
