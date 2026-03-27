import { keepPreviousData } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link/button-link";
import { usePosts } from "@/features/posts/api/get-posts";
import { PostCard } from "@/features/posts/components/post-card";
import { useSession } from "@/lib/auth/session";
import type { Post } from "@/types/api";
import styles from "./posts-list.module.css";

const route = getRouteApi("/posts/");

type PaginationControlsProps = {
	page: number;
	limit: number;
	totalPages: number;
};

const PaginationControls = ({
	page,
	limit,
	totalPages,
}: PaginationControlsProps) => {
	const isPreviousButtonDisabled = page === 1;
	const isNextButtonDisabled = page >= totalPages;

	return (
		<nav className={styles.pagination}>
			<span>Showing {limit} results per page</span>
			<ButtonLink
				to="."
				search={(prev) => ({
					...prev,
					page: (prev.page ?? 1) - 1,
				})}
				type="button"
				variant="ghost"
				disabled={isPreviousButtonDisabled}
			>
				Previous
			</ButtonLink>
			<span>
				Page {page} of {totalPages}
			</span>
			<ButtonLink
				to="."
				search={(prev) => ({
					...prev,
					page: page + 1,
				})}
				type="button"
				variant="ghost"
				disabled={isNextButtonDisabled}
			>
				Next
			</ButtonLink>
		</nav>
	);
};

export const PostsList = () => {
	const { data: session } = useSession();
	const { page, limit } = route.useSearch();
	const { data, isPending } = usePosts({
		page,
		limit,
		queryConfig: { placeholderData: keepPreviousData },
	});
	const posts: Post[] = data?.data ?? [];

	if (isPending) return <div>Loading...</div>;
	if (posts.length === 0) return <div>No posts found.</div>;

	return (
		<>
			{session?.user && (
				<div className={styles["create-post"]}>
					<ButtonLink
						to={"/posts/submit"}
						iconLeft={PlusIcon}
						variant="success"
					>
						Create new post
					</ButtonLink>
				</div>
			)}
			<ul className={styles["posts-list"]}>
				{posts.map((post: Post) => (
					<li key={post.id}>
						<PostCard post={post} />
					</li>
				))}
			</ul>
			<PaginationControls
				page={page}
				limit={limit}
				totalPages={data?.totalPages ?? 1}
			/>
		</>
	);
};
