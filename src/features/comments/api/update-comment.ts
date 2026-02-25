import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export const updateCommentSchema = z.object({
	content: z.string().min(1, "Content is required"),
});

export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;

export const updateComment = ({
	commentId,
	data,
}: {
	commentId: string;
	data: UpdateCommentInput;
}) => {
	return api.patch(endpoints.comments.update(commentId), data);
};

type UseUpdateCommentOptions = {
	mutationConfig?: MutationConfig<typeof updateComment>;
};

export const useUpdateComment = ({
	mutationConfig,
}: UseUpdateCommentOptions = {}) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (data, ...args) => {
			queryClient.invalidateQueries({
				// Use all key in order to invalidate all queries that start with "comments"
				// This updates the list component as well as the individual view component
				queryKey: queryKey.comments.all,
			});
			onSuccess?.(data, ...args);
		},
		...restConfig,
		mutationFn: updateComment,
	});
};
