import type * as React from "react";
import { Head } from "@/components/head/head";
import styles from "./content-layout.module.css";

type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
	return (
		<>
			<Head title={title} />
			<section className={styles.container}>
				<div>{children}</div>
			</section>
		</>
	);
};
