
import React, { useState } from 'react';
import { Character, Gender, MBTI, Species } from '../types';
import { Plus, X, Link, ArrowRightLeft, ArrowRight, Dices } from 'lucide-react';
import { db } from '../dataBase/manager';
import { generateAgentName } from '../dataBase/nameGenerator';

export interface RelationshipDraft {
  targetId: string;
  targetName: string;
  label: string;
  isMutual: boolean;
}

interface CharacterFormProps {
  existingCharacters: Character[];
  onAdd: (char: Character, relationships: RelationshipDraft[]) => void;
  onClose: () => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ existingCharacters, onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(25);
  const [species, setSpecies] = useState<Species>('인간');
  const [gender, setGender] = useState<Gender>('무성');
  const [mbti, setMbti] = useState<MBTI>('ISTJ');
  const [baseHp, setBaseHp] = useState(100);
  const [strength, setStrength] = useState(30);
  const [sanity, setSanity] = useState(50);
  
  const speciesList = db.getSpecies();
  const mbtiList = db.getMbtiList();
  const relationshipTypes = db.getRelationships();
  const relationshipCategories = db.getRelationshipCategories(); // 카테고리 데이터 로드
  const genderList: Gender[] = ['남성', '여성', '무성', '유동적'];

  const [relationships, setRelationships] = useState<RelationshipDraft[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [relationLabel, setRelationLabel] = useState(relationshipTypes[0]);
  const [isMutual, setIsMutual] = useState(false);

  const handleRandomize = () => {
    setName(generateAgentName());
    setAge(Math.floor(Math.random() * 62) + 18);
    setSpecies(speciesList[Math.floor(Math.random() * speciesList.length)]);
    setGender(genderList[Math.floor(Math.random() * genderList.length)]);
    setMbti(mbtiList[Math.floor(Math.random() * mbtiList.length)]);
    setBaseHp(Math.floor(Math.random() * 51) + 50); // 50 ~ 100
    setStrength(Math.floor(Math.random() * 26) + 5); // 5 ~ 30
    setSanity(Math.floor(Math.random() * 31) + 20); // 20 ~ 50

    if (existingCharacters.length > 0) {
      const numRels = Math.floor(Math.random() * 3);
      const newRels: RelationshipDraft[] = [];
      const shuffled = [...existingCharacters].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(numRels, shuffled.length); i++) {
        const target = shuffled[i];
        const label = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
        newRels.push({
          targetId: target.id,
          targetName: target.name,
          label: label,
          isMutual: Math.random() > 0.5
        });
      }
      setRelationships(newRels);
    }
  };

