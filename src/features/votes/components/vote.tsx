import { ChevronDown, ChevronUp } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button/icon-button";
import { useTogglePostVote } from "@/features/votes/api/toggle-post-vote";
import styles from "./vote.module.css";

export type VoteParams = {
	postId: string;
	score: number;
	userVote: 1 | -1 | null;
};

export const Vote = ({ postId, score, userVote }: VoteParams) => {
	const hasUserUpvoted = userVote === 1;
	const hasUserDownvoted = userVote === -1;

	const toggleVoteMutation = useTogglePostVote();

	const handleVote = (direction: 1 | -1) => {
		toggleVoteMutation.mutate({ postId, data: { direction } });
	};

	return (
		<div className={styles["vote-box"]}>
			<IconButton
				icon={ChevronUp}
				title="Up-vote"
				className={`${hasUserUpvoted ? styles.upvoted : ""}`}
				onClick={() => handleVote(1)}
				disabled={toggleVoteMutation.isPending}
			/>
			{score}
			<IconButton
				icon={ChevronDown}
				title="Down-vote"
				className={`${hasUserDownvoted ? styles.downvoted : ""}`}
				onClick={() => handleVote(-1)}
				disabled={toggleVoteMutation.isPending}
			/>
		</div>
	);
};
