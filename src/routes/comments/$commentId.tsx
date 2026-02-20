import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/layouts/content-layout";
import { CommentView } from "@/features/comments/components/comment-view";

export const Route = createFileRoute("/comments/$commentId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { commentId } = Route.useParams();

	return (
		<ContentLayout title="Comments">
			<CommentView commentId={commentId} />
		</ContentLayout>
	);
}
