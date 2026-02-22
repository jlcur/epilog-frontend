import { Toast } from "@base-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { ThemeProvider } from "@/app/theme-provider";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { ToastList } from "@/components/ui/toasts/toasts";
import { queryConfig } from "@/lib/react-query";

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Toast.Provider toastManager={toastManager} limit={1}>
					{import.meta.env.DEV && <ReactQueryDevtools />}
					{children}

					<ToastList />
				</Toast.Provider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
