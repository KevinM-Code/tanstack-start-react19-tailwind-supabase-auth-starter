import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
//import { Login } from '../components/Login'
import { getSupabaseServerClient } from '../utils/supabase'
import { fetchUser } from '~/auth-server'



export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context }) => {

    const isAuthenticated = await fetchUser()
    console.log("_authed Fetch User ", isAuthenticated)

    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return (
        <div className="alert alert-soft alert-error flex items-start gap-4">
          <span className="icon-[tabler--circle-x-filled] size-6"></span>
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-semibold">Please Login to See This Information</h5>
            <p>This is protected information
            </p>
          </div>
        </div>
      )
    }

    throw error
  },
})
