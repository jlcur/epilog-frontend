import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/layouts/content-layout";
import { CommentsList } from "@/features/comments/components/comments-list";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ContentLayout title="Epilog">
			<CommentsList />
		</ContentLayout>
	);
}
