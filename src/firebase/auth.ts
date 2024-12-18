import { getAuthErrorDescription } from "../utils/errors";
import { auth } from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Types
interface AuthResponse {
	status: boolean;
	message: string;
}

// Function to handle user login
export const loginUser = (email: string, password: string): Promise<AuthResponse> => {
	return signInWithEmailAndPassword(auth, email, password)
		.then(() => {
			return { status: true, message: "User logged in successfully!" };
		})
		.catch((error) => {
			const message = getAuthErrorDescription(error.code);
			return { status: false, message };
		});
};

// Function to handle user registration
export const registerUser = (email: string, password: string): Promise<AuthResponse> => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(() => {
			return { status: true, message: "User register successfully!" };
		})
		.catch((error) => {
			const message = getAuthErrorDescription(error.code);
			return { status: false, message };
		});
};
