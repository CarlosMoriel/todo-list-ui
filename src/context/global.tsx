// Node Modules
import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
// Firebase
import { getTextColor } from "../utils/colors";

// Types
interface ContextPropsType {
	children: React.ReactNode;
}
interface ContextType {
	setPrimaryColor: (color: string) => void;
	setSecondaryColor: (color: string) => void;
}

//Context
export const GlobalContext = createContext<ContextType | null>(null);

//Context Provider
const GlobalContextProvider = ({ children }: ContextPropsType) => {
	// Theme Colors
	const [primaryColor, setPrimaryColor] = useState("#01295F"); // Main Default Color
	const [secondaryColor, setSecondaryColor] = useState("#437F97"); // Secondary Default Color
	const primaryTextColor = useMemo(() => getTextColor(primaryColor), [primaryColor]);
	const secondaryTextColor = useMemo(() => getTextColor(secondaryColor), [secondaryColor]);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					primary: {
						main: primaryColor,
						contrastText: primaryTextColor,
					},
					secondary: {
						main: secondaryColor,
						contrastText: secondaryTextColor,
					},
				},
				components: {
					MuiContainer: {
						styleOverrides: {
							root: {
								maxWidth: "none",
								display: "flex",
								"@media (min-width: 1200px)": {
									maxWidth: "none",
								},
							},
						},
						defaultProps: {
							disableGutters: true,
						},
					},
				},
			}),
		[primaryColor, secondaryColor, primaryTextColor, secondaryTextColor]
	);

	return (
		<GlobalContext.Provider
			value={{
				setPrimaryColor,
				setSecondaryColor,
			}}
		>
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={5}>{children}</SnackbarProvider>
			</ThemeProvider>
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalContextProvider");
	}

	return context;
};

export default GlobalContextProvider;
