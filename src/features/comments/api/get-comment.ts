import { queryOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Comment } from "@/types/api";

export const getComment = (commentId: string): Promise<Comment> => {
	return api.get(endpoints.comments.getById(commentId));
};

export const getCommentQueryOptions = (commentId: string) => {
	return queryOptions({
		queryKey: queryKey.comments.byId(commentId.toString()),
		queryFn: () => getComment(commentId),
	});
};

type UseCommentOptions = {
	commentId: string;
	queryConfig?: QueryConfig<typeof getCommentQueryOptions>;
};

export const useComment = ({ commentId, queryConfig }: UseCommentOptions) => {
	return useQuery({
		...getCommentQueryOptions(commentId),
		...queryConfig,
	});
};
