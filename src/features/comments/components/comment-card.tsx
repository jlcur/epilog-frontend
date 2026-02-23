import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { IconButton } from "@/components/ui/icon-button/icon-button";
import { useCommentActions } from "@/features/comments/hooks/use-comment-actions";
import type { Comment } from "@/types/api";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./comment-card.module.css";

type CommentActionsToolbarProps = {
	commentId: string;
};

const CommentActionsToolbar = ({ commentId }: CommentActionsToolbarProps) => {
	const { deleteComment, commentUrl, isDeleting } = useCommentActions({
		commentId,
	});

	return (
		<div className={styles.actions}>
			<IconButton
				icon={<Trash2 size={14} />}
				title="delete comment"
				size="small"
				variant="danger"
				disabled={isDeleting}
				onClick={deleteComment}
			/>
			<CopyButton textToCopy={commentUrl} />
		</div>
	);
};

type CommentCardProps = {
	comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
	const timeSinceCommentPosted = convertDateToDistance(comment.created_at);

	return (
		<div className={styles.comment}>
			<div className={styles.meta}>
				<span>{timeSinceCommentPosted}</span>
				<CommentActionsToolbar commentId={comment.id} />
			</div>
			<p className={styles.content}>{comment.content}</p>
		</div>
	);
};
