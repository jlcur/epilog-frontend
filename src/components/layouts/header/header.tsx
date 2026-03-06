import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button/button";
import { ButtonLink } from "@/components/ui/button-link/button-link";
import { CustomLink } from "@/components/ui/link/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher/theme-switcher";
import { authClient } from "@/lib/auth-client";
import styles from "./header.module.css";

export const Header = () => {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	const handleLogout = async () => {
		await authClient.signOut();
		router.invalidate();
	};

	return (
		<header className={styles["header-container"]}>
			<h1 className={styles.heading}>
				<CustomLink to={"/"}>Epilog</CustomLink>
			</h1>
			<ThemeSwitcher />
			<div className={styles.auth}>
				{isPending ? (
					<span>Loading...</span>
				) : session ? (
					<>
						<span>{session.user.name}</span>
						<Button variant="ghost" onClick={handleLogout}>
							Log out
						</Button>
					</>
				) : (
					<div className={styles.user}>
						<ButtonLink to="/signup" variant="link">
							Sign up
						</ButtonLink>
						<ButtonLink to="/login" variant="secondary">
							Login
						</ButtonLink>
					</div>
				)}
			</div>
		</header>
	);
};
