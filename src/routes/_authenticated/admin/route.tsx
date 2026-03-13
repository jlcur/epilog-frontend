import {createFileRoute, redirect} from '@tanstack/react-router'
import {getSessionQueryOptions} from "@/lib/auth/session";
import {AdminDashboard} from "@/pages/admin/dashboard";

export const Route = createFileRoute('/_authenticated/admin')({
  component: AdminDashboard,
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(getSessionQueryOptions())
    if (session?.user?.role !== "admin") {
      throw redirect({ to: "/"})
    }
  }
})
