import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { fetchPosts } from '../../utils/posts'
import { fetchUser } from '~/auth-server';

export const Route = createFileRoute('/_authed/posts')({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = await fetchUser()

    console.log("Posts Fetch User ", isAuthenticated)

    // if (!isAuthenticated) {
    //   throw redirect({ to: '/login' });
    // }


    return { isAuthenticated };
  },
  loader: async ({ context }) => {
    // Access isAuthenticated from beforeLoad
    if (context.isAuthenticated) {
      return fetchPosts();
    }
  },
  component: PostsComponent,
})

function PostsComponent() {
  const posts = Route.useLoaderData()

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
          (post) => {
            return (
              <li key={post.id} className="whitespace-nowrap">
                <Link
                  to="/posts/$postId"
                  params={{
                    postId: post.id,
                  }}
                  className="block py-1 text-blue-800 hover:text-blue-600"
                  activeProps={{ className: 'text-black font-bold' }}
                >
                  <div>{post.title.substring(0, 20)}</div>
                </Link>
              </li>
            )
          },
        )}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
