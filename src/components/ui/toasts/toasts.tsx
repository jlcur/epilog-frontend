import { Toast } from "@base-ui/react";
import styles from "./toast.module.css";

export const ToastList = () => {
	const { toasts } = Toast.useToastManager();

	return (
		<Toast.Portal>
			<Toast.Viewport className={styles.Viewport}>
				{toasts.map((toast) => (
					<Toast.Root
						key={toast.id}
						toast={toast}
						className={styles.Toast}
						// @ts-expect-error
						swipeDirection={null}
					>
						<Toast.Content className={styles.Content}>
							<Toast.Title className={styles.Title} />
							<Toast.Description className={styles.Description} />
						</Toast.Content>
					</Toast.Root>
				))}
			</Toast.Viewport>
		</Toast.Portal>
	);
};
