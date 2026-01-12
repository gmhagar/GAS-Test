import React, { useState, useEffect } from 'react';
import { COVERAGE_DATA, COVERAGE_GROUPS } from './constants';
import { CoverageCategory } from './types';
import Timeline from './components/Timeline';
import CoverageCard from './components/CoverageCard';
import Quiz from './components/Quiz';
import { 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X,
  Compass,
  Search,
  Layers,
  ExternalLink,
  BookOpen,
  Info,
  Users,
  UserCheck,
  FileEdit,
  Zap,
  Landmark,
  LayoutGrid,
  CheckCircle2,
  Circle,
  BrainCircuit,
  History,
  MessageSquareQuote,
  Clock,
  ChevronDown,
  List
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'summary' | 'explorer' | 'quiz' | 'resources'>('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top whenever the tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const tabs = [
    { id: 'intro', label: 'Welcome', duration: '1m' },
    { id: 'summary', label: 'Reform Overview', duration: '4m' },
    { id: 'explorer', label: 'Coverage Reference', duration: '5m' },
    { id: 'quiz', label: 'Knowledge Check', duration: '5m' },
    { id: 'resources', label: 'Resources', duration: '2m' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#373737] flex flex-col scroll-smooth">
      {/* Header */}
      <header className="bg-[#003359] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <img 
                src="input_file_1.png" 
                alt="Definity" 
                className="h-8 w-auto min-w-[120px] object-contain block"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold leading-none tracking-tight uppercase">Knowledge Hub</h1>
                <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest mt-1">Ontario AB Modernization</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs lg:text-sm font-bold py-5 border-b-2 transition-all flex items-center gap-1.5 ${activeTab === tab.id ? 'border-[#007db3] text-[#007db3]' : 'border-transparent text-white/70 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#003359] border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setIsMobileMenuOpen(false); }}
                className={`flex justify-between items-center w-full text-left px-4 py-3 rounded text-base font-bold ${activeTab === tab.id ? 'bg-[#007db3] text-white' : 'text-white/70'}`}
              >
                <span>{tab.label}</span>
                <span className="text-xs opacity-60 flex items-center gap-1"><Clock size={12}/> {tab.duration}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'intro' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Introductory Hero Section */}
            <section className="bg-[#f8fafc] rounded-2xl p-8 md:p-16 border border-[#D8DCDB] shadow-sm relative overflow-hidden">
              <div className="absolute top-10 right-10 flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-xl border border-[#D8DCDB] flex flex-col items-center animate-bounce duration-1000">
                  <Clock className="text-[#007db3] mb-1" size={24} />
                  <span className="text-[10px] font-black uppercase text-gray-400">Duration</span>
                  <span className="text-xl font-black text-[#003359]">~17m</span>
                </div>
              </div>

              <div className="max-w-4xl">
                <span className="inline-block px-4 py-1.5 bg-[#007db3]/10 text-[#007db3] text-xs font-black uppercase tracking-[0.2em] rounded-full mb-8 border border-[#007db3]/20">
                  Coming July 1, 2026
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-[#003359] mb-8 leading-[1.1] tracking-tight">
                  Modernizing Ontario <br/>Auto Insurance
                </h2>
                <div className="prose prose-blue prose-xl text-[#373737] space-y-6 max-w-3xl">
                  <p className="leading-relaxed font-medium">
                    Beginning <span className="font-black text-[#007db3]">July 1, 2026</span>, Ontario auto insurance reforms will give customers more choice and control over their Statutory Accident Benefits (SABs).
                  </p>
                  <p className="leading-relaxed text-lg opacity-70">
                    The training offers an overview of the major changes and milestones related to the Ontario Auto Reform, including a refresher on accident benefits coverage. Training related to the processes and systems that apply to your specific role will be provided by your business unit prior to July 1, 2026.
                  </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl border border-[#D8DCDB] shadow-sm hover:shadow-md transition-all group">
                    <div className="bg-[#007db3]/10 p-4 rounded-lg text-[#007db3] w-fit mb-6 group-hover:bg-[#007db3] group-hover:text-white transition-colors">
                      <Search size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-[#003359] mb-3">Core Reference</h4>
                    <p className="text-gray-500 leading-relaxed">A deep dive into the specific shifts of mandatory vs. optional limits for the 2026 modernization.</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-[#007db3] uppercase tracking-widest">
                       <Clock size={12} /> 5 Minutes Theory
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-xl border border-[#D8DCDB] shadow-sm hover:shadow-md transition-all group">
                    <div className="bg-[#006140]/10 p-4 rounded-lg text-[#006140] w-fit mb-6 group-hover:bg-[#006140] group-hover:text-white transition-colors">
                      <Layers size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-[#003359] mb-3">Reform Overview</h4>
                    <p className="text-gray-500 leading-relaxed">Timeline and strategic shifts in the Ontario insurance landscape.</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-[#006140] uppercase tracking-widest">
                       <Clock size={12} /> 4 Minutes Summary
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex items-center gap-6">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className="bg-[#003359] text-white px-10 py-5 rounded-lg font-black uppercase tracking-[0.2em] flex items-center shadow-2xl hover:bg-[#007db3] transition-all group"
                  >
                    Get Started <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Combined Change Summary & Timeline */}
            <div className="space-y-12">
              <section className="bg-white rounded-2xl p-8 md:p-16 border border-[#D8DCDB] shadow-sm">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                   <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">Module 1: Foundations</span>
                  <h2 className="text-4xl font-black text-[#003359] mb-4">Summary of Reform Changes</h2>
                  <p className="text-xl text-gray-500 font-medium">
                    The fundamental shifts in the Ontario auto insurance landscape.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                  {[
                    { icon: Users, title: "Universal Application", text: "Applies to all customers as of July 1, 2026, regardless of renewal date." },
                    { icon: UserCheck, title: "Expanded Definitions", text: "Optional benefits apply to named insureds, spouses, and dependants." },
                    { icon: FileEdit, title: "Default Renewals", text: "Policies renew with existing limits unless requested otherwise in writing." },
                    { icon: Zap, title: "Mid-Term Flexibility", text: "Policyholders can opt out of optional coverages at any point mid-term." },
                    { icon: Landmark, title: "First Payor Status", text: "Auto insurers become primary for med/rehab (except drugs) for accidents.", span: "lg:col-span-2" }
                  ].map((item, i) => (
                    <div key={i} className={`p-8 rounded-xl bg-[#f8fafc] border border-[#D8DCDB]/60 flex flex-col h-full shadow-sm hover:border-[#007db3]/30 transition-all ${item.span || ""}`}>
                      <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center text-[#007db3] shadow-md mb-6 border border-[#D8DCDB]/30">
                        <item.icon size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-[#003359] mb-3">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Summary Table: Mandatory vs Optional */}
                <div className="max-w-4xl mx-auto mb-24">
                  <div className="flex items-center justify-center space-x-3 mb-8">
                    <LayoutGrid className="text-[#007db3]" size={28} />
                    <h3 className="text-2xl font-black text-[#003359]">Benefit Type Comparison</h3>
                  </div>
                  
                  <div className="overflow-hidden rounded-xl border border-[#D8DCDB] shadow-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#003359] text-white">
                          <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Mandatory Benefits</th>
                          <th className="px-8 py-5 text-sm font-black uppercase tracking-widest border-l border-white/10">Optional Benefits (Choice)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D8DCDB]">
                        <tr className="align-top">
                          <td className="px-8 py-8 bg-[#006140]/5">
                            <ul className="space-y-4">
                              <li className="flex items-center text-base font-bold text-[#003359]">
                                <CheckCircle2 size={18} className="mr-3 text-[#006140]" /> Medical & Rehabilitation
                              </li>
                              <li className="flex items-center text-base font-bold text-[#003359]">
                                <CheckCircle2 size={18} className="mr-3 text-[#006140]" /> Attendant Care
                              </li>
                            </ul>
                            <div className="mt-10 p-5 bg-white/70 border-2 border-dashed border-[#006140]/20 rounded-xl">
                              <p className="text-[10px] text-[#006140] font-black uppercase tracking-widest mb-1">Industry Standard</p>
                              <p className="text-sm text-gray-500 leading-relaxed font-medium">Must be included in every policy to meet legal requirements.</p>
                            </div>
                          </td>
                          <td className="px-8 py-8 border-l border-[#D8DCDB] bg-white">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                              {[
                                "Income Replacement",
                                "Non-Earner Benefit",
                                "Caregiver Benefit",
                                "Housekeeping",
                                "Death & Funeral",
                                "Lost Educational",
                                "Expenses of Visitors",
                                "Damage to Clothing",
                                "Cost of Examinations",
                                "Indexation Benefit"
                              ].map(item => (
                                <div key={item} className="flex items-center text-sm font-bold text-gray-600">
                                  <div className="w-2 h-2 rounded-full bg-[#007db3] mr-3" /> {item}
                                </div>
                              ))}
                            </div>
                            <div className="mt-10 p-5 bg-[#007db3]/5 border-2 border-dashed border-[#007db3]/20 rounded-xl">
                              <p className="text-[10px] text-[#007db3] font-black uppercase tracking-widest mb-1">Customer Choice</p>
                              <p className="text-sm text-gray-500 leading-relaxed font-medium">Policyholders can opt-out of these to potentially lower premiums.</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Timeline Component */}
                <div className="max-w-4xl mx-auto pt-20 border-t border-[#D8DCDB]">
                  <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <History className="text-[#007db3]" size={32} />
                      <h3 className="text-3xl font-black text-[#003359]">Implementation Roadmap</h3>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                      Key milestones for the transition to the new 2026 framework.
                    </p>
                  </div>
                  <Timeline />
                </div>
              </section>
            </div>

            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setActiveTab('explorer')}
                className="bg-[#003359] text-white px-10 py-5 rounded-lg font-black uppercase tracking-[0.2em] flex items-center shadow-2xl hover:bg-[#007db3] transition-all group"
              >
                Next: Coverage Reference <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'explorer' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
               <span className="inline-block px-4 py-1.5 bg-[#FF8C11]/10 text-[#FF8C11] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">Module 2: Deep Dive</span>
              <h2 className="text-4xl font-black text-[#003359] mb-4">Benefit Reference Catalog</h2>
              <p className="text-xl text-gray-500 font-medium">Comprehensive comparison of coverage levels effective July 1, 2026.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Sticky Table of Contents Sidebar */}
              <aside className="lg:sticky lg:top-24 w-full lg:w-72 shrink-0">
                <div className="bg-[#f8fafc] border border-[#D8DCDB] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="bg-[#003359] p-2 rounded-lg text-white">
                      <List size={18} />
                    </div>
                    <span className="font-black text-[#003359] uppercase text-[10px] tracking-widest">Quick Navigation</span>
                  </div>
                  <nav className="space-y-2">
                    {COVERAGE_GROUPS.map((group) => (
                      <button
                        key={group}
                        onClick={() => scrollToSection(group.replace(/\s+/g, '-'))}
                        className="w-full text-left p-4 rounded-lg text-sm font-bold text-gray-500 hover:bg-white hover:text-[#007db3] hover:shadow-sm border border-transparent hover:border-[#D8DCDB] transition-all flex justify-between items-center group"
                      >
                        <span className="line-clamp-1">{group}</span>
                        <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 -rotate-90 transition-all" />
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Coverage Content */}
              <div className="flex-grow space-y-20">
                {COVERAGE_GROUPS.map(groupName => (
                  <section 
                    key={groupName} 
                    id={groupName.replace(/\s+/g, '-')} 
                    className="space-y-6 scroll-mt-24"
                  >
                    <div className="flex items-center space-x-4 border-b-4 border-[#003359] pb-4">
                      <div className="bg-[#003359] p-3 rounded-lg text-white">
                        <Layers size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-[#003359] tracking-tight">{groupName}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {COVERAGE_DATA
                        .filter(item => item.group === groupName)
                        .map(coverage => (
                          <CoverageCard key={coverage.id} coverage={coverage} />
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="mt-20 flex justify-center">
              <button 
                onClick={() => setActiveTab('quiz')}
                className="bg-[#003359] text-white px-10 py-5 rounded-lg font-black uppercase tracking-[0.2em] flex items-center shadow-2xl hover:bg-[#007db3] transition-all group"
              >
                Next: Knowledge Check <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-[#007db3]/10 text-[#007db3] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">Module 3: Assessment</span>
              <h2 className="text-4xl font-black text-[#003359] mb-4">Reform Knowledge Check</h2>
              <p className="text-xl text-gray-500 font-medium">Test your understanding of the SABS changes.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Quiz />
            </div>

            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setActiveTab('resources')}
                className="bg-[#003359] text-white px-10 py-5 rounded-lg font-black uppercase tracking-[0.2em] flex items-center shadow-2xl hover:bg-[#007db3] transition-all group"
              >
                Next: Resources <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
             <div className="text-center mb-16">
               <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">Module 4: Support</span>
              <h2 className="text-4xl font-black text-[#003359] mb-4">Training Materials & Handouts</h2>
            </div>

            <section className="bg-white rounded-2xl p-8 md:p-16 border border-[#D8DCDB] shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-10 mb-16 border-b border-[#D8DCDB] pb-16">
                <div className="bg-gradient-to-br from-[#003359] to-[#007db3] p-8 rounded-xl text-white shadow-2xl">
                  <BookOpen size={64} />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-3xl font-black text-[#003359] mb-4">SABS Transition Resources</h2>
                  <p className="text-xl text-gray-500 leading-relaxed font-medium">
                    As we navigate the transition to the modernized framework, use these official communication toolkits to stay compliant.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    label: "IBAO", 
                    title: "Broker Reforms Hub", 
                    text: "Comprehensive training specifically designed for Ontario insurance brokers.", 
                    link: "https://ibao.org/ontario-auto" 
                  },
                  { 
                    label: "RIBO", 
                    title: "Compliance Standards", 
                    text: "Regulatory directives regarding the disclosure of optional accident benefits.", 
                    link: "https://www.ribo.com/optional-accident-benefits-in-auto-insurance/" 
                  },
                  { 
                    label: "FSRA", 
                    title: "Communications Toolkit", 
                    text: "Fact sheets and tools to help explain changes clearly to policyholders.", 
                    link: "https://www.fsrao.ca/auto-insurance-reforms-communications-toolkit" 
                  }
                ].map((res, i) => (
                  <a 
                    key={i}
                    href={res.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-[#f8fafc] p-8 rounded-xl border border-[#D8DCDB]/60 hover:border-[#007db3] hover:bg-white hover:shadow-2xl transition-all flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 bg-white border border-[#D8DCDB] rounded-lg font-black text-[#003359] text-[10px] tracking-widest uppercase shadow-sm group-hover:bg-[#007db3] group-hover:text-white transition-colors">{res.label}</span>
                      <ExternalLink size={20} className="text-[#D8DCDB] group-hover:text-[#007db3] transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-[#003359] mb-4">{res.title}</h4>
                    <p className="text-gray-500 leading-relaxed font-medium text-sm flex-grow">{res.text}</p>
                    <div className="mt-8 pt-6 border-t border-[#D8DCDB]/40 text-xs font-black text-[#007db3] uppercase tracking-[0.2em] flex items-center gap-2">
                      Access Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D8DCDB] py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
             <div className="opacity-90">
                <img 
                  src="input_file_0.png" 
                  alt="Definity" 
                  className="h-10 w-auto min-w-[150px] object-contain block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
             </div>
          </div>
          <p className="text-[#373737]/30 text-[9px] text-center max-w-2xl mx-auto leading-relaxed uppercase font-black tracking-[0.3em]">
            INTERNAL USE ONLY. PROPRIETARY AND CONFIDENTIAL TRAINING MATERIAL FOR DEFINITY EMPLOYEES AND AUTHORIZED PARTNERS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;