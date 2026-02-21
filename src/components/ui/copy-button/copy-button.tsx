import { Check, Link } from "lucide-react";
import type * as React from "react";
import { useClipboard } from "@/hooks/use-clipboard";

type CopyButtonProps = {
	textToCopy: string;
	children?: React.ReactNode;
};

export const CopyButton = ({ textToCopy, children }: CopyButtonProps) => {
	const clipboard = useClipboard();

	return (
		<button type="button" onClick={() => clipboard.copy(textToCopy)}>
			{children}
			{clipboard.state === "READY" && <Link size="14" />}
			{clipboard.state === "SUCCESS" && (
				<span>
					<Check size="14" />
				</span>
			)}
		</button>
	);
};
