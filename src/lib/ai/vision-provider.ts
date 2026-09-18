import type { AiAnalysis, Recommendation } from "@/types/ai";
import { buildDemoAnalysis } from "@/lib/ai/analyze-item";

const systemPrompt = `You analyze household item photos for a circular economy app.
Return JSON only with this shape:
{"analysis":{"category":"string","item_type":"string","visual_condition":"used|good|worn|unclear","visible_materials":["string"],"visible_issues":["string"],"inspection_questions":["string"],"confidence":0.0,"safety_note":"string"},"recommendations":[{"action":"sell|swap|donate|repair|parts|recycle","suitability_score":0,"reason":"string"}],"price_range":{"min":0,"max":0,"confidence":"low|medium|high","reason":"string"}}
Never claim an item is safe, authentic, or fully functional from an image. Mention what must be checked in person. Confidence must be between 0 and 1. Provide at most 4 recommendations.`;

function parseModelJson(content: string) {
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  return JSON.parse(cleaned) as {
    analysis: AiAnalysis;
    recommendations: Recommendation[];
    price_range: {
      min: number;
      max: number;
      confidence: "low" | "medium" | "high";
      reason: string;
    };
  };
}

export async function analyzeWithVision(image: string) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `${process.env.AI_BASE_URL ?? "https://api.openai.com/v1"}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "gpt-4o-mini",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this item photo." },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    },
  );

  if (!response.ok) throw new Error("AI provider request failed");
  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI provider returned an empty response");

  const parsed = parseModelJson(content);
  const fallback = buildDemoAnalysis();
  return {
    ...parsed,
    price_range: parsed.price_range ?? fallback.price_range,
  };
}

export async function analyzeItem(image: string) {
  try {
    const result = await analyzeWithVision(image);
    if (result)
      return {
        ...result,
        provider: process.env.AI_PROVIDER ?? "openai-compatible",
        model: process.env.AI_MODEL ?? "gpt-4o-mini",
      };
  } catch {
    // A failed provider should not block the controlled competition demo.
  }

  const fallback = buildDemoAnalysis();
  return { ...fallback, provider: "demo-rules", model: "demo-circular-v1" };
}
