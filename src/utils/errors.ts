export const getAuthErrorDescription = (errorCode: string): string => {
	switch (errorCode) {
		// Errors from createUserWithEmailAndPassword
		case "auth/email-already-in-use":
			return "The email is already in use.";
		case "auth/invalid-email":
			return "The email address is not valid.";
		case "auth/operation-not-allowed":
			return "Email authentication is not enabled.";
		case "auth/weak-password":
			return "The password is too weak.";
		case "auth/missing-email":
			return "The email address is missing.";
		case "auth/internal-error":
			return "An internal error occurred.";
		case "auth/invalid-api-key":
			return "The API key is not valid.";
		case "auth/network-request-failed":
			return "A network error occurred.";
		case "auth/too-many-requests":
			return "Too many requests. Please try again later.";

		// Errors from signInWithEmailAndPassword
		case "auth/invalid-credential":
			return "The email or password is incorrect.";
		case "auth/user-disabled":
			return "The user account has been disabled.";
		case "auth/user-not-found":
			return "No account found with this email address.";
		case "auth/wrong-password":
			return "The password is incorrect.";

		// Errors from signOut
		case "auth/no-current-user":
			return "There is no currently authenticated user.";

		// Errors from sendSignInLinkToEmail
		case "auth/missing-android-pkg-name":
			return "The Android package name is missing.";
		case "auth/missing-continue-uri":
			return "The continue URI is missing.";
		case "auth/missing-ios-bundle-id":
			return "The iOS bundle ID is missing.";
		case "auth/invalid-continue-uri":
			return "The continue URI is not valid.";
		case "auth/unauthorized-continue-uri":
			return "The continue URI is not authorized.";

		default:
			return "An unknown error occurred.";
	}
};
