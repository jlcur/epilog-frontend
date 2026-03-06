import type React from "react";
import type { SetStateAction } from "react";
import { useState } from "react";

import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { CreateComment } from "@/features/comments/components/create-comment";
import { UpdateComment } from "@/features/comments/components/update-comment";
import { useCommentActions } from "@/features/comments/hooks/use-comment-actions";
import type { CommentWithReplies } from "@/features/comments/utils/build-comment-tree";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./comment-card.module.css";

type CommentActions = ReturnType<typeof useCommentActions>;

type EditActionProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

const EditAction = ({ isEditing, setIsEditing }: EditActionProps) => {
	return (
		<li>
			<button type="button" onClick={() => setIsEditing(!isEditing)}>
				Edit
			</button>
		</li>
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
		<li>
			<button type="button" disabled={isDeleting} onClick={handleDelete}>
				Delete
			</button>
		</li>
	);
};

const CopyLinkAction = ({ actions }: { actions: CommentActions }) => {
	const { commentUrl } = actions;
	return (
		<li>
			<CopyButton textToCopy={commentUrl} />
		</li>
	);
};

type ReplyActionsProps = {
	isReplying: boolean;
	setIsReplying: React.Dispatch<SetStateAction<boolean>>;
};

const ReplyAction = ({ isReplying, setIsReplying }: ReplyActionsProps) => {
	return (
		<li>
			<button type="button" onClick={() => setIsReplying(!isReplying)}>
				Reply
			</button>
		</li>
	);
};

type CommentActionsToolbarProps = {
	children: React.ReactNode;
};

const CommentActionsToolbar = ({ children }: CommentActionsToolbarProps) => {
	return <menu className={styles.post}>{children}</menu>;
};

const getIsEdited = (createdAt: Date, updatedAt: Date) => {
	const created = new Date(createdAt).getTime();
	const updated = new Date(updatedAt).getTime();

	return updated - created > 2000;
};

type CommentCardProps = {
	comment: CommentWithReplies;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
	const timeSinceCommentPosted = convertDateToDistance(comment.created_at);
	const actions = useCommentActions({ commentId: comment.id });
	const isCommentDeleted = comment.is_deleted;
	const isReply = comment.parent_id !== null;

	const [isReplying, setIsReplying] = useState(false);

	return (
		<article className={styles["comment-card"]}>
			{isReply && (
				<div className={styles.threadline}>
					<div className={styles.line} />
				</div>
			)}

			<div className={`${styles.comment} ${!isReply && styles["-root"]}`}>
				<header className={styles.header}>
					<img
						className={styles.avatar}
						src="https://api.dicebear.com/9.x/big-ears/svg?seed=Aneka"
						aria-label="user avatar"
						alt="avatar"
					/>
					<div className={styles.userinfo}>
						<bdi className={styles.username}>theshadowlight</bdi>
						<div className={styles.publish}>
							<time
								dateTime={new Date(comment.created_at).toString()}
								className={styles.timestamp}
							>
								{timeSinceCommentPosted}
							</time>
							{getIsEdited(comment.created_at, comment.updated_at) && (
								<span className={styles.edited}>(edited)</span>
							)}
						</div>
					</div>
				</header>

				{actions.isEditing ? (
					<UpdateComment
						comment={comment}
						updateComment={actions.updateComment}
						setIsEditing={actions.setIsEditing}
					/>
				) : (
					<pre className={styles.body}>{comment.content}</pre>
				)}

				<footer className={styles.actions}>
					{!isCommentDeleted && (
						<CommentActionsToolbar>
							<EditAction
								isEditing={actions.isEditing}
								setIsEditing={actions.setIsEditing}
							/>
							<DeleteAction actions={actions} />
							<ReplyAction
								isReplying={isReplying}
								setIsReplying={setIsReplying}
							/>
							<CopyLinkAction actions={actions} />
						</CommentActionsToolbar>
					)}
				</footer>

				{isReplying && <CreateComment parent={comment.id} />}
				{comment.replies?.length > 0 && (
					<div className={styles.replies}>
						{comment.replies?.map((reply: CommentWithReplies) => (
							<CommentCard key={reply.id} comment={reply} />
						))}
					</div>
				)}
			</div>
		</article>
	);
};
