// Libraries
import { useSnackbar, VariantType, SnackbarOrigin } from "notistack";

export interface CustomNotistackOptions {
	message: string;
	variant?: VariantType;
	anchorOrigin?: SnackbarOrigin;
	autoHideDuration?: number;
	closeAction?: boolean;
}
export type showNotificationType = ({
	message,
	variant,
	anchorOrigin,
	autoHideDuration,
	closeAction,
}: CustomNotistackOptions) => void;

const useCustomNotistack = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const showNotification = ({
		message,
		variant = "info",
		anchorOrigin = { vertical: "top", horizontal: "right" },
		autoHideDuration = 3000,
		closeAction = false,
	}: CustomNotistackOptions) => {
		enqueueSnackbar(message, {
			variant,
			anchorOrigin,
			autoHideDuration,
			action: closeAction
				? (key) => (
						<button
							style={{
								backgroundColor: "transparent",
								border: "0",
								fontWeight: "bolder",
								fontSize: "1.5rem",
								marginRight: "0.5rem",
							}}
							onClick={() => {
								closeSnackbar(key);
							}}
						>
							X
						</button>
				  )
				: undefined,
		});
	};

	return showNotification;
};

export default useCustomNotistack;
