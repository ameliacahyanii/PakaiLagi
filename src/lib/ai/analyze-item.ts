import type { AiAnalysis, CircularAction, Recommendation } from "@/types/ai";

const demoAnalysis: AiAnalysis = {
  category: "Elektronik",
  item_type: "Kipas angin meja",
  visual_condition: "used",
  visible_materials: ["Plastik", "Logam"],
  visible_issues: ["Noda ringan pada badan kipas"],
  inspection_questions: [
    "Apakah kipas dapat menyala?",
    "Apakah semua tingkat kecepatan berfungsi?",
    "Apakah kabel atau steker terkelupas?",
    "Apakah baling-baling retak?",
  ],
  confidence: 0.78,
  safety_note:
    "Foto tidak dapat memastikan keamanan atau fungsi listrik. Periksa langsung sebelum diserahkan.",
};

const actionReasons: Record<CircularAction, string> = {
  donate:
    "Fungsi terlihat masih mungkin dipertahankan dan barang dapat memberi manfaat langsung kepada orang lain.",
  sell: "Kondisi visual masih cukup baik untuk dibuat menjadi listing dengan harga yang transparan.",
  repair:
    "Pemeriksaan langsung diperlukan untuk memastikan bagian yang bermasalah dapat dipulihkan.",
  swap: "Barang dapat ditukar dengan kebutuhan lain jika pemilik tidak lagi membutuhkan barang ini.",
  parts:
    "Komponen tertentu mungkin masih bernilai walaupun barang tidak dapat dipakai utuh.",
  recycle:
    "Jika tidak aman atau tidak dapat dipulihkan, materialnya perlu diarahkan ke mitra daur ulang.",
};

export function buildDemoAnalysis(): {
  analysis: AiAnalysis;
  recommendations: Recommendation[];
  price_range: {
    min: number;
    max: number;
    confidence: "low" | "medium" | "high";
    reason: string;
  };
} {
  const recommendations: Recommendation[] = [
    { action: "donate", suitability_score: 89, reason: actionReasons.donate },
    { action: "sell", suitability_score: 74, reason: actionReasons.sell },
    { action: "repair", suitability_score: 61, reason: actionReasons.repair },
  ];

  return {
    analysis: demoAnalysis,
    recommendations,
    price_range: {
      min: 75_000,
      max: 110_000,
      confidence: "medium",
      reason:
        "Estimasi awal berdasarkan kategori, kondisi visual, dan fungsi yang perlu dikonfirmasi langsung.",
    },
  };
}

export function calculateConditionScore(answers: {
  functionScore: number;
  physicalScore: number;
  completenessScore: number;
  ageScore: number;
  repairHistoryScore: number;
}) {
  return Math.round(
    answers.functionScore * 0.35 +
      answers.physicalScore * 0.25 +
      answers.completenessScore * 0.2 +
      answers.ageScore * 0.1 +
      answers.repairHistoryScore * 0.1,
  );
}
