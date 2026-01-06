
export type CoverageCategory = 'mandatory' | 'optional';

export interface CoverageDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: CoverageCategory;
  standardLimit: string;
  optionalLimit?: string;
  whyItMatters: string;
  icon: string;
}

export interface TimelineStep {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
