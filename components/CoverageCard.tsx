
import React, { useState } from 'react';
import { CoverageDetail } from '../types';
import { ChevronDown, ChevronUp, Info, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
  coverage: CoverageDetail;
}

const CoverageCard: React.FC<Props> = ({ coverage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-xl transition-all duration-300 overflow-hidden ${
      isOpen ? 'border-indigo-500 shadow-md ring-1 ring-indigo-100 bg-white' : 'border-slate-200 bg-white hover:border-slate-300'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-start text-left space-x-4 focus:outline-none"
      >
        <span className="text-3xl shrink-0 mt-1">{coverage.icon}</span>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900">{coverage.title}</h3>
            {coverage.category === 'mandatory' ? (
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded-full border border-indigo-100 flex items-center">
                <ShieldCheck size={10} className="mr-1" /> Mandatory
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase rounded-full border border-amber-100 flex items-center">
                <ShieldAlert size={10} className="mr-1" /> Optional
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm mt-1">{coverage.shortDesc}</p>
        </div>
        <div className={`mt-2 ${isOpen ? 'text-indigo-600' : 'text-slate-400'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-5 pt-1 space-y-4 border-t border-slate-50 mt-1">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{coverage.fullDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Standard (Mandatory)</h4>
              <p className="text-slate-900 text-sm font-medium">{coverage.standardLimit}</p>
            </div>
            {coverage.optionalLimit && (
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                <h4 className="text-xs font-bold text-indigo-500 uppercase mb-1">Optional Upgrade</h4>
                <p className="text-indigo-900 text-sm font-medium">{coverage.optionalLimit}</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start space-x-3">
            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-700 uppercase mb-0.5">Why this matters</h4>
              <p className="text-blue-800 text-xs leading-normal">{coverage.whyItMatters}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverageCard;
