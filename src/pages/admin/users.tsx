import { useUsers } from "@/features/users/api/get-users";
import type { User } from "@/types/api";
import styles from "./users.module.css";

type UsersTableProps = {
	users: User[];
};

const UsersTable = ({ users }: UsersTableProps) => {
	return (
		<table className={styles["users-table"]}>
			<thead>
				<tr>
					<th scope="col">Username</th>
					<th scope="col">Email</th>
					<th scope="col">Role</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.role ?? "N/A"}</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<th scope="row" colSpan={2}>
						Total users
					</th>
					<td colSpan={1}>{users.length}</td>
				</tr>
			</tfoot>
		</table>
	);
};

export const Users = () => {
	const { data, isPending, isError } = useUsers({
		query: {
			sortBy: "name",
			sortDirection: "asc",
		},
	});

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Failed to load users</div>;

	if (!data.users) return null;

	return <UsersTable users={data.users} />;
};
