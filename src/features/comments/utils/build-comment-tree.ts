import type { Comment } from "@/types/api";

export type CommentWithReplies = Comment & {
	replies: CommentWithReplies[];
};

/**
 * Transforms a flat list of comments into a hierarchical tree structure.
 * @param flatComments The falt array of comments to transform.
 */
export function buildCommentTree(
	flatComments: Comment[],
): CommentWithReplies[] {
	const commentMap = new Map<string, CommentWithReplies>();
	const rootComments: CommentWithReplies[] = [];

	for (const comment of flatComments) {
		commentMap.set(comment.id, {
			...comment,
			replies: [],
		});
	}

	for (const comment of flatComments) {
		const commentInMap = commentMap.get(comment.id);

		if (!commentInMap) continue;

		if (comment.parent_id === null) {
			rootComments.push(commentInMap);
		} else {
			const parent = commentMap.get(comment.parent_id);

			if (parent) {
				parent.replies.push(commentInMap);
			} else {
				rootComments.push(commentInMap);
			}
		}
	}

	return rootComments;
}
