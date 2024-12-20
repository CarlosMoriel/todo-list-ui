import {
	Button,
	TextField,
	Checkbox,
	Typography,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	AppBar,
	Toolbar,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import { ExpandMore, Edit, Delete, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import useCustomNotistack from "../hooks/useCustomNotistack";
import { logoutUser } from "../firebase/auth";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../services/todoService";

interface Todo {
	id: string;
	text: string;
	completed: boolean;
	date: Date;
}

const Main = () => {
	const navigate = useNavigate();
	const showNotification = useCustomNotistack();

	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState("");
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editText, setEditText] = useState("");
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	useEffect(() => {
		const loadTodos = async () => {
			try {
				const data = await fetchTodos();
				setTodos(data);
			} catch (error) {
				console.error("Error fetching todos:", error);
			}
		};
		loadTodos();
	}, []);

	const handleLogout = async () => {
		const res = await logoutUser();
		if (res.status) {
			showNotification({ message: res.message, variant: "success" });
			navigate("/");
		} else {
			showNotification({ message: res.message, variant: "error" });
		}
	};

	const handleAddTodo = async () => {
		if (newTodo.trim() !== "") {
			try {
				const newTodoData = await addTodo(newTodo, false);
				setTodos((prev) => [...prev, newTodoData]);
				setNewTodo("");
			} catch (error) {
				console.error("Error adding todo:", error);
			}
		}
	};

	const handleToggleTodo = async (index: number) => {
		const todo = todos[index];
		try {
			await updateTodo(todo.id!, todo.text, !todo.completed);
			setTodos((prev) =>
				prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
			);
		} catch (error) {
			console.error("Error toggling todo:", error);
		}
	};

	const handleStartEdit = (index: number) => {
		setEditingIndex(index);
		setEditText(todos[index].text);
	};

	const handleSaveEdit = async (index: number) => {
		const todo = todos[index];
		try {
			await updateTodo(todo.id!, editText, todo.completed);
			setTodos((prev) => prev.map((t, i) => (i === index ? { ...t, text: editText } : t)));
			setEditingIndex(null);
		} catch (error) {
			console.error("Error saving todo:", error);
		}
	};

	const handleDeleteTodo = async (index: number) => {
		const todo = todos[index];
		try {
			await deleteTodo(todo.id!);
			setTodos((prev) => prev.filter((_, i) => i !== index));
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const groupTodosByDate = () => {
		return todos.reduce((acc, todo) => {
			const dateKey = new Date(todo.date).toDateString();
			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(todo);
			return acc;
		}, {} as Record<string, Todo[]>);
	};

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const groupedTodos = groupTodosByDate();

	return (
		<Container>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={toggleDrawer}
						sx={{ display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						My Todo List
					</Typography>
					<Button variant="contained" color="secondary" onClick={handleLogout}>
						Log Out
					</Button>
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
				<List>
					<ListItem component="div" onClick={handleLogout}>
						<ListItemText primary="Log Out" />
					</ListItem>
				</List>
			</Drawer>

			<Content>
				<AddTodoContainer>
					<TextField
						label="Add Todo"
						variant="outlined"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						sx={{ flexGrow: 1 }}
					/>
					<Button variant="contained" color="primary" onClick={handleAddTodo}>
						Add
					</Button>
				</AddTodoContainer>

				{Object.entries(groupedTodos).map(([date, items]) => (
					<Accordion key={date} defaultExpanded>
						<AccordionSummary expandIcon={<ExpandMore />}>
							<Typography>{date}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<TodoList>
								{items.map((todo, index) => (
									<TodoItem key={index} completed={todo.completed}>
										<Checkbox
											checked={todo.completed}
											onChange={() => handleToggleTodo(index)}
										/>
										{editingIndex === index ? (
											<TextField
												value={editText}
												onChange={(e) => setEditText(e.target.value)}
												size="small"
												sx={{ flexGrow: 1 }}
											/>
										) : (
											<Typography sx={{ flexGrow: 1 }}>
												{todo.text}
											</Typography>
										)}

										{editingIndex === index ? (
											<IconButton
												color="primary"
												onClick={() => handleSaveEdit(index)}
											>
												<Save />
											</IconButton>
										) : (
											<IconButton
												color="primary"
												onClick={() => handleStartEdit(index)}
											>
												<Edit />
											</IconButton>
										)}
										<IconButton
											color="secondary"
											onClick={() => handleDeleteTodo(index)}
										>
											<Delete />
										</IconButton>
									</TodoItem>
								))}
							</TodoList>
						</AccordionDetails>
					</Accordion>
				))}
			</Content>
		</Container>
	);
};

// Styled Components
const Container = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
}));

const Content = styled("div")(({ theme }) => ({
	padding: theme.spacing(2),
	flexGrow: 1,
}));

const AddTodoContainer = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	marginBottom: theme.spacing(2),
}));

const TodoList = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),
}));

const TodoItem = styled("div")<{ completed: boolean }>(({ theme, completed }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	textDecoration: completed ? "line-through" : "none",
	color: completed ? theme.palette.text.disabled : theme.palette.text.primary,
}));

export default Main;
