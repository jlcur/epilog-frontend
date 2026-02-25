import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { type ComponentProps, forwardRef, type Ref } from "react";
import styles from "./icon-button.module.css";

const iconButtonVariants = cva(styles.container, {
	variants: {
		size: {
			small: styles.sizeS,
			medium: styles.sizeM,
			large: styles.sizeL,
		},
		variant: {
			normal: styles.normal,
			secondary: styles.secondary,
			danger: styles.danger,
			info: styles.info,
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "normal",
	},
});

export interface IconButtonProps
	extends ComponentProps<"button">,
		VariantProps<typeof iconButtonVariants> {
	icon: React.ReactNode;
	title: string;
}

export const IconButton = forwardRef(function IconButton(
	{ icon, size, variant, title, className, ...rest }: IconButtonProps,
	ref: Ref<HTMLButtonElement> | null,
) {
	return (
		<button
			type="button"
			aria-label={title}
			ref={ref}
			className={iconButtonVariants({ size, variant, className })}
			{...rest}
		>
			{icon}
		</button>
	);
});
