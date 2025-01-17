'use client';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchTodos, deleteTodo} from '@/features/todo/api/api';
import {Trash} from 'lucide-react';
import {Todo} from '@/features/todo/types/type';

export default function TodoList() {
    const queryClient = useQueryClient();

    const {data: todos = [], isLoading, error} = useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const mutation = useMutation<void, Error, number>({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex justify-between items-center p-4 border rounded-md shadow-sm"
                >
                    <span
                        className={`flex-1 ${
                            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                    >
                        {todo.title}
                    </span>
                    <button
                        onClick={() => mutation.mutate(todo.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash/>
                    </button>
                </li>
            ))}
        </ul>
    );
}
