import type React from "react";
import type { SetStateAction } from "react";
import { Button } from "@/components/ui/button/button";
import { CommentsList } from "@/features/comments/components/comments-list";
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
				<footer className={styles.footer}>
					<PostActionsToolbar>
						{isUserOwnerOfPost && (
							<EditAction
								isEditing={actions.isEditing}
								setIsEditing={actions.setIsEditing}
							/>
						)}
					</PostActionsToolbar>
				</footer>
			</div>
			<CommentsList postId={post.id} />
		</div>
	);
};
