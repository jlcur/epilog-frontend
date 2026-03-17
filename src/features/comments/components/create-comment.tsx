/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop to render fields */

import { Field } from "@base-ui/react/field";
import { useForm } from "@tanstack/react-form";
import type React from "react";
import type { SetStateAction } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useCreateComment } from "@/features/comments/api/create-comment";
import { Route } from "@/routes/posts/$postId";
import styles from "./create-comment.module.css";

const commentSchema = z.object({
	content: z.string().trim().min(1, "Comment content is required"),
	parent_id: z.string().nullable().optional(),
});

export type CreateCommentProps = {
	parent?: string | null;
	setIsReplying?: React.Dispatch<SetStateAction<boolean>>;
};

export const CreateComment = ({
	parent = null,
	setIsReplying,
}: CreateCommentProps) => {
	const { postId } = Route.useParams();

	const createCommentMutation = useCreateComment({
		postId,
		mutationConfig: {
			onSuccess: () => {
				toastManager.add({
					description: "Comment created",
				});
			},
		},
	});

	const form = useForm({
		defaultValues: {
			content: "",
		},
		validators: {
			onChange: commentSchema,
		},
		onSubmit: async ({ value }) => {
			await createCommentMutation.mutateAsync({
				postId: postId,
				data: {
					content: value.content.trim(),
					parent_id: parent,
				},
			});

			if (setIsReplying) {
				setIsReplying(false);
			}

			form.reset();
		},
	});

	function handleCancel() {
		if (form.state.isDirty) {
			if (confirm("Discard changes?")) {
				if (setIsReplying) {
					setIsReplying(false);
				}
			}
		} else {
			if (setIsReplying) {
				setIsReplying(false);
			}
		}
	}

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className={styles.form}
			>
				<div>
					<form.Field
						name="content"
						children={(field) => {
							return (
								<Field.Root
									name={field.name}
									invalid={!field.state.meta.isValid}
									dirty={field.state.meta.isDirty}
									touched={field.state.meta.isTouched}
								>
									<div className={styles["comment-editor"]}>
										<textarea
											id={field.name}
											name={field.name}
											className={styles.textarea}
											value={field.state.value}
											onBlur={field.handleBlur}
											placeholder="Add your comment..."
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										<Field.Error
											match={
												!field.state.meta.isValid && field.state.meta.isTouched
											}
											className={styles.error}
										>
											{field.state.meta.errors
												.map((err) => err?.message)
												.join(",")}
										</Field.Error>
										<div className={styles.footer}>
											<div className={styles.options}>
												<div className={styles.option}>Placeholder</div>
												<div className={styles.option}>Placeholder</div>
											</div>
											<form.Subscribe
												selector={(state) => [
													state.canSubmit,
													state.isSubmitting,
												]}
												children={([canSubmit, isSubmitting]) => (
													<div className={styles.actions}>
														{setIsReplying && (
															<Button
																type="button"
																variant="ghost"
																onClick={handleCancel}
															>
																Cancel
															</Button>
														)}
														<Button
															type="submit"
															variant="success"
															disabled={!canSubmit}
															onClick={form.handleSubmit}
														>
															{isSubmitting ? "Saving..." : "Save"}
														</Button>
													</div>
												)}
											/>
										</div>
									</div>
								</Field.Root>
							);
						}}
					/>
				</div>
			</form>
		</div>
	);
};
