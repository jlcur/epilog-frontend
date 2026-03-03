import { Field } from "@base-ui/react/field";
import type { FieldApi } from "@tanstack/react-form";
import styles from "./text-field.module.css";

interface TextFieldProps {
	field: FieldApi<
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any
	>;
	label: string;
	description?: string;
	type?: string;
	placeholder?: string;
}

export const TextField = ({
	field,
	label,
	description,
	type,
	placeholder,
}: TextFieldProps) => {
	return (
		<Field.Root
			invalid={!field.state.meta.isValid}
			dirty={field.state.meta.isDirty}
			touched={field.state.meta.isTouched}
			className={styles.field}
		>
			<Field.Label className={styles.label}>{label}</Field.Label>
			<Field.Control
				name={field.name}
				type={type ?? "text"}
				placeholder={placeholder || ""}
				className={styles.input}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
			/>
			<Field.Error
				match={!field.state.meta.isValid && field.state.meta.isTouched}
				className={styles.error}
			>
				{field.state.meta.errors.map((err) => err?.message).join(", ")}
			</Field.Error>
			{description && (
				<Field.Description className={styles.description}>
					{description}
				</Field.Description>
			)}
		</Field.Root>
	);
};
