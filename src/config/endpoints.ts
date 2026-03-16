export const endpoints = {
	comments: {
		all: "comment",
		getById: (commentId: string) => `comment/${commentId}`,
		delete: (commentId: string) => `comment/${commentId}`,
		create: "comment",
		update: (commentId: string) => `comment/${commentId}`,
	},
	posts: {
		all: "post",
	},
};
