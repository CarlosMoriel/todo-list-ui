import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Paper, Container, Tabs, Tab } from "@mui/material";
import { loginUser, registerUser } from "./firebase/auth";

import useCustomNotistack from "./hooks/useCustomNotistack";

function App() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [tabIndex, setTabIndex] = useState(0);

	const showNotification = useCustomNotistack();

	const handleLogin = async () => {
		const res = await loginUser(email, password);
		res.status
			? showNotification({ message: res.message, variant: "success" })
			: showNotification({ message: res.message, variant: "error" });
	};

	const handleRegister = async () => {
		const res = await registerUser(email, password);
		res.status
			? showNotification({ message: res.message, variant: "success" })
			: showNotification({ message: res.message, variant: "error" });
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	return (
		<Main>
			<LoginCard elevation={3}>
				<Tabs value={tabIndex} onChange={handleTabChange} centered>
					<Tab label="Login" />
					<Tab label="Register" />
				</Tabs>
				{tabIndex === 0 && (
					<>
						<Typography variant="h4" component="h1">
							Login
						</Typography>
						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							label="Password"
							variant="outlined"
							type="password"
							fullWidth
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
							Login
						</Button>
					</>
				)}
				{tabIndex === 1 && (
					<>
						<Typography variant="h4" component="h1">
							Register
						</Typography>
						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							label="Password"
							variant="outlined"
							type="password"
							fullWidth
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={handleRegister}
						>
							Register
						</Button>
					</>
				)}
			</LoginCard>
		</Main>
	);
}

// Styled Components
const Main = styled(Container)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	maxWidth: "100vw",
	width: "100vw",
	margin: "auto",
	alignItems: "center",
	height: "100vh",
	backgroundColor: theme.palette.background.default,
	padding: theme.spacing(2),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(1),
	},
}));

const LoginCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	maxWidth: 400,
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(3),
	textAlign: "center",
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
		gap: theme.spacing(2),
	},
}));

export default App;
