import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
  useLoaderData,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Meta, Scripts, createServerFn } from '@tanstack/start'
import * as React from 'react'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
import { getSupabaseServerClient } from '../utils/supabase'
import { UserEmailProvider, useUserEmail } from '~/utils/context'
import { Fragment } from 'react'
import Navigation from '~/components/Navigation'
import { fetchUser } from '~/auth-server'


export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  // beforeLoad: async ({location}) => {
  //   const user = await fetchUser()

  //   console.log("User", user)

  //   return {
  //     user,
  //   }
  // },
  // loader: async ({ context }) => {
  //   // Access isAuthenticated from beforeLoad
  //   if (context.user) {
  //     console.log("Context User ", context.user)
  //     return context.user
  //   }
  // },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent({context}) {
  console.log("Context ", context)  

  return (
    <RootDocument>
      <UserEmailProvider >
        <Navigation />
        <div className='m-4'>
          <Outlet />
        </div>
      </UserEmailProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode, }) {
    
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
        <script src="../node_modules/flyonui/flyonui.js"></script>
      </body>
    </html>
  )
}
