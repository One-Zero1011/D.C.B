
import { Character, LogEntry } from '../types';
import { db } from '../dataBase/manager';
import { 
  determineEventType, 
  applyPhysicalDamage, 
  resolveAnomalyOutcome, 
  resolveInteractionOutcome,
  SIMULATION_CONSTANTS
} from '../dataBase/simulationRules';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const uid = () => Math.random().toString(36).substr(2, 9);

export const processTurn = (characters: Character[]): { updatedCharacters: Character[]; newLogs: LogEntry[] } => {
  const aliveCharacters = characters.filter(c => c.status === '생존');
  if (aliveCharacters.length === 0) return { updatedCharacters: characters, newLogs: [] };

  const actor = pick(aliveCharacters);
  let updatedActor = { ...actor };
  const others = aliveCharacters.filter(c => c.id !== actor.id);
  
  // 상호작용 대상 선정: 호감도 50 이상인 대상 우선, 없으면 랜덤
  const target = others.length > 0 
    ? others.find(o => (updatedActor.affinities[o.id] || 0) > 50) || pick(others) 
    : null;

  const newLogs: LogEntry[] = [];
  const eventType = determineEventType();

  // 1. Fixing Anomaly Event
  if (eventType === 'anomaly') {
    const anomaly = pick(db.getAnomalies());
    const trait = db.getMbtiTrait(actor.mbti);
    const { success, damage } = resolveAnomalyOutcome(actor);

    if (success) {
      updatedActor.anomaliesFixed += 1;
      updatedActor.sanity = Math.min(100, updatedActor.sanity + SIMULATION_CONSTANTS.REWARD_SANITY_SUCCESS);
      
      const randomNpc = pick(db.getNpcs());
      updatedActor = db.adjustNpcAffinity(updatedActor, randomNpc.id, SIMULATION_CONSTANTS.REWARD_AFFINITY_NPC);

      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'action',
        characterId: actor.id,
        message: `${actor.name} 요원, "${anomaly}" 현상을 ${trait.style} ${trait.verb}. ${randomNpc.name} 팀장이 흡족해합니다.`
      });
    } else {
      const result = applyPhysicalDamage(updatedActor, damage);
      updatedActor = result.char;
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'combat',
        characterId: actor.id,
        message: `${actor.name} 요원, "${anomaly}" 격리 실패. 시스템 역류 발생.`
      });
      result.logs.forEach(l => newLogs.push({ id: uid(), timestamp: Date.now(), type: 'combat', characterId: actor.id, message: l }));
    }
  } 
  // 2. Inter-character interaction Event
  else if (eventType === 'interaction' && target) {
    const { isPositive } = resolveInteractionOutcome(updatedActor, target);
    
    if (isPositive) {
      updatedActor = db.adjustAffinity(updatedActor, target.id, SIMULATION_CONSTANTS.INTERACTION_POSITIVE_BONUS.affinity);
      updatedActor.sanity = Math.min(100, updatedActor.sanity + SIMULATION_CONSTANTS.INTERACTION_POSITIVE_BONUS.sanity);
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'dialogue',
        characterId: actor.id,
        message: `${actor.name}, ${target.name}와(과) 협력하며 유대감을 쌓습니다.`
      });
    } else {
      updatedActor = db.adjustAffinity(updatedActor, target.id, SIMULATION_CONSTANTS.INTERACTION_NEGATIVE_PENALTY.affinity);
      updatedActor.sanity = Math.max(0, updatedActor.sanity - SIMULATION_CONSTANTS.INTERACTION_NEGATIVE_PENALTY.sanity);
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'dialogue',
        characterId: actor.id,
        message: `${actor.name}, ${target.name}의 방식에 강한 불만을 표시합니다.`
      });
    }
  } 
  // 3. Idle / Observation
  else {
    const trait = db.getMbtiTrait(actor.mbti);
    newLogs.push({
      id: uid(),
      timestamp: Date.now(),
      type: 'action',
      characterId: actor.id,
      message: `${actor.name} 요원, 현장을 ${trait.style} 감시 중.`
    });
  }

  const updatedCharacters = characters.map(c => {
    if (c.id === updatedActor.id) return updatedActor;
    if (target && c.id === target.id) {
       // 대상도 행위자에 대한 호감도 변화 (비대칭적 반영)
       return db.adjustAffinity(c, actor.id, updatedActor.affinities[target.id] - (c.affinities[actor.id] || 0));
    }
    return c;
  });

  return { updatedCharacters, newLogs };
};
