import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {getSessionQueryOptions} from "@/lib/auth/session";

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
    beforeLoad: async ({ context }) => {
      const session = await context.queryClient.ensureQueryData(getSessionQueryOptions());
      // If user is already logged in, return them to homepage
      if (session?.user) {
          throw redirect({ to: "/"})
      }
    }
})

function RouteComponent() {
  return <Outlet />
}
