import { queryOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Comment } from "@/types/api";

export const getComments = (): Promise<Comment[]> => {
	return api.get(endpoints.comments.all);
};

export const getCommentsQueryOptions = () => {
	return queryOptions({
		queryKey: queryKey.comments.all,
		queryFn: getComments,
	});
};

type UseCommentsOptions = {
	queryConfig?: QueryConfig<typeof getCommentsQueryOptions>;
};

export const useComments = ({ queryConfig = {} }: UseCommentsOptions = {}) => {
	return useQuery({
		...getCommentsQueryOptions(),
		...queryConfig,
	});
};
