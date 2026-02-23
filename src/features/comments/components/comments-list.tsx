import { CommentCard } from "@/features/comments/components/comment-card";
import { CreateComment } from "@/features/comments/components/create-comment";
import type { Comment } from "@/types/api";
import { useComments } from "../api/get-comments.ts";

export const CommentsList = () => {
	const { data: comments = [], isPending } = useComments();

	if (isPending) return <div>Loading...</div>;

	if (comments.length === 0) {
		return <div>No comments found.</div>;
	}

	return (
		<div>
			<CreateComment />
			<ul>
				{comments.map((comment: Comment) => (
					<li key={comment.id}>
						<CommentCard comment={comment} />
					</li>
				))}
			</ul>
		</div>
	);
};
