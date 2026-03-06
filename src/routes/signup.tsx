import { createFileRoute } from '@tanstack/react-router'
import {ContentLayout} from "@/components/layouts/content-layout";
import {SignupForm} from "@/features/auth/components/signup-form";

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <ContentLayout title="Epilog | Signup"><SignupForm /></ContentLayout>)
}
