
import { NPC, DialogueNode } from '../npc/types';
import { KANG_NPC, KANG_DIALOGUES } from '../npc/kang';
import { CHOI_NPC, CHOI_DIALOGUES } from '../npc/choi';
import { TOASTER_NPC, TOASTER_DIALOGUES } from '../npc/toaster';
import { JAM_NPC, JAM_DIALOGUES } from '../npc/jam';

// Re-export types for use in other parts of the app
export * from '../npc/types';

export const INITIAL_NPCS: NPC[] = [
  KANG_NPC,
  CHOI_NPC,
  TOASTER_NPC,
  JAM_NPC
];

export const NPC_DIALOGUES: Record<string, DialogueNode[]> = {
  [KANG_NPC.id]: KANG_DIALOGUES,
  [CHOI_NPC.id]: CHOI_DIALOGUES,
  [TOASTER_NPC.id]: TOASTER_DIALOGUES,
  [JAM_NPC.id]: JAM_DIALOGUES
};
