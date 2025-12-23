import { MBTI, Species } from "../../types";

export const INITIAL_SPECIES_LIST: Species[] = ['인간', '오브젝트 헤드', '수인', '안드로이드', '초월체', '정령'];

export const INITIAL_MBTI_LIST: MBTI[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

export const INITIAL_RELATIONSHIP_TYPES = [
  // 우호/협력
  "친구", "베프", "동료", "파트너", "협력", "신뢰", "호감", "소꿉친구",
  // 적대/경계
  "라이벌", "앙숙", "적", "혐오", "경계", "불신", "무시",
  // 수직/계약
  "상사", "부하", "스승", "제자", "선배", "후배", "주종", "계약", "비즈니스",
  // 애정/가족
  "연인", "짝사랑", "썸", "전애인", "부부", "약혼", "가족", "남매/형제/자매", "부모", "자식",
  // 특수/심리
  "감시", "구원", "집착", "애증", "공범", "운명", "이용", "동경", "실험체/연구원"
];
