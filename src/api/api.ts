import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api", // Cambia esto por la URL del backend en producción
});

// Interceptor para añadir UID automáticamente en las solicitudes
api.interceptors.request.use(
	(config) => {
		const uid = localStorage.getItem("uid"); // Supongamos que el UID está almacenado aquí
		if (uid) {
			config.headers["Authorization"] = `Bearer ${uid}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
