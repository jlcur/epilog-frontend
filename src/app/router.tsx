import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useMemo } from "react";
import { routeTree } from "@/routeTree.gen";

interface RouterContext {
	queryClient: QueryClient;
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

	const context = useMemo(() => ({ queryClient }), [queryClient]);
	const router = useMemo(() => createAppRouter(context), [context]);

	return <RouterProvider router={router} />;
};
