/** biome-ignore-all lint/correctness/noChildrenProp: <explanation> */
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import { TextField } from "@/components/ui/form/text-field";
import { CustomLink } from "@/components/ui/link/link";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { authClient } from "@/lib/auth-client";
import styles from "./signup-form.module.css";

const signUpSchema = z.object({
	username: z.string().min(1, "Username is required"),
	email: z.email(),
	password: z.string().min(1, "Password is required"),
});

export const SignupForm = () => {
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		validators: {
			onChange: signUpSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.username,
				},
				{
					onSuccess: () => {
						toastManager.add({
							description: "Your account was created",
						});
					},
					onError: (ctx) => {
						setServerError(ctx.error.message || "An unexpected error occurred");
					},
				},
			);
		},
	});

	return (
		<>
			<div className={styles.form}>
				<h2 className={styles.title}>Sign up</h2>

				{serverError && (
					<div className={styles.error} role="alert">
						{serverError}
					</div>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					{/* Username field */}
					<form.Field
						name="username"
						children={(field) => (
							<TextField
								field={field}
								label="Your username"
								placeholder="Enter username"
							/>
						)}
					/>

					{/* Email field */}
					<form.Field
						name="email"
						children={(field) => (
							<TextField
								field={field}
								label="Your email address"
								type="email"
								placeholder="Enter email"
							/>
						)}
					/>

					{/* Password field */}
					<form.Field
						name="password"
						children={(field) => (
							<TextField
								field={field}
								label="Your password"
								type="password"
								placeholder="Enter password"
							/>
						)}
					/>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Creating account..." : "Sign up"}
							</Button>
						)}
					/>
				</form>
			</div>
			<div className={styles["auth-link"]}>
				<span>Already have an account?</span>
				<CustomLink to="/login">Login</CustomLink>
			</div>
		</>
	);
};
