import { Trash2 } from "lucide-react";
import type React from "react";
import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { IconButton } from "@/components/ui/icon-button/icon-button";
import { useCommentActions } from "@/features/comments/hooks/use-comment-actions";
import type { Comment } from "@/types/api";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./comment-card.module.css";

type CommentActions = ReturnType<typeof useCommentActions>;

const DeleteAction = ({ actions }: { actions: CommentActions }) => {
	const { deleteComment, isDeleting } = actions;

	return (
		<IconButton
			icon={<Trash2 size={14} />}
			title="delete comment"
			size="small"
			variant="danger"
			disabled={isDeleting}
			onClick={deleteComment}
		/>
	);
};

const CopyLinkAction = ({ actions }: { actions: CommentActions }) => {
	const { commentUrl } = actions;
	return <CopyButton textToCopy={commentUrl} />;
};

type CommentActionsToolbarProps = {
	children: React.ReactNode;
};

const CommentActionsToolbar = ({ children }: CommentActionsToolbarProps) => {
	return <div className={styles.actions}>{children}</div>;
};

type CommentCardProps = {
	comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
	const timeSinceCommentPosted = convertDateToDistance(comment.created_at);
	const actions = useCommentActions({ commentId: comment.id });

	return (
		<article className={styles.comment}>
			<div className={styles.meta}>
				<span>{timeSinceCommentPosted}</span>
				<CommentActionsToolbar>
					<DeleteAction actions={actions} />
					<CopyLinkAction actions={actions} />
				</CommentActionsToolbar>
			</div>
			<pre className={styles.content}>{comment.content}</pre>
		</article>
	);
};
