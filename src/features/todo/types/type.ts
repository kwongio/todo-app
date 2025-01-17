export interface Todo {
    id: number;
    title: string;
    created_at: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}
