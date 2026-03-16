import { createFileRoute } from '@tanstack/react-router'
import {PostsList} from "@/features/posts/components/posts-list";
import {ContentLayout} from "@/components/layouts/content-layout";
import { z } from "zod";
import {getPostsQueryOptions} from "@/features/posts/api/get-posts";

const postPaginationSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(20)
})

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  validateSearch: postPaginationSchema,
  loaderDeps: ({ search: { page, limit }}) => ({ page, limit}),
  loader: ({ context, deps: { page, limit} }) => context.queryClient.ensureQueryData(getPostsQueryOptions({page, limit}))
})

function RouteComponent() {
  return (
      <ContentLayout title="Epilog">
        <PostsList />
      </ContentLayout>
  )
}
