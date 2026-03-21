/** biome-ignore-all lint/correctness/noChildrenProp: See TanStack Form docs */
import { Field } from "@base-ui/react/field";
import { useForm } from "@tanstack/react-form";
import type React from "react";
import type { SetStateAction } from "react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import styles from "@/features/comments/components/update-comment.module.css";
import type { Post } from "@/types/api";

const postSchema = z.object({
	content: z.string().trim().min(1, "Post content is required"),
});

export type UpdatePostProps = {
	post: Post;
	updatePost: (data: { content: string }) => void;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

export const UpdatePost = ({
	post,
	updatePost,
	setIsEditing,
}: UpdatePostProps) => {
	const [postContent, _setPostContent] = useState(post.content);

	const form = useForm({
		defaultValues: {
			content: postContent,
		},
		validators: {
			onChange: postSchema,
		},
		onSubmit: async ({ value }) => {
			updatePost(value);
		},
	});

	function handleKeyPresses(e: any) {
		if (e.key === "Escape" && form.state.isDirty) {
			if (confirm("Discard changes?")) {
				setIsEditing(false);
			}
		}

		if (e.key === "Escape" && form.state.isPristine) {
			setIsEditing(false);
		}

		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			form.handleSubmit();
		}
	}

	function handleCancel() {
		if (form.state.isDirty) {
			if (confirm("Discard changes?")) {
				setIsEditing(false);
			}
		} else {
			setIsEditing(false);
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
							variant="success"
							disabled={!canSubmit}
							onClick={form.handleSubmit}
						>
							{isSubmitting ? "Saving..." : "Save"}
						</Button>
						<Button type="button" variant="ghost" onClick={handleCancel}>
							Cancel
						</Button>
					</div>
				)}
			/>
		</form>
	);
};
