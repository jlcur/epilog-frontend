/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop to render fields */

import { Field } from "@base-ui/react/field";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useCreateComment } from "@/features/comments/api/create-comment";
import styles from "./create-comment.module.css";

const commentSchema = z.object({
	content: z.string().trim().min(1, "Comment content is required"),
	parent_id: z.string().nullable().optional(),
});

export const CreateComment = ({ parent = null }: { parent: string | null }) => {
	const createCommentMutation = useCreateComment({
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
				data: {
					content: value.content.trim(),
					parent_id: parent,
				},
			});

			form.reset();
		},
	});

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
									<Field.Label>Add your comment</Field.Label>

									<textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
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
								</Field.Root>
							);
						}}
					/>
				</div>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<div>
							<Button
								type="submit"
								disabled={!canSubmit}
								onClick={form.handleSubmit}
							>
								{isSubmitting ? "Posting..." : "Post comment"}
							</Button>
						</div>
					)}
				/>
			</form>
		</div>
	);
};
