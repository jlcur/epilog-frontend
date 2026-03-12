import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button/button";
import { ButtonLink } from "@/components/ui/button-link/button-link";
import { CustomLink } from "@/components/ui/link/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher/theme-switcher";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { queryKey } from "@/config/query-key";
import { useSession } from "@/lib/auth/session";
import { authClient } from "@/lib/auth-client";
import styles from "./header.module.css";

export const Header = () => {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const queryClient = useQueryClient();

	const handleLogout = async () => {
		await authClient.signOut();

		await queryClient.invalidateQueries({ queryKey: queryKey.session });

		router.invalidate();

		toastManager.add({
			title: "Logged out",
		});

		router.navigate({ to: "/" });
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
				) : session?.user ? (
					<>
						<span>{session.user.name}</span>
						<Button variant="ghost" onClick={handleLogout}>
							Log out
						</Button>
					</>
				) : (
					<div className={styles.user}>
						<ButtonLink to="/signup" variant="ghost">
							Sign up
						</ButtonLink>
						<ButtonLink to="/login">Login</ButtonLink>
					</div>
				)}
			</div>
		</header>
	);
};
