import { createFileRoute } from '@tanstack/react-router'
import {ContentLayout} from "@/components/layouts/content-layout";
import {CreatePostForm} from "@/features/posts/components/create-post";

export const Route = createFileRoute('/posts/submit')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <ContentLayout title="Submit post">
        <CreatePostForm />
      </ContentLayout>
  )
}
