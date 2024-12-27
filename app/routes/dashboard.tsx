import { createFileRoute } from '@tanstack/react-router'
import { useUserEmail } from '~/utils/context';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {

  const { state, dispatch } = useUserEmail(); 

  return <div>Hello {state?.email} welcome to your Dashboard</div>
}
