'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, deleteTodo, updateTodo } from '@/features/todo/api/api';
import { Trash } from 'lucide-react';
import { Todo } from '@/features/todo/types/type';

export default function TodoList() {
    const queryClient = useQueryClient();

    const { data: todos = [], isLoading, error } = useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const deleteMutation = useMutation<void, Error, number>({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const updateMutation = useMutation<void, Error, Todo>({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex justify-between items-center p-4 border rounded-md shadow-sm"
                >
                    {/* 상태 토글 */}
                    <span
                        onClick={() => updateMutation.mutate(todo)}
                        className={`flex-1 cursor-pointer ${
                            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                    >
                        {todo.title}
                    </span>
                    {/* 삭제 버튼 */}
                    <button
                        onClick={() => deleteMutation.mutate(todo.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash />
                    </button>
                </li>
            ))}
        </ul>
    );
}
