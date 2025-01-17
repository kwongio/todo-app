import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {TodoState} from "@/features/todo/types/type";

export const useTodoStore = create(
    devtools(persist<TodoState>(
            (set) => ({
                todos: [],
                setTodos: (todos) => set({todos}),
                addTodo: (todo) =>
                    set((state) => ({
                        todos: [...state.todos, todo],
                    })),
                toggleTodo: (id) =>
                    set((state) => ({
                        todos: state.todos.map((todo) =>
                            todo.id === id
                                ? {...todo, completed: !todo.completed}
                                : todo
                        ),
                    })),
                deleteTodo: (id) =>
                    set((state) => ({
                        todos: state.todos.filter((todo) => todo.id !== id),
                    })),
            }),
            {
                name: 'todo-storage',
            }
        )
    ));
