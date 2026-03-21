import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export const updatePostSchema = z.object({
	content: z.string().min(1, "Content is required"),
});

type UpdatePostInput = z.infer<typeof updatePostSchema>;

const updatePost = ({
	postId,
	data,
}: {
	postId: string;
	data: UpdatePostInput;
}) => {
	return api.patch(endpoints.posts.update(postId), data);
};

type UseUpdatePostOptions = {
	mutationConfig?: MutationConfig<typeof updatePost>;
	postId: string;
};

export const useUpdatePost = ({
	mutationConfig,
	postId,
}: UseUpdatePostOptions) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (data, ...args) => {
			queryClient.invalidateQueries({
				queryKey: queryKey.posts.byId(postId),
			});
			onSuccess?.(data, ...args);
		},
		...restConfig,
		mutationFn: updatePost,
	});
};
