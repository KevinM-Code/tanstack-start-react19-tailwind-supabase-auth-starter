import { createServerFn } from "@tanstack/start";
import { getSupabaseServerClient } from "./utils/supabase";
import { redirect } from "@tanstack/react-router";
import { createAdminClient } from "./utils/adminserver";

export const loginFn = createServerFn()
  .validator((d: { email: string; password: string }) => d as { email: string; password: string })
  .handler(async ({ data } ) => {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }
    return {
      email: data.email
    }
  })

  export const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    const supabase = getSupabaseServerClient()
    const { data, error: _error } = await supabase.auth.getUser()
  
    if (!data.user?.email) {
      return null
     
    }
  
    return data.user
  })

  export const signupFn = createServerFn()
  .validator(
    (d: unknown) =>
      d as { email: string; password: string; redirectUrl?: string },
  )
  .handler(async ({ data }) => {

    //Create the user
    const supabaseAdmin = await createAdminClient();
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,      
      user_metadata: {
        email: data.email,
      },      
      email_confirm: true,        
    });

    // confirm the user is created and set the getUser method
    const supabase = getSupabaseServerClient()
    const { error: loginErr } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (loginErr) {
      return {
        error: true,
        message: loginErr.message,
      }
    }

    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }

    // return the users email
    return {
      email: data.email
    }

  })