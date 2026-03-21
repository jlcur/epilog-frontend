import { useState } from "react";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useDeletePost } from "@/features/posts/api/delete-post";
import { useUpdatePost } from "@/features/posts/api/update-post";

type UsePostActionsParams = {
	postId: string;
};

export const usePostActions = ({ postId }: UsePostActionsParams) => {
	const [isEditing, setIsEditing] = useState(false);

	const updatePostMutation = useUpdatePost({
		mutationConfig: {
			onSuccess: () => {
				setIsEditing(false);
				toastManager.add({
					description: "Post updated",
				});
			},
		},
		postId,
	});

	const updatePost = (data: any) => {
		updatePostMutation.mutate({ postId, data });
	};

	const deletePostMutation = useDeletePost({
		mutationConfig: {
			onSuccess: () => {
				toastManager.add({
					description: "Post deleted",
				});
			},
		},
	});

	const deletePost = () => {
		deletePostMutation.mutate({ postId });
	};

	return {
		isUpdating: updatePostMutation.isPending,
		isEditing,
		setIsEditing,
		updatePost,
		deletePost,
		isDeleting: deletePostMutation.isPending,
	};
};
