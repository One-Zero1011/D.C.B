
import { MBTI, Species, Character, Body, BodyPart, StoreItem, CalendarEvent } from "../types";
import { INITIAL_SPECIES_LIST, INITIAL_MBTI_LIST, INITIAL_RELATIONSHIP_TYPES } from "./seeds/classifications";
import { INITIAL_MBTI_TRAITS, INITIAL_MENTAL_STATES } from "./seeds/traits";
import { INITIAL_ANOMALIES } from "./seeds/world";
import { INITIAL_NPCS, NPC_DIALOGUES, NPC, DialogueNode } from "./seeds/npcs";
import { STORE_ITEMS, STORE_OWNER } from "./seeds/store";
import { INITIAL_CALENDAR_EVENTS } from "./seeds/calendarEvents";

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
      body,
      status: '생존',
      mentalState: '안정',
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

  applyStoreItem(char: Character, item: StoreItem): Character {
    const updated = { ...char };
    updated.anomaliesFixed = Math.max(0, updated.anomaliesFixed - item.price);

    switch (item.effect) {
      case 'hp':
        updated.maxHp = Math.min(updated.maxHp + 50, 300);
        this.repairAllBodyParts(updated);
        break;
      case 'sanity':
        updated.sanity = Math.min(100, updated.sanity + 40);
        break;
      case 'body':
        this.repairAllBodyParts(updated);
        if (updated.status === '사망') {
          updated.status = '생존';
          updated.mentalState = '안정';
          updated.sanity = 10;
        }
        break;
    }
    return updated;
  }

  private repairAllBodyParts(char: Character) {
    Object.keys(char.body).forEach((key) => {
      const part = char.body[key as keyof Body];
      part.current = part.max;
    });
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
  getMentalStates() { return this.mentalStates; }
}

export const db = new DatabaseManager();
