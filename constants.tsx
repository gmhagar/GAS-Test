
import React from 'react';
import { CoverageDetail, TimelineStep, QuizQuestion, Scenario } from './types';

export const TIMELINE_DATA: TimelineStep[] = [
  {
    date: "January 5, 2026",
    title: "Broker Training Launch",
    description: "Industry-wide training launches. All intermediaries, including agents and brokers, must be prepared to promote and advise customers of the July 1 changes as part of their fair treatment obligations and codes of conduct.",
    status: 'current'
  },
  {
    date: "March 21, 2026",
    title: "Technical Implementation",
    description: "Systems must be ready to service customers at the point of renewal. New business processes must be prepared to quote mandatory coverages alongside recommended optional bundles transparently.",
    status: 'upcoming'
  },
  {
    date: "Before July 1, 2026",
    title: "Pre-Reform Period",
    description: "Policies must renew with existing coverages and limits unless agreed otherwise in writing. Intermediaries are expected to clearly inform customers to build awareness before the effective reform date.",
    status: 'upcoming'
  },
  {
    date: "July 1, 2026",
    title: "Effective Date (Go-Live)",
    description: "Changes to SABS optionality and priority of payor take effect. Insurers begin offering policies reflecting these changes. Consumers can now make mid-term changes to pre-July 1 coverage and opt into optional benefits.",
    status: 'upcoming'
  },
  {
    date: "After July 1, 2027",
    title: "Transition Complete",
    description: "The multi-year transition is finalized. Every active policy has now passed a renewal point where the policyholder was required to be informed of their options to add or remove optional accident benefits.",
    status: 'upcoming'
  }
];

export const COVERAGE_GROUPS = [
  "Benefits That Remain Mandatory",
  "Benefits That Are Now Optional (Effective July 1, 2026)",
  "Benefits That Remain Optional"
];

