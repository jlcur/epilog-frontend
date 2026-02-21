import { ThemeSwitcher } from "@/components/ui/theme-switcher/theme-switcher";
import styles from "./header.module.css";

export const Header = () => {
	return (
		<header className={styles.container}>
			<h1>Epilog</h1>
			<div>
				<ThemeSwitcher />
			</div>
		</header>
	);
};
