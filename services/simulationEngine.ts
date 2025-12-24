
import { Character, LogEntry, MissionChoice, MissionStage } from '../types';
import { db } from '../dataBase/manager';
import { createVisualEffectLog } from '../dataBase/visualEffectService';
import { 
  determineEventType, 
  applyPhysicalDamage, 
  resolveAnomalyOutcome, 
  resolveInteractionOutcome,
  SIMULATION_CONSTANTS
} from '../dataBase/simulationRules';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const uid = () => Math.random().toString(36).substr(2, 9);

// 심층 임무 진입 확률 (5% 확률)
const MISSION_TRIGGER_CHANCE = 0.05;

export const processTurn = (characters: Character[]): { updatedCharacters: Character[]; newLogs: LogEntry[] } => {
  const aliveCharacters = characters.filter(c => c.status === '생존');
  if (aliveCharacters.length === 0) return { updatedCharacters: characters, newLogs: [] };

  const newLogs: LogEntry[] = [];
  
  // ------------------------------------------------
  // Global Check: 팀 중 한 명이라도 임무 중인지 확인
  // ------------------------------------------------
  const activeMissionData = aliveCharacters.find(c => c.activeMission)?.activeMission;

  // ------------------------------------------------
  // Case A: 팀이 심층 임무(Deep Dive) 수행 중
  // ------------------------------------------------
  if (activeMissionData) {
    const { missionId, stageId, turnCount } = activeMissionData;
    const mission = db.getMissionById(missionId);

    // 이번 턴의 행동을 결정할 리더 요원 선출 (랜덤)
    const leaderActor = pick(aliveCharacters);
    let updatedCharacters = [...characters]; 

    if (mission) {
      const stage = mission.stages[stageId];
      if (stage) {
        // [특수 연출] 스테이지 데이터에 시각 효과(visualEffect)가 정의되어 있다면 실행
        if (stage.visualEffect) {
             const glitchLog = createVisualEffectLog({
               characterId: leaderActor.id,
               text: stage.visualEffect.text,
               type: stage.visualEffect.type,
               duration: stage.visualEffect.duration,
               intensity: stage.visualEffect.intensity,
               color: stage.visualEffect.color,
               fontSize: stage.visualEffect.fontSize,
               speed: stage.visualEffect.speed,
               customEmojis: stage.visualEffect.customEmojis 
             });
             newLogs.push(glitchLog);
        }

        // 1. 임무 상황 로그 (리더 시점)
        newLogs.push({
          id: uid(),
          timestamp: Date.now(),
          type: 'mission',
          characterId: leaderActor.id,
          message: `[심층 다이브] ${mission.title} - ${leaderActor.name}: "${stage.description}"`
        });

        // 2. 동료 요원들의 반응 로그 (1~2명 랜덤)
        const reactors = aliveCharacters.filter(c => c.id !== leaderActor.id);
        const numReactors = Math.min(reactors.length, Math.random() > 0.5 ? 2 : 1);
        
        // Fisher-Yates shuffle
        for (let i = reactors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [reactors[i], reactors[j]] = [reactors[j], reactors[i]];
        }
        
        reactors.slice(0, numReactors).forEach(reactor => {
            newLogs.push({
                id: uid(),
                timestamp: Date.now(),
                type: 'dialogue',
                characterId: reactor.id,
                // 스테이지 ID를 함께 전달하여 스테이지별 대응 대사 출력
                message: db.getMissionReaction(missionId, stageId, reactor.mbti, reactor.name)
            });
        });

        // 3. 리더의 선택
        const chosenChoice = decideChoice(leaderActor, stage);

        newLogs.push({
          id: uid(),
          timestamp: Date.now(),
          type: 'action',
          characterId: leaderActor.id,
          message: `> ${leaderActor.name}의 선택: [${chosenChoice.text}]`
        });

        // 4. 결과 적용
        let updatedLeader = { ...leaderActor };
        const resultLog = applyChoiceResult(updatedLeader, chosenChoice);
        if (resultLog) {
           newLogs.push({
             id: uid(),
             timestamp: Date.now(),
             type: 'combat',
             characterId: leaderActor.id,
             message: resultLog
           });
        }
        
        updatedCharacters = updatedCharacters.map(c => c.id === updatedLeader.id ? updatedLeader : c);

        // 5. 다음 단계로 이동 또는 종료
        let nextMissionState: typeof activeMissionData | null = null;
        let isMissionComplete = false;

        if (chosenChoice.nextStageId && mission.stages[chosenChoice.nextStageId]) {
          nextMissionState = {
            missionId,
            stageId: chosenChoice.nextStageId,
            turnCount: turnCount + 1
          };
        } else {
          isMissionComplete = true;
          nextMissionState = null;
        }

        updatedCharacters = updatedCharacters.map(c => {
            if (c.status !== '생존') return c; 
            const newChar = { ...c, activeMission: nextMissionState };
            if (isMissionComplete) {
                newChar.anomaliesFixed += 5;
            }
            return newChar;
        });

        if (isMissionComplete) {
            newLogs.push({
                id: uid(),
                timestamp: Date.now(),
                type: 'growth',
                message: `[임무 완료] 팀 전원, 뒤틀린 차원에서 무사히 귀환했습니다. (전원 실적 대폭 상승)`
            });
        }

      } else {
         updatedCharacters = updatedCharacters.map(c => ({ ...c, activeMission: null }));
      }
    } else {
      updatedCharacters = updatedCharacters.map(c => ({ ...c, activeMission: null }));
    }

    return { updatedCharacters, newLogs };
  }

  // ------------------------------------------------
  // Case B: 일반 턴 진행 (임무 없음)
  // ------------------------------------------------
  
  if (Math.random() < MISSION_TRIGGER_CHANCE) {
    const randomMission = pick(db.getMissions());
    if (randomMission) {
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'mission',
        message: `⚠️ [경고] 차원 균열 감지! "${randomMission.title}" 구역으로 모든 요원이 강제 전송됩니다!`
      });

      const updatedCharacters = characters.map(c => {
          if (c.status !== '생존') return c;
          return {
              ...c,
              activeMission: {
                  missionId: randomMission.id,
                  stageId: randomMission.initialStageId,
                  turnCount: 0
              }
          };
      });

      return { updatedCharacters, newLogs };
    }
  }

  const actor = pick(aliveCharacters);
  let updatedActor = { ...actor };
  
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
    const relation = updatedActor.relationships[target.id];
    
    if (relation) {
        const relLog = db.getRelationshipLog(updatedActor.name, target.name, relation);
        if (isPositive) {
            updatedActor = db.adjustAffinity(updatedActor, target.id, SIMULATION_CONSTANTS.INTERACTION_POSITIVE_BONUS.affinity);
            updatedActor.sanity = Math.min(updatedActor.maxSanity, updatedActor.sanity + SIMULATION_CONSTANTS.INTERACTION_POSITIVE_BONUS.sanity);
            newLogs.push({
                id: uid(),
                timestamp: Date.now(),
                type: 'dialogue',
                characterId: actor.id,
                message: `${relLog} (호감도 상승)`
            });
        } else {
            updatedActor = db.adjustAffinity(updatedActor, target.id, SIMULATION_CONSTANTS.INTERACTION_NEGATIVE_PENALTY.affinity);
            updatedActor.sanity = Math.max(0, updatedActor.sanity - SIMULATION_CONSTANTS.INTERACTION_NEGATIVE_PENALTY.sanity);
            newLogs.push({
                id: uid(),
                timestamp: Date.now(),
                type: 'dialogue',
                characterId: actor.id,
                message: `${relLog} (관계 악화)`
            });
        }
    } else {
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
  } 
  else {
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
