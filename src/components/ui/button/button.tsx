import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import styles from "./button.module.css";

const buttonVariants = cva(styles.button, {
	variants: {
		variant: {
			default: styles["-primary"],
			destructive: styles["-danger"],
			outline: styles["-outline"],
			secondary: styles["-secondary"],
			ghost: styles["-ghost"],
			link: styles["-link"],
			success: styles["-success"],
			info: styles["-info"],
			danger: styles["-danger"],
			warning: styles["-warning"],
		},
		size: {
			default: styles["-default"],
			small: styles["-small"],
			large: styles["-large"],
			icon: styles["-icon"],
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

const iconSize = {
	default: 16,
	small: 14,
	large: 18,
	icon: 20,
} as const;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		isLoading?: boolean;
		iconLeft?: React.ElementType;
		iconRight?: React.ElementType;
	};

const Button = React.forwardRef<
	HTMLButtonElement & HTMLAnchorElement,
	ButtonProps
>(
	(
		{
			className = "",
			variant,
			size,
			asChild = false,
			children,
			isLoading,
			iconLeft,
			iconRight,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";

		const IconLeft = iconLeft;
		const IconRight = iconRight;
		const resolvedSize = size ?? "default";

		return (
			<Comp
				className={buttonVariants({ variant, size, className })}
				ref={ref}
				{...props}
			>
				{isLoading && "Loading..."}
				{IconLeft && (
					<IconLeft size={iconSize[resolvedSize]} aria-hidden="true" />
				)}
				<span className={styles.textWrapper}>{children}</span>
				{IconRight && (
					<IconRight size={iconSize[resolvedSize]} aria-hidden="true" />
				)}
			</Comp>
		);
	},
);

export { Button, buttonVariants };
