import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/layouts/content-layout";
import {useSession} from "@/lib/auth/session";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session } = useSession();

	return (
		<ContentLayout title="Epilog">
			{session?.user ? <div>You're logged in</div> : <div>Log in or sign up to add posts</div> }
		</ContentLayout>
	);
}
