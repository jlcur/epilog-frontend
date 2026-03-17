import type { ListUsersQuery } from "@/features/users/api/get-users";

export const queryKey = {
	comments: {
		all: ["comments"] as const,
		byId: (id: string, include?: string) =>
			["comments", id, include ?? ""] as const,
	},
	session: ["session"] as const,
	users: {
		all: () => ["users"] as const,
		lists: () => ["users", "list"] as const,
		list: (query: ListUsersQuery) => ["users", "list", query] as const,
		byId: (id: string) => ["users", id] as const,
	},
	posts: {
		all: (page?: number, limit?: number) => ["posts", page, limit] as const,
		byId: (id: string) => ["posts", id] as const,
	},
};
