
export enum AcademicLevel {
  Bachelor = "Bachelor",
  Master = "Master",
  PhD = "PhD"
}

export enum ResearchType {
  Quantitative = "Quantitative",
  Qualitative = "Qualitative"
}

export type ResearchFoundation = "Media" | "Social" | "Economic" | "Educational" | "Psychological" | "Administrative" | "Technical" | "Legal" | "Humanities" | "Other";

export type Language = 'ar' | 'en';

export interface Theory {
  name: string;
  match_reason: string;
  background?: string;
  principles?: string[];
  key_concepts?: string[];
}

export interface StudyHypothesis {
  text: string;
  derived_from: string[]; // List of core theory hypotheses text it stems from
}

export interface Report {
  theory_integration: string;
  independent_variable: string;
  dependent_variable: string;
  theory_hypotheses: string[]; // These are the core axioms of the theory
  study_hypotheses: StudyHypothesis[];  // These are the generated study-specific ones with mapping
  mermaid_diagram: string; // Mermaid.js graph definition
}

export interface ComparisonResult {
  common_ground: string;
  key_differences: string;
  analysis: {
    theory_name: string;
    pros: string;
    cons: string;
  }[];
  recommendation: string;
}

export interface AppState {
  language: Language | null;
  step: 0 | 1 | 2 | 3 | 4; // 0: Lang, 1: Input, 2: Theories, 3: Hypotheses Pick, 4: Report
  academicLevel: AcademicLevel;
  researchType: ResearchType;
  researchFoundation: string;
  researchTitle: string;
  suggestedTheories: Theory[];
  selectedTheories: Theory[]; // Changed to plural
  theoriesHypotheses: Record<string, string[]>; // Map of Theory Name -> Hypotheses
  userSelectedHypotheses: string[]; // Hypotheses picked by user
  comparisonResult: ComparisonResult | null;
  finalReport: Report | null;
  isLoading: boolean;
  error: string | null;
}
