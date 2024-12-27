import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { parseCookies, setCookie } from 'vinxi/http'

export const createAdminClient = async () => {

  return await createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        // @ts-ignore Wait till Supabase overload works
        getAll() {
          return Object.entries(parseCookies()).map(([name, value]) => ({
            name,
            value,
          }))
        },
        setAll(cookies: any[]) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value)
          })
        },
      },
    },
  );
};
