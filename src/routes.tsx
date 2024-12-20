import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import App from "./App";
import Main from "./pages/Main";

const AppRoutes: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsAuthenticated(!!user);
		});
		return () => unsubscribe();
	}, []);


	return (
		<Router>
			<Routes>
				<Route path="/" element={isAuthenticated ? <Navigate to="/main" /> : <App />} />
				<Route path="/main" element={isAuthenticated ? <Main /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
