import { getRouteApi } from "@tanstack/react-router";
import { usePosts } from "@/features/posts/api/get-posts";
import { PostCard } from "@/features/posts/components/post-card";
import type { Post } from "@/types/api";
import styles from "./posts-list.module.css";

const route = getRouteApi("/posts/");

export const PostsList = () => {
	const { page, limit } = route.useSearch();
	const { data, isPending } = usePosts({ page, limit });
	const posts: Post[] = data?.data ?? [];

	if (isPending) return <div>Loading...</div>;
	if (posts.length === 0) return <div>No posts found.</div>;

	return (
		<ul className={styles["posts-list"]}>
			{posts.map((post: Post) => (
				<li key={post.id}>
					<PostCard post={post} />
				</li>
			))}
		</ul>
	);
};
