import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export type DeleteCommentSchema = {
	commentId: string;
};

export const deleteComment = ({ commentId }: DeleteCommentSchema) => {
	return api.delete(endpoints.comments.delete(commentId));
};

type UseDeleteCommentOptions = {
	mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({
	mutationConfig,
}: UseDeleteCommentOptions = {}) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: queryKey.comments.all,
			});
			onSuccess?.(...args);
		},
		...restConfig,
		mutationFn: deleteComment,
	});
};
