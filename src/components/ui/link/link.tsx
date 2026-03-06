import { createLink, type LinkComponent } from "@tanstack/react-router";

import * as React from "react";
import styles from "./link.module.css";

interface BasicLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
	(props, ref) => {
		return <a ref={ref} {...props} className={styles.link} />;
	},
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
	return <CreatedLinkComponent preload={"intent"} {...props} />;
};
