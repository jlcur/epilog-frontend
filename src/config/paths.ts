export const paths = {
	root: {
		path: "/",
		getHref: () => "/",
	},
	comments: {
		root: {
			path: "comments",
			getHref: () => "/comments",
		},
		comment: {
			path: "comments/:commentId",
			getHref: (id: string) => `/comments/${id}`,
		},
	},
} as const;
