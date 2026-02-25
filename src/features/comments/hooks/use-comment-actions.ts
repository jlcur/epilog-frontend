import { useMemo, useState } from "react";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { paths } from "@/config/paths";
import { useDeleteComment } from "@/features/comments/api/delete-comment";
import { useUpdateComment } from "@/features/comments/api/update-comment";

type UseCommentActionsParams = {
	commentId: string;
};

export const useCommentActions = ({ commentId }: UseCommentActionsParams) => {
	const commentUrl = useMemo(() => {
		return `${window.location.origin}${paths.comments.comment.getHref(commentId)}`;
	}, [commentId]);

	const deleteCommentMutation = useDeleteComment({
		mutationConfig: {
			onSuccess: () => {
				toastManager.add({
					description: "Comment deleted",
				});
			},
		},
	});

	const deleteComment = () => {
		deleteCommentMutation.mutate({ commentId });
	};

	const [isEditing, setIsEditing] = useState(false);

	const updateCommentMutation = useUpdateComment({
		mutationConfig: {
			onSuccess: () => {
				setIsEditing(false);
				toastManager.add({
					description: "Comment updated",
				});
			},
		},
	});

	const updateComment = (data: any) => {
		updateCommentMutation.mutate({ commentId, data });
	};

	return {
		deleteComment,
		commentUrl,
		isDeleting: deleteCommentMutation.isPending,
		isUpdating: updateCommentMutation.isPending,
		isEditing,
		setIsEditing,
		updateComment,
	};
};
