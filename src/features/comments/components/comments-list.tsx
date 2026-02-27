import { useMemo } from "react";
import { CommentCard } from "@/features/comments/components/comment-card";
import {
	buildCommentTree,
	type CommentWithReplies,
} from "@/features/comments/utils/build-comment-tree";
import { useComments } from "../api/get-comments.ts";

export const CommentsList = () => {
	const { data: comments = [], isPending } = useComments();
	const commentTree = useMemo(
		() => buildCommentTree(comments ?? []),
		[comments],
	);

	if (isPending) return <div>Loading...</div>;

	if (comments.length === 0) {
		return <div>No comments found.</div>;
	}

	return (
		<div>
			<ul>
				{commentTree.map((comment: CommentWithReplies) => (
					<li key={comment.id}>
						<CommentCard comment={comment} />
					</li>
				))}
			</ul>
		</div>
	);
};
