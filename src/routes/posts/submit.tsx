import { createFileRoute } from '@tanstack/react-router'
import {ContentLayout} from "@/components/layouts/content-layout";

export const Route = createFileRoute('/posts/submit')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <ContentLayout title="Submit post">
        <div>submit</div>
      </ContentLayout>
  )
}
