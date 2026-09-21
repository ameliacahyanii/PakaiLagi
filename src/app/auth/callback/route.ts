import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error_description");
  const next = safeNext(requestUrl.searchParams.get("next"));

  const toLogin = (message: string) => {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("oauth_error", message);
    return NextResponse.redirect(loginUrl);
  };

  if (oauthError) return toLogin(oauthError);

  let destination = next ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return toLogin(error.message);

    if (!next && data.user?.user_metadata?.role === "seller") {
      destination = "/seller/dashboard";
    }
  }

  return NextResponse.redirect(new URL(destination, requestUrl.origin));
}
