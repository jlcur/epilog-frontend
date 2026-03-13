import { Outlet } from "@tanstack/react-router";
import { ContentLayout } from "@/components/layouts/content-layout";
import { CustomLink } from "@/components/ui/link/link";
import { useSession } from "@/lib/auth/session";
import styles from "./dashboard.module.css";

export const AdminDashboard = () => {
	const { data: session } = useSession();

	return (
		<ContentLayout title="Admin">
			<div className={styles["admin-dashboard"]}>
				<div className={styles.user}>
					<p>Username: {session?.user.name}</p>
					<p>Email: {session?.user.email}</p>
					<p>Role: {session?.user.role}</p>
				</div>

				<ul className={styles.links}>
					<li className={styles.link}>
						<CustomLink to={"/admin/users"}>Users</CustomLink>
					</li>
				</ul>

				<Outlet />
			</div>
		</ContentLayout>
	);
};
