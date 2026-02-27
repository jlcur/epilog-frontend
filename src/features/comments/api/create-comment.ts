import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export const createCommentSchema = z.object({
	content: z.string().min(1, "Content is required"),
	parent_id: z.string().nullable().optional(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export const createComment = ({ data }: { data: CreateCommentInput }) => {
	return api.post(endpoints.comments.create, data);
};

type UseCreateCommentOptions = {
	mutationConfig?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({
	mutationConfig,
}: UseCreateCommentOptions) => {
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
		mutationFn: createComment,
	});
};
