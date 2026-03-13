import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import { getSessionQueryOptions } from "@/lib/auth/session";

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
    beforeLoad: async ({ context, location }) => {
      // If user is not authenticated, redirect to /login
        const session = await context.queryClient.ensureQueryData(getSessionQueryOptions());

        if (!session?.user) {
            return redirect({ to: "/login", search: { redirect: location.href } })
        }
    }
})

function RouteComponent() {
  return <Outlet />
}
