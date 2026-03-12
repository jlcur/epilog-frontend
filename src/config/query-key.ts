export const queryKey = {
	comments: {
		all: ["comments"] as const,
		byId: (id: string, include?: string) =>
			["comments", id, include ?? ""] as const,
	},
	session: ["session"] as const,
};
