
import { Mission } from "../../types";
import { mission_hotel_glitch } from "../missions/hotel_glitch/index";
import { mission_vhs_tape } from "../missions/vhs_tape/index";
import { mission_wonder_park } from "../missions/wonder_park/index";
import { mission_abyss_morality } from "../missions/abyss_morality/index";
import { mission_pixel_harvest } from "../missions/pixel_harvest/index";

/**
 * [ 미션 통합 관리 ]
 * 각 미션 폴더에서 정의된 데이터를 배열로 묶어 시스템에 공급합니다.
 */
export const INITIAL_MISSIONS: Mission[] = [
  mission_hotel_glitch,
  mission_vhs_tape,
  mission_wonder_park,
  mission_abyss_morality,
  mission_pixel_harvest
];
