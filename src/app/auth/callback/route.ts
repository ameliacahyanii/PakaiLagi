import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error_description");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (oauthError) {
    const authUrl = new URL("/auth", requestUrl.origin);
    authUrl.searchParams.set("oauth_error", oauthError);
    return NextResponse.redirect(authUrl);
  }

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}