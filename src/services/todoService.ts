import api from "../api/api";

export const fetchTodos = async () => {
	const response = await api.get("/todos");
	return response.data;
};

export const addTodo = async (text: string, completed: boolean) => {
	const response = await api.post("/todos", { text, completed });
	return response.data;
};

export const updateTodo = async (id: string, text: string, completed: boolean) => {
	const response = await api.put(`/todos/${id}`, { text, completed });
	return response.data;
};

export const deleteTodo = async (id: string) => {
	const response = await api.delete(`/todos/${id}`);
	return response.data;
};
