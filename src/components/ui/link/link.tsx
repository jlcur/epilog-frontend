import { createLink, type LinkComponent } from "@tanstack/react-router";

import * as React from "react";
import styles from "./link.module.css";

interface BasicLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
	({ className, ...props }, ref) => {
		const combinedClasses = `${styles.link} ${className ?? ""}`.trim();
		return <a ref={ref} {...props} className={combinedClasses} />;
	},
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
	return <CreatedLinkComponent preload={"intent"} {...props} />;
};
