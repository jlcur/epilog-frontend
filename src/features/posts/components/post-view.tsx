import type React from "react";
import type { SetStateAction } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { ButtonLink } from "@/components/ui/button-link/button-link";
import { CommentsList } from "@/features/comments/components/comments-list";
import { CreateComment } from "@/features/comments/components/create-comment";
import { usePost } from "@/features/posts/api/get-post";
import { UpdatePost } from "@/features/posts/components/update-post";
import { usePostActions } from "@/features/posts/hooks/use-post-actions";
import { useSession } from "@/lib/auth/session";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./post-view.module.css";

type EditActionProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

type PostActions = ReturnType<typeof usePostActions>;

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

type PostActionsToolbarProps = {
	children: React.ReactNode;
};

const DeleteAction = ({ actions }: { actions: PostActions }) => {
	const { deletePost, isDeleting } = actions;

	function handleDelete() {
		if (confirm("Are you sure you want to delete this post?")) {
			deletePost();
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

const PostActionsToolbar = ({ children }: PostActionsToolbarProps) => {
	return <menu className={styles.actions}>{children}</menu>;
};

interface PostViewProps {
	postId: string;
}

export const PostView = ({ postId }: PostViewProps) => {
	const { data: post, isPending } = usePost({ postId });
	const { data: session } = useSession();
	const actions = usePostActions({ postId });
	const [isReplying, setIsReplying] = useState(false);
	const isUserLoggedIn = !!session?.user;

	if (isPending) return <div>Loading...</div>;

	if (!post) return <div>Couldn't find the requested post.</div>;

	const timeSincePostCreated = convertDateToDistance(post.created_at);
	const isUserOwnerOfPost = post.user_id === session?.user.id;

	return (
		<div className={styles["post-view"]}>
			<div className={styles.breadcrumbs}>
				Todo: Replace / with / breadcrumbs
			</div>
			<div className={styles.post}>
				<h1 className={styles.title}>{post.title}</h1>
				<div className={styles.details}>
					<span>
						created {timeSincePostCreated} by {post.user_name}
					</span>
				</div>
				<div className={styles.content}>
					{actions.isEditing ? (
						<UpdatePost
							post={post}
							updatePost={actions.updatePost}
							setIsEditing={actions.setIsEditing}
						/>
					) : (
						<pre className={styles.body}>{post.content}</pre>
					)}
				</div>

				{isReplying && <CreateComment setIsReplying={setIsReplying} />}

				<footer className={styles.footer}>
					<PostActionsToolbar>
						{isUserOwnerOfPost && (
							<EditAction
								isEditing={actions.isEditing}
								setIsEditing={actions.setIsEditing}
							/>
						)}
						{isUserOwnerOfPost && <DeleteAction actions={actions} />}
						<ReplyAction
							isReplying={isReplying}
							setIsReplying={setIsReplying}
							isUserLoggedIn={isUserLoggedIn}
						/>
					</PostActionsToolbar>
				</footer>
			</div>
			<CommentsList postId={post.id} />
		</div>
	);
};
