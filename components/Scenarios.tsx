
import React, { useState, useEffect } from 'react';
import { SCENARIOS_DATA, COVERAGE_DATA } from '../constants';
import { 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  User, 
  ShieldQuestion, 
  Info, 
  MessageSquare, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  X,
  Loader2,
  Quote
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type Step = 'selection' | 'coverage_results' | 'dialogue' | 'feedback';

const Scenarios: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [selectedDialogue, setSelectedDialogue] = useState<'explanation' | 'recommendation' | null>(null);
  const [customerImage, setCustomerImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const scenario = SCENARIOS_DATA[currentScenarioIndex];

  // Helper to generate image via Gemini
  useEffect(() => {
    const generatePortrait = async () => {
      if (!process.env.API_KEY) return;
      
      setIsGeneratingImage(true);
      setCustomerImage(null);
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `A professional, realistic portrait of a customer for an insurance app. Character: ${scenario.title}. Context: ${scenario.customerProfile}. Style: Cinematic, high quality, soft lighting, close-up.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            }
          }
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (imagePart?.inlineData) {
          setCustomerImage(`data:image/png;base64,${imagePart.inlineData.data}`);
        }
      } catch (err) {
        console.error("Failed to generate customer image:", err);
      } finally {
        setIsGeneratingImage(false);
      }
    };

    generatePortrait();
  }, [currentScenarioIndex, scenario.title, scenario.customerProfile]);

  // Helper to get coverage summary from constants (ensures consistency with Coverage Reference)
  const getCoverageSummary = (title: string) => {
    return COVERAGE_DATA.find(c => c.title === title)?.summary || "Benefit explanation currently unavailable.";
  };

  const handleToggleOption = (option: string) => {
    if (currentStep !== 'selection') return;
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleCheckSelection = () => {
    setCurrentStep('coverage_results');
  };

  const handleProceedToDialogue = () => {
    setCurrentStep('dialogue');
  };

  const handleSelectDialogue = (choice: 'explanation' | 'recommendation') => {
    setSelectedDialogue(choice);
    setCurrentStep('feedback');
  };

  const handleNext = () => {
    if (currentScenarioIndex < SCENARIOS_DATA.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setCurrentScenarioIndex(0);
    }
    setSelectedOptions([]);
    setCurrentStep('selection');
    setSelectedDialogue(null);
  };

  const isSelectionCorrect = () => {
    const correctCount = selectedOptions.filter(o => scenario.correctCoverages.includes(o)).length;
    return correctCount === scenario.correctCoverages.length && selectedOptions.length === scenario.correctCoverages.length;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Immersive Scenario Header */}
      <div className="bg-gradient-to-br from-[#003359] to-[#004d80] text-white rounded-2xl p-1 shadow-2xl overflow-hidden">
        <div className="bg-[#003359]/40 backdrop-blur-sm p-8 md:p-10 rounded-xl flex flex-col md:flex-row gap-8 items-center">
          {/* Customer Portrait Section */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white/20 overflow-hidden bg-white/5 flex items-center justify-center shadow-inner">
              {isGeneratingImage ? (
                <Loader2 className="animate-spin text-white/50" size={40} />
              ) : customerImage ? (
                <img src={customerImage} alt="Customer Portrait" className="w-full h-full object-cover animate-in fade-in zoom-in-90 duration-700" />
              ) : (
                <div className="text-6xl">{scenario.icon}</div>
              )}
            </div>
            {!isGeneratingImage && (
              <div className="absolute -bottom-2 -right-2 bg-[#007db3] p-3 rounded-lg border-4 border-[#003359] shadow-lg animate-in bounce-in duration-500">
                {scenario.icon === "👵" ? <User size={20} /> : <User size={20} />}
              </div>
            )}
          </div>

          <div className="flex-grow space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Scenario Profile</span>
              <h3 className="text-3xl font-black tracking-tight">{scenario.title}</h3>
            </div>
            
            <div className="relative">
              <Quote className="absolute -top-4 -left-6 text-white/10 rotate-180" size={60} />
              <p className="text-xl md:text-2xl font-light leading-relaxed italic text-blue-50/90 relative z-10 pl-2">
                "{scenario.customerProfile}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: Selection Area */}
      {currentStep === 'selection' && (
        <div className="bg-white rounded-xl p-8 border border-[#D8DCDB] shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-6">
            <ShieldQuestion className="text-[#007db3]" size={20} />
            <h4 className="font-bold text-[#003359] text-lg">Which 3 benefits should you explain to this customer?</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {scenario.options.map((option, idx) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <button
                  key={idx}
                  onClick={() => handleToggleOption(option)}
                  className={`p-6 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                    isSelected ? 'border-[#007db3] bg-[#007db3]/5 text-[#007db3] shadow-md transform -translate-y-1' : 'border-[#D8DCDB] hover:border-[#007db3]/50 text-[#373737]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-current border-current' : 'border-[#D8DCDB]'
                  }`}>
                    {isSelected && <Check size={16} className="text-white" />}
                  </div>
                  <span className="font-bold text-base">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center bg-[#f8fafc] p-4 rounded-xl border border-[#D8DCDB]/50">
            <p className="text-sm text-[#373737]/60 italic">Selected {selectedOptions.length} of 3</p>
            <button
              disabled={selectedOptions.length !== 3}
              onClick={handleCheckSelection}
              className={`px-10 py-4 rounded-lg font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
                selectedOptions.length === 3 ? 'bg-[#003359] text-white hover:bg-[#007db3] transform hover:scale-105 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Check Match
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Coverage Feedback Area */}
      {currentStep === 'coverage_results' && (
        <div className="bg-white rounded-xl p-8 border border-[#D8DCDB] shadow-sm animate-in fade-in duration-300">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8 border-b border-[#D8DCDB] pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-[#007db3]/10 p-2 rounded-lg text-[#007db3]">
                  <span className="shrink-0"><Info size={24} /></span>
                </div>
                <h4 className="font-black text-[#003359] text-xl uppercase tracking-tight">Coverage Analysis</h4>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${isSelectionCorrect() ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {isSelectionCorrect() ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                {isSelectionCorrect() ? 'Exact Match' : 'Strategic Misalignment'}
              </div>
            </div>

            <div className="space-y-8">
              {/* Categorized Display: Applies vs Doesn't Apply */}
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#006140] mb-4 px-2 border-l-4 border-[#006140]">Relevant Priority Benefits</h5>
                <div className="space-y-4">
                  {scenario.options.filter(o => scenario.correctCoverages.includes(o)).map((option, idx) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                      <div key={idx} className={`p-5 rounded-xl border-2 transition-all bg-white shadow-sm ${isSelected ? 'border-[#006140] ring-4 ring-[#006140]/5' : 'border-gray-100 opacity-60'}`}>
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-grow space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-[#003359] text-lg">{option}</span>
                              {isSelected ? (
                                <span className="px-3 py-1 bg-[#006140] text-white text-[10px] font-black uppercase rounded-full shadow-sm">Your Match</span>
                              ) : (
                                <span className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] font-black uppercase rounded-full">Missed Benefit</span>
                              )}
                            </div>
                            <p className="text-sm text-[#373737]/80 leading-relaxed font-medium italic border-l-2 border-gray-100 pl-4">{getCoverageSummary(option)}</p>
                          </div>
                          {isSelected ? <CheckCircle size={24} className="text-[#006140] shrink-0" /> : <XCircle size={24} className="text-gray-200 shrink-0" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 px-2 border-l-4 border-gray-200">Secondary / Non-Prioritized</h5>
                <div className="space-y-4">
                  {scenario.options.filter(o => !scenario.correctCoverages.includes(o)).map((option, idx) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                      <div key={idx} className={`p-5 rounded-xl border-2 transition-all bg-white ${isSelected ? 'border-[#cc0000] ring-4 ring-[#cc0000]/5' : 'border-gray-50 opacity-40 grayscale'}`}>
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-grow space-y-2">
                            <div className="flex items-center gap-3">
                              <span className={`font-black text-lg ${isSelected ? 'text-[#cc0000]' : 'text-gray-400'}`}>{option}</span>
                              {isSelected && (
                                <span className="px-3 py-1 bg-[#cc0000] text-white text-[10px] font-black uppercase rounded-full shadow-sm">Incorrect Focus</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium italic border-l-2 border-gray-100 pl-4">{getCoverageSummary(option)}</p>
                          </div>
                          {isSelected ? <XCircle size={24} className="text-[#cc0000] shrink-0" /> : <X size={24} className="text-gray-100 shrink-0" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-8 rounded-xl bg-[#003359]/5 border-2 border-[#003359]/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={100} />
              </div>
              <h5 className="font-black text-[#003359] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#007db3] rounded-full"></div>
                Strategy Review
              </h5>
              <p className="text-lg leading-relaxed text-[#003359] font-medium max-w-2xl">{scenario.explanation}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#D8DCDB]">
            <button
              onClick={handleProceedToDialogue}
              className="bg-[#003359] text-white px-10 py-4 rounded-lg font-black uppercase tracking-widest shadow-2xl hover:bg-[#007db3] transition-all flex items-center group"
            >
              Step 2: Role-Play <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Dialogue Choice Area */}
      {currentStep === 'dialogue' && (
        <div className="bg-white rounded-xl p-8 border border-[#D8DCDB] shadow-sm animate-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="bg-[#007db3]/10 p-4 rounded-xl text-[#007db3] mb-4">
              <MessageSquare size={32} />
            </div>
            <h4 className="text-2xl font-black text-[#003359] uppercase tracking-tight">How should you speak with the customer?</h4>
            <p className="text-gray-500 mt-2 font-medium">Choose the response that maintains regulatory compliance.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <button
              onClick={() => handleSelectDialogue('explanation')}
              className="w-full p-8 text-left rounded-xl border-2 border-[#D8DCDB] hover:border-[#007db3] hover:bg-[#007db3]/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-[#D8DCDB] group-hover:text-[#007db3]/20 transition-colors">
                <Info size={40} />
              </div>
              <p className="text-[#373737] italic leading-relaxed text-xl font-medium pr-12 group-hover:text-[#003359]">
                "{scenario.explanationOption}"
              </p>
            </button>

            <button
              onClick={() => handleSelectDialogue('recommendation')}
              className="w-full p-8 text-left rounded-xl border-2 border-[#D8DCDB] hover:border-[#007db3] hover:bg-[#007db3]/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-[#D8DCDB] group-hover:text-[#007db3]/20 transition-colors">
                <AlertTriangle size={40} />
              </div>
              <p className="text-[#373737] italic leading-relaxed text-xl font-medium pr-12 group-hover:text-[#003359]">
                "{scenario.recommendationOption}"
              </p>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Final Compliance Feedback */}
      {currentStep === 'feedback' && (
        <div className="bg-white rounded-xl p-8 border border-[#D8DCDB] shadow-sm animate-in slide-in-from-top-4 duration-500">
          <div className="space-y-8">
            <div className={`p-8 rounded-xl border-4 ${selectedDialogue === 'explanation' ? 'bg-[#006140]/5 border-[#006140]/20' : 'bg-[#cc0000]/5 border-[#cc0000]/20'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${selectedDialogue === 'explanation' ? 'bg-[#006140] text-white' : 'bg-[#cc0000] text-white shadow-lg shadow-[#cc0000]/20'}`}>
                  {selectedDialogue === 'explanation' ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
                </div>
                <h5 className={`text-2xl font-black uppercase tracking-tight ${selectedDialogue === 'explanation' ? 'text-[#006140]' : 'text-[#cc0000]'}`}>
                  {selectedDialogue === 'explanation' ? 'Match Successful' : 'Compliance Failure'}
                </h5>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-[#373737] font-medium leading-relaxed">
                  {selectedDialogue === 'explanation' 
                    ? "Excellent choice. You provided a clear explanation of the benefits available to them while explicitly stating that you cannot advise on the final selection. This protects both the customer's autonomy and the company's regulatory standing."
                    : "Caution: In your response, you recommended specific coverages. Our role is strictly limited to explaining coverage definitions and levels. Recommending products is a regulated activity that must be handled by licensed advisors."}
                </p>
                
                <div className="bg-white/80 backdrop-blur p-8 rounded-xl border-2 border-dashed border-[#007db3]/30 shadow-xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-5">
                    <ShieldCheck size={180} />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-1 bg-[#007db3] rounded-full"></div>
                    <span className="font-black text-[#003359] uppercase text-xs tracking-[0.4em]">The Golden Rule</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-2">
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Required</p>
                      <p className="text-xl font-bold text-[#003359] leading-tight">Explain the <span className="text-[#007db3]">What</span> (Definition) and the <span className="text-[#007db3]">How</span> (Process).</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Prohibited</p>
                      <p className="text-xl font-bold text-[#cc0000] leading-tight underline decoration-4 underline-offset-8 decoration-[#cc0000]/20">Never Recommend <span className="underline decoration-[#cc0000]">Which One</span> they should choose.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="bg-[#003359] text-white px-12 py-5 rounded-lg font-black uppercase tracking-[0.2em] flex items-center shadow-2xl hover:bg-[#007db3] transition-all group"
              >
                {currentScenarioIndex < SCENARIOS_DATA.length - 1 ? 'Next Scenario' : 'Review Complete'} <ChevronRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scenarios;
