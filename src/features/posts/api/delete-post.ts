import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export type DeletePostSchema = {
	postId: string;
};

export const deletePost = ({ postId }: DeletePostSchema) => {
	return api.delete(endpoints.posts.delete(postId));
};

type UseDeletePostOptions = {
	mutationConfig?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({
	mutationConfig,
}: UseDeletePostOptions = {}) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: queryKey.posts.all(),
			});
			onSuccess?.(...args);
		},
		...restConfig,
		mutationFn: deletePost,
	});
};
