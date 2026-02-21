import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
	theme: ThemePreference;
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "theme-preference";

function getSystemTheme(): ResolvedTheme {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function getInitialTheme(): ThemePreference {
	if (typeof window === "undefined") return "system";

	const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
	return stored ?? "system";
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemePreference>(getInitialTheme);
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

	// Load stored preference
	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const updateTheme = () => {
			const systemTheme = getSystemTheme();
			const finalTheme = theme === "system" ? systemTheme : theme;

			setResolvedTheme(finalTheme);
			document.documentElement.setAttribute("data-theme", finalTheme);
		};

		updateTheme();

		if (theme === "system") {
			media.addEventListener("change", updateTheme);
			return () => media.removeEventListener("change", updateTheme);
		}
	}, [theme]);

	// Persist preference
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
};
