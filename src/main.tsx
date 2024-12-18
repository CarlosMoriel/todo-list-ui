import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from "./routes.tsx";
import GlobalContextProvider from "./context/global.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalContextProvider>
			<AppRoutes />
		</GlobalContextProvider>
	</StrictMode>
);
