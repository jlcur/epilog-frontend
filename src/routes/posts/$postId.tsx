import { createFileRoute } from '@tanstack/react-router'
import {ContentLayout} from "@/components/layouts/content-layout";
import {PostView} from "@/features/posts/components/post-view";

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
    const { postId } = Route.useParams();

  return (
    <ContentLayout title="Comments">
      <PostView postId={postId} />
    </ContentLayout>
  )
}
