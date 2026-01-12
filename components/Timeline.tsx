
import React from 'react';
import { TIMELINE_DATA } from '../constants';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#D8DCDB] before:to-transparent">
      {TIMELINE_DATA.map((step, idx) => (
        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Dot */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${
            step.status === 'completed' ? 'bg-[#006140] text-white' : 
            step.status === 'current' ? 'bg-[#007db3] text-white ring-4 ring-[#007db3]/10' : 'bg-[#D8DCDB] text-[#373737]'
          }`}>
            {step.status === 'completed' ? <CheckCircle size={18} /> : 
             step.status === 'current' ? <Clock size={18} /> : <Calendar size={18} />}
          </div>
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-[#D8DCDB] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-bold text-[#003359]">{step.title}</div>
              <time className="font-medium text-[#007db3] text-sm">{step.date}</time>
            </div>
            <div className="text-[#373737] text-sm leading-relaxed opacity-80">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
