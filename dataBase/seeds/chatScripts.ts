
import { ChatScript, ChatConversation } from "./chat_source/types";

// Individual NPC Scripts
import { KANG_SCRIPTS } from "./chat_source/npcs/kang";
import { LEE_JUN_SCRIPTS } from "./chat_source/npcs/lee_jun";
import { CHOI_SCRIPTS } from "./chat_source/npcs/choi";
import { PARK_TAEWOO_SCRIPTS } from "./chat_source/npcs/park_taewoo";
import { BAEK_SCRIPTS } from "./chat_source/npcs/baek";
import { SA_HEOK_SCRIPTS } from "./chat_source/npcs/sa_heok";
import { TOASTER_JAM_SCRIPTS } from "./chat_source/npcs/toaster_jam";
import { HAN_KYUBIN_SCRIPTS } from "./chat_source/npcs/han_kyubin";

// Team Conversations
import { TEAM1_CONVERSATIONS } from "./chat_source/teams/team1";
import { TEAM2_CONVERSATIONS } from "./chat_source/teams/team2";
import { TEAM3_CONVERSATIONS } from "./chat_source/teams/team3";
import { TEAM4_CONVERSATIONS } from "./chat_source/teams/team4";
import { GENERAL_CONVERSATIONS } from "./chat_source/teams/general";

// Re-export types
export * from "./chat_source/types";

// Aggregated Individual Scripts
export const CHAT_SCRIPTS: ChatScript[] = [
  ...KANG_SCRIPTS,
  ...LEE_JUN_SCRIPTS,
  ...CHOI_SCRIPTS,
  ...PARK_TAEWOO_SCRIPTS,
  ...BAEK_SCRIPTS,
  ...SA_HEOK_SCRIPTS,
  ...TOASTER_JAM_SCRIPTS,
  ...HAN_KYUBIN_SCRIPTS
];

// Aggregated Conversations
export const CHAT_CONVERSATIONS: ChatConversation[] = [
  ...TEAM1_CONVERSATIONS,
  ...TEAM2_CONVERSATIONS,
  ...TEAM3_CONVERSATIONS,
  ...TEAM4_CONVERSATIONS,
  ...GENERAL_CONVERSATIONS
];
