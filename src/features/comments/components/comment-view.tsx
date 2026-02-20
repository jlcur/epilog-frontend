import { useComment } from "@/features/comments/api/get-comment";
import { CommentCard } from "@/features/comments/components/comment-card";

type CommentViewProps = {
	commentId: string;
};

export const CommentView = ({ commentId }: CommentViewProps) => {
	const { data: comment, isPending } = useComment({ commentId });

	if (isPending) return <div>Loading...</div>;

	if (!comment) return <div>Cannot find this comment.</div>;

	return <CommentCard comment={comment} />;
};
