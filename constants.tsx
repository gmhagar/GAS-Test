
import React from 'react';
import { CoverageDetail, TimelineStep } from './types';

export const TIMELINE_DATA: TimelineStep[] = [
  {
    date: "April 2024",
    title: "Ontario Budget Announcement",
    description: "The provincial government announced a plan to provide drivers with more choice and lower premiums through insurance reform.",
    status: 'completed'
  },
  {
    date: "Late 2024 - 2025",
    title: "Regulatory Development",
    description: "FSRA (Financial Services Regulatory Authority of Ontario) consults with stakeholders to finalize the new benefit structures.",
    status: 'current'
  },
  {
    date: "July 2026 (Targeted)",
    title: "Implementation",
    description: "New policies issued after this date will reflect the revised mandatory and optional benefit choices.",
    status: 'upcoming'
  }
];

export const COVERAGE_DATA: CoverageDetail[] = [
  {
    id: 'med-rehab-attendant',
    title: "Medical, Rehabilitation & Attendant Care",
    shortDesc: "Covers medical expenses, physical therapy, and personal care support.",
    fullDesc: "This combines three critical benefits. It pays for reasonable medical and rehabilitation expenses (like physiotherapy, chiropractic care) and attendant care (assistance with personal hygiene, dressing) if you are injured in an accident.",
    category: 'mandatory',
    standardLimit: "$65,000 for non-catastrophic injuries; $1M for catastrophic.",
    optionalLimit: "Can be increased to $1M for non-catastrophic and an additional $1M for catastrophic.",
    whyItMatters: "These are the core funds that help you recover physically. Without sufficient limits, high-cost therapy could become an out-of-pocket expense.",
    icon: '🏥'
  },
  {
    id: 'income-replacement',
    title: "Income Replacement Benefit",
    shortDesc: "Replaces 70% of your gross weekly income if you can't work.",
    fullDesc: "If you are unable to work as a result of the accident, this benefit provides a weekly payment to help cover your lost wages.",
    category: 'mandatory',
    standardLimit: "70% of gross weekly income up to $400/week.",
    optionalLimit: "Can be increased to $600, $800, or $1,000 per week.",
    whyItMatters: "For many, $400/week is insufficient to cover rent, mortgage, or basic bills. Increasing this is vital for primary breadwinners.",
    icon: '💰'
  },
  {
    id: 'caregiver',
    title: "Caregiver Benefit",
    shortDesc: "Provides reimbursement for hiring help to care for dependents.",
    fullDesc: "If you are the primary caregiver for a child or dependent and can no longer perform those duties, this benefit covers the cost of hiring help.",
    category: 'optional',
    standardLimit: "Only available for catastrophic injuries by default.",
    optionalLimit: "Can be extended to all injuries ($250/week for first dependent + $50 for others).",
    whyItMatters: "Stay-at-home parents or those caring for elderly relatives need this if they suddenly cannot perform their daily responsibilities.",
    icon: '👪'
  },
  {
    id: 'housekeeping',
    title: "Housekeeping & Home Maintenance",
    shortDesc: "Covers the cost of hiring someone to help with chores.",
    fullDesc: "If you can no longer perform your usual housekeeping or home maintenance duties, this benefit pays for someone to do them for you.",
    category: 'optional',
    standardLimit: "Only available for catastrophic injuries by default.",
    optionalLimit: "Can be extended to all injuries (Up to $100/week).",
    whyItMatters: "Recovery is difficult if you're forced to perform heavy cleaning or maintenance. This benefit ensures your home remains liveable.",
    icon: '🏠'
  },
  {
    id: 'death-funeral',
    title: "Death & Funeral Benefits",
    shortDesc: "Lump sum payment to your survivors and funeral costs.",
    fullDesc: "Provides a payment to your spouse and dependents in the event of your death, plus a fixed amount for funeral expenses.",
    category: 'mandatory',
    standardLimit: "$25,000 to spouse; $10,000 to each dependent; $6,000 for funeral.",
    optionalLimit: "Can be increased to $50,000 for spouse; $20,000 for dependents; $8,000 for funeral.",
    whyItMatters: "Helps your family bridge the financial gap during an incredibly difficult time.",
    icon: '🕯️'
  }
];
