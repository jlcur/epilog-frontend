type HeadProps = {
	title?: string;
	description?: string;
};

export const Head = ({ title = "", description = "" }: HeadProps = {}) => {
	return (
		<>
			<title>{title ? `${title} - social media for TV` : "Epilog"}</title>
			<meta name="description" content={description} />
		</>
	);
};
