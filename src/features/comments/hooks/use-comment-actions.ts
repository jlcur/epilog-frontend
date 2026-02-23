import { useMemo } from "react";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { paths } from "@/config/paths";
import { useDeleteComment } from "@/features/comments/api/delete-comment";

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

	return {
		deleteComment,
		commentUrl,
		isDeleting: deleteCommentMutation.isPending,
	};
};
