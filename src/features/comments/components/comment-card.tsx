import type { Comment } from "@/types/api";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./comment-card.module.css";

type CommentCardProps = {
	comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
	const timeSinceCommentPosted = convertDateToDistance(comment.created_at);

	return (
		<div className={styles.comment}>
			<div className={styles.meta}>
				<span>{timeSinceCommentPosted}</span>
			</div>
			<p className={styles.content}>{comment.content}</p>
		</div>
	);
};
