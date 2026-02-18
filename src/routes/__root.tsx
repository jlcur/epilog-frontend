import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	errorComponent: () => <div>Something went wrong</div>,
});

function RootComponent() {
	return (
		<React.Fragment>
			<div>Hello "__root"!</div>
			<main>
				<Outlet />
				{import.meta.env.DEV && <TanStackRouterDevtools />}
			</main>
		</React.Fragment>
	);
}
