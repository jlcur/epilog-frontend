import { SquarePen, Trash2 } from "lucide-react";

import type React from "react";
import type { SetStateAction } from "react";

import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { IconButton } from "@/components/ui/icon-button/icon-button";
import { UpdateComment } from "@/features/comments/components/update-comment";
import { useCommentActions } from "@/features/comments/hooks/use-comment-actions";
import type { Comment } from "@/types/api";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./comment-card.module.css";

type CommentActions = ReturnType<typeof useCommentActions>;

type EditActionProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

const EditAction = ({ isEditing, setIsEditing }: EditActionProps) => {
	return (
		<IconButton
			icon={<SquarePen size={14} />}
			title="edit comment"
			size="small"
			variant="info"
			onClick={() => setIsEditing(!isEditing)}
		/>
	);
};

const DeleteAction = ({ actions }: { actions: CommentActions }) => {
	const { deleteComment, isDeleting } = actions;

	function handleDelete() {
		if (confirm("Are you sure you want to delete this comment?")) {
			deleteComment();
		}
	}

	return (
		<IconButton
			icon={<Trash2 size={14} />}
			title="delete comment"
			size="small"
			variant="danger"
			disabled={isDeleting}
			onClick={handleDelete}
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

const getIsEdited = (createdAt: Date, updatedAt: Date) => {
	const created = new Date(createdAt).getTime();
	const updated = new Date(updatedAt).getTime();

	return updated - created > 2000;
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
				<div className={styles.time}>
					<span>{timeSinceCommentPosted}</span>
					{getIsEdited(comment.created_at, comment.updated_at) && (
						<span>(edited)</span>
					)}
				</div>
				<CommentActionsToolbar>
					<EditAction
						isEditing={actions.isEditing}
						setIsEditing={actions.setIsEditing}
					/>
					<DeleteAction actions={actions} />
					<CopyLinkAction actions={actions} />
				</CommentActionsToolbar>
			</div>
			{actions.isEditing ? (
				<UpdateComment
					comment={comment}
					updateComment={actions.updateComment}
					setIsEditing={actions.setIsEditing}
				/>
			) : (
				<pre className={styles.content}>{comment.content}</pre>
			)}
		</article>
	);
};
