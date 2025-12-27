
import { MBTI, Species, Character, Body, BodyPart, StoreItem, CalendarEvent, Mission } from "../types";
import { INITIAL_SPECIES_LIST, INITIAL_MBTI_LIST, INITIAL_RELATIONSHIP_TYPES, RELATIONSHIP_CATEGORIES } from "./seeds/classifications";
import { INITIAL_MBTI_TRAITS, INITIAL_MENTAL_STATES } from "./seeds/traits";
import { INITIAL_ANOMALIES } from "./seeds/world";
import { INITIAL_NPCS, NPC_DIALOGUES, NPC, DialogueNode } from "./seeds/npcs";
import { STORE_ITEMS, STORE_OWNER } from "./seeds/store";
import { INITIAL_CALENDAR_EVENTS } from "./seeds/calendarEvents";
import { INITIAL_MISSIONS } from "./seeds/missions";
import { GROWTH_LOGS, ANOMALY_LOGS, IDLE_LOGS } from "./seeds/actionLogs";
import { MBTI_LOGS } from "./seeds/mbtiLogs";
import { MISSION_REACTIONS } from "./seeds/missionReactions";
import { RELATIONSHIP_LOGS } from "./seeds/relationshipLogs";

class DatabaseManager {
  private anomalies: string[];
  private species: Species[];
  private mbtiList: MBTI[];
  private mbtiTraits: Record<MBTI, { adjective: string; verb: string; style: string }>;
  private relationships: string[];
  private mentalStates: string[];
  private npcs: NPC[];
  private storeItems: StoreItem[];
  private calendarEvents: CalendarEvent[];
  private missions: Mission[];

  constructor() {
    this.anomalies = [...INITIAL_ANOMALIES];
    this.species = [...INITIAL_SPECIES_LIST];
    this.mbtiList = [...INITIAL_MBTI_LIST];
    this.mbtiTraits = { ...INITIAL_MBTI_TRAITS };
    this.relationships = [...INITIAL_RELATIONSHIP_TYPES];
    this.mentalStates = [...INITIAL_MENTAL_STATES];
    this.npcs = [...INITIAL_NPCS];
    this.storeItems = [...STORE_ITEMS];
    this.calendarEvents = [...INITIAL_CALENDAR_EVENTS];
    this.missions = [...INITIAL_MISSIONS];
  }

  // --- Mission Management ---
  
  /**
   * 커스텀 미션을 데이터베이스에 등록합니다.
   * 중복된 ID가 있다면 덮어씁니다.
   */
  registerCustomMission(mission: Mission) {
    const existingIndex = this.missions.findIndex(m => m.id === mission.id);
    if (existingIndex !== -1) {
      this.missions[existingIndex] = mission;
    } else {
      this.missions.push(mission);
    }
  }

  /**
   * 등록된 모든 커스텀 미션을 제거하고 초기 미션만 남깁니다.
   */
  resetMissions() {
    this.missions = [...INITIAL_MISSIONS];
  }

  // --- Core Character Actions ---
  
  createInitialCharacter(data: {
    name: string;
    age: number;
    species: Species;
    gender: any;
    mbti: MBTI;
    baseHp: number;
    strength: number;
    sanity: number;
  }): Character {
    const createPart = (name: string, hpRatio: number, isVital = false): BodyPart => ({
      name,
      max: Math.floor(data.baseHp * hpRatio),
      current: Math.floor(data.baseHp * hpRatio),
      isVital
    });

    const body: Body = {
      head: createPart('머리', 0.4, true),
      neck: createPart('목', 0.2, true),
      torso: createPart('몸통', 1.0, true),
      leftArm: createPart('왼팔', 0.5),
      rightArm: createPart('오른팔', 0.5),
      leftLeg: createPart('왼다리', 0.6),
      rightLeg: createPart('오른다리', 0.6),
      leftEye: createPart('왼눈', 0.05),
      rightEye: createPart('오른눈', 0.05),
      leftEar: createPart('왼귀', 0.05),
      rightEar: createPart('오른귀', 0.05),
    };

    const initialNpcAffinities: Record<string, number> = {};
    this.npcs.forEach(npc => { initialNpcAffinities[npc.id] = 0; });

    return {
      id: crypto.randomUUID(),
      name: data.name || `요원-${Math.floor(Math.random() * 9999)}`,
      age: data.age,
      species: data.species,
      gender: data.gender,
      mbti: data.mbti,
      maxHp: data.baseHp,
      strength: data.strength,
      sanity: data.sanity,
      maxSanity: data.sanity,
      body,
      status: '생존',
      mentalState: '안정',
      activeMission: null,
      relationships: {},
      affinities: {},
      npcAffinities: initialNpcAffinities,
      kills: 0,
      anomaliesFixed: 0
    };
  }

