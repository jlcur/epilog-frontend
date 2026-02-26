/** biome-ignore-all lint/correctness/noChildrenProp: See TanStack Form docs */
import { Field } from "@base-ui/react/field";
import { useForm } from "@tanstack/react-form";
import React, { type SetStateAction, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import type { Comment } from "@/types/api";
import styles from "./update-comment.module.css";

const commentSchema = z.object({
	content: z.string().min(1, "Comment content is required"),
});

export type UpdateCommentProps = {
	comment: Comment;
	updateComment: (data: { content: string }) => void;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

export const UpdateComment = ({
	comment,
	updateComment,
	setIsEditing,
}: UpdateCommentProps) => {
	const [commentText, _setCommentText] = useState(comment.content);

	const form = useForm({
		defaultValues: {
			content: commentText,
		},
		validators: {
			onChange: commentSchema,
		},
		onSubmit: async ({ value }) => {
			updateComment(value);
		},
	});

	function handleKeyPresses(e: any) {
		if (e.key === "Escape") {
			setIsEditing(false);
		}

		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			form.handleSubmit();
		}
	}
	return (
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
								<textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									// biome-ignore lint/a11y/noAutofocus: <explanation>
									autoFocus={true}
									className={styles["edit-comment"]}
									onKeyDown={handleKeyPresses}
								/>

								<Field.Error
									match={
										!field.state.meta.isValid && field.state.meta.isTouched
									}
									className={styles.error}
								>
									{field.state.meta.errors.map((err) => err?.message).join(",")}
								</Field.Error>
							</Field.Root>
						);
					}}
				/>
			</div>
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				children={([canSubmit, isSubmitting]) => (
					<div className={styles["button-controls"]}>
						<Button
							type="submit"
							disabled={!canSubmit}
							onClick={form.handleSubmit}
						>
							{isSubmitting ? "Updating..." : "Update comment"}
						</Button>
						<Button
							type="button"
							variant="secondary"
							onClick={() => setIsEditing(false)}
						>
							Cancel
						</Button>
					</div>
				)}
			/>
		</form>
	);
};
