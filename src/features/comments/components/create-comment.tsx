import { Button } from "@/components/ui/button/button";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useCreateComment } from "@/features/comments/api/create-comment";
import styles from "./create-comment.module.css";

export const CreateComment = () => {
	const createCommentMutation = useCreateComment({
		mutationConfig: {
			onSuccess: () => {
				toastManager.add({
					description: "Comment created",
				});
			},
		},
	});

	function postComment(e: any) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const commentContent = (formData.get("content") as string | null) || "";

		createCommentMutation.mutate({
			data: {
				content: commentContent,
			},
		});

		form.reset();
	}

	return (
		<form method="post" onSubmit={postComment} className={styles.form}>
			<label>
				Add your comment
				<textarea name="content" />
			</label>

			<div>
				<Button type="submit">
					{createCommentMutation.isPending ? "Posting..." : "Post comment"}
				</Button>
			</div>
		</form>
	);
};
