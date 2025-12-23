
import { Character, LogEntry, MissionChoice, MissionStage } from '../types';
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

// 심층 임무 진입 확률 (5% 확률로 일반 행동 대신 발생)
const MISSION_TRIGGER_CHANCE = 0.05;

export const processTurn = (characters: Character[]): { updatedCharacters: Character[]; newLogs: LogEntry[] } => {
  const aliveCharacters = characters.filter(c => c.status === '생존');
  if (aliveCharacters.length === 0) return { updatedCharacters: characters, newLogs: [] };

  const actor = pick(aliveCharacters);
  let updatedActor = { ...actor };
  const newLogs: LogEntry[] = [];
  
  // ------------------------------------------------
  // Case A: 이미 심층 임무를 수행 중인 경우
  // ------------------------------------------------
  if (updatedActor.activeMission) {
    const { missionId, stageId, turnCount } = updatedActor.activeMission;
    const mission = db.getMissionById(missionId);

    if (mission) {
      const stage = mission.stages[stageId];
      if (stage) {
        // 1. 임무 진행 로그 출력
        newLogs.push({
          id: uid(),
          timestamp: Date.now(),
          type: 'mission',
          characterId: actor.id,
          message: `[심층 다이브] ${mission.title} - ${updatedActor.name}: "${stage.description}"`
        });

        // 2. 선택지 결정 (AI Decision)
        const chosenChoice = decideChoice(updatedActor, stage);

        // 3. 선택 및 결과 적용 로그
        newLogs.push({
          id: uid(),
          timestamp: Date.now(),
          type: 'action',
          characterId: actor.id,
          message: `> 선택: [${chosenChoice.text}]`
        });

        // 4. 결과 적용 (리스크/보상)
        const resultLog = applyChoiceResult(updatedActor, chosenChoice);
        if (resultLog) {
           newLogs.push({
             id: uid(),
             timestamp: Date.now(),
             type: 'combat',
             characterId: actor.id,
             message: resultLog
           });
        }

        // 5. 다음 단계로 이동 또는 종료
        if (chosenChoice.nextStageId && mission.stages[chosenChoice.nextStageId]) {
          updatedActor.activeMission = {
            ...updatedActor.activeMission,
            stageId: chosenChoice.nextStageId,
            turnCount: turnCount + 1
          };
        } else {
          // 임무 완료
          updatedActor.activeMission = null;
          updatedActor.anomaliesFixed += 5; 
          newLogs.push({
            id: uid(),
            timestamp: Date.now(),
            type: 'growth',
            characterId: actor.id,
            message: `[임무 완료] ${updatedActor.name}, 뒤틀린 차원에서 무사히 귀환했습니다. (실적 대폭 상승)`
          });
        }
      } else {
        updatedActor.activeMission = null;
      }
    } else {
      updatedActor.activeMission = null;
    }

    const updatedCharacters = characters.map(c => c.id === updatedActor.id ? updatedActor : c);
    return { updatedCharacters, newLogs };
  }

  // ------------------------------------------------
  // Case B: 일반 턴 진행 (임무 없음)
  // ------------------------------------------------
  
  // 0. 심층 임무 진입 체크
  if (Math.random() < MISSION_TRIGGER_CHANCE) {
    const randomMission = pick(db.getMissions());
    if (randomMission) {
      updatedActor.activeMission = {
        missionId: randomMission.id,
        stageId: randomMission.initialStageId,
        turnCount: 0
      };
      
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'mission',
        characterId: actor.id,
        message: `⚠️ [경고] ${updatedActor.name} 요원, "${randomMission.title}" 오류 구역으로 빨려들어갑니다!`
      });

      const updatedCharacters = characters.map(c => c.id === updatedActor.id ? updatedActor : c);
      return { updatedCharacters, newLogs };
    }
  }

  // 기존 일반 로직 (단발성 오류, 상호작용 등)
  const others = aliveCharacters.filter(c => c.id !== actor.id);
  const target = others.length > 0 
    ? others.find(o => (updatedActor.affinities[o.id] || 0) > 50) || pick(others) 
    : null;

  const eventType = determineEventType();

  if (eventType === 'anomaly') {
    const anomaly = pick(db.getAnomalies());
    const trait = db.getMbtiTrait(actor.mbti);
    const { success, damage, isCriticalSuccess } = resolveAnomalyOutcome(actor);

    if (success) {
      updatedActor.anomaliesFixed += 1;
      updatedActor.sanity = Math.min(updatedActor.maxSanity, updatedActor.sanity + SIMULATION_CONSTANTS.REWARD_SANITY_SUCCESS);
      
      if (isCriticalSuccess) {
        const growthType = Math.random() > 0.5 ? 'hp' : 'sanity';
        if (growthType === 'hp') {
            const amount = Math.floor(Math.random() * 5) + 5; 
            updatedActor.maxHp += amount;
            newLogs.push({
                id: uid(),
                timestamp: Date.now(),
                type: 'growth',
                characterId: actor.id,
                message: db.getGrowthLog('hp', actor.name, amount)
            });
        } else {
            const amount = Math.floor(Math.random() * 3) + 3; 
            updatedActor.maxSanity += amount;
            updatedActor.sanity += amount;
            newLogs.push({
                id: uid(),
                timestamp: Date.now(),
                type: 'growth',
                characterId: actor.id,
                message: db.getGrowthLog('sanity', actor.name, amount)
            });
        }
      }

      const randomNpc = pick(db.getNpcs());
      updatedActor = db.adjustNpcAffinity(updatedActor, randomNpc.id, SIMULATION_CONSTANTS.REWARD_AFFINITY_NPC);

      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'action',
        characterId: actor.id,
        message: db.getAnomalySuccessLog(actor.name, anomaly, trait.style, trait.verb, randomNpc.name)
      });
    } else {
      const result = applyPhysicalDamage(updatedActor, damage);
      updatedActor = result.char;
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'combat',
        characterId: actor.id,
        message: db.getAnomalyFailureLog(actor.name, anomaly)
      });
      result.logs.forEach(l => newLogs.push({ id: uid(), timestamp: Date.now(), type: 'combat', characterId: actor.id, message: l }));
    }
  } 
  else if (eventType === 'interaction' && target) {
    const { isPositive } = resolveInteractionOutcome(updatedActor, target);
    
    if (isPositive) {
      updatedActor = db.adjustAffinity(updatedActor, target.id, SIMULATION_CONSTANTS.INTERACTION_POSITIVE_BONUS.affinity);
      updatedActor.sanity = Math.min(updatedActor.maxSanity, updatedActor.sanity + SIMULATION_CONSTANTS.INTERACTION_POSITIVE_BONUS.sanity);
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
  else {
    // MBTI별 고유 로그 출력
    newLogs.push({
      id: uid(),
      timestamp: Date.now(),
      type: 'action',
      characterId: actor.id,
      message: db.getMbtiActionLog(actor.name, actor.mbti)
    });
  }

  const updatedCharacters = characters.map(c => {
    if (c.id === updatedActor.id) return updatedActor;
    if (target && c.id === target.id) {
       return db.adjustAffinity(c, actor.id, updatedActor.affinities[target.id] - (c.affinities[actor.id] || 0));
    }
    return c;
  });

  return { updatedCharacters, newLogs };
};

// --- Helper Logic for Missions ---

function decideChoice(char: Character, stage: MissionStage): MissionChoice {
  const candidates = stage.choices.map(choice => {
    let score = 0;
    
    if (choice.requiredStat === 'strength' && char.strength > 20) score += 3;
    if (choice.requiredStat === 'sanity' && char.sanity > 30) score += 3;
    
    if (char.sanity < 20 && choice.risk === 'low') score += 5;
    
    if (char.sanity > 40 && char.body.torso.current > 50 && choice.risk === 'high') score += 2;

    return { choice, score: score + Math.random() * 2 }; 
  });

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].choice;
}

function applyChoiceResult(char: Character, choice: MissionChoice): string | null {
  let log = null;

  if (choice.reward) {
    if (choice.reward.hp) {
      if (choice.reward.hp < 0) {
        const dmg = Math.abs(choice.reward.hp);
        const result = applyPhysicalDamage(char, dmg);
        char.body = result.char.body; 
        char.status = result.char.status;
        log = `충격으로 인해 체력이 ${dmg} 감소했습니다.`;
      } 
    }
    
    if (choice.reward.sanity) {
      char.sanity = Math.max(0, Math.min(char.maxSanity, char.sanity + choice.reward.sanity));
      if (choice.reward.sanity < 0) {
        log = log ? `${log} 정신적 충격을 받았습니다.` : `정신력이 ${Math.abs(choice.reward.sanity)} 감소했습니다.`;
      }
    }
  }

  return log;
}
