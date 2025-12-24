
import React, { useState } from 'react';
import { Mission, MissionStage, MissionChoice, VisualEffectType, Body } from '../types';
import { X, Plus, Save, Download, Upload, Trash2, ArrowRight, Map, Layout, Zap, AlertTriangle, FileJson } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSaveMission: (mission: Mission) => void;
  existingMissions: Mission[];
}

const DEFAULT_MISSION: Mission = {
  id: '',
  title: '',
  description: '',
  initialStageId: 'stage_start',
  stages: {
    'stage_start': {
      id: 'stage_start',
      description: '미션의 시작 지점입니다.',
      choices: []
    }
  }
};

const BODY_PARTS: (keyof Body)[] = [
  'head', 'neck', 'torso', 
  'leftArm', 'rightArm', 
  'leftLeg', 'rightLeg', 
  'leftEye', 'rightEye', 
  'leftEar', 'rightEar'
];

const MissionBuilder: React.FC<Props> = ({ onClose, onSaveMission, existingMissions }) => {
  const [mission, setMission] = useState<Mission>({ ...DEFAULT_MISSION, id: `custom_mission_${Date.now()}` });
  const [selectedStageId, setSelectedStageId] = useState<string>('stage_start');
  const [viewMode, setViewMode] = useState<'list' | 'edit'>('list');

  // --- List View Actions ---
  const handleCreateNew = () => {
    setMission({ ...DEFAULT_MISSION, id: `custom_mission_${Date.now()}` });
    setSelectedStageId('stage_start');
    setViewMode('edit');
  };

  const handleEditExisting = (m: Mission) => {
    setMission({ ...m }); // Deep copy recommended in real app, shallow ok for simple structure
    setSelectedStageId(m.initialStageId);
    setViewMode('edit');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.id && parsed.stages) {
          setMission(parsed);
          setSelectedStageId(parsed.initialStageId || Object.keys(parsed.stages)[0]);
          setViewMode('edit');
        } else {
          alert("유효하지 않은 미션 파일입니다.");
        }
      } catch (err) {
        alert("파일 로드 실패: " + err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // --- Editor Actions ---
  const handleSave = () => {
    if (!mission.title.trim()) {
      alert("미션 제목을 입력해주세요.");
      return;
    }
    if (!mission.stages[mission.initialStageId]) {
      alert("초기 스테이지 ID가 유효하지 않습니다.");
      return;
    }
    onSaveMission(mission);
    setViewMode('list');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(mission, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mission.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Stage Management ---
  const addStage = () => {
    const newId = `stage_${Date.now().toString().slice(-4)}`;
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [newId]: {
          id: newId,
          description: '새로운 스테이지입니다.',
          choices: []
        }
      }
    }));
    setSelectedStageId(newId);
  };

  const deleteStage = (id: string) => {
    if (Object.keys(mission.stages).length <= 1) {
      alert("최소 하나의 스테이지가 필요합니다.");
      return;
    }
    if (id === mission.initialStageId) {
      alert("초기 스테이지는 삭제할 수 없습니다. 다른 스테이지를 초기 스테이지로 설정 후 시도하세요.");
      return;
    }
    const newStages = { ...mission.stages };
    delete newStages[id];
    setMission(prev => ({ ...prev, stages: newStages }));
    setSelectedStageId(Object.keys(newStages)[0]);
  };

  const updateStageDescription = (desc: string) => {
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [selectedStageId]: { ...prev.stages[selectedStageId], description: desc }
      }
    }));
  };

  const toggleVisualEffect = (enabled: boolean) => {
    setMission(prev => {
      const stage = prev.stages[selectedStageId];
      if (enabled) {
        return {
          ...prev,
          stages: {
            ...prev.stages,
            [selectedStageId]: {
              ...stage,
              visualEffect: { type: 'error', text: 'SYSTEM ERROR', duration: 3000 }
            }
          }
        };
      } else {
        const { visualEffect, ...rest } = stage;
        return {
          ...prev,
          stages: {
            ...prev.stages,
            [selectedStageId]: rest
          }
        };
      }
    });
  };

  const updateVisualEffect = (key: string, value: any) => {
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [selectedStageId]: {
          ...prev.stages[selectedStageId],
          visualEffect: {
            ...prev.stages[selectedStageId].visualEffect!,
            [key]: value
          }
        }
      }
    }));
  };

  // --- Choice Management ---
  const addChoice = () => {
    const newChoice: MissionChoice = {
      text: '선택지',
      nextStageId: null,
      risk: 'low'
    };
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [selectedStageId]: {
          ...prev.stages[selectedStageId],
          choices: [...prev.stages[selectedStageId].choices, newChoice]
        }
      }
    }));
  };

  const updateChoice = (index: number, field: keyof MissionChoice, value: any) => {
    const newChoices = [...mission.stages[selectedStageId].choices];
    newChoices[index] = { ...newChoices[index], [field]: value };
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [selectedStageId]: {
          ...prev.stages[selectedStageId],
          choices: newChoices
        }
      }
    }));
  };

  const updateChoiceReward = (index: number, field: 'hp' | 'sanity' | 'credits' | 'destroyPart', value: any) => {
    const newChoices = [...mission.stages[selectedStageId].choices];
    const currentReward = newChoices[index].reward || {};
    
    // 만약 값이 없거나 0(숫자의 경우)이면 필드 삭제 (깔끔한 저장을 위해)
    const newReward = { ...currentReward, [field]: value };
    if (value === 0 || value === '') {
        delete newReward[field];
    }

    newChoices[index] = { 
      ...newChoices[index], 
      reward: newReward
    };
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [selectedStageId]: {
          ...prev.stages[selectedStageId],
          choices: newChoices
        }
      }
    }));
  };

  const removeChoice = (index: number) => {
    const newChoices = mission.stages[selectedStageId].choices.filter((_, i) => i !== index);
    setMission(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [selectedStageId]: {
          ...prev.stages[selectedStageId],
          choices: newChoices
        }
      }
    }));
  };

  // --- RENDER ---

  if (viewMode === 'list') {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[150] backdrop-blur-md p-4">
        <div className="bg-neutral-900 border border-amber-500/30 w-full max-w-4xl h-[80vh] flex flex-col rounded-sm shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-amber-900/50 flex justify-between items-center bg-black/40">
            <div>
              <h2 className="text-2xl font-serif text-amber-500 tracking-widest uppercase flex items-center gap-2"><Map /> Mission Architect</h2>
              <p className="text-xs text-neutral-500 font-mono mt-1">CUSTOMIZE NARRATIVE PROTOCOLS</p>
            </div>
            <button onClick={onClose} className="text-neutral-500 hover:text-amber-500 transition-colors"><X size={24}/></button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button onClick={handleCreateNew} className="p-6 border border-dashed border-amber-500/30 rounded-sm hover:bg-amber-900/10 hover:border-amber-500 transition-all group flex flex-col items-center justify-center gap-3 h-40">
                <Plus size={32} className="text-amber-500/50 group-hover:text-amber-500" />
                <span className="text-amber-500 font-bold uppercase tracking-wider">새 미션 설계</span>
              </button>
              <label className="p-6 border border-dashed border-neutral-700 rounded-sm hover:bg-neutral-800 transition-all group flex flex-col items-center justify-center gap-3 h-40 cursor-pointer">
                <FileJson size={32} className="text-neutral-500 group-hover:text-neutral-300" />
                <span className="text-neutral-400 font-bold uppercase tracking-wider">미션 파일 불러오기 (.json)</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>

            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 border-b border-neutral-800 pb-2">Installed Custom Missions</h3>
            <div className="space-y-2">
              {existingMissions.filter(m => m.id.startsWith('custom_')).length === 0 && <p className="text-neutral-600 italic text-sm">설치된 커스텀 미션이 없습니다.</p>}
              {existingMissions.filter(m => m.id.startsWith('custom_')).map(m => (
                <div key={m.id} className="flex items-center justify-between p-4 bg-neutral-800/30 border border-neutral-800 hover:border-amber-500/30 rounded-sm group transition-all">
                  <div>
                    <h4 className="text-amber-100 font-bold">{m.title}</h4>
                    <p className="text-xs text-neutral-500 mt-1 truncate max-w-md">{m.description}</p>
                  </div>
                  <button onClick={() => handleEditExisting(m)} className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-amber-500 hover:border-amber-500 rounded-sm text-xs font-bold uppercase">Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- EDITOR VIEW ---
  const activeStage = mission.stages[selectedStageId];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[150] backdrop-blur-md p-0 md:p-4">
      <div className="bg-neutral-950 border border-amber-500/30 w-full h-full md:max-w-[90vw] md:h-[90vh] flex flex-col rounded-sm shadow-2xl overflow-hidden font-mono">
        
        {/* Header */}
        <div className="shrink-0 p-4 border-b border-amber-900/50 flex justify-between items-start bg-black/60">
          <div className="flex-1 mr-4 space-y-2">
            <div className="flex gap-2">
              <input 
                value={mission.title} 
                onChange={(e) => setMission({ ...mission, title: e.target.value })}
                placeholder="미션 제목"
                className="bg-transparent text-lg md:text-xl font-bold text-amber-500 placeholder:text-amber-500/30 outline-none w-full border-b border-transparent focus:border-amber-900/50"
              />
            </div>
            <input 
              value={mission.description} 
              onChange={(e) => setMission({ ...mission, description: e.target.value })}
              placeholder="미션에 대한 간단한 설명을 입력하세요..."
              className="bg-transparent text-[10px] md:text-xs text-neutral-400 placeholder:text-neutral-700 outline-none w-full"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="p-2 text-neutral-400 hover:text-blue-400 border border-neutral-800 rounded bg-neutral-900" title="내보내기"><Download size={18} /></button>
            <button onClick={handleSave} className="p-2 text-neutral-400 hover:text-green-400 border border-neutral-800 rounded bg-neutral-900" title="저장"><Save size={18} /></button>
            <button onClick={() => setViewMode('list')} className="p-2 text-neutral-400 hover:text-red-400 border border-neutral-800 rounded bg-neutral-900" title="닫기"><X size={18} /></button>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar (Desktop) / Horizontal Scroll (Mobile): Stages List */}
          <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-amber-900/30 flex flex-col shrink-0 max-h-[30vh] md:max-h-full">
            <div className="p-3 border-b border-amber-900/30 flex justify-between items-center bg-neutral-900/50 shrink-0">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Stages ({Object.keys(mission.stages).length})</span>
              <button onClick={addStage} className="text-amber-500 hover:bg-amber-900/20 p-1 rounded"><Plus size={14}/></button>
            </div>
            <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 space-x-2 md:space-x-0 md:space-y-1 flex md:flex-col custom-scrollbar">
              {Object.keys(mission.stages).map(id => (
                <div 
                  key={id}
                  onClick={() => setSelectedStageId(id)}
                  className={`p-2 rounded cursor-pointer text-xs flex justify-between items-center group flex-shrink-0 w-40 md:w-full border
                    ${selectedStageId === id ? 'bg-amber-900/20 text-amber-100 border-amber-500/30' : 'text-neutral-500 hover:bg-neutral-900 border-transparent bg-neutral-900/30 md:bg-transparent'}`}
                >
                  <div className="flex flex-col truncate w-full">
                    <span className="font-bold truncate">{id}</span>
                    {mission.initialStageId === id && <span className="text-[9px] text-green-500 uppercase tracking-tighter">START POINT</span>}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteStage(id); }}
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-900/20 p-1 rounded ml-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Editor: Stage Details */}
          <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-neutral-900/10">
            {activeStage ? (
              <div className="p-4 md:p-6 space-y-6 md:space-y-8 pb-20">
                {/* Stage Basic Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-amber-500/70 uppercase flex items-center gap-2"><Layout size={14}/> Stage Description</label>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-neutral-500 uppercase">Set as Start</label>
                      <input 
                        type="checkbox" 
                        checked={mission.initialStageId === activeStage.id} 
                        onChange={() => setMission({ ...mission, initialStageId: activeStage.id })}
                        className="accent-amber-600"
                      />
                    </div>
                  </div>
                  <textarea 
                    value={activeStage.description}
                    onChange={(e) => updateStageDescription(e.target.value)}
                    className="w-full h-24 bg-black border border-neutral-800 text-neutral-300 text-sm p-3 rounded focus:border-amber-500/50 outline-none resize-none"
                    placeholder="상황 묘사..."
                  />
                </div>

                {/* Visual Effect Config */}
                <div className="space-y-2 border border-neutral-800 bg-black/20 p-4 rounded-sm">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-purple-400 uppercase flex items-center gap-2"><Zap size={14}/> Visual Effect</label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-neutral-500">{activeStage.visualEffect ? 'ON' : 'OFF'}</span>
                      <button 
                        onClick={() => toggleVisualEffect(!activeStage.visualEffect)}
                        className={`w-8 h-4 rounded-full transition-colors relative ${activeStage.visualEffect ? 'bg-purple-600' : 'bg-neutral-700'}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${activeStage.visualEffect ? 'left-4.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  </div>
                  
                  {activeStage.visualEffect && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-1">Type</label>
                        <select 
                          value={activeStage.visualEffect.type}
                          onChange={(e) => updateVisualEffect('type', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 p-1.5 rounded"
                        >
                          <option value="error">Error Box</option>
                          <option value="flood">Flood Text</option>
                          <option value="system_crash">Blue Screen</option>
                          <option value="vhs_glitch">VHS Glitch</option>
                          <option value="screen_crack">Screen Crack</option>
                          <option value="reality_tear">Reality Tear</option>
                          <option value="neon_flicker">Neon Flicker</option>
                          <option value="hypnotic_loop">Hypnotic Loop</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-1">Text</label>
                        <input 
                          value={activeStage.visualEffect.text}
                          onChange={(e) => updateVisualEffect('text', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 p-1.5 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-1">Color (Tailwind)</label>
                        <input 
                          value={activeStage.visualEffect.color || ''}
                          onChange={(e) => updateVisualEffect('color', e.target.value)}
                          placeholder="text-red-500"
                          className="w-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 p-1.5 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-1">Duration (ms)</label>
                        <input 
                          type="number"
                          value={activeStage.visualEffect.duration || 3000}
                          onChange={(e) => updateVisualEffect('duration', Number(e.target.value))}
                          className="w-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 p-1.5 rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Choices */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-amber-900/30 pb-2">
                    <label className="text-xs font-bold text-amber-500/70 uppercase flex items-center gap-2"><ArrowRight size={14}/> Player Choices</label>
                    <button onClick={addChoice} className="text-[10px] bg-amber-900/20 text-amber-500 px-2 py-1 rounded hover:bg-amber-900/40 uppercase font-bold">+ Add Choice</button>
                  </div>
                  
                  {activeStage.choices.length === 0 && <p className="text-xs text-neutral-600 italic text-center py-4">선택지가 없습니다. (임무 종료 지점)</p>}

                  {activeStage.choices.map((choice, idx) => (
                    <div key={idx} className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-sm space-y-3 relative group">
                      <button onClick={() => removeChoice(idx)} className="absolute top-2 right-2 text-neutral-600 hover:text-red-500"><X size={14}/></button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-[9px] text-neutral-500 mb-1 uppercase">Choice Text</label>
                          <input 
                            value={choice.text}
                            onChange={(e) => updateChoice(idx, 'text', e.target.value)}
                            className="w-full bg-black border border-neutral-700 text-sm text-amber-100 p-2 rounded focus:border-amber-500/50 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-neutral-500 mb-1 uppercase">Next Stage ID</label>
                          <select 
                            value={choice.nextStageId || ''}
                            onChange={(e) => updateChoice(idx, 'nextStageId', e.target.value || null)}
                            className="w-full bg-black border border-neutral-700 text-xs text-neutral-300 p-2 rounded outline-none"
                          >
                            <option value="">(End Mission)</option>
                            {Object.keys(mission.stages).map(sid => (
                              <option key={sid} value={sid}>{sid}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] text-neutral-500 mb-1 uppercase">Risk Level</label>
                          <select 
                            value={choice.risk}
                            onChange={(e) => updateChoice(idx, 'risk', e.target.value)}
                            className="w-full bg-black border border-neutral-700 text-xs text-neutral-300 p-2 rounded outline-none"
                          >
                            <option value="low">Low</option>
                            <option value="high">High</option>
                            <option value="fatal">Fatal</option>
                          </select>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-4 bg-black/30 p-2 rounded border border-neutral-800">
                          <span className="col-span-2 text-[9px] text-neutral-500 uppercase font-bold border-b border-neutral-800 pb-1 mb-1">Rewards & Penalties</span>
                          
                          {/* Sanity */}
                          <div>
                            <span className="text-[9px] text-blue-400 block mb-1">Sanity Change</span>
                            <input 
                              type="number" 
                              value={choice.reward?.sanity || 0} 
                              onChange={(e) => updateChoiceReward(idx, 'sanity', Number(e.target.value))} 
                              className="w-full bg-neutral-900 text-xs text-white p-1 text-center border border-neutral-700 rounded" 
                            />
                          </div>

                          {/* HP */}
                          <div>
                            <span className="text-[9px] text-red-400 block mb-1">HP Change</span>
                            <input 
                              type="number" 
                              value={choice.reward?.hp || 0} 
                              onChange={(e) => updateChoiceReward(idx, 'hp', Number(e.target.value))} 
                              className="w-full bg-neutral-900 text-xs text-white p-1 text-center border border-neutral-700 rounded" 
                            />
                          </div>

                          {/* Credits */}
                          <div>
                            <span className="text-[9px] text-amber-400 block mb-1">Credits Reward</span>
                            <input 
                              type="number" 
                              value={choice.reward?.credits || 0} 
                              onChange={(e) => updateChoiceReward(idx, 'credits', Number(e.target.value))} 
                              className="w-full bg-neutral-900 text-xs text-white p-1 text-center border border-neutral-700 rounded" 
                            />
                          </div>

                          {/* Part Destruction */}
                          <div>
                            <span className="text-[9px] text-red-600 block mb-1 font-bold">Target Part Destruction</span>
                            <select
                              value={choice.reward?.destroyPart || ''}
                              onChange={(e) => updateChoiceReward(idx, 'destroyPart', e.target.value)}
                              className="w-full bg-neutral-900 text-xs text-white p-1 border border-neutral-700 rounded outline-none"
                            >
                              <option value="">None</option>
                              {BODY_PARTS.map(part => (
                                <option key={part} value={part}>{part}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-600">
                스테이지를 선택하거나 추가하세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionBuilder;
