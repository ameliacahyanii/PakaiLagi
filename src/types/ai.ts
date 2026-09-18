export type CircularAction =
  | "sell"
  | "swap"
  | "donate"
  | "repair"
  | "parts"
  | "recycle";

export type AiAnalysis = {
  category: string;
  item_type: string;
  visual_condition: "used" | "good" | "worn" | "unclear";
  visible_materials: string[];
  visible_issues: string[];
  inspection_questions: string[];
  confidence: number;
  safety_note: string;
};

export type Recommendation = {
  action: CircularAction;
  suitability_score: number;
  reason: string;
};

export type AnalyzeItemResponse = {
  analysis: AiAnalysis;
  recommendations: Recommendation[];
  price_range: {
    min: number;
    max: number;
    confidence: "low" | "medium" | "high";
    reason: string;
  };
  provider: string;
  model: string;
};