export const COVERAGE_DATA: CoverageDetail[] = [
  // GROUP: Benefits That Remain Mandatory
  {
    id: 'med-rehab',
    group: "Benefits That Remain Mandatory",
    title: "Medical and Rehabilitation Benefit",
    summary: "Covers the cost of reasonable and necessary medical and rehabilitation expenses that are not covered by OHIP or your group insurance plan.",
    mandatory: "For non-catastrophic injuries, the limit is $65,000. For minor injuries, the limit is $3,500.",
    increased: "Optional increase for non-catastrophic injuries to $130,000 or combined $1,000,000 with attendant care. Catastrophic injuries can add $1,000,000.",
    icon: "🏥",
    tip: "Note: Auto insurers are now 'first payor' for these expenses (except medication) before your private health plan."
  },
  {
    id: 'attendant-care',
    group: "Benefits That Remain Mandatory",
    title: "Attendant Care Benefit",
    summary: "If you require an aide or attendant to assist with your personal care after an accident, this benefit will pay for those services.",
    mandatory: "For non-catastrophic injuries, included within the $65,000 med/rehab limit. For catastrophic, the limit is $1,000,000.",
    increased: "Optional increase for non-catastrophic to $72,000 or combined $1,000,000 with med/rehab. Catastrophic injuries can add $1,000,000.",
    icon: "🛌",
    tip: "This coverage is essential for those who live alone and may need professional help with daily tasks like bathing or dressing."
  },

  // GROUP: Benefits That Are Now Optional (Effective July 1, 2026)
  {
    id: 'income-replacement',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Income Replacement Benefit",
    summary: "Previously mandatory; now optional. Provides a weekly payment if you are unable to work as a result of an accident.",
    mandatory: "70% of gross weekly income, up to a maximum of $400 per week (if selected).",
    increased: "Optional benefit to increase the weekly maximum to $600, $800, or $1,000.",
    icon: "💰",
    tip: "Review your workplace Long Term Disability (LTD) policy; you may already have sufficient coverage through your employer."
  },
  {
    id: 'non-earner',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Non-Earner Benefit",
    summary: "Previously mandatory; now optional. Provides a weekly payment if you do not qualify for income replacement and are unable to carry on a normal life.",
    mandatory: "$185 per week with a 4-week waiting period. Payable for up to two years (if selected).",
    increased: "Optional benefit to increase this to $320 per week.",
    icon: "🎓",
    tip: "Highly recommended for students, retirees, or stay-at-home parents who don't have a traditional income to protect."
  },
  {
    id: 'caregiver',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Caregiver Benefit",
    summary: "Previously mandatory for catastrophic injuries; now optional. Covers expenses to hire care if you can no longer care for a dependant.",
    mandatory: "Up to $250/week for first dependant + $50/others (if selected, for catastrophic injuries only).",
    increased: "Optional benefit available to make this coverage applicable for all levels of injury.",
    icon: "👪",
    tip: "Essential for primary caregivers of children or elderly relatives who would need to hire help if injured."
  },
  {
    id: 'housekeeping',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Housekeeping and Home Maintenance",
    summary: "Previously mandatory for catastrophic injuries; now optional. Covers costs of hiring household help.",
    mandatory: "Up to $100 per week (if selected, for catastrophic injuries only).",
    increased: "Optional benefit available to make this coverage applicable for all levels of injury.",
    icon: "🏠",
    tip: "Consider who would handle heavy cleaning or outdoor maintenance if you were temporarily unable to perform these duties."
  },
  {
    id: 'death-benefit',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Death Benefit",
    summary: "Previously mandatory; now optional. A one-time payment to the surviving spouse and dependants of a person who dies as a result of an auto accident.",
    mandatory: "$25,000 to spouse, $10,000 to each dependant (if selected). If none, $25,000 divided among other beneficiaries.",
    increased: "Optional increase to $50,000 for spouse and $20,000 for each dependant.",
    icon: "🕯️",
    tip: "This is a low-cost way to provide immediate cash flow for a family in the event of a tragic accident."
  },
  {
    id: 'funeral-benefit',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Funeral Benefit",
    summary: "Previously mandatory; now optional. A one-time payment to cover the costs of a funeral.",
    mandatory: "Up to $6,000 (if selected).",
    increased: "Optional increase to $8,000 limit.",
    icon: "⚰️",
    tip: "Standard funeral costs in Ontario often exceed the $6,000 base level; the optional increase is usually very affordable."
  },
  {
    id: 'lost-educational',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Lost Educational Expenses",
    summary: "Previously mandatory; now optional. Reimburses students for lost tuition, books, and fees if unable to continue their program.",
    mandatory: "Up to $15,000 (if selected).",
    increased: "No optional increase available.",
    icon: "📚",
    tip: "Crucial for university or college students who have already paid significant tuition for the semester."
  },
  {
    id: 'visitor-expenses',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Expenses of Visitors",
    summary: "Previously mandatory; now optional. Covers expenses of certain family members to visit you during treatment or recovery.",
    mandatory: "Reasonable expenses are covered (if selected).",
    increased: "No optional increase available.",
    icon: "👥",
    tip: "Helps your family be by your side without worrying about travel or lodging costs during a hospital stay."
  },
  {
    id: 'damage-clothing',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Damage to Clothing, Glasses, etc.",
    summary: "Previously mandatory; now optional. Covers cost to replace clothing, glasses, hearing aids, and medical devices damaged in the accident.",
    mandatory: "Reasonable expenses are covered (if selected).",
    increased: "No optional increase available.",
    icon: "👓",
    tip: "Expensive hearing aids or designer eyewear can be costly to replace out-of-pocket after a crash."
  },
  {
    id: 'exam-costs',
    group: "Benefits That Are Now Optional (Effective July 1, 2026)",
    title: "Cost of Examinations",
    summary: "Previously mandatory; now optional. Covers cost of examinations required to assess injuries and determine benefit eligibility.",
    mandatory: "Up to $2,500 (if selected).",
    increased: "No optional increase available.",
    icon: "📝",
    tip: "These exams are often required by the insurer to verify the nature and extent of your disability."
  },

  // GROUP: Benefits That Remain Optional
  {
    id: 'opt-dependant-care',
    group: "Benefits That Remain Optional",
    title: "Optional Dependant Care Benefit",
    summary: "Additional support for caring for dependants if you are employed at the time of the accident.",
    mandatory: "Not provided as a standard benefit.",
    increased: "Pays up to $75/week for first dependant + $25/others, max $150/week.",
    icon: "👶",
    tip: "A dedicated benefit specifically designed for working parents to ensure childcare continues uninterrupted."
  },
  {
    id: 'opt-indexation',
    group: "Benefits That Remain Optional",
    title: "Optional Indexation Benefit",
    summary: "Ensures benefits and monetary limits are adjusted annually for inflation.",
    mandatory: "Not provided as a standard benefit.",
    increased: "Annual adjustment based on the Consumer Price Index (CPI).",
    icon: "📈",
    tip: "Extremely valuable if an injury leads to a long-term disability, as it protects your benefits' value over many years."
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "A customer calls on July 2, 2026, to ask about the recent changes to Ontario auto insurance. Which of the following statements accurately describes the primary change?",
    options: [
      "All accident benefits, including medical and rehabilitation, are now optional to help lower premiums.",
      "Medical, rehabilitation, and attendant care benefits remain mandatory, while other benefits like income replacement have become optional.",
      "The only change is that customers can now add new benefits, but no existing benefits have become optional.",
      "Coverage for passengers and pedestrians has been removed from all policies."
    ],
    correctAnswer: "Medical, rehabilitation, and attendant care benefits remain mandatory, while other benefits like income replacement have become optional.",
    feedbackCorrect: "Correct. It is crucial to explain to customers that core recovery support (medical, rehabilitation, and attendant care) remains mandatory. The new flexibility applies to other benefits, allowing them to tailor their policy.",
    feedbackIncorrect: "That's not quite right. The document states that while many benefits like income replacement are now optional, medical, rehabilitation, and attendant care benefits remain mandatory in all Ontario auto policies to ensure everyone has access to essential recovery support."
  },
  {
    id: 2,
    question: "A client who is self-employed is concerned about losing income if they are injured in an accident after July 1, 2026. Which benefit should you advise them to review to ensure they are protected?",
    options: [
      "Attendant Care Benefit",
      "Caregiver Benefit",
      "Income Replacement Benefit",
      "Non-earner Benefit"
    ],
    correctAnswer: "Income Replacement Benefit",
    feedbackCorrect: "Excellent. The Income Replacement benefit is the specific optional coverage designed to replace lost income due to an auto accident. This is a key consideration for self-employed individuals or those without workplace disability plans.",
    feedbackIncorrect: "While other benefits are important, the Income Replacement benefit is the one that specifically helps replace income lost because of an auto accident. You should confirm with the client if they wish to include this optional coverage."
  }
];

