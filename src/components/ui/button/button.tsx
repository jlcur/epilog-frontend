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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		isLoading?: boolean;
		iconLeft?: React.ReactNode;
		iconRight?: React.ReactNode;
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

		const classes = [buttonVariants({ variant, size }), className]
			.filter(Boolean)
			.join(" ");

		return (
			<Comp className={classes} ref={ref} {...props}>
				{isLoading && "Loading..."}
				{!isLoading && iconLeft && (
					<span className={styles.iconWrapper}>{iconLeft}</span>
				)}
				<span className={styles.textWrapper}>{!isLoading && children}</span>
				{!isLoading && iconRight && (
					<span className={styles.iconWrapper}>{iconRight}</span>
				)}
			</Comp>
		);
	},
);

export { Button, buttonVariants };