  adjustAffinity(char: Character, targetId: string, amount: number): Character {
    const newAffinities = { ...char.affinities };
    newAffinities[targetId] = Math.max(-100, Math.min(100, (newAffinities[targetId] || 0) + amount));
    return { ...char, affinities: newAffinities };
  }

  adjustNpcAffinity(char: Character, npcId: string, amount: number): Character {
    const newNpcAffinities = { ...char.npcAffinities };
    newNpcAffinities[npcId] = Math.max(-100, Math.min(100, (newNpcAffinities[npcId] || 0) + amount));
    return { ...char, npcAffinities: newNpcAffinities };
  }

  // --- Store & Items Actions ---

  applyStoreItem(char: Character, item: StoreItem, targetPartKey?: keyof Body): Character {
    // 사망한 캐릭터는 어떤 아이템도 효과를 볼 수 없음 (중복 방어)
    if (char.status === '사망') return char;

    const updated = { ...char, body: { ...char.body } };
    
    switch (item.effect) {
      case 'hp':
        this.repairAllBodyParts(updated);
        break;
      case 'sanity':
        const recoveryAmount = Math.floor(updated.maxSanity * 0.3);
        updated.sanity = Math.min(updated.maxSanity, updated.sanity + recoveryAmount);
        updated.mentalState = '안정'; 
        break;
      case 'body':
        if (targetPartKey && updated.body[targetPartKey]) {
            const originalPart = updated.body[targetPartKey];
            updated.body[targetPartKey] = {
                ...originalPart,
                current: originalPart.max
            };
        } else {
             this.repairSingleCriticalPart(updated);
        }
        // 사망 상태에서 부위가 복구되어도 부활하는 로직을 제거함
        break;
    }
    return updated;
  }

  private repairAllBodyParts(char: Character) {
    Object.keys(char.body).forEach((key) => {
      const partKey = key as keyof Body;
      char.body[partKey] = { 
          ...char.body[partKey], 
          current: char.body[partKey].max 
      };
    });
  }

  private repairSingleCriticalPart(char: Character) {
    const parts = Object.values(char.body);
    const destroyedParts = parts.filter(p => p.current <= 0);
    let targetPartKey: keyof Body | null = null;

    const findKeyByPart = (part: BodyPart): keyof Body | null => {
         const entry = Object.entries(char.body).find(([_, p]) => p === part);
         return entry ? entry[0] as keyof Body : null;
    };

    if (destroyedParts.length > 0) {
      const destroyedVital = destroyedParts.filter(p => p.isVital);
      if (destroyedVital.length > 0) {
        targetPartKey = findKeyByPart(destroyedVital[0]);
      } else {
        targetPartKey = findKeyByPart(destroyedParts[0]);
      }
    } else {
      const damagedParts = parts.filter(p => p.current < p.max);
      if (damagedParts.length > 0) {
        damagedParts.sort((a, b) => (a.current / a.max) - (b.current / b.max));
        targetPartKey = findKeyByPart(damagedParts[0]);
      }
    }

    if (targetPartKey) {
      char.body[targetPartKey] = { 
          ...char.body[targetPartKey], 
          current: char.body[targetPartKey].max 
      };
    }
  }

