
import { MBTI } from "../../types";
import { hotel_glitch_reactions } from "../missions/hotel_glitch/reactions";
import { vhs_tape_reactions } from "../missions/vhs_tape/reactions";
import { wonder_park_reactions } from "../missions/wonder_park/reactions";
import { abyss_morality_reactions } from "../missions/abyss_morality/reactions";
import { pixel_harvest_reactions } from "../missions/pixel_harvest/reactions";

/**
 * [ 미션 스테이지별 반응 데이터 타입 ]
 * MissionID -> StageID -> MBTI -> Dialogue[]
 */
export type StageReactions = Record<MBTI, string[]>;
export type MissionStageReactions = Record<string, StageReactions>;

export const MISSION_REACTIONS: Record<string, MissionStageReactions> = {
  "mission_hotel_glitch": hotel_glitch_reactions,
  "mission_vhs_tape": vhs_tape_reactions,
  "mission_wonder_park": wonder_park_reactions,
  "mission_abyss_morality": abyss_morality_reactions,
  "mission_pixel_harvest": pixel_harvest_reactions
};
