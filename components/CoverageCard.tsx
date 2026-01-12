
import React, { useState } from 'react';
import { CoverageDetail } from '../types';
import { ChevronDown, ChevronUp, ShieldCheck, ShieldAlert, Lightbulb } from 'lucide-react';

interface Props {
  coverage: CoverageDetail;
}

const CoverageCard: React.FC<Props> = ({ coverage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMandatoryGroup = coverage.group.includes("Mandatory");
  const isNowOptionalGroup = coverage.group.includes("Now Optional");

  const hasOptionalIncrease = coverage.increased && !coverage.increased.toLowerCase().includes("no optional increase available");

  return (
    <div className={`border rounded-lg transition-all duration-300 overflow-hidden ${
      isOpen ? 'border-[#007db3] shadow-md ring-1 ring-[#007db3]/10 bg-white' : 'border-[#D8DCDB] bg-white hover:border-[#007db3]'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-start text-left space-x-4 focus:outline-none"
      >
        <span className="text-3xl shrink-0 mt-1">{coverage.icon}</span>
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[#003359]">{coverage.title}</h3>
            
            {isMandatoryGroup && (
              <span className="px-2 py-0.5 bg-[#006140] text-white text-[10px] font-bold uppercase rounded flex items-center">
                <ShieldCheck size={10} className="mr-1" /> Mandatory Core
              </span>
            )}
            
            {isNowOptionalGroup && (
              <span className="px-2 py-0.5 bg-[#007db3] text-white text-[10px] font-bold uppercase rounded flex items-center">
                <ShieldAlert size={10} className="mr-1" /> Now Optional
              </span>
            )}
          </div>
          <p className="text-[#373737] opacity-70 text-sm mt-1">{coverage.summary}</p>
        </div>
        <div className={`mt-2 ${isOpen ? 'text-[#007db3]' : 'text-[#D8DCDB]'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-5 pt-1 space-y-4 border-t border-[#D8DCDB]/30 mt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#D8DCDB]/20 p-4 rounded-md border border-[#D8DCDB]">
              <h4 className="text-xs font-bold text-[#373737]/60 uppercase mb-2 flex items-center">
                Standard / Base Level
              </h4>
              <p className="text-[#003359] text-sm leading-relaxed">{coverage.mandatory}</p>
            </div>
            
            <div className={`p-4 rounded-md border ${hasOptionalIncrease || !isMandatoryGroup && !isNowOptionalGroup ? 'bg-[#FF8C11]/5 border-[#FF8C11]/20' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
              <h4 className={`text-xs font-bold uppercase mb-2 flex items-center ${hasOptionalIncrease || !isMandatoryGroup && !isNowOptionalGroup ? 'text-[#FF8C11]' : 'text-gray-400'}`}>
                Optional / Enhanced Level
              </h4>
              <p className={`${hasOptionalIncrease || !isMandatoryGroup && !isNowOptionalGroup ? 'text-[#003359]' : 'text-gray-500'} text-sm leading-relaxed`}>
                {coverage.increased}
              </p>
            </div>
          </div>

          {coverage.tip && (
            <div className="bg-[#007db3]/5 border border-dashed border-[#007db3]/30 p-4 rounded-lg flex items-start space-x-3">
              <Lightbulb className="text-[#007db3] shrink-0 mt-0.5" size={18} />
              <div className="text-sm italic text-[#003359]/80 leading-relaxed">
                <span className="font-bold not-italic text-[#007db3] mr-1">Expert Tip:</span> {coverage.tip}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoverageCard;
