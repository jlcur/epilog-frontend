import { queryOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Post } from "@/types/api";

export const getPost = (postId: string): Promise<Post> => {
	return api.get(endpoints.posts.byId(postId));
};

export const getPostQueryOptions = (postId: string) => {
	return queryOptions({
		queryKey: queryKey.posts.byId(postId.toString()),
		queryFn: () => getPost(postId),
	});
};

type UsePostOptions = {
	postId: string;
	queryConfig?: QueryConfig<typeof getPostQueryOptions>;
};

export const usePost = ({ postId, queryConfig = {} }: UsePostOptions) => {
	return useQuery({
		...getPostQueryOptions(postId),
		...queryConfig,
	});
};
