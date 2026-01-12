
export type CoverageCategory = 'mandatory' | 'optional';

export interface CoverageDetail {
  id: string;
  title: string;
  summary: string;
  mandatory: string;
  increased: string;
  group: string;
  icon: string;
  tip?: string;
}

export interface TimelineStep {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface Scenario {
  id: number;
  title: string;
  icon: string;
  customerProfile: string;
  correctCoverages: string[];
  options: string[];
  explanation: string;
  explanationOption: string;
  recommendationOption: string;
}
