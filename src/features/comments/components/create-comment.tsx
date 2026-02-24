/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop to render fields */

import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useCreateComment } from "@/features/comments/api/create-comment";
import styles from "./create-comment.module.css";

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<div className={styles.error}>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<em>{field.state.meta.errors.map((err) => err.message).join(",")}</em>
			) : null}
		</div>
	);
}

const commentSchema = z.object({
	content: z.string().min(100, "Comment content is required"),
});

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

	const form = useForm({
		defaultValues: {
			content: "",
		},
		validators: {
			onChange: commentSchema,
		},
		onSubmit: async ({ value }) => {
			createCommentMutation.mutate({
				data: {
					content: value.content,
				},
			});

			form.reset();
		},
	});

	return (
		<div>
			<h1>Comment form</h1>
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
								<>
									<label htmlFor={field.name}>Post content:</label>
									<textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<FieldInfo field={field} />
								</>
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
