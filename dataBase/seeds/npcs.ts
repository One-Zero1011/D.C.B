
import { NPC, DialogueNode } from '../npc/types';
import { KANG_NPC, KANG_DIALOGUES } from '../npc/kang';
import { CHOI_NPC, CHOI_DIALOGUES } from '../npc/choi';
import { BAEK_NPC, BAEK_DIALOGUES } from '../npc/baek';
import { TOASTER_NPC, TOASTER_DIALOGUES } from '../npc/toaster';
import { JAM_NPC, JAM_DIALOGUES } from '../npc/jam';

// 신규 사원들
import { LEE_JUN_NPC, LEE_JUN_DIALOGUES } from '../npc/lee_jun';
import { PARK_TAEWOO_NPC, PARK_TAEWOO_DIALOGUES } from '../npc/park_taewoo';
import { SA_HEOK_NPC, SA_HEOK_DIALOGUES } from '../npc/sa_heok';
import { HAN_KYUBIN_NPC, HAN_KYUBIN_DIALOGUES } from '../npc/han_kyubin';

// Re-export types for use in other parts of the app
export * from '../npc/types';

export const INITIAL_NPCS: NPC[] = [
  KANG_NPC,
  LEE_JUN_NPC,
  CHOI_NPC,
  PARK_TAEWOO_NPC,
  BAEK_NPC,
  SA_HEOK_NPC,
  TOASTER_NPC,
  JAM_NPC,
  HAN_KYUBIN_NPC
];

export const NPC_DIALOGUES: Record<string, DialogueNode[]> = {
  [KANG_NPC.id]: KANG_DIALOGUES,
  [LEE_JUN_NPC.id]: LEE_JUN_DIALOGUES,
  [CHOI_NPC.id]: CHOI_DIALOGUES,
  [PARK_TAEWOO_NPC.id]: PARK_TAEWOO_DIALOGUES,
  [BAEK_NPC.id]: BAEK_DIALOGUES,
  [SA_HEOK_NPC.id]: SA_HEOK_DIALOGUES,
  [TOASTER_NPC.id]: TOASTER_DIALOGUES,
  [JAM_NPC.id]: JAM_DIALOGUES,
  [HAN_KYUBIN_NPC.id]: HAN_KYUBIN_DIALOGUES
};
