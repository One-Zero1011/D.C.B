
import React, { useState } from 'react';
import { Character, BodyPart, Species, MBTI, Gender } from '../types';
import { Heart, Brain, Zap, Skull, Users, Activity, AlertTriangle, XCircle, Settings, Check, X } from 'lucide-react';
import { db } from '../dataBase/manager';

interface Props {
  character: Character;
  allCharacters?: Character[];
  onUpdate?: (updated: Character) => void;
}

const BodyPartStatus: React.FC<{ part: BodyPart }> = ({ part }) => {
  const isDamaged = part.current < part.max && part.current > 0;
  const isDestroyed = part.current <= 0;
  
  let statusClass = "border-neutral-800 bg-neutral-900/30";
  let textClass = "text-neutral-500";
  let barColor = "bg-amber-600/30";
  let Icon = Activity;

  if (isDestroyed) {
    statusClass = "border-red-600/50 bg-red-950/20 animate-pulse";
    textClass = "text-red-500 font-bold";
    barColor = "bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.5)]";
    Icon = XCircle;
  } else if (isDamaged) {
    statusClass = "border-amber-500/40 bg-amber-900/10";
    textClass = "text-amber-400";
    barColor = "bg-amber-500";
    Icon = AlertTriangle;
  } else if (part.isVital) {
    textClass = "text-amber-200/80";
    barColor = "bg-amber-500/40";
  }

  return (
    <div className={`flex flex-col p-1.5 border rounded-sm transition-all duration-300 ${statusClass}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-[9px] uppercase tracking-tighter truncate ${textClass}`}>
          {part.isVital && !isDestroyed && <span className="text-red-500 mr-0.5">!</span>}
          {part.name}
        </span>
        <Icon size={10} className={isDestroyed ? 'text-red-500' : isDamaged ? 'text-amber-400' : 'text-neutral-700'} />
      </div>
      <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ease-out ${barColor}`} 
          style={{ width: `${(part.current / part.max) * 100}%` }}
        />
      </div>
    </div>
  );
};

const CharacterCard: React.FC<Props> = ({ character, allCharacters = [], onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: character.name,
    age: character.age,
    species: character.species,
    gender: character.gender,
    mbti: character.mbti
  });

  const isDead = character.status === '사망';
  const speciesList = db.getSpecies();
  const mbtiList = db.getMbtiList();
  const genderList: Gender[] = ['남성', '여성', '무성', '유동적'];

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        ...character,
        ...editForm
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: character.name,
      age: character.age,
      species: character.species,
      gender: character.gender,
      mbti: character.mbti
    });
    setIsEditing(false);
  };

  const topAffinities = Object.entries(character.affinities)
    .map(([id, val]) => ({ id, val, name: allCharacters.find(c => c.id === id)?.name || '알 수 없음' }))
    .sort((a, b) => Math.abs(b.val) - Math.abs(a.val))
    .slice(0, 3);

  return (
    <div className={`relative flex flex-col p-4 border ${isDead ? 'border-red-900/50 bg-red-950/5 opacity-70 grayscale' : isEditing ? 'border-amber-500 bg-neutral-900 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-amber-500/20 bg-neutral-950'} w-full shadow-xl rounded-sm transition-all hover:border-amber-500/40`}>
      <div className="flex justify-between items-start mb-4 border-b border-neutral-800 pb-2">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2 pr-2">
              <input 
                type="text" 
                value={editForm.name} 
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full bg-black border border-amber-500/50 text-amber-100 text-sm px-2 py-1 outline-none focus:border-amber-500"
              />
              <div className="grid grid-cols-2 gap-1">
                <input 
                  type="number" 
                  value={editForm.age} 
                  onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                  className="w-full bg-black border border-amber-900/50 text-amber-100 text-[10px] px-2 py-1 outline-none"
                />
                <select 
                  value={editForm.species} 
                  onChange={(e) => setEditForm({ ...editForm, species: e.target.value as Species })}
                  className="w-full bg-black border border-amber-900/50 text-amber-100 text-[10px] px-2 py-1 outline-none"
                >
                  {speciesList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select 
                  value={editForm.gender} 
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value as Gender })}
                  className="w-full bg-black border border-amber-900/50 text-amber-100 text-[10px] px-2 py-1 outline-none"
                >
                  {genderList.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select 
                  value={editForm.mbti} 
                  onChange={(e) => setEditForm({ ...editForm, mbti: e.target.value as MBTI })}
                  className="w-full bg-black border border-amber-900/50 text-amber-100 text-[10px] px-2 py-1 outline-none"
                >
                  {mbtiList.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <>
              <h3 className={`text-lg font-serif tracking-widest uppercase ${isDead ? 'text-red-800' : 'text-amber-500'}`}>{character.name}</h3>
              <p className="text-[10px] text-amber-500/40 uppercase font-mono tracking-tighter">{character.species} // {character.age}Y // {character.gender} // {character.mbti}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isDead && (
            isEditing ? (
              <div className="flex gap-1">
                <button onClick={handleSave} className="p-1 text-green-500 hover:bg-green-500/10 rounded-sm transition-colors"><Check size={14} /></button>
                <button onClick={handleCancel} className="p-1 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors"><X size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="p-1 text-amber-500/40 hover:text-amber-500 hover:bg-amber-500/10 rounded-sm transition-colors"><Settings size={14} /></button>
            )
          )}
          <div className={`text-[9px] px-2 py-0.5 border font-bold uppercase tracking-widest ${isDead ? 'border-red-700 text-red-700 bg-red-950/30' : 'border-amber-500 text-amber-500 bg-amber-500/5'}`}>{character.status}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="flex flex-col items-center p-2 bg-neutral-900/30 border border-neutral-800 rounded-sm">
          <Heart size={14} className="text-red-600 mb-1" /><span className="text-[9px] text-neutral-500 uppercase">HP</span><span className="text-xs font-mono font-bold text-neutral-200">{character.maxHp}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-neutral-900/30 border border-neutral-800 rounded-sm">
          <Brain size={14} className="text-blue-500 mb-1" /><span className="text-[9px] text-neutral-500 uppercase">SAN</span><span className="text-xs font-mono font-bold text-neutral-200">{character.sanity}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-neutral-900/30 border border-neutral-800 rounded-sm">
          <Zap size={14} className="text-amber-500 mb-1" /><span className="text-[9px] text-neutral-500 uppercase">STR</span><span className="text-xs font-mono font-bold text-neutral-200">{character.strength}</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-2 border-b border-neutral-800 pb-1">
          <h4 className="text-[9px] uppercase text-neutral-500 tracking-[0.2em] font-bold">Bio-Integrity Monitor</h4>
          <Activity size={10} className="text-amber-500/30" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <BodyPartStatus part={character.body.head} />
          <BodyPartStatus part={character.body.neck} />
          <BodyPartStatus part={character.body.torso} />
          <BodyPartStatus part={character.body.leftEye} />
          <BodyPartStatus part={character.body.rightEye} />
          <BodyPartStatus part={character.body.leftEar} />
          <BodyPartStatus part={character.body.rightEar} />
          <BodyPartStatus part={character.body.leftArm} />
          <BodyPartStatus part={character.body.rightArm} />
          <BodyPartStatus part={character.body.leftLeg} />
          <BodyPartStatus part={character.body.rightLeg} />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-[9px] uppercase text-neutral-500 tracking-[0.2em] font-bold mb-2 border-b border-neutral-800 pb-1 flex items-center gap-1"><Users size={10}/> Social Affinity Index</h4>
        <div className="space-y-2">
          {topAffinities.length === 0 && <span className="text-[10px] text-neutral-700 italic">No Active Links</span>}
          {topAffinities.map(aff => (
            <div key={aff.id} className="flex flex-col group/aff">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-neutral-400 group-hover/aff:text-neutral-200 transition-colors">{aff.name} <span className="text-neutral-600 text-[9px]">[{character.relationships[aff.id] || 'CO-WORKER'}]</span></span>
                <span className={`font-mono ${aff.val >= 0 ? 'text-blue-500' : 'text-red-500'}`}>{aff.val > 0 ? `+${aff.val}` : aff.val}</span>
              </div>
              <div className="h-0.5 bg-neutral-900 rounded-full overflow-hidden flex">
                <div className={`h-full transition-all duration-500 ${aff.val >= 0 ? 'bg-blue-600' : 'bg-red-600'}`} style={{ width: `${Math.abs(aff.val)}%`, marginLeft: aff.val >= 0 ? '0' : 'auto' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-2 border-t border-neutral-800 flex justify-between text-[9px] text-neutral-600 font-mono">
        <span className="truncate max-w-[150px]">MENTAL: {character.mentalState}</span>
        <span>SYNC: {character.anomaliesFixed}</span>
      </div>

      {isDead && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none rounded-sm backdrop-blur-[1px]">
          <Skull size={64} className="text-red-900/40" />
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
