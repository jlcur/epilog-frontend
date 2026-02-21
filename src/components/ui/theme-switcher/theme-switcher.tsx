import { type ThemePreference, useTheme } from "@/app/theme-provider";

const options: ThemePreference[] = ["light", "dark", "system"];

// TODO: theme switcher styling
export const ThemeSwitcher = () => {
	const { setTheme } = useTheme();

	return (
		<div>
			<p>Theme</p>
			{options.map((option) => (
				<button key={option} type="button" onClick={() => setTheme(option)}>
					<span>{option}&nbsp;</span>
				</button>
			))}
		</div>
	);
};