  const addRelationship = () => {
    if (!selectedTarget || !relationLabel.trim()) return;
    if (relationships.some(r => r.targetId === selectedTarget)) {
      alert("이미 관계가 설정된 대상입니다.");
      return;
    }
    const targetChar = existingCharacters.find(c => c.id === selectedTarget);
    if (!targetChar) return;

    setRelationships(prev => [...prev, { targetId: selectedTarget, targetName: targetChar.name, label: relationLabel, isMutual }]);
    setSelectedTarget('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("요원의 코드네임을 입력하거나 생성하십시오.");
      return;
    }

    const newChar = db.createInitialCharacter({
      name, age, species, gender, mbti, baseHp, strength, sanity
    });

    relationships.forEach(r => {
      newChar.relationships[r.targetId] = r.label;
      const isNegative = ["라이벌", "앙숙", "적", "혐오", "경계", "불신", "무시"].includes(r.label);
      newChar.affinities[r.targetId] = isNegative ? -30 : 20;
    });

    onAdd(newChar, relationships);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm p-0 md:p-4">
      <div className="bg-neutral-900 border-none md:border md:border-amber-500/50 p-4 md:p-6 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-none md:rounded-sm overflow-y-auto custom-scrollbar text-[15px] flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-4 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-serif text-amber-500 tracking-widest uppercase">신규 요원 호출</h2>
            <span className="text-[10px] text-amber-500/40 font-mono">NEW AGENT DEPLOYMENT PROTOCOL</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              type="button"
              onClick={handleRandomize}
              className="flex items-center gap-2 px-3 py-1.5 bg-amber-900/20 border border-amber-500/30 text-amber-500 text-xs hover:bg-amber-500 hover:text-black transition-all rounded-sm uppercase tracking-tighter font-bold"
            >
              <Dices size={14} /> <span className="hidden md:inline">데이터 무작위 할당</span><span className="md:hidden">랜덤</span>
            </button>
            <button onClick={onClose} className="p-2 text-amber-700 hover:text-amber-400 transition-colors"><X size={24} /></button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">코드네임</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors" placeholder="식별명 입력..."/>
            </div>
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">나이</label>
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">종족</label>
              <select value={species} onChange={(e) => setSpecies(e.target.value as Species)} className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors">
                {speciesList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">성별</label>
              <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors">
                {genderList.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">심리 (MBTI)</label>
              <select value={mbti} onChange={(e) => setMbti(e.target.value as MBTI)} className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors">
                {mbtiList.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-amber-900/20">
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">체력 (Max 100)</label>
              <input 
                type="number" 
                min="1" 
                max="100" 
                value={baseHp} 
                onChange={(e) => setBaseHp(Math.min(100, Math.max(1, Number(e.target.value))))} 
                className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">근력 (Max 30)</label>
              <input 
                type="number" 
                min="1" 
                max="30" 
                value={strength} 
                onChange={(e) => setStrength(Math.min(30, Math.max(1, Number(e.target.value))))} 
                className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-amber-500/70 text-xs uppercase tracking-wider mb-1">정신 (Max 50)</label>
              <input 
                type="number" 
                min="1" 
                max="50" 
                value={sanity} 
                onChange={(e) => setSanity(Math.min(50, Math.max(1, Number(e.target.value))))} 
                className="w-full bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 outline-none rounded-sm focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-amber-500 font-serif flex items-center gap-2 text-sm"><Link size={16} /> 초기 관계 설정</h3>
            {existingCharacters.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
                  <select value={selectedTarget} onChange={(e) => setSelectedTarget(e.target.value)} className="flex-[2] bg-neutral-950 border border-amber-900/50 text-neutral-300 px-3 py-2 text-[13px] rounded-sm outline-none focus:border-amber-500">
                    <option value="">대상 선택...</option>
                    {existingCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  
                  <button 
                    type="button" 
                    onClick={() => setIsMutual(!isMutual)}
                    className={`flex items-center justify-center px-3 border rounded-sm transition-all h-[38px] md:h-auto ${isMutual ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-neutral-800 border-neutral-700 text-neutral-500 hover:text-neutral-300'}`}
                    title={isMutual ? "상호 관계 (양방향)" : "단방향 관계"}
                  >
                    {isMutual ? <ArrowRightLeft size={16} /> : <ArrowRight size={16} />}
                  </button>

                  <select 
                    value={relationLabel} 
                    onChange={(e) => setRelationLabel(e.target.value)} 
                    className="flex-[1] bg-neutral-950 border border-amber-900/50 text-amber-100 px-3 py-2 text-[13px] rounded-sm outline-none focus:border-amber-500"
                  >
                    {Object.entries(relationshipCategories).map(([category, types]) => (
                      <optgroup label={category} key={category} className="text-amber-600 bg-neutral-900 font-bold">
                        {types.map(type => (
                          <option key={type} value={type} className="text-neutral-300 bg-neutral-950 font-normal">
                            {type}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <button type="button" onClick={addRelationship} className="bg-neutral-800 text-amber-500 px-4 py-2 text-[13px] border border-amber-900/30 rounded-sm hover:bg-neutral-700 transition-colors uppercase font-bold tracking-wider">추가</button>
                </div>

                <div className="max-h-32 overflow-y-auto space-y-1 bg-black/20 p-2 rounded-sm border border-amber-900/10">
                  {relationships.length === 0 && <p className="text-[11px] text-neutral-600 italic text-center py-2">설정된 초기 관계가 없습니다.</p>}
                  {relationships.map((r, i) => (
                    <div key={i} className="text-[11px] bg-black/40 p-2 border-l border-amber-500 flex justify-between items-center group">
                      <span className="text-neutral-300 flex items-center gap-2">
                        {r.isMutual ? <ArrowRightLeft size={12} className="text-blue-400" /> : <ArrowRight size={12} className="text-neutral-500" />}
                        <span>
                          <span className="text-amber-500/80 font-bold">{r.targetName}</span> 요원과 
                          <span className="text-amber-400 mx-1">[{r.label}]</span> 관계
                        </span>
                      </span>
                      <button type="button" onClick={() => setRelationships(prev => prev.filter((_, idx) => idx !== i))} className="text-red-900 group-hover:text-red-500 transition-colors font-bold uppercase text-[9px]">삭제</button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[11px] text-neutral-600 italic">필드에 배치된 다른 요원이 없어 초기 관계를 설정할 수 없습니다.</p>
            )}
          </div>

          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all active:scale-[0.98] mt-auto md:mt-0">요원 등록 승인</button>
        </form>
      </div>
    </div>
  );
};

export default CharacterForm;
