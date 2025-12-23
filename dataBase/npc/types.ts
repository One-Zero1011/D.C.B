
export interface NPCProfile {
  name: string;
  alias: string;
  age: string;
  gender: string;
  race: string;
  origin: string;
  birthday: string;
  faith: string;
  bloodType: string;
}

export interface NPCAppearance {
  hair: string;
  eyes: string;
  bodyShape: string;
  bodyImage: string;
  fashionStyle: string;
  equipment: string;
  signatureItem: string;
  perfume: string;
  aura: string;
}

export interface NPCBackground {
  strength: string;
  intelligence: string;
  family: string;
  past: string;
  education: string;
  job: string;
  income: string;
  residence: string;
  network: string;
  reputation: string;
}

export interface NPCPersonality {
  wound: string;
  belief: string;
  limit: string;
  morality: string;
  achievement: string;
  interaction: string;
  identity: string;
  flaw: string;
  archetype: string;
}

export interface NPCVisibleSide {
  dream: string;
  goal: string;
  motivation: string;
  routine: string;
  skill: string;
  speech: string;
  habit: string;
}

export interface NPCHiddenSide {
  weakness: string;
  conflict: string;
  fear: string;
  potential: string;
  secret: string;
  chastity: string;
  sexuality: string;
}

export interface NPCPreference {
  like: string;
  hobby: string;
  romance: string;
  obsession: string;
  hate: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  team: string;
  summary: string;
  avatar: string;
  personality: string[];
  themeColor: string;
  
  profile: NPCProfile;
  appearance: NPCAppearance;
  background: NPCBackground;
  personalityDetail: NPCPersonality;
  visibleSide: NPCVisibleSide;
  hiddenSide: NPCHiddenSide;
  preference: NPCPreference;
  special: string;
}

export interface DialogueNode {
  emoji?: string;
  literal: string;
  jamInterpretation?: string;
}
