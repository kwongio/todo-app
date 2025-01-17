import {Todo} from "@/features/todo/types/type";

const API_URL: string = "http://localhost:8080/api/todos"

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

export const updateTodo = async (todo: Todo): Promise<void> => {
    const updatedTodo = {...todo, completed: !todo.completed}; // `completed` 상태 토글
    const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
};

export const deleteTodo = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
};

export const addTodo = async ({title}: { title: string }): Promise<Todo> => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, completed: false}),
    });

    if (!response.ok) {
        throw new Error('Failed to add todo');
    }

    return response.json();
};