export const SCENARIOS_DATA: Scenario[] = [
  {
    id: 1,
    title: "The Self-Employed Consultant",
    icon: "💻",
    customerProfile: "I'm a self-employed IT consultant and I'm on the road a lot visiting different client sites. Since I'm the primary breadwinner for my family and don't have any private disability or life insurance, I'm really worried about what would happen if I couldn't work after an accident. I usually have my laptop and other expensive gear with me in the car too.",
    correctCoverages: ["Income Replacement", "Housekeeping and Home Maintenance", "Damage to Personal Items"],
    options: ["Income Replacement", "Housekeeping and Home Maintenance", "Damage to Personal Items", "Caregiver Benefit", "Dependant Care", "Non-Earner Benefit"],
    explanation: "Income Replacement is vital as they are the primary breadwinner without private disability. Housekeeping helps if their injury prevents physical home maintenance. Damage to Personal Items covers work equipment like laptops carried for client visits.",
    explanationOption: "I can explain what these benefits cover: Income Replacement provides a weekly payment if you can't work; Housekeeping covers hiring help for home tasks; and Damage to Personal Items assists with items like your work equipment. However, I cannot advise if these are right for you.",
    recommendationOption: "Based on your situation, I strongly recommend you purchase Income Replacement, Housekeeping, and Damage to Personal Items. These are the best options for a self-employed consultant like yourself to stay protected."
  },
  {
    id: 2,
    title: "The Young Family",
    icon: "👨‍👩‍👧‍👦",
    customerProfile: "We're a young family with two toddlers and we're definitely on a tight budget right now. I work in construction, which is really physically demanding, while my partner works part-time and stays home with the kids most of the time. We don't have much in savings, so any time off work would be a huge problem for us.",
    correctCoverages: ["Caregiver Benefit", "Dependant Care", "Income Replacement"],
    options: ["Caregiver Benefit", "Dependant Care", "Income Replacement", "Non-Earner Benefit", "Expenses of Visitors", "Death Benefit"],
    explanation: "Caregiver benefit helps if the primary caregiving parent is injured. Dependant Care provides for toddlers' needs if the parent is incapacitated. Income Replacement is essential to protect the earnings from the physically demanding construction job.",
    explanationOption: "There are optional benefits available: the Caregiver Benefit helps if a parent can't care for children; Dependant Care covers childcare expenses; and Income Replacement helps replace lost wages. You should review your budget and decide which fits your needs.",
    recommendationOption: "You should definitely add the Caregiver Benefit and Dependant Care. With young children and a physically demanding job, you shouldn't risk being without these specific coverages."
  },
  {
    id: 3,
    title: "The Retired Surviving Spouse",
    icon: "👵",
    customerProfile: "I'm retired and living on a fixed pension, but I'm still very active! I drive myself to all my social events and doctor's appointments. My kids all live out of town, so my biggest worry is who would help me keep up with my house or get to see my family if I was ever stuck at home recovering from an accident.",
    correctCoverages: ["Non-Earner Benefit", "Expenses of Visitors", "Housekeeping and Home Maintenance"],
    options: ["Non-Earner Benefit", "Expenses of Visitors", "Housekeeping and Home Maintenance", "Income Replacement", "Dependant Care", "Lost Educational Expenses"],
    explanation: "Non-Earner support is key for retirees. Expenses of Visitors helps out-of-town children travel to support them. Housekeeping assists with chores since the customer lives alone and is very active.",
    explanationOption: "Based on your active lifestyle, you may find the Non-Earner benefit, Expenses of Visitors, and Housekeeping coverage relevant. I can explain the specifics of each, but I cannot recommend which one you should ultimately select.",
    recommendationOption: "I would advise you to take the Non-Earner Benefit and Expenses of Visitors. These are the most appropriate choices for active retirees who live away from their children."
  }
];