  // --- Calendar Actions ---
  getCalendarEvents(): CalendarEvent[] {
    return this.calendarEvents;
  }

  addCalendarEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
    const newEvent = { ...event, id: crypto.randomUUID() };
    this.calendarEvents.push(newEvent);
    return newEvent;
  }

  // --- Missions ---
  getMissions() { return this.missions; }
  getMissionById(id: string) { return this.missions.find(m => m.id === id); }

  // --- Log Generators ---
  
  getGrowthLog(type: 'hp' | 'sanity', name: string, amount: number): string {
    const templates = GROWTH_LOGS[type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.split('{name}').join(name).split('{amount}').join(amount.toString());
  }

  getAnomalySuccessLog(name: string, anomaly: string, traitStyle: string, traitVerb: string, npcName: string): string {
    const templates = ANOMALY_LOGS.success;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template
      .split('{name}').join(name)
      .split('{anomaly}').join(anomaly)
      .split('{trait_style}').join(traitStyle)
      .split('{trait_verb}').join(traitVerb)
      .split('{npc_name}').join(npcName);
  }

  getAnomalyFailureLog(name: string, anomaly: string): string {
    const templates = ANOMALY_LOGS.failure;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.split('{name}').join(name).split('{anomaly}').join(anomaly);
  }

  getIdleLog(name: string, traitStyle: string): string {
    const templates = IDLE_LOGS;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.split('{name}').join(name).split('{trait_style}').join(traitStyle);
  }

  getMbtiActionLog(name: string, mbti: MBTI): string {
    const templates = MBTI_LOGS[mbti] || IDLE_LOGS; 
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.split('{name}').join(name);
  }

  /**
   * 미션 및 스테이지별 MBTI 대화문을 가져옵니다.
   */
  getMissionReaction(missionId: string, stageId: string, mbti: MBTI, name: string): string {
    const mission = MISSION_REACTIONS[missionId];
    if (!mission) return `... (${name}는 긴장한 듯 침묵합니다.)`;

    const stageReactions = mission[stageId];
    if (!stageReactions) {
       // 해당 스테이지 반응이 없으면 첫 번째 스테이지나 일반 반응 시도 (폴백)
       const fallbackStage = Object.values(mission)[0];
       if (!fallbackStage) return `... (${name}는 상황을 주시합니다.)`;
       const reactions = fallbackStage[mbti];
       if (!reactions || reactions.length === 0) return `... (${name}는 상황을 주시합니다.)`;
       return reactions[Math.floor(Math.random() * reactions.length)].split('{name}').join(name);
    }

    const reactions = stageReactions[mbti];
    if (!reactions || reactions.length === 0) return `... (${name}는 상황을 주시합니다.)`;

    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    return reaction.split('{name}').join(name);
  }

  getRelationshipLog(actorName: string, targetName: string, relation: string): string {
    const templates = RELATIONSHIP_LOGS[relation];
    if (!templates || templates.length === 0) {
       return `${actorName}, ${targetName}와(과) 상호작용합니다. [${relation}]`;
    }
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.split('{actor}').join(actorName).split('{target}').join(targetName);
  }

  // --- Metadata Getters ---
  getStoreItems() { return this.storeItems; }
  getStoreOwner() { return STORE_OWNER; }
  getNpcs() { return this.npcs; }
  getDialogues(npcId: string): DialogueNode[] { return NPC_DIALOGUES[npcId] || []; }
  getAnomalies() { return this.anomalies; }
  getSpecies() { return this.species; }
  getMbtiList() { return this.mbtiList; }
  getMbtiTrait(mbti: MBTI) { return this.mbtiTraits[mbti]; }
  getRelationships() { return this.relationships; }
  getRelationshipCategories() { return RELATIONSHIP_CATEGORIES; }
  getMentalStates() { return this.mentalStates; }
}

export const db = new DatabaseManager();
