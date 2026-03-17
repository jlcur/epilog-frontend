import { CommentsList } from "@/features/comments/components/comments-list";
import { usePost } from "@/features/posts/api/get-post";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./post-view.module.css";

interface PostViewProps {
	postId: string;
}

export const PostView = ({ postId }: PostViewProps) => {
	const { data: post, isPending } = usePost({ postId });

	if (isPending) return <div>Loading...</div>;

	if (!post) return <div>Couldn't find the requested post.</div>;

	const timeSincePostCreated = convertDateToDistance(post.created_at);

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
					<p>{post.content}</p>
				</div>
				<div className={styles.actions}>
					<span>up/down vote - </span>
					<span> reply -</span>
					<span> edit -</span>
					<span> delete</span>
				</div>
			</div>
			<CommentsList postId={post.id} />
		</div>
	);
};
