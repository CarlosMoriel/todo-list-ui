import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Main = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User logged out successfully");
				navigate("/");
			})
			.catch((error) => {
				console.error("Error logging out:", error);
			});
	};

	return (
		<div>
			<h1>Main Page</h1>
			<Button variant="contained" color="primary" onClick={handleLogout}>
				Log Out
			</Button>
		</div>
	);
};

export default Main;
