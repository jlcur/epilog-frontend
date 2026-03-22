/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form */
import { Field } from "@base-ui/react/field";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import { TextField } from "@/components/ui/form/text-field";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useCreatePost } from "@/features/posts/api/create-post";
import styles from "./create-post.module.css";

const postSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
});

export const CreatePostForm = () => {
	const createPostMutation = useCreatePost({
		mutationConfig: {
			onSuccess: () => {
				toastManager.add({
					title: "Post created",
				});
			},
		},
	});

	const form = useForm({
		defaultValues: {
			title: "",
			content: "",
		},
		validators: {
			onChange: postSchema,
		},
		onSubmit: async ({ value }) => {
			await createPostMutation.mutateAsync({
				title: value.title.trim(),
				content: value.content.trim(),
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
						name="title"
						children={(field) => {
							return <TextField field={field} label="Post title" />;
						}}
					/>
					<form.Field
						name="content"
						children={(field) => {
							return (
								<Field.Root
									name={field.name}
									invalid={!field.state.meta.isValid}
									dirty={field.state.meta.isDirty}
									touched={field.state.meta.isTouched}
									className={styles.field}
								>
									<label htmlFor={field.name} className={styles.label}>
										Content
									</label>
									<textarea
										id={field.name}
										name={field.name}
										className={styles.textarea}
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
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								variant="success"
								disabled={!canSubmit}
								onClick={form.handleSubmit}
							>
								{isSubmitting ? "Saving..." : "Save"}
							</Button>
						)}
					/>
				</div>
			</form>
		</div>
	);
};
