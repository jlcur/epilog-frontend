import { queryOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import { useSession } from "@/lib/auth/session";
import type { QueryConfig } from "@/lib/react-query";
import type { PaginatedResponse, Post } from "@/types/api";

export const getPosts = async (
	page = 1,
	limit = 20,
): Promise<PaginatedResponse<Post>> => {
	return await api.get(endpoints.posts.all, {
		params: { page, limit },
	});
};

export const getPostsQueryOptions = ({
	page,
	limit,
	userId,
}: {
	page?: number;
	limit?: number;
	userId?: string;
} = {}) => {
	return queryOptions({
		queryKey: [...queryKey.posts.all(page, limit), userId],
		queryFn: () => getPosts(page, limit),
	});
};

type UsePostsOptions = {
	page?: number;
	limit?: number;
	queryConfig?: QueryConfig<typeof getPostsQueryOptions>;
};

export const usePosts = ({ queryConfig, page, limit }: UsePostsOptions) => {
	const { data: session } = useSession();
	const userId = session?.user?.id;

	return useQuery({
		...getPostsQueryOptions({ page, limit, userId }),
		...queryConfig,
	});
};
