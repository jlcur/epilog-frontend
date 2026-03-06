import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { routeTree } from "@/routeTree.gen";

interface RouterContext {
	queryClient: QueryClient;
	auth: typeof authClient;
}

export const createAppRouter = (context: RouterContext) => {
	return createRouter({
		routeTree,
		context,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	});
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createAppRouter>;
	}
}

export const AppRouter = () => {
	const queryClient = useQueryClient();

	const context = useMemo(
		() => ({ queryClient, auth: authClient }),
		[queryClient],
	);
	const router = useMemo(() => createAppRouter(context), [context]);

	return <RouterProvider router={router} />;
};
