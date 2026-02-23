export const endpoints = {
	comments: {
		all: "comment",
		getById: (commentId: string) => `comment/${commentId}`,
		delete: (commentId: string) => `comment/${commentId}`,
		create: "comment",
	},
};
