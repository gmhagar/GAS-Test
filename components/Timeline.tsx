
import React from 'react';
import { TIMELINE_DATA } from '../constants';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      {TIMELINE_DATA.map((step, idx) => (
        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Dot */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${
            step.status === 'completed' ? 'bg-green-500 text-white' : 
            step.status === 'current' ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-slate-200 text-slate-500'
          }`}>
            {step.status === 'completed' ? <CheckCircle size={18} /> : 
             step.status === 'current' ? <Clock size={18} /> : <Calendar size={18} />}
          </div>
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-bold text-slate-900">{step.title}</div>
              <time className="font-medium text-indigo-600 text-sm">{step.date}</time>
            </div>
            <div className="text-slate-500 text-sm leading-relaxed">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
