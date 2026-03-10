import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { type ComponentProps, forwardRef, type Ref } from "react";
import styles from "./icon-button.module.css";

const iconSize = {
	small: 14,
	medium: 18,
	large: 22,
};

const iconButtonVariants = cva(styles["icon-button"], {
	variants: {
		size: {
			small: styles.sizeS,
			medium: styles.sizeM,
			large: styles.sizeL,
		},
		variant: {
			normal: styles.normal,
			danger: styles.danger,
			ghost: styles.ghost,
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
	icon: React.ElementType;
	title: string;
}

export const IconButton = forwardRef(function IconButton(
	{
		icon: Icon,
		size = "medium",
		variant,
		title,
		className,
		...rest
	}: IconButtonProps,
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
			<Icon size={iconSize[size ?? "medium"]} aria-hidden="true" />
		</button>
	);
});
