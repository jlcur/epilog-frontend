import { CustomLink } from "@/components/ui/link/link";
import { Vote } from "@/features/votes/components/vote";
import type { Post } from "@/types/api";
import { convertDateToDistance } from "@/utils/date-utils/format-date";
import styles from "./post-card.module.css";

type PostCardProps = {
	post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
	const timeSincePostCreated = convertDateToDistance(post.created_at);

	return (
		<div className={styles["post-card"]}>
			<Vote
				postId={post.id}
				score={post.vote_score}
				userVote={post.user_vote}
			/>
			<div className={styles.post}>
				<CustomLink
					to={"/posts/$postId"}
					params={{ postId: post.id }}
					className={styles.title}
				>
					{post.title}
				</CustomLink>
				<div className={styles.details}>
					<span className={styles.created}>
						created {timeSincePostCreated} by {post.user_name}
					</span>
				</div>
			</div>
			<div className={styles.meta}></div>
		</div>
	);
};
