
import { Character } from "../types";
import { MEMORIAL_TEMPLATES } from "./seeds/memorialScripts";

/**
 * 떠난 요원을 위해 가장 적절한 '생존한 동료'의 한마디를 생성합니다.
 * @param deceased 사망한 요원
 * @param allCharacters 전체 요원 리스트
 */
export function generateMemorialScript(deceased: Character, allCharacters: Character[]): string {
  // 1. 생존자 목록 필터링
  const survivors = allCharacters.filter(c => c.status === '생존' && c.id !== deceased.id);
  
  if (survivors.length === 0) {
    return "[시스템 알림]: 남겨진 생존자가 없어 작전 로그가 자동으로 종결되었습니다.";
  }

  // 2. 가장 관계가 깊은(호감도 절대값이 높은) 생존자 찾기
  let bestConnector: Character | null = null;
  let maxAffinity = -1;

  survivors.forEach(s => {
    // 본인이 사망자에게 느끼는 호감도 확인
    const aff = Math.abs(s.affinities[deceased.id] || 0);
    if (aff > maxAffinity) {
      maxAffinity = aff;
      bestConnector = s;
    }
  });

  // 만약 모든 생존자와 관계가 0이라면 랜덤하게 한 명 선택
  if (!bestConnector || maxAffinity === 0) {
    bestConnector = survivors[Math.floor(Math.random() * survivors.length)];
  }

  const affinityVal = bestConnector.affinities[deceased.id] || 0;
  
  // 3. 관계 상태 결정
  let condition: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (affinityVal >= 10) condition = 'positive';
  else if (affinityVal <= -10) condition = 'negative';

  // 4. 발화자의 성향(T/F) 파악
  const mbtiFOrT = bestConnector.mbti[2] as 'F' | 'T';

  // 5. 조건에 맞는 템플릿 필터링
  let possibleTemplates = MEMORIAL_TEMPLATES.filter(t => 
    t.condition === condition && (t.mbtiType === 'any' || t.mbtiType === mbtiFOrT)
  );

  // 조건에 맞는 게 없을 경우 중립 템플릿으로 대체
  if (possibleTemplates.length === 0) {
    possibleTemplates = MEMORIAL_TEMPLATES.filter(t => t.condition === 'neutral');
  }

  const finalTemplate = possibleTemplates[Math.floor(Math.random() * possibleTemplates.length)];
  const randomScript = finalTemplate.scripts[Math.floor(Math.random() * finalTemplate.scripts.length)];

  // 6. 이름 치환 및 발화자 명시
  const formattedScript = randomScript.replace('%NAME%', deceased.name);

  return `${bestConnector.name}의 마지막 메시지: "${formattedScript}"`;
}
