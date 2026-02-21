import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { paths } from "@/config/paths";
import type { Comment } from "@/types/api";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./comment-card.module.css";

type CommentCardProps = {
	comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
	const timeSinceCommentPosted = convertDateToDistance(comment.created_at);
	// TODO: replace hardcoded base URL
	const pathToCommentURL = `http://localhost:3000${paths.comments.comment.getHref(comment.id)}`;

	return (
		<div className={styles.comment}>
			<div className={styles.meta}>
				<span>{timeSinceCommentPosted}</span>
				<span>
					<CopyButton textToCopy={pathToCommentURL} />
				</span>
			</div>
			<p className={styles.content}>{comment.content}</p>
		</div>
	);
};
