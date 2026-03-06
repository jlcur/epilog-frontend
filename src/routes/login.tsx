import { createFileRoute } from '@tanstack/react-router'
import {ContentLayout} from "@/components/layouts/content-layout";
import {LoginForm} from "@/features/auth/components/login-form";

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <ContentLayout title="Epilog | Login">
          <LoginForm />
      </ContentLayout>
  )
}
