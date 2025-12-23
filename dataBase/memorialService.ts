
import { Character } from "../types";
import { MEMORIAL_TEMPLATES } from "./seeds/memorialScripts";

/**
 * 죽은 캐릭터를 위한 가장 적절한 추모 문구를 생성합니다.
 * @param deceased 사망한 요원
 * @param allCharacters 전체 요원 리스트
 */
export function generateMemorialScript(deceased: Character, allCharacters: Character[]): string {
  const survivors = allCharacters.filter(c => c.status !== '사망');
  
  // 가장 강한 감정적 연결을 가진 생존자 찾기 (절대값 기준)
  let bestConnector: Character | null = null;
  let maxAffinity = -1;

  survivors.forEach(s => {
    const aff = Math.abs(s.affinities[deceased.id] || 0);
    if (aff > maxAffinity) {
      maxAffinity = aff;
      bestConnector = s;
    }
  });

  const affinityVal = bestConnector ? (bestConnector.affinities[deceased.id] || 0) : 0;
  const isPositive = affinityVal > 30;
  const isNegative = affinityVal < -30;

  let condition: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (isPositive) condition = 'positive';
  else if (isNegative) condition = 'negative';

  const mbtiFOrT = bestConnector ? (bestConnector.mbti[2] as 'F' | 'T') : 'any';

  // 조건에 맞는 템플릿 필터링
  const possibleTemplates = MEMORIAL_TEMPLATES.filter(t => 
    t.condition === condition && (t.mbtiType === 'any' || t.mbtiType === mbtiFOrT)
  );

  const finalTemplate = possibleTemplates[Math.floor(Math.random() * possibleTemplates.length)];
  const randomScript = finalTemplate.scripts[Math.floor(Math.random() * finalTemplate.scripts.length)];

  const formattedScript = randomScript.replace('%NAME%', deceased.name);

  if (bestConnector && condition !== 'neutral') {
    return `${bestConnector.name}의 한마디: "${formattedScript}"`;
  }

  return formattedScript;
}
