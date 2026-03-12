import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/layouts/content-layout";
import { CommentsList } from "@/features/comments/components/comments-list";
import {CreateComment} from "@/features/comments/components/create-comment";
import {useSession} from "@/lib/auth/session";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session } = useSession();

	return (
		<ContentLayout title="Epilog">
			{session?.user ? <CreateComment parent={null} /> : <div>Log in or sign up to add comments</div> }
			<CommentsList />
		</ContentLayout>
	);
}
