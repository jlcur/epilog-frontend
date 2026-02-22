import { Check, Link } from "lucide-react";
import type * as React from "react";
import { toastManager } from "@/components/ui/toasts/toast-manager";
import { useClipboard } from "@/hooks/use-clipboard";

type CopyButtonProps = {
	textToCopy: string;
	children?: React.ReactNode;
};

export const CopyButton = ({ textToCopy, children }: CopyButtonProps) => {
	const clipboard = useClipboard();

	function copyToClipboard(textToCopy: string) {
		clipboard.copy(textToCopy);
		toastManager.add({
			description: "Link copied to clipboard",
		});
	}

	return (
		<button type="button" onClick={() => copyToClipboard(textToCopy)}>
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
