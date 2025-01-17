'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addTodo} from '@/features/todo/api/api';
import {useState} from 'react';
import {Todo} from '@/features/todo/types/type';

export default function TodoForm() {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');

    const mutation = useMutation<Todo, Error, { title: string; }>({
            mutationFn: addTodo,
            onSuccess: (newTodo: Todo) => {
                queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
                    return oldTodos ? [...oldTodos, newTodo] : [newTodo];
                });
                setTitle('');
            },
            onError:
                (error: Error) => {
                    alert(error.message);
                },
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            mutation.mutate({title});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 p-2 border rounded"
            />
            <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add
            </button>
        </form>
    );
}

