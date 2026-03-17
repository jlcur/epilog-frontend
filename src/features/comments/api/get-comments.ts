import { queryOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Comment } from "@/types/api";

export const getComments = (postId?: string): Promise<Comment[]> => {
	const url = postId
		? endpoints.posts.comments(postId)
		: endpoints.comments.all;
	return api.get(url);
};

export const getCommentsQueryOptions = (postId?: string) => {
	return queryOptions({
		queryKey: postId ? queryKey.comments.byPost(postId) : queryKey.comments.all,
		queryFn: () => getComments(postId),
	});
};

type UseCommentsOptions = {
	postId?: string;
	queryConfig?: QueryConfig<typeof getCommentsQueryOptions>;
};

export const useComments = ({
	postId,
	queryConfig = {},
}: UseCommentsOptions = {}) => {
	return useQuery({
		...getCommentsQueryOptions(postId),
		...queryConfig,
	});
};
