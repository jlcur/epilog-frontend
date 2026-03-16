export const endpoints = {
	comments: {
		base: "/comments",
		all: "/comments/",
		byId: (commentId: string) => `/comments/${commentId}`,
		delete: (commentId: string) => `/comments/${commentId}`,
		create: "/comments/",
		update: (commentId: string) => `/comments/${commentId}`,
	},
	posts: {
		base: "/posts",
		all: "/posts/",
		byId: (postId: string) => `/posts/${postId}`,
		delete: (postId: string) => `/posts/${postId}`,
		create: "/posts/",
		update: (postId: string) => `/posts/${postId}`,
	},
};
