import { NextResponse } from "next/server";
import { analyzeItem } from "@/lib/ai/vision-provider";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { image?: string };

    if (!body.image || !body.image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Image data is required." },
        { status: 400 },
      );
    }

    if (body.image.length > 12_000_000) {
      return NextResponse.json(
        { error: "Image is too large." },
        { status: 413 },
      );
    }

    return NextResponse.json(await analyzeItem(body.image));
  } catch {
    return NextResponse.json(
      { error: "Unable to analyze this image." },
      { status: 400 },
    );
  }
}
