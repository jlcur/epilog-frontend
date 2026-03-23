import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export const voteSchema = z.object({
	direction: z.union([z.literal(1), z.literal(-1)]),
});

export type VoteInput = z.infer<typeof voteSchema>;

export const togglePostVote = ({
	postId,
	data,
}: {
	postId: string;
	data: VoteInput;
}) => {
	return api.post(endpoints.posts.vote(postId), data);
};

type UseToggleVoteOptions = {
	mutationConfig?: MutationConfig<typeof togglePostVote>;
};

export const useTogglePostVote = ({
	mutationConfig,
}: UseToggleVoteOptions = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		...restConfig,
		mutationFn: togglePostVote,
		onSuccess: (data, ...args) => {
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
			onSuccess?.(data, ...args);
		},
	});
};
