import {
	ArrowBigDown,
	ArrowBigUp,
	EllipsisVertical,
	ListMinus,
	ListPlus,
} from "lucide-react";
import type React from "react";
import type { SetStateAction } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { ButtonLink } from "@/components/ui/button-link/button-link";
import { CopyButton } from "@/components/ui/copy-button/copy-button";
import { IconButton } from "@/components/ui/icon-button/icon-button";
import { CreateComment } from "@/features/comments/components/create-comment";
import { UpdateComment } from "@/features/comments/components/update-comment";
import { useCommentActions } from "@/features/comments/hooks/use-comment-actions";
import type { CommentWithReplies } from "@/features/comments/utils/build-comment-tree";
import { useSession } from "@/lib/auth/session";
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
			<Button
				type="button"
				size="small"
				variant="ghost"
				onClick={() => setIsEditing(!isEditing)}
			>
				Edit
			</Button>
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
			<Button
				type="button"
				size="small"
				variant="ghost"
				disabled={isDeleting}
				onClick={handleDelete}
			>
				Delete
			</Button>
		</li>
	);
};

const CopyLinkAction = ({ actions }: { actions: CommentActions }) => {
	const { commentUrl } = actions;
	return (
		<li className={styles.action}>
			<CopyButton textToCopy={commentUrl} />
		</li>
	);
};

type ReplyActionsProps = {
	isReplying: boolean;
	setIsReplying: React.Dispatch<SetStateAction<boolean>>;
	isUserLoggedIn: boolean;
};

const ReplyAction = ({
	isReplying,
	setIsReplying,
	isUserLoggedIn,
}: ReplyActionsProps) => {
	return (
		<li>
			{isUserLoggedIn ? (
				<Button
					type="button"
					variant="ghost"
					size="small"
					onClick={() => setIsReplying(!isReplying)}
				>
					Reply
				</Button>
			) : (
				<ButtonLink to={"/login"} variant="ghost" size="small">
					Reply
				</ButtonLink>
			)}
		</li>
	);
};

type CommentActionsToolbarProps = {
	children: React.ReactNode;
};

const CommentActionsToolbar = ({ children }: CommentActionsToolbarProps) => {
	return <menu className={styles.actions}>{children}</menu>;
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
	const { data: session } = useSession();
	const isUserOwnerOfComment = comment.user_id === session?.user.id;
	const displayUsername = comment.user_name || "[ Deleted user ]";
	const isUserLoggedIn = !!session?.user;

	const [isReplying, setIsReplying] = useState(false);
	const [showReplies, setShowReplies] = useState(true);

	return (
		<article
			className={`${styles["comment-card"]} ${!isReply && styles["-root"]} ${isReply && styles["-reply"]}`}
		>
			{/* ===== Header ===== */}
			<header className={styles.header}>
				<div className={styles.details}>
					<div className={styles.user}>
						<bdi className={styles.username}>{displayUsername}</bdi>
						<time
							dateTime={new Date(comment.created_at).toString()}
							className={styles.publishdate}
						>
							{timeSinceCommentPosted}
						</time>
						{getIsEdited(comment.created_at, comment.updated_at) && (
							<span className={styles.edited}>(edited)</span>
						)}
					</div>
					<div>
						<IconButton
							icon={EllipsisVertical}
							title="More comment actions"
							variant="ghost"
						/>
						<IconButton
							icon={showReplies ? ListMinus : ListPlus}
							title="Toggle show replies"
							variant="ghost"
							onClick={() => setShowReplies(!showReplies)}
						/>
					</div>
				</div>

				{/* TODO: conditionally render tags */}
				<div className={styles.tags}>
					{/*<div className={styles.tag}>Author</div>*/}
					{/*<div className={`${styles.tag} ${styles.mod}`}>Moderator</div>*/}
					{/*<div className={`${styles.tag} ${styles.admin}`}>Admin</div>*/}
				</div>
			</header>

			{/* ===== Comment content ===== */}
			<div className={styles.content}>
				{actions.isEditing ? (
					<UpdateComment
						comment={comment}
						updateComment={actions.updateComment}
						setIsEditing={actions.setIsEditing}
					/>
				) : (
					<pre className={styles.body}>{comment.content}</pre>
				)}
			</div>

			{isReplying && (
				<CreateComment parent={comment.id} setIsReplying={setIsReplying} />
			)}

			{/* ===== Footer ===== */}
			<footer className={styles.footer}>
				{!isCommentDeleted && (
					<>
						<CommentActionsToolbar>
							{isUserOwnerOfComment && (
								<EditAction
									isEditing={actions.isEditing}
									setIsEditing={actions.setIsEditing}
								/>
							)}

							{isUserOwnerOfComment && <DeleteAction actions={actions} />}

							<ReplyAction
								isReplying={isReplying}
								setIsReplying={setIsReplying}
								isUserLoggedIn={isUserLoggedIn}
							/>
							<CopyLinkAction actions={actions} />
						</CommentActionsToolbar>

						<div className={styles.voting}>
							<IconButton icon={ArrowBigUp} title="Upvote" />
							<div>16</div>
							<IconButton icon={ArrowBigDown} title="Downvote" />
						</div>
					</>
				)}
			</footer>

			{/* ===== Replies ===== */}
			{showReplies && (
				<div>
					{comment.replies?.length > 0 && (
						<div className={styles.replies}>
							{comment.replies?.map((reply: CommentWithReplies) => (
								<CommentCard key={reply.id} comment={reply} />
							))}
						</div>
					)}
				</div>
			)}
		</article>
	);
};
