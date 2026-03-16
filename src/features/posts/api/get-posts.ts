import { queryOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";

export const getPosts = async (page = 1, limit = 20) => {
	return await api.get(endpoints.posts.all, {
		params: { page, limit },
	});
};

export const getPostsQueryOptions = ({
	page,
	limit,
}: {
	page?: number;
	limit?: number;
} = {}) => {
	return queryOptions({
		queryKey: queryKey.posts.all(page, limit),
		queryFn: () => getPosts(page, limit),
	});
};

type UsePostsOptions = {
	page?: number;
	limit?: number;
	queryConfig?: QueryConfig<typeof getPostsQueryOptions>;
};

export const usePosts = ({ queryConfig, page, limit }: UsePostsOptions) => {
	return useQuery({
		...getPostsQueryOptions({ page, limit }),
		...queryConfig,
	});
};
