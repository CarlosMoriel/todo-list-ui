import { getAuthErrorDescription } from "../utils/errors";
import { auth } from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Types
interface AuthResponse {
	status: boolean;
	message: string;
}

export const loginUser = (email: string, password: string): Promise<AuthResponse> => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const uid = userCredential.user.uid;
			localStorage.setItem("uid", uid);
			return { status: true, message: "User logged in successfully!" };
		})
		.catch((error) => {
			const message = getAuthErrorDescription(error.code);
			return { status: false, message };
		});
};

export const registerUser = (email: string, password: string): Promise<AuthResponse> => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const uid = userCredential.user.uid;
			localStorage.setItem("uid", uid);
			return { status: true, message: "User register successfully!" };
		})
		.catch((error) => {
			const message = getAuthErrorDescription(error.code);
			return { status: false, message };
		});
};

export const logoutUser = (): Promise<AuthResponse> => {
	return signOut(auth)
		.then(() => {
			localStorage.removeItem("uid");
			return { status: true, message: "User logged out successfully!" };
		})
		.catch((error) => {
			const message = getAuthErrorDescription(error.code);
			return { status: false, message };
		});
};
