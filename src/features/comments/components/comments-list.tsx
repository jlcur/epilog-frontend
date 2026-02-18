import { useComments } from "../api/get-comments.ts";
import styles from "./comments-list.module.css";

export const CommentsList = () => {
	const commentsQuery = useComments();

	const comments = commentsQuery.data?.data;

	if (!comments) return null;

	return (
		<ul className={styles["comment-list"]}>
			{comments.map((comment: any) => (
				<li key={comment.id}>{comment.content}</li>
			))}
		</ul>
	);
};
