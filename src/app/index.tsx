import { AppProvider } from "@/app/provider";
import { AppRouter } from "@/app/router";
// @ts-expect-error
import "@fontsource-variable/figtree";

export const App = () => {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
};
