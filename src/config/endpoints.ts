export const endpoints = {
	comments: {
		base: "/comments",
		all: "/comments/",
		byId: (commentId: string) => `/comments/${commentId}`,
		delete: (commentId: string) => `/comments/${commentId}`,
		create: (postId: string) => `/posts/${postId}/comments`,
		update: (commentId: string) => `/comments/${commentId}`,
		vote: (commentId: string) => `/comments/${commentId}/vote`,
	},
	posts: {
		base: "/posts",
		all: "/posts/",
		byId: (postId: string) => `/posts/${postId}`,
		delete: (postId: string) => `/posts/${postId}`,
		create: "/posts/",
		update: (postId: string) => `/posts/${postId}`,
		comments: (postId: string) => `/posts/${postId}/comments`,
		vote: (postId: string) => `/posts/${postId}/vote`,
	},
};
