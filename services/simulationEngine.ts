
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
  // (모든 요원은 동시에 임무에 진입하고 동시에 나옵니다)
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
    let updatedCharacters = [...characters]; // 전체 캐릭터 목록 복사

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
               color: stage.visualEffect.color
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
        // 리더를 제외한 다른 생존자들 중에서 선택
        const reactors = aliveCharacters.filter(c => c.id !== leaderActor.id);
        const numReactors = Math.min(reactors.length, Math.random() > 0.5 ? 2 : 1);
        
        // Fisher-Yates shuffle for randomness
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
                message: db.getMissionReaction(missionId, reactor.mbti, reactor.name)
            });
        });

        // 3. 리더의 선택 (AI Decision)
        const chosenChoice = decideChoice(leaderActor, stage);

        newLogs.push({
          id: uid(),
          timestamp: Date.now(),
          type: 'action',
          characterId: leaderActor.id,
          message: `> ${leaderActor.name}의 선택: [${chosenChoice.text}]`
        });

        // 4. 결과 적용 (리스크/보상) - 리더에게 주로 적용되지만, 전체 영향도 고려 가능
        // 현재 로직은 리더가 대표로 데미지/회복을 받음 (추후 광역 데미지 확장 가능)
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
        
        // 리더 상태 업데이트 반영
        updatedCharacters = updatedCharacters.map(c => c.id === updatedLeader.id ? updatedLeader : c);

        // 5. 다음 단계로 이동 또는 종료 (모든 생존 요원에게 적용)
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

        // 모든 생존 요원의 activeMission 상태 동기화 및 보상 지급
        updatedCharacters = updatedCharacters.map(c => {
            if (c.status !== '생존') return c; // 사망자는 제외

            const newChar = { ...c, activeMission: nextMissionState };
            
            // 임무 완료 시 보상 (전원 지급)
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
        // 스테이지 오류 시 강제 종료
         updatedCharacters = updatedCharacters.map(c => ({ ...c, activeMission: null }));
      }
    } else {
      // 미션 데이터 오류 시 강제 종료
      updatedCharacters = updatedCharacters.map(c => ({ ...c, activeMission: null }));
    }

    return { updatedCharacters, newLogs };
  }

  // ------------------------------------------------
  // Case B: 일반 턴 진행 (임무 없음)
  // ------------------------------------------------
  
  // 0. 심층 임무 진입 체크 (글로벌 이벤트)
  if (Math.random() < MISSION_TRIGGER_CHANCE) {
    const randomMission = pick(db.getMissions());
    if (randomMission) {
      newLogs.push({
        id: uid(),
        timestamp: Date.now(),
        type: 'mission',
        message: `⚠️ [경고] 차원 균열 감지! "${randomMission.title}" 구역으로 모든 요원이 강제 전송됩니다!`
      });

      // 모든 생존 요원을 해당 미션으로 진입시킴
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

  // 기존 일반 로직 (임무가 아닐 때만 실행)
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
    const relation = updatedActor.relationships[target.id]; // 관계 타입 가져오기
    
    // 관계에 따른 기본 로그 생성 (관계가 없다면 일반 대화 로그처럼 처리 가능하지만, Form에서 설정된 관계가 우선)
    if (relation) {
        // 관계 기반 특수 로그
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
        // 관계가 없는 경우의 기본 로직
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
    // MBTI별 고유 로그 출력 (일반 상태일 때만)
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
