import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { endpoints } from "@/config/endpoints";
import { queryKey } from "@/config/query-key";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

const createPostSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

const createPost = (data: CreatePostInput) => {
	return api.post(endpoints.posts.create, data);
};

type UseCreatePostOptions = {
	mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ mutationConfig }: UseCreatePostOptions) => {
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
		mutationFn: createPost,
	});
};
